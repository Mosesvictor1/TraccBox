import React from "react";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar/Sidebar";

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div className="bg-gray-100 min-h-screen">
    <Topbar />
    <div className="flex">
      <Sidebar />
      <main
        className="flex-1 ml-60 mt-16 p-8 h-[calc(100vh-4rem)] overflow-y-auto"
        style={{ minHeight: "calc(100vh - 4rem)" }}
      >
        {children}
      </main>
    </div>
  </div>
);

export default DashboardLayout;
