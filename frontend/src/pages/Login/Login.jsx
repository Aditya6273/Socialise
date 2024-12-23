import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@radix-ui/react-label';
import { Input } from '@/components/ui/input';
import 'tailwindcss/tailwind.css';
import { Link } from 'react-router-dom';
import { useUserStore } from '@/Stores/useUserStore';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

 const { login, isLoading } = useUserStore();
  const handleSubmit = async (e) => {
  e.preventDefault();
    await login(formData);
   
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full border-none max-w-md outline-none bg-opacity-50">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
        </CardHeader>
        <div className="p-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Label htmlFor="email" className='text-sm'>Email</Label>
              <Input
                id="email"
                name="email"
                type="text"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full"
                autoComplete="off"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="password" className='text-sm'>Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full"
                autoComplete="off"
              />
            </div>
            <Button type="submit" disabled={isLoading} className="mt-4 flex-1 w-full bg-blue-500 hover:bg-blue-600 text-white">
              {isLoading ? 'Loggin in...' : 'Login'}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <span className="text-sm">Don&apos;t have an account? </span>
            <Link to="/register" className="text-blue-500 hover:underline">Register</Link>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Login;