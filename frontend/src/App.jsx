import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import Nav from "./pages/Sidebar/Nav";

import { useUserStore } from "./Stores/useUserStore";
import { Loader } from "lucide-react";
import { Profile } from "./pages/Profile/Profile";
import EditPage from "./pages/Edit Page/EditPage";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);  // Add loading state
  const { getProfile } = useUserStore();

  // Fetch user profile on mount
  useEffect(() => {
    const fetch = async () => {
      await getProfile();
      const token = localStorage.getItem("token");
      if (token) {
        setIsAuthenticated(true); // If token exists, authenticate the user
      } else {
        setIsAuthenticated(false); // Otherwise, set authentication to false
      }
      setLoading(false); // Set loading to false once the check is complete
    };
    fetch();
  }, [getProfile]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">
      <Loader className="animate-spin size-20 text-zinc-600"/>
    </div>;  // Show a loading spinner or message until token is checked
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Nav />}>
          <Route
            index
            element={isAuthenticated ? <Home /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/profile"
            element={isAuthenticated ? <Profile /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/profile/edit"
            element={isAuthenticated ? <EditPage /> : <Navigate to="/login" replace />}
          />
          <Route
            path="login"
            element={!isAuthenticated ? <Login /> : <Navigate to="/" replace />}
          />
          <Route
            path="register"
            element={!isAuthenticated ? <Register /> : <Navigate to="/" replace />}
          />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
