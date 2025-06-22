import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar: React.FC = () => (
  <aside className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-60 bg-white shadow flex flex-col py-6 px-4 z-20">
    <nav className="flex flex-col gap-4">
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          isActive ? "text-traccbox-500 font-semibold" : "text-gray-700"
        }
      >
        Dashboard Home
      </NavLink>
      {/* Add more links as you add more dashboard subpages */}
      <NavLink
        to="/dashboard/profile"
        className={({ isActive }) =>
          isActive ? "text-traccbox-500 font-semibold" : "text-gray-700"
        }
      >
        Profile
      </NavLink>
      <NavLink
        to="/dashboard/settings"
        className={({ isActive }) =>
          isActive ? "text-traccbox-500 font-semibold" : "text-gray-700"
        }
      >
        Settings
      </NavLink>
    </nav>
  </aside>
);

export default Sidebar;
