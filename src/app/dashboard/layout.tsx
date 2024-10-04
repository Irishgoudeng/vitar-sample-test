// layout.tsx
import React from "react";
import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/common/Navbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className=" xl:ml-64">
        {/* Navbar */}
        <Navbar />

        {/* Main Page Content */}
        <main className=" bg-white p-12 xl:p-0">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
