import React from "react";
import { Search, Plus, MoreVertical, Clock } from "lucide-react";

const TeamManagement = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Victor Moses",
      email: "victormoses2b@gmail.com",
      role: "Admin",
      department: "Management",
      isActive: true,
      has2FA: true,
      lastLogin: "2 hours ago",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 2,
      name: "Vicky Jen",
      email: "victormoses2b@gmail.com",
      role: "Manager",
      department: "Sales",
      isActive: true,
      has2FA: true,
      lastLogin: "1 day ago",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 3,
      name: "Victor Moses",
      email: "victormoses2b@gmail.com",
      role: "Sales",
      department: "Sales",
      isActive: true,
      has2FA: true,
      lastLogin: "2 hours ago",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 4,
      name: "Victor Moses",
      email: "victormoses2b@gmail.com",
      role: "View only",
      department: "Support",
      isActive: true,
      has2FA: true,
      lastLogin: "2 hours ago",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 5,
      name: "Victor Moses",
      email: "victormoses2b@gmail.com",
      role: "Admin",
      department: "Management",
      isActive: true,
      has2FA: true,
      lastLogin: "2 hours ago",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 6,
      name: "Vicky Jen",
      email: "victormoses2b@gmail.com",
      role: "Manager",
      department: "Sales",
      isActive: true,
      has2FA: true,
      lastLogin: "1 day ago",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 7,
      name: "Victor Moses",
      email: "victormoses2b@gmail.com",
      role: "Sales",
      department: "Sales",
      isActive: true,
      has2FA: true,
      lastLogin: "2 hours ago",
      avatar:
        "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 8,
      name: "Victor Moses",
      email: "victormoses2b@gmail.com",
      role: "View only",
      department: "Support",
      isActive: true,
      has2FA: true,
      lastLogin: "2 hours ago",
      avatar:
        "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face",
    },
  ];

  const stats = {
    totalMembers: 4,
    activeMembers: 3,
    inactiveMembers: 1,
    twoFAEnabled: 3,
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Hello <span className="text-purple-600">Admin</span>!
              </h1>
              <p className="text-gray-600 mt-1">
                Manage and view all your team members here.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by name, email, or domain"
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none w-full sm:w-64 "
                />
              </div>
              <button className=" hover:bg-purple-700 bg-black text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors">
                <Plus className="w-4 h-4" />
                Add Staff
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">
                    {stats.totalMembers}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Members</p>
                <p className="text-xl font-bold text-gray-900">
                  {stats.totalMembers}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div>
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-xl font-bold text-gray-900">
                  {stats.activeMembers}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              </div>
              <div>
                <p className="text-sm text-gray-600">Inactive</p>
                <p className="text-xl font-bold text-gray-900">
                  {stats.inactiveMembers}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              </div>
              <div>
                <p className="text-sm text-gray-600">2FA Enabled</p>
                <p className="text-xl font-bold text-gray-900">
                  {stats.twoFAEnabled}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow relative"
            >
              {/* Card Header */}
              <div className="flex justify-center items-start mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button className="text-gray-400 hover:text-gray-600 transition-colors absolute top-4 right-4">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>

              {/* Member Info */}
              <div className="mb-4 flex items-center flex-col">
                <h3 className="font-semibold text-gray-900 text-base mb-1">
                  {member.name}
                </h3>
                <p className="text-sm text-gray-600 mb-2">{member.email}</p>
                <div className="flex items-center gap-2 mb-2 bg-black text-white py-1 rounded-full w-full justify-center ">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-blue-800">
                    {member.role}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{member.department}</p>
              </div>

              {/* Status Indicators */}
              <div className="flex items-center justify-between mb-3 border-b pb-2 border-red-400">
                <div className="flex items-center justify-between w-full gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-green-600 font-medium">
                      Active
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-xs text-purple-600 font-medium">
                      2FA
                    </span>
                  </div>
                </div>
              </div>

              {/* Last Login */}
              <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
                <span>Last login: {member.lastLogin}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamManagement;
