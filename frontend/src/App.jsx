import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import Nav from "./pages/Sidebar/Nav";
import Profile from "./pages/Profile/Profile";


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // Update authentication state based on token presence
  }, []);

  return (
    <>
   
      <Routes>
       <Route path="/" element={<Nav />}>
       <Route index element={isAuthenticated ? <Home /> : <Navigate to="/login" replace />}/>
       <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" replace />}/>
        <Route path="login" element={!isAuthenticated ? <Login /> : <Navigate to="/" replace />}/>
        <Route path="register" element={!isAuthenticated ? <Register /> : <Navigate to="/" replace />}/>
       </Route>
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
