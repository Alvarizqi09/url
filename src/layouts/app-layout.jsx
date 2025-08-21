import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/header";
import Footer from "@/components/footer";

const AppLayout = () => {
  return (
    <div>
      <main className="min-h-screen container mx-auto">
        <Header />
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
