import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div
      className={cn(
        "border-t border-white/10 p-4 flex items-center gap-2 "
      )}
    >
      <Link
        to="/login"
        className="w-full text-center text-white rounded-md transition"
      >
        <Button variant="outline" size="sm" className="w-full px-4 py-1">
            Login
        </Button>
      </Link>
      <Link
        to="/register"
        className="w-full text-center text-white rounded-md transition"
      >
        <Button variant="outline" size="xs" className="bg-blue-500 hover:bg-blue-600 w-full px-4 py-1">
            Register
        </Button>
      </Link>
    </div>
  );
};

export default Login;
