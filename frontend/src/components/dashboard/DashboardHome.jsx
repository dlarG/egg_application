import React, { useState } from "react";
import {
  Egg,
  Package,
  DollarSign,
  Users,
  TrendingUp,
  TrendingDown,
  Download,
  RefreshCw,
  Calendar,
  ShoppingCart,
  Receipt,
  BarChart3,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  Coins,
  ClipboardList,
  Plus,
  ChevronRight,
  Settings,
  Bell,
  Search,
  Filter,
  CreditCard,
  Landmark,
  Truck,
  Wheat,
  Zap,
  Clock,
  CheckCircle2,
  AlertCircle,
  MoreHorizontal,
  Eye,
  EyeOff,
  Printer,
  FileText,
  Home,
  LogOut,
  User,
  Menu,
  X,
} from "lucide-react";

const DashboardHome = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("weekly");
  const [showBalance, setShowBalance] = useState(true);

  // Real egg business metrics
  const stats = [
    {
      name: "Today's Egg Collection",
      value: "1,248",
      subtitle: "eggs",
      change: "+124",
      changeType: "increase",
      icon: Egg,
      color: "text-[#A0D585]",
      bgColor: "bg-[#EEFABD]",
      periodChange: "vs yesterday",
    },
    {
      name: "Total Inventory",
      value: "8,547",
      subtitle: "eggs",
      change: "-342",
      changeType: "decrease",
      icon: Package,
      color: "text-[#6984A9]",
      bgColor: "bg-[#6984A9]/10",
      periodChange: "vs yesterday",
    },
    {
      name: "Today's Sales",
      value: "₱5,280",
      subtitle: "revenue",
      change: "+15.2%",
      changeType: "increase",
      icon: DollarSign,
      color: "text-[#A0D585]",
      bgColor: "bg-[#EEFABD]",
      periodChange: "vs yesterday",
    },
    {
      name: "Active Customers",
      value: "48",
      subtitle: "this week",
      change: "+8",
      changeType: "increase",
      icon: Users,
      color: "text-[#263B6A]",
      bgColor: "bg-[#263B6A]/10",
      periodChange: "vs last week",
    },
  ];

  // Egg size breakdown
  const eggInventory = [
    { size: "Jumbo", count: 1240, price: 10, color: "#A0D585", icon: Egg },
    { size: "XL", count: 2150, price: 9, color: "#6984A9", icon: Egg },
    { size: "Large", count: 1840, price: 8, color: "#EEFABD", icon: Egg },
    { size: "Medium", count: 1560, price: 7, color: "#263B6A", icon: Egg },
    { size: "Small", count: 987, price: 6, color: "#A0D585", icon: Egg },
    { size: "XS", count: 770, price: 5, color: "#6984A9", icon: Egg },
  ];

  // Recent transactions
  const recentTransactions = [
    {
      customer: "Sunrise Cafe",
      items: "Large Eggs (2 trays)",
      amount: "₱480",
      time: "10 min ago",
      type: "sale",
      status: "completed",
      icon: ShoppingCart,
    },
    {
      customer: "Maria's Bakery",
      items: "Medium Eggs (1 tray)",
      amount: "₱210",
      time: "25 min ago",
      type: "sale",
      status: "completed",
      icon: ShoppingCart,
    },
    {
      customer: "Expense - Chicken Feed",
      items: "20 bags",
      amount: "-₱2,500",
      time: "2 hours ago",
      type: "expense",
      status: "recorded",
      icon: Wheat,
    },
    {
      customer: "Reyes Family",
      items: "Jumbo Eggs (15 pcs)",
      amount: "₱150",
      time: "3 hours ago",
      type: "sale",
      status: "completed",
      icon: ShoppingCart,
    },
    {
      customer: "Electric Bill",
      items: "Monthly utilities",
      amount: "-₱1,200",
      time: "5 hours ago",
      type: "expense",
      status: "pending",
      icon: Zap,
    },
  ];

  // Weekly sales data
  const weeklySales = [
    { day: "Mon", amount: 1250 },
    { day: "Tue", amount: 1480 },
    { day: "Wed", amount: 1620 },
    { day: "Thu", amount: 1580 },
    { day: "Fri", amount: 1890 },
    { day: "Sat", amount: 2100 },
    { day: "Sun", amount: 980 },
  ];

  const maxSale = Math.max(...weeklySales.map((d) => d.amount));

  // Quick actions
  const quickActions = [
    {
      label: "Record Collection",
      icon: ClipboardList,
      color: "bg-[#EEFABD]",
      iconColor: "text-[#A0D585]",
    },
    {
      label: "New Sale",
      icon: ShoppingCart,
      color: "bg-[#A0D585]",
      iconColor: "text-white",
    },
    {
      label: "Add Expense",
      icon: Receipt,
      color: "bg-[#6984A9]/10",
      iconColor: "text-[#6984A9]",
    },
    {
      label: "View Reports",
      icon: BarChart3,
      color: "bg-[#263B6A]/10",
      iconColor: "text-[#263B6A]",
    },
    {
      label: "Check Inventory",
      icon: Package,
      color: "bg-[#EEFABD]",
      iconColor: "text-[#A0D585]",
    },
    {
      label: "Customers",
      icon: Users,
      color: "bg-[#A0D585]/20",
      iconColor: "text-[#A0D585]",
    },
  ];

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl md:text-3xl font-bold text-[#263B6A]">
              Egg Dashboard
            </h1>
          </div>
          <p className="text-[#6984A9] mt-1 flex items-center gap-1">
            Welcome back! Here's your egg production overview for today.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Period Selector */}
          <div className="flex bg-white rounded-lg shadow-sm border border-gray-200 p-1">
            {["daily", "weekly", "monthly"].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all capitalize flex items-center gap-1 ${
                  selectedPeriod === period
                    ? "bg-[#A0D585] text-white"
                    : "text-gray-600 hover:text-[#A0D585]"
                }`}
              >
                <Calendar className="h-3 w-3" />
                {period}
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <button className="cursor-pointer p-2 text-gray-600 hover:text-[#A0D585] bg-white rounded-lg border border-gray-200 hover:border-[#A0D585] transition-all">
            <RefreshCw className="h-5 w-5" />
          </button>

          <button className="cursor-pointer hidden md:flex items-center px-4 py-2 bg-[#A0D585] text-white rounded-lg hover:bg-[#90c575] transition-all shadow-sm hover:shadow">
            <Download className="h-5 w-5 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const isIncrease = stat.changeType === "increase";

          return (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all hover:-translate-y-1 duration-300 group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {stat.name}
                  </p>
                  <div className="flex items-baseline gap-1">
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                    <span className="text-sm text-gray-500">
                      {stat.subtitle}
                    </span>
                  </div>
                  <div className="flex items-center mt-3">
                    <div
                      className={`flex items-center ${
                        isIncrease ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {isIncrease ? (
                        <ArrowUpRight className="h-4 w-4" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4" />
                      )}
                      <span className="text-sm font-medium">{stat.change}</span>
                    </div>
                    <span className="text-xs text-gray-500 ml-2">
                      {stat.periodChange}
                    </span>
                  </div>
                </div>
                <div
                  className={`p-3 rounded-xl ${stat.bgColor} group-hover:scale-110 transition-transform`}
                >
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts and Tables Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - 2/3 width on large screens */}
        <div className="lg:col-span-2 space-y-6">
          {/* Sales Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-[#A0D585]" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Weekly Sales Overview
                  </h3>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Total sales this week:{" "}
                  <span className="font-semibold text-[#A0D585]">₱10,900</span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                <span className="text-sm font-medium text-green-600">
                  +12.3%
                </span>
              </div>
            </div>

            {/* Bar Chart */}
            <div className="h-48 flex items-end justify-between gap-2">
              {weeklySales.map((day, index) => (
                <div
                  key={index}
                  className="flex-1 flex flex-col items-center group"
                >
                  <div className="w-full relative">
                    <div
                      className="bg-[#A0D585] rounded-t-lg transition-all duration-300 group-hover:bg-[#90c575] cursor-pointer"
                      style={{
                        height: `${(day.amount / maxSale) * 150}px`,
                        minHeight: "20px",
                      }}
                    >
                      <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap z-10">
                        ₱{day.amount}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-gray-600 mt-2">{day.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Egg Inventory Breakdown */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5 text-[#A0D585]" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Egg Inventory by Size
                </h3>
              </div>
              <button className="text-sm text-[#6984A9] hover:text-[#263B6A] flex items-center gap-1">
                View All <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-4">
              {eggInventory.map((egg, index) => {
                const Icon = egg.icon;
                return (
                  <div key={index} className="flex items-center gap-4 group">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${egg.color}20` }}
                    >
                      <Icon className="h-4 w-4" style={{ color: egg.color }} />
                    </div>
                    <div
                      className="w-16 text-sm font-medium"
                      style={{ color: egg.color }}
                    >
                      {egg.size}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-600">
                          {egg.count.toLocaleString()} eggs
                        </span>
                        <span className="text-sm font-medium text-[#A0D585]">
                          ₱{egg.price}/pc
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-2 rounded-full transition-all duration-300 group-hover:scale-x-105 origin-left"
                          style={{
                            width: `${(egg.count / 2500) * 100}%`,
                            backgroundColor: egg.color,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-[#A0D585]" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Recent Activities
                </h3>
              </div>
              <div className="flex gap-2">
                <button className="p-1 hover:bg-gray-100 rounded">
                  <Filter className="h-4 w-4 text-gray-500" />
                </button>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <MoreHorizontal className="h-4 w-4 text-gray-500" />
                </button>
              </div>
            </div>
            <div className="space-y-4">
              {recentTransactions.map((transaction, index) => {
                const Icon = transaction.icon;
                return (
                  <div
                    key={index}
                    className="flex items-start gap-3 group hover:bg-gray-50 p-2 rounded-lg transition-all"
                  >
                    <div
                      className={`p-2 rounded-lg ${
                        transaction.type === "sale"
                          ? "bg-[#EEFABD]"
                          : "bg-red-100"
                      }`}
                    >
                      <Icon
                        className={`h-4 w-4 ${
                          transaction.type === "sale"
                            ? "text-[#A0D585]"
                            : "text-red-500"
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">
                          {transaction.customer}
                        </p>
                        <span
                          className={`text-sm font-semibold ${
                            transaction.type === "sale"
                              ? "text-[#A0D585]"
                              : "text-red-500"
                          }`}
                        >
                          {transaction.amount}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {transaction.items}
                      </p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {transaction.time}
                        </span>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 ${
                            transaction.status === "completed"
                              ? "bg-green-100 text-green-700"
                              : transaction.status === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {transaction.status === "completed" && (
                            <CheckCircle2 className="h-3 w-3" />
                          )}
                          {transaction.status === "pending" && (
                            <AlertCircle className="h-3 w-3" />
                          )}
                          {transaction.status}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <button className="w-full mt-4 text-sm text-[#6984A9] hover:text-[#263B6A] font-medium text-center transition-colors flex items-center justify-center gap-1">
              View All Transactions <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Right Column - 1/3 width */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="h-5 w-5 text-[#A0D585]" />
              <h3 className="text-lg font-semibold text-gray-900">
                Quick Actions
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <button
                    key={index}
                    className={`p-4 rounded-xl ${action.color} hover:shadow-md transition-all hover:-translate-y-1 duration-300 flex flex-col items-center gap-2 group`}
                  >
                    <Icon
                      className={`h-6 w-6 ${action.iconColor} group-hover:scale-110 transition-transform`}
                    />
                    <span className="text-xs font-medium text-[#263B6A] text-center">
                      {action.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Today's Summary */}
          <div className="bg-gradient-to-br from-[#A0D585] to-[#263B6A] p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Wallet className="h-5 w-5 text-white" />
                <h3 className="text-lg font-semibold text-white">
                  Today's Summary
                </h3>
              </div>
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="text-white/80 hover:text-white"
              >
                {showBalance ? (
                  <Eye className="h-4 w-4" />
                ) : (
                  <EyeOff className="h-4 w-4" />
                )}
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-white">
                <span className="opacity-90 flex items-center gap-1">
                  <Egg className="h-3 w-3" /> Collections
                </span>
                <span className="font-semibold">
                  {showBalance ? "1,248 eggs" : "••••"}
                </span>
              </div>

              <div className="flex justify-between text-white">
                <span className="opacity-90 flex items-center gap-1">
                  <DollarSign className="h-3 w-3" /> Sales
                </span>
                <span className="font-semibold">
                  {showBalance ? "₱5,280" : "••••"}
                </span>
              </div>

              <div className="flex justify-between text-white">
                <span className="opacity-90 flex items-center gap-1">
                  <Receipt className="h-3 w-3" /> Expenses
                </span>
                <span className="font-semibold">
                  {showBalance ? "₱2,500" : "••••"}
                </span>
              </div>

              <div className="border-t border-white/20 my-2 pt-2">
                <div className="flex justify-between text-white">
                  <span className="font-semibold flex items-center gap-1">
                    <Coins className="h-4 w-4" /> Profit
                  </span>
                  <span className="font-bold text-lg">
                    {showBalance ? "₱2,780" : "••••"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Tasks */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <ClipboardList className="h-5 w-5 text-[#A0D585]" />
              <h3 className="text-lg font-semibold text-gray-900">
                Upcoming Tasks
              </h3>
            </div>

            <div className="space-y-3">
              {[
                {
                  task: "Feed chickens",
                  time: "4:00 PM",
                  priority: "high",
                  icon: Wheat,
                },
                {
                  task: "Collect afternoon eggs",
                  time: "5:30 PM",
                  priority: "high",
                  icon: Egg,
                },
                {
                  task: "Prepare orders for tomorrow",
                  time: "6:00 PM",
                  priority: "medium",
                  icon: Package,
                },
                {
                  task: "Check inventory",
                  time: "Tomorrow 8:00 AM",
                  priority: "low",
                  icon: Eye,
                },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg"
                  >
                    <div
                      className={`p-2 rounded-lg ${
                        item.priority === "high"
                          ? "bg-red-100"
                          : item.priority === "medium"
                          ? "bg-yellow-100"
                          : "bg-green-100"
                      }`}
                    >
                      <Icon
                        className={`h-4 w-4 ${
                          item.priority === "high"
                            ? "text-red-500"
                            : item.priority === "medium"
                            ? "text-yellow-500"
                            : "text-green-500"
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {item.task}
                      </p>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {item.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Expense Categories */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <PieChart className="h-5 w-5 text-[#A0D585]" />
              <h3 className="text-lg font-semibold text-gray-900">
                Expense Breakdown
              </h3>
            </div>

            <div className="space-y-3">
              {[
                {
                  category: "Chicken Feed",
                  amount: "₱2,500",
                  percentage: 45,
                  color: "#A0D585",
                },
                {
                  category: "Electricity",
                  amount: "₱1,200",
                  percentage: 22,
                  color: "#6984A9",
                },
                {
                  category: "Labor",
                  amount: "₱1,000",
                  percentage: 18,
                  color: "#EEFABD",
                },
                {
                  category: "Transport",
                  amount: "₱850",
                  percentage: 15,
                  color: "#263B6A",
                },
              ].map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">
                      {item.category}
                    </span>
                    <span className="text-sm font-medium text-[#A0D585]">
                      {item.amount}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className="h-1.5 rounded-full"
                      style={{
                        width: `${item.percentage}%`,
                        backgroundColor: item.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
