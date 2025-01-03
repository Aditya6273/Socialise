import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import Nav from "./pages/Sidebar/Nav";
import { useUserStore } from "./Stores/useUserStore";
import { Loader2 } from "lucide-react";
import { Profile } from "./pages/Profile/Profile";
import Post from "./pages/Post Page/Post";
import { EditProfile } from "./pages/Edit Page/EditProfile";
import CreatePost from "./pages/Create Post/CreatePost";
import MakeBond from "./pages/Make Bonds/MakeBond";

import UserProfilePage from "./pages/User Profile/UserProfile";
import Feed from "./pages/Feed Page/Feed";
import BondPage from "./pages/Bonds Page/BondPage";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); 

  const { getProfile } = useUserStore();

  useEffect(() => {
    const fetchAuthState = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          await getProfile(); 
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


  if (isAuthenticated === null) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin size-16 text-zinc-600" />
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
              <Home />  
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
          <Route
            path="create"
            element={
              isAuthenticated ? <CreatePost /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="make-bonds"
            element={
              isAuthenticated ? <MakeBond /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="profile/:id"
            element={
              isAuthenticated ? <UserProfilePage /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="feed"
            element={
              isAuthenticated ? <Feed /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="show-bonds"
            element={
              isAuthenticated ? <BondPage /> : <Navigate to="/login" replace />
            }
          />
        </Route>
      </Routes>
      <Toaster position="bottom-right" />
    </>
  );
};

export default App;
