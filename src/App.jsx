import React from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import PrivateRoutes from './components/PrivateRoutes';
import Home from "./pages/Home";
import User from "./pages/User";

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            fontSize: "1.6rem",
          },
        }}
      />
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/user" element={<User />} />
      </Routes>
    </>
  );
}
export default App;
