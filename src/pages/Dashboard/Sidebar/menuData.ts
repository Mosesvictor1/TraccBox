// Sidebar menu and submenu structure for TraccBox dashboard
// Icons are referenced by name and imported in Sidebar.tsx or icons.tsx

export interface SidebarSubmenu {
  label: string;
  to: string;
}

export interface SidebarMenuConfig {
  label: string;
  icon: string; // Icon name, e.g., 'BarChart', 'Users', etc.
  to?: string; // For direct links (like Dashboard)
  submenus?: SidebarSubmenu[];
}

export const sidebarMenus: SidebarMenuConfig[] = [
  {
    label: "Dashboard",
    icon: "BarChart",
    to: "/dashboard",
  },
  {
    label: "Field Sales Reps",
    icon: "Users",
    submenus: [
      { label: "Manage Reps", to: "/dashboard/field-reps/manage" },
      { label: "GPS Logs", to: "/dashboard/field-reps/gps-logs" },
      { label: "Attendance Reports", to: "/dashboard/field-reps/attendance" },
      { label: "Task Assignment", to: "/dashboard/field-reps/tasks" },
    ],
  },
  {
    label: "Sales & Performance",
    icon: "LineChart",
    submenus: [
      { label: "Sales Analytics", to: "/dashboard/sales/analytics" },
      { label: "AI Insights", to: "/dashboard/sales/ai-insights" },
      { label: "Leader-boards", to: "/dashboard/sales/leaderboards" },
    ],
  },
  {
    label: "Order & MOQ Intelligence",
    icon: "Package",
    submenus: [
      { label: "Order Logs", to: "/dashboard/order/logs" },
      { label: "AI MOQ Suggestions", to: "/dashboard/order/ai-moq" },
      { label: "Leader-boards", to: "/dashboard/order/leaderboards" },
    ],
  },
  {
    label: "Organic & Inorganic Sales",
    icon: "CircleDot",
    submenus: [
      { label: "Organic Traffic", to: "/dashboard/organic/traffic" },
      { label: "Inorganic Channels", to: "/dashboard/organic/channels" },
      { label: "Attribution Reports", to: "/dashboard/organic/attribution" },
    ],
  },
  {
    label: "Report & Export",
    icon: "FileText",
    submenus: [
      { label: "Auto Reports", to: "/dashboard/report/auto-reports" },
      {
        label: "Inorganic Channels",
        to: "/dashboard/report/inorganic-channels",
      },
      { label: "Export Options", to: "/dashboard/report/export-options" },
    ],
  },
  {
    label: "Subscription & Billing",
    icon: "CreditCard",
    submenus: [
      { label: "Current Plan Info", to: "/dashboard/billing/plan-info" },
      { label: "Usage Stats", to: "/dashboard/billing/usage-stats" },
      { label: "Invoices & Payment Logs", to: "/dashboard/billing/invoices" },
    ],
  },
  {
    label: "Settings & Integrations",
    icon: "Settings",
    submenus: [
      { label: "General Settings", to: "/dashboard/settings/general" },
      { label: "Integrations", to: "/dashboard/settings/integrations" },
      { label: "User Roles & Permissions", to: "/dashboard/settings/roles" },
      { label: "Team", to: "/dashboard/settings/team" },
    ],
  },
];
