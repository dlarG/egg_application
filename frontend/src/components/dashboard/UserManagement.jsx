import React, { useState, useEffect } from "react";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  UserIcon,
  PhoneIcon,
  CalendarIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/outline";
import { userManagementAPI } from "../../api/api";

const UserManagement = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedCard, setExpandedCard] = useState(null);
  const [userDetails, setUserDetails] = useState({});
  const [customerDetails, setCustomerDetails] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [error, setError] = useState("");

  useEffect(() => {
    if (activeTab === "users") {
      fetchUsers();
    } else {
      fetchCustomers();
    }
  }, [activeTab]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await userManagementAPI.getUsers();
      setUsers(response.data.users);
    } catch (error) {
      setError("Failed to fetch users");
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const response = await userManagementAPI.getCustomers();
      setCustomers(response.data.customers);
    } catch (error) {
      setError("Failed to fetch customers");
      console.error("Error fetching customers:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserDetails = async (userId) => {
    try {
      const response = await userManagementAPI.getUserDetails(userId);
      setUserDetails({ ...userDetails, [userId]: response.data });
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const fetchCustomerDetails = async (customerId) => {
    try {
      const response = await userManagementAPI.getCustomerDetails(customerId);
      setCustomerDetails({ ...customerDetails, [customerId]: response.data });
    } catch (error) {
      console.error("Error fetching customer details:", error);
    }
  };

  const handleCardExpand = async (id) => {
    if (expandedCard === id) {
      setExpandedCard(null);
    } else {
      setExpandedCard(id);
      if (activeTab === "users" && !userDetails[id]) {
        await fetchUserDetails(id);
      } else if (activeTab === "customers" && !customerDetails[id]) {
        await fetchCustomerDetails(id);
      }
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await userManagementAPI.deleteUser(userId);
        setUsers(users.filter((user) => user.user_id !== userId));
      } catch (error) {
        setError("Failed to delete user");
        console.error("Error deleting user:", error);
      }
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-800";
      case "staff":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatFullName = (user) => {
    const parts = [user.first_name, user.middle_name, user.last_name].filter(
      Boolean
    );
    return parts.length > 0 ? parts.join(" ") : user.username;
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      formatFullName(user).toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role_type === roleFilter;
    return matchesSearch && matchesRole;
  });

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const UserCard = ({ user }) => {
    const isExpanded = expandedCard === user.user_id;
    const details = userDetails[user.user_id];

    return (
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
        <div
          className="p-6 cursor-pointer"
          onClick={() => handleCardExpand(user.user_id)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-[#A0D585] rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-lg">
                  {(user.first_name || user.username).charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {formatFullName(user)}
                </h3>
                <p className="text-sm text-gray-500">@{user.username}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(
                      user.role_type
                    )}`}
                  >
                    {user.role_type}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle edit
                }}
                className="text-[#A0D585] hover:text-[#90c575] p-2"
              >
                <PencilIcon className="h-4 w-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteUser(user.user_id);
                }}
                className="text-red-600 hover:text-red-800 p-2"
              >
                <TrashIcon className="h-4 w-4" />
              </button>
              {isExpanded ? (
                <ChevronUpIcon className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDownIcon className="h-5 w-5 text-gray-400" />
              )}
            </div>
          </div>
        </div>

        {isExpanded && (
          <div className="border-t border-gray-200 px-6 py-4">
            {details ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">
                    Personal Information
                  </h4>

                  <div className="flex items-center space-x-3">
                    <PhoneIcon className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {details.contact_number || "No phone number"}
                    </span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <CalendarIcon className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      Born:{" "}
                      {details.birthdate
                        ? formatDate(details.birthdate)
                        : "Not specified"}
                    </span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <UserIcon className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      Joined: {formatDate(details.created_at)}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">
                    Activity Statistics
                  </h4>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {details.production_count || 0}
                      </div>
                      <div className="text-xs text-blue-600">
                        Productions Recorded
                      </div>
                    </div>

                    <div className="bg-green-50 p-3 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {details.orders_count || 0}
                      </div>
                      <div className="text-xs text-green-600">
                        Orders Created
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#A0D585]"></div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const CustomerCard = ({ customer }) => {
    const isExpanded = expandedCard === customer.customer_id;
    const details = customerDetails[customer.customer_id];

    return (
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
        <div
          className="p-6 cursor-pointer"
          onClick={() => handleCardExpand(customer.customer_id)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-lg">
                  {customer.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {customer.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {customer.contact_number || "No contact"}
                </p>
                <p className="text-xs text-gray-400">
                  Customer since {formatDate(customer.created_at)}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              {isExpanded ? (
                <ChevronUpIcon className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDownIcon className="h-5 w-5 text-gray-400" />
              )}
            </div>
          </div>
        </div>

        {isExpanded && (
          <div className="border-t border-gray-200 px-6 py-4">
            {details ? (
              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {details.total_orders}
                    </div>
                    <div className="text-sm text-blue-600">Total Orders</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-600">
                      ₱{parseFloat(details.total_spent || 0).toFixed(2)}
                    </div>
                    <div className="text-sm text-green-600">Total Spent</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      ₱
                      {details.total_orders > 0
                        ? (details.total_spent / details.total_orders).toFixed(
                            2
                          )
                        : "0.00"}
                    </div>
                    <div className="text-sm text-purple-600">
                      Avg Order Value
                    </div>
                  </div>
                </div>

                {details.recent_orders && details.recent_orders.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Recent Orders
                    </h4>
                    <div className="space-y-2">
                      {details.recent_orders.map((order) => (
                        <div
                          key={order.order_id}
                          className="flex justify-between items-center p-3 bg-gray-50 rounded"
                        >
                          <span className="text-sm font-medium">
                            Order #{order.order_id}
                          </span>
                          <span className="text-sm text-gray-600">
                            {formatDate(order.order_date)}
                          </span>
                          <span className="text-sm font-semibold text-green-600">
                            ₱{parseFloat(order.total_amount).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600">Manage system users and customers</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-[#A0D585] text-white rounded-lg hover:bg-[#90c575] transition-colors">
          <PlusIcon className="h-5 w-5 mr-2" />
          Add User
        </button>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Tabs */}
      <div className="mb-6">
        <nav className="flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => setActiveTab("users")}
            className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "users"
                ? "border-[#A0D585] text-[#A0D585]"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            System Users ({filteredUsers.length})
          </button>
          <button
            onClick={() => setActiveTab("customers")}
            className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "customers"
                ? "border-[#A0D585] text-[#A0D585]"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Customers ({filteredCustomers.length})
          </button>
        </nav>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-md">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder={
                activeTab === "users"
                  ? "Search users..."
                  : "Search customers..."
              }
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A0D585] focus:border-[#A0D585] outline-none"
            />
          </div>
          {activeTab === "users" && (
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A0D585] focus:border-[#A0D585] outline-none"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="staff">Staff</option>
            </select>
          )}
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#A0D585]"></div>
        </div>
      ) : (
        <div className="space-y-4">
          {activeTab === "users" ? (
            filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <UserCard key={user.user_id} user={user} />
              ))
            ) : (
              <div className="text-center py-12 text-gray-500">
                No users found
              </div>
            )
          ) : filteredCustomers.length > 0 ? (
            filteredCustomers.map((customer) => (
              <CustomerCard key={customer.customer_id} customer={customer} />
            ))
          ) : (
            <div className="text-center py-12 text-gray-500">
              No customers found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserManagement;
