import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@radix-ui/react-label';
import { Input } from '@/components/ui/input';
import 'tailwindcss/tailwind.css';
import { Link, useNavigate } from 'react-router-dom';
import { useUserStore } from '@/Stores/useUserStore';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const { login, isLoading } = useUserStore();

  const handleSubmit = async (e) => {
   e.preventDefault();
    setError(null); // Reset error state
    try {
      const user = await login(formData);
      if (user) {
        // Reload the page after successful login
        navigate('/'); // Correctly navigate after successful login
      }
    } catch (err) {
      setError('Invalid email or password',err); // Handle error message
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-full max-w-md bg-transparent  border-none bg-opacity-90">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-center">
            Login To Socialise
          </CardTitle>
        </CardHeader>
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Label htmlFor="email" className="text-sm">
                Email
              </Label>
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
              <Label htmlFor="password" className="text-sm">
                Password
              </Label>
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
            {error && (
              <p className="text-sm text-red-500 mb-2">{error}</p>
            )}
            <Button
              type="submit"
              disabled={isLoading}
              className="mt-4 flex w-full justify-center bg-blue-500 hover:bg-blue-600 text-white"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <span className="text-sm">Don&apos;t have an account? </span>
            <Link to="/register" className="text-blue-500 hover:underline">
              Register
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Login;
