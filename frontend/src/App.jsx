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
import Post from "./pages/Post Page/Post";
import { EditProfile } from "./pages/Edit Page/EditProfile";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Start with `null` for an unresolved state

  const { getProfile } = useUserStore();

  // Fetch user profile and check authentication
  useEffect(() => {
    const fetchAuthState = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          await getProfile(); // Ensure the profile is fetched
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Failed to fetch authentication state:", error);
        setIsAuthenticated(false);
      }
    };

    fetchAuthState();
  }, [getProfile]);

  // Show loader while determining authentication state
  if (isAuthenticated === null) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin size-20 text-zinc-600" />
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Nav />}>
          <Route
            index
            element={
              isAuthenticated ? <Home /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="profile"
            element={
              isAuthenticated ? <Profile /> : <Navigate to="/login" replace />
            }
          />
          
          <Route
            path="profile/update"
            element={
              isAuthenticated ? <EditProfile /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="login"
            element={!isAuthenticated ? <Login /> : <Navigate to="/" replace />}
          />
          <Route
            path="register"
            element={
              !isAuthenticated ? <Register /> : <Navigate to="/" replace />
            }
          />
          <Route
            path="post/:id"
            element={
              isAuthenticated ? <Post /> : <Navigate to="/login" replace />
            }
          />
        </Route>
      </Routes>
      <Toaster position="bottom-right" />
    </>
  );
};

export default App;
