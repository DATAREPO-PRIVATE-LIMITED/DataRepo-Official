import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Users,
  Settings,
  LogOut,
  Database,
  BarChart3,
  FileText,
  Shield,
  Calendar,
  Mail,
  Phone,
  CreditCard,
  Key,
  Activity,
  Receipt,
  TrendingUp,
  DollarSign,
  Eye,
  Download,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  UserPlus,
  Server,
  Zap,
  AlertTriangle,
  CheckCircle,
  Clock,
  Globe,
  Cpu,
  HardDrive,
  Network,
  Upload,
} from "lucide-react";

import { getDashboardStats, getEnquiryData, getAllUsers, getServicesStatus, getBillingData, getAnalyticsData, updateUserStatus, deleteUser, adminCreateUser, adminUpdateUser } from "../utils/adminApi";

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [isSavingUser, setIsSavingUser] = useState(false);

  const [dashboardStats, setDashboardStats] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [enquiryDataList, setEnquiryDataList] = useState([]);
  const [users, setUsers] = useState([]);
  const [services, setServices] = useState([]);
  const [billingRows, setBillingRows] = useState([]);

  useEffect(() => {
    const fetchEnquiryList = async () => {
      try {
        let response = await getEnquiryData();
        setEnquiryDataList(response.data || []);
      } catch (error) {
        console.error("Error fetching enquiry listy:", error);
      }
    };

    fetchEnquiryList();
  }, []);

  console.log("enquiry list ", enquiryDataList);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [statsResp, usersResp, servicesResp, billingResp, analyticsResp] = await Promise.all([
          getDashboardStats(),
          getAllUsers(),
          getServicesStatus(),
          getBillingData(),
          getAnalyticsData(),
        ]);

        setDashboardStats(statsResp?.data?.data || statsResp?.data || statsResp);
        setUsers(usersResp?.data?.data || usersResp?.data || usersResp || []);
        setServices(servicesResp?.data?.data || servicesResp?.data || servicesResp || []);
        const billingData = billingResp?.data?.data?.billingData || billingResp?.data?.billingData || [];
        setBillingRows(billingData);
        setAnalytics(analyticsResp?.data?.data || analyticsResp?.data || analyticsResp);
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    };

    fetchAll();
  }, []);

  // Mock data for admin dashboard
  const mockStats = {
    totalUsers: 1247,
    activeUsers: 892,
    totalRevenue: 45678.9,
    monthlyGrowth: 12.5,
    apiCalls: 1250000,
    activeServices: 8,
    systemHealth: 99.8,
    pendingIssues: 3,
  };

  const mockUsers = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "user",
      status: "active",
      createdAt: "2024-01-15",
      lastLogin: "2024-02-10",
      apiCalls: 5000,
      billing: 50.0,
      services: ["Data API", "Analytics API"],
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "user",
      status: "active",
      createdAt: "2024-01-20",
      lastLogin: "2024-02-09",
      apiCalls: 3200,
      billing: 32.0,
      services: ["Data API"],
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      role: "user",
      status: "suspended",
      createdAt: "2024-01-10",
      lastLogin: "2024-02-05",
      apiCalls: 15000,
      billing: 150.0,
      services: ["Data API", "Analytics API", "ML API"],
    },
  ];

  const mockServices = [
    {
      id: 1,
      name: "Data API",
      status: "healthy",
      uptime: 99.9,
      responseTime: 120,
      requests: 450000,
      errors: 0.1,
    },
    {
      id: 2,
      name: "Analytics API",
      status: "healthy",
      uptime: 99.8,
      responseTime: 200,
      requests: 320000,
      errors: 0.2,
    },
    {
      id: 3,
      name: "ML API",
      status: "warning",
      uptime: 98.5,
      responseTime: 500,
      requests: 180000,
      errors: 1.5,
    },
  ];

  const mockBillingData = [
    {
      id: 1,
      userId: 1,
      userName: "John Doe",
      email: "john@example.com",
      amount: 50.0,
      status: "paid",
      date: "2024-02-01",
      description: "API Usage - January 2024",
    },
    {
      id: 2,
      userId: 2,
      userName: "Jane Smith",
      email: "jane@example.com",
      amount: 32.0,
      status: "paid",
      date: "2024-02-01",
      description: "API Usage - January 2024",
    },
    {
      id: 3,
      userId: 3,
      userName: "Bob Johnson",
      email: "bob@example.com",
      amount: 150.0,
      status: "pending",
      date: "2024-02-01",
      description: "API Usage - January 2024",
    },
  ];

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      navigate("/");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "default";
      case "suspended":
        return "destructive";
      case "healthy":
        return "default";
      case "warning":
        return "secondary";
      case "error":
        return "destructive";
      case "paid":
        return "default";
      case "pending":
        return "secondary";
      default:
        return "secondary";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
      case "healthy":
      case "paid":
        return <CheckCircle className="w-4 h-4" />;
      case "suspended":
      case "error":
        return <AlertTriangle className="w-4 h-4" />;
      case "warning":
      case "pending":
        return <Clock className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const filteredUsers = (users.length ? users : mockUsers).filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "users", label: "Users", icon: Users },
    { id: "services", label: "Services", icon: Server },
    { id: "billing", label: "Billing", icon: DollarSign },
    { id: "analytics", label: "Analytics", icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground mt-12 ">
      {/* Header */}
      {/* <div className="border-b bg-card  w-full sm:w-[90%] md:w-[85%] lg:w-[80%] mx-auto rounded-xl">
        <div className=" container  mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <p className="text-sm text-muted-foreground">
                  Manage your platform
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2"></div>
          </div>
        </div>
      </div> */}

      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8 bg-muted/30 rounded-lg p-1 overflow-x-auto whitespace-nowrap scrollbar-thin -mx-2 px-2 sm:mx-0 sm:px-0 snap-x snap-mandatory">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-2 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors flex-shrink-0 snap-start ${
                  activeTab === tab.id
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Total Users
                      </p>
                      <p className="text-2xl font-bold">
                        {(dashboardStats?.users?.total ?? mockStats.totalUsers).toLocaleString()}
                      </p>
                      <p className="text-xs text-green-600">
                        +{mockStats.monthlyGrowth}% this month
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Total Revenue
                      </p>
                      <p className="text-2xl font-bold">
                        ${(dashboardStats?.revenue?.total ?? mockStats.totalRevenue).toLocaleString()}
                      </p>
                      <p className="text-xs text-green-600">+8.2% this month</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Activity className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">API Calls</p>
                      <p className="text-2xl font-bold">
                        {(dashboardStats?.apiUsage?.monthlyCalls ?? mockStats.apiCalls).toLocaleString()}
                      </p>
                      <p className="text-xs text-green-600">
                        +15.3% this month
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Server className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        System Health
                      </p>
                      <p className="text-2xl font-bold">
                        {(dashboardStats?.system?.systemHealth ?? mockStats.systemHealth)}%
                      </p>
                      <p className="text-xs text-green-600">
                        All systems operational
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Enquiry List</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 h-90 overflow-scroll">
                  {enquiryDataList &&
                    enquiryDataList.map((val) => {
                      return (
                        <div className="border rounded mt-2  ">
                          <div
                            key={val._id}
                            className="flex justify-between mb-3  px-3 py-2"
                          >
                            <h3 >
                              {val.name}
                            </h3>
                            <p>{val.email}</p>
                            <p>{val.mobile}</p>
                          </div>
                          <div className="p-3 mb-2">
                            <p>{val.message}</p>
                          </div>
                        </div>
                      );
                    })}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {(services.length ? services : mockServices).map((service) => (
                      <div
                        key={service.id}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              service.status === "healthy"
                                ? "bg-green-500"
                                : service.status === "warning"
                                ? "bg-yellow-500"
                                : "bg-red-500"
                            }`}
                          />
                          <span className="font-medium">{service.name}</span>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">
                            {service.uptime}% uptime
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {service.responseTime}ms avg
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between flex-col sm:flex-row gap-3">
              <div className="flex items-center space-x-4 w-full sm:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full sm:w-80"
                  />
                </div>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <Button onClick={() => { setSelectedUser({ name: '', email: '', role: 'user', status: 'active' }); setShowUserModal(true); }}>
                  <UserPlus className="w-4 h-4 mr-2" />
                  New User
                </Button>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium">
                          User
                        </th>
                        <th className="text-left py-3 px-4 font-medium">
                          Status
                        </th>
                        <th className="text-left py-3 px-4 font-medium">
                          API Calls
                        </th>
                        <th className="text-left py-3 px-4 font-medium">
                          Billing
                        </th>
                        <th className="text-left py-3 px-4 font-medium hidden md:table-cell">
                          Services
                        </th>
                        <th className="text-left py-3 px-4 font-medium hidden md:table-cell">
                          Last Login
                        </th>
                        <th className="text-left py-3 px-4 font-medium">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user) => (
                        <tr
                          key={user.id}
                          className="border-b hover:bg-muted/30"
                        >
                          <td className="py-3 px-4">
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {user.email}
                              </p>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <Badge variant={getStatusColor(user.status)}>
                              {getStatusIcon(user.status)}
                              <span className="ml-1">{user.status}</span>
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <p className="font-medium">
                              {user.apiCalls.toLocaleString()}
                            </p>
                          </td>
                          <td className="py-3 px-4">
                            <p className="font-medium">${user.billing}</p>
                          </td>
                          <td className="py-3 px-4 hidden md:table-cell">
                            <div className="flex flex-wrap gap-1">
                              {user.services.map((service, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {service}
                                </Badge>
                              ))}
                            </div>
                          </td>
                          <td className="py-3 px-4 hidden md:table-cell">
                            <p className="text-sm text-muted-foreground">
                              {new Date(user.lastLogin).toLocaleDateString()}
                            </p>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-2">
                              <Button variant="outline" size="sm" onClick={() => { setSelectedUser(user); setShowUserModal(true); }}>
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={async () => {
                                  try {
                                    const next = user.status === 'active' ? 'suspended' : 'active';
                                    await updateUserStatus(user._id || user.id, next);
                                    const refreshed = await getAllUsers();
                                    setUsers(refreshed?.data?.data || refreshed?.data || refreshed || []);
                                  } catch (e) { console.error('status change failed', e); }
                                }}
                              >
                                <Shield className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={async () => {
                                  try {
                                    await deleteUser(user._id || user.id);
                                    const refreshed = await getAllUsers();
                                    setUsers(refreshed?.data?.data || refreshed?.data || refreshed || []);
                                  } catch (e) { console.error('delete failed', e); }
                                }}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Services Tab */}
        {activeTab === "services" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Live Services Monitoring</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(services.length ? services : mockServices).map((service) => (
                    <Card key={service.id} className="border-2">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">
                            {service.name}
                          </CardTitle>
                          <Badge variant={getStatusColor(service.status)}>
                            {getStatusIcon(service.status)}
                            <span className="ml-1">{service.status}</span>
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center">
                            <p className="text-2xl font-bold text-green-600">
                              {service.uptime}%
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Uptime
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold">
                              {service.responseTime}ms
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Avg Response
                            </p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Total Requests:</span>
                            <span className="font-medium">
                              {service.requests?.toLocaleString?.() || 0}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Error Rate:</span>
                            <span className="font-medium">
                              {service.errors}%
                            </span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                          >
                            <Activity className="w-4 h-4 mr-1" />
                            Monitor
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                          >
                            <Settings className="w-4 h-4 mr-1" />
                            Configure
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Billing Tab */}
        {activeTab === "billing" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Billing Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium">
                          User
                        </th>
                        <th className="text-left py-3 px-4 font-medium">
                          Amount
                        </th>
                        <th className="text-left py-3 px-4 font-medium">
                          Status
                        </th>
                        <th className="text-left py-3 px-4 font-medium">
                          Date
                        </th>
                        <th className="text-left py-3 px-4 font-medium hidden md:table-cell">
                          Description
                        </th>
                        <th className="text-left py-3 px-4 font-medium">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {(billingRows.length ? billingRows : mockBillingData).map((billing) => (
                        <tr
                          key={billing.id}
                          className="border-b hover:bg-muted/30"
                        >
                          <td className="py-3 px-4">
                            <div>
                              <p className="font-medium">{billing.userName}</p>
                              <p className="text-sm text-muted-foreground">
                                {billing.email}
                              </p>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <p className="font-medium">${billing.amount}</p>
                          </td>
                          <td className="py-3 px-4">
                            <Badge variant={getStatusColor(billing.status)}>
                              {getStatusIcon(billing.status)}
                              <span className="ml-1">{billing.status}</span>
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <p className="text-sm text-muted-foreground">
                              {new Date(billing.date).toLocaleDateString()}
                            </p>
                          </td>
                          <td className="py-3 px-4 hidden md:table-cell">
                            <p className="text-sm">{billing.description}</p>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-2">
                              <Button variant="outline" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Download className="w-4 h-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>API Usage Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Total API Calls
                      </span>
                      <span className="font-bold">
                        {(analytics?.apiUsage?.totalCalls ?? mockStats.apiCalls).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Average Response Time
                      </span>
                      <span className="font-bold">{analytics?.apiUsage?.averageResponseTime ?? 245}ms</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Success Rate
                      </span>
                      <span className="font-bold">{analytics?.apiUsage?.successRate ?? 99.2}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Peak Usage
                      </span>
                      <span className="font-bold">{analytics?.apiUsage?.peakUsage ?? 2500} req/min</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenue Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Monthly Revenue
                      </span>
                      <span className="font-bold">
                        ${(analytics?.revenue?.monthly ?? mockStats.totalRevenue).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Growth Rate
                      </span>
                      <span className="font-bold text-green-600">
                        +{(analytics?.revenue?.growthRate ?? mockStats.monthlyGrowth)}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Active Subscriptions
                      </span>
                      <span className="font-bold">{analytics?.userActivity?.activeUsers ?? dashboardStats?.users?.active ?? mockStats.activeUsers}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Average Revenue per User
                      </span>
                      <span className="font-bold">${analytics?.revenue?.averagePerUser ?? 36.50}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>System Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Cpu className="w-8 h-8 text-green-600" />
                    </div>
                    <p className="font-bold text-lg">99.8%</p>
                    <p className="text-sm text-muted-foreground">CPU Usage</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <HardDrive className="w-8 h-8 text-blue-600" />
                    </div>
                    <p className="font-bold text-lg">67%</p>
                    <p className="text-sm text-muted-foreground">
                      Storage Usage
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Network className="w-8 h-8 text-purple-600" />
                    </div>
                    <p className="font-bold text-lg">2.1 GB/s</p>
                    <p className="text-sm text-muted-foreground">
                      Network Traffic
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Zap className="w-8 h-8 text-orange-600" />
                    </div>
                    <p className="font-bold text-lg">245ms</p>
                    <p className="text-sm text-muted-foreground">
                      Avg Response Time
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
      {showUserModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">{selectedUser?._id || selectedUser?.id ? 'Edit User' : 'Create User'}</h2>
              <Button variant="ghost" size="sm" onClick={() => setShowUserModal(false)} className="h-8 w-8 p-0">
                ×
              </Button>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input value={selectedUser?.name || ''} onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input value={selectedUser?.email || ''} onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <Input value={selectedUser?.role || 'user'} onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })} />
              </div>
              {!(selectedUser?._id || selectedUser?.id) && (
                <div className="space-y-2">
                  <Label>Password</Label>
                  <Input type="password" value={selectedUser?.password || ''} onChange={(e) => setSelectedUser({ ...selectedUser, password: e.target.value })} />
                </div>
              )}
              <div className="flex space-x-3 pt-2">
                <Button variant="outline" className="flex-1" onClick={() => setShowUserModal(false)}>Cancel</Button>
                <Button className="flex-1" disabled={isSavingUser} onClick={async () => {
                  try {
                    setIsSavingUser(true);
                    if (selectedUser?._id || selectedUser?.id) {
                      await adminUpdateUser(selectedUser._id || selectedUser.id, { name: selectedUser.name, email: selectedUser.email, role: selectedUser.role, status: selectedUser.status });
                    } else {
                      await adminCreateUser({ name: selectedUser.name, email: selectedUser.email, password: selectedUser.password, role: selectedUser.role, status: selectedUser.status || 'active' });
                    }
                    const refreshed = await getAllUsers();
                    setUsers(refreshed?.data?.data || refreshed?.data || refreshed || []);
                    setShowUserModal(false);
                  } catch (e) {
                    console.error('save user failed', e);
                  } finally {
                    setIsSavingUser(false);
                  }
                }}>{isSavingUser ? 'Saving...' : 'Save'}</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
