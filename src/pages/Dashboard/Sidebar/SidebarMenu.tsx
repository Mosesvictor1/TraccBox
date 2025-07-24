import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import * as LucideIcons from "lucide-react";
import { SidebarSubmenu } from "./menuData";

interface SidebarMenuProps {
  label: string;
  icon: string;
  to?: string;
  submenus?: SidebarSubmenu[];
  expanded: boolean;
  onToggle: () => void;
  isActive: boolean;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({
  label,
  icon,
  to,
  submenus = [],
  expanded,
  onToggle,
  isActive,
}) => {
  const location = useLocation();
  const LucideIcon = (LucideIcons)[icon] || LucideIcons["Circle"];

  // If no submenus, render as a direct link
  if (!submenus.length && to) {
    return (
      <NavLink
        to={to}
        className={({ isActive: navActive }) =>
          `flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors font-medium text-base ${
            navActive || isActive
              ? "bg-[#1658E5] text-white shadow"
              : "text-gray-700 hover:bg-gray-100"
          }`
        }
      >
        <LucideIcon className="w-5 h-5" />
        {label}
      </NavLink>
    );
  }

  // With submenus, render collapsible
  return (
    <div className="mb-2 hide-scrollbar">
      <button
        type="button"
        onClick={onToggle}
        className={`flex items-center w-full gap-3 px-4 py-3 rounded-lg transition-colors font-medium text-base focus:outline-none ${
          expanded || isActive
            ? "bg-blue-50 text-[#1658E5]"
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        <LucideIcon className="w-5 h-5" />
        <span className="flex-1 text-left text-xs">{label}</span>
        <LucideIcons.ChevronDown
          className={`w-4 h-4 ml-auto transition-transform ${
            expanded ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>
      {expanded && (
        <div className="pl-10 py-2 bg-white">
          {submenus.map((submenu) => (
            <NavLink
              key={submenu.to}
              to={submenu.to}
              className={({ isActive: navActive }) =>
                `block py-1.5 text-xs rounded transition-colors mb-1 ${
                  navActive
                    ? "text-[#1658E5] font-semibold bg-blue-50"
                    : "text-gray-700 hover:text-[#1658E5] hover:bg-blue-50"
                }`
              }
            >
              {submenu.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
};

export default SidebarMenu;
