import React, { useState } from "react";
import { sidebarMenus } from "./menuData";
import SidebarMenu from "./SidebarMenu";
import { Link, useLocation } from "react-router-dom";
import { LogOut } from "lucide-react";

const Sidebar: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const location = useLocation();

  // Determine active menu by route
  const getActiveIndex = () => {
    return sidebarMenus.findIndex((menu) => {
      if (menu.to && location.pathname === menu.to) return true;
      if (menu.submenus) {
        return menu.submenus.some((submenu) =>
          location.pathname.startsWith(submenu.to)
        );
      }
      return false;
    });
  };
  const activeIndex = getActiveIndex();

  return (
    <aside className="fixed top-0 left-0 h-full w-64 bg-white shadow flex flex-col py-6 px-2 z-30 border-r">
      {/* Logo */}
      <div className="flex items-center gap-2 px-4 mb-8">
        <img src="/assets/logo.png" alt="TraccBox Logo" className="h-8 " />
      </div>
      {/* Menus */}
      <nav className="flex-1 flex flex-col gap-1 overflow-y-auto hide-scrollbar">
        {sidebarMenus.map((menu, idx) => (
          <SidebarMenu
            key={menu.label}
            label={menu.label}
            icon={menu.icon}
            to={menu.to}
            submenus={menu.submenus}
            expanded={expandedIndex === idx}
            onToggle={() =>
              setExpandedIndex(expandedIndex === idx ? null : idx)
            }
            isActive={activeIndex === idx}
          />
        ))}
      </nav>
      {/* Upgrade Box */}
      <div className="mt-8 px-4">
        <div className="bg-gradient-to-br from-[#7B2FF2] to-[#F357A8] rounded-xl p-3 flex flex-col items-center text-white shadow-lg">
          <span className="font-semibold text-sm mb-2 text-center">
            Upgrade to Pro
            <br />
            for more Features
          </span>
          <button className="mt-2 bg-white text-[#7B2FF2] font-bold rounded-lg px-6 py-2 shadow hover:bg-gray-100 transition text-md">
            Upgrade
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
