import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import "tailwindcss/tailwind.css";
import { Link } from "react-router-dom";
import { useUserStore } from "@/Stores/useUserStore";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: "",
  });
  
  const [error, setError] = useState(null);

  const { signup, isLoading } = useUserStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset any previous error
    try {
      const user = await signup(formData);
      if (user) {
        window.location.reload();
         // Navigate to the home page upon successful registration
      }
    } catch (err) {
      setError("Failed to register. Please try again.",err); // Handle registration errors
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full border-none max-w-md bg-transparent outline-none bg-opacity-50">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-center">Register To Socialise</CardTitle>
        </CardHeader>
        <div className="p-4">
          <form onSubmit={handleSubmit} >
            <div className="flex flex-wrap gap-3">
              <div className="mb-4 flex-1 flex-grow">
                <Label htmlFor="firstName" className="text-sm">First Name</Label>
                <Input
                  autoComplete="off"
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>
              <div className="mb-4 flex-1">
                <Label htmlFor="lastName" className="text-sm">Last Name</Label>
                <Input
                  autoComplete="off"
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>
            </div>
            <div className="mb-4 flex-grow">
              <Label htmlFor="username" className="text-sm">Username</Label>
              <Input
                autoComplete="off"
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="email" className="text-sm">Email</Label>
              <Input
                autoComplete="off"
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="password" className="text-sm max-w-2xl">Password</Label>
              <Input
                autoComplete="off"
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>
            {error && (
              <p className="text-sm text-red-500 mb-2">{error}</p>
            )}
            <Button
              type="submit"
              disabled={isLoading}
              className="mt-4 w-full mx-auto bg-blue-500 hover:bg-blue-600 text-white"
            >
              {isLoading ? "Registering..." : "Register"}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <span className="text-sm">Already have an account? </span>
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Register;
