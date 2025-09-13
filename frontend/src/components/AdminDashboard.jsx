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

import { getDashboardStats, getEnquiryData, getAllUsers, getBillingData, getAnalyticsData } from "../utils/adminApi";

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);

  const [dashboardStats, setDashboardStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [enquiryDataList, setEnquiryDataList] = useState([]);
  
  // User Management state
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [usersError, setUsersError] = useState(null);
  const [usersPagination, setUsersPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalUsers: 0,
    hasNextPage: false,
    hasPrevPage: false
  });

  // Billing state
  const [billingData, setBillingData] = useState([]);
  const [billingLoading, setBillingLoading] = useState(false);
  const [billingError, setBillingError] = useState(null);
  const [billingPagination, setBillingPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    hasNextPage: false,
    hasPrevPage: false
  });

  // Analytics state
  const [analyticsData, setAnalyticsData] = useState(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  const [analyticsError, setAnalyticsError] = useState(null);

  useEffect(() => {
    const fetchEnquiryList = async () => {
      try {
        let response = await getEnquiryData();
        setEnquiryDataList(response.data || []);
      } catch (error) {
        console.error("Error fetching enquiry list:", error);
      }
    };

    fetchEnquiryList();
  }, []);

  console.log("enquiry list ", enquiryDataList);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getDashboardStats();
        setDashboardStats(response.data);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  // Fetch users when users tab is active
  useEffect(() => {
    if (activeTab === "users") {
      const fetchUsers = async () => {
        try {
          setUsersLoading(true);
          setUsersError(null);
          const response = await getAllUsers({
            page: usersPagination?.currentPage || 1,
            limit: 10,
            search: searchTerm
          });
          setUsers(response.data.users);
          setUsersPagination(response.data.pagination);
        } catch (error) {
          console.error("Error fetching users:", error);
          setUsersError("Failed to load users");
        } finally {
          setUsersLoading(false);
        }
      };

      fetchUsers();
    }
  }, [activeTab, usersPagination?.currentPage, searchTerm]);

  // Fetch billing data when billing tab is active
  useEffect(() => {
    if (activeTab === "billing") {
      const fetchBilling = async () => {
        try {
          setBillingLoading(true);
          setBillingError(null);
          const response = await getBillingData({
            page: billingPagination?.currentPage || 1,
            limit: 10
          });
          setBillingData(response.data.billingData);
          setBillingPagination(response.data.pagination);
        } catch (error) {
          console.error("Error fetching billing data:", error);
          setBillingError("Failed to load billing data");
        } finally {
          setBillingLoading(false);
        }
      };

      fetchBilling();
    }
  }, [activeTab, billingPagination?.currentPage]);

  // Fetch analytics data when analytics tab is active
  useEffect(() => {
    if (activeTab === "analytics") {
      const fetchAnalytics = async () => {
        try {
          setAnalyticsLoading(true);
          setAnalyticsError(null);
          const response = await getAnalyticsData();
          setAnalyticsData(response.data);
        } catch (error) {
          console.error("Error fetching analytics data:", error);
          setAnalyticsError("Failed to load analytics data");
        } finally {
          setAnalyticsLoading(false);
        }
      };

      fetchAnalytics();
    }
  }, [activeTab]);



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

  // Filter users based on search term (now handled by API)
  const filteredUsers = users;

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
                      {loading ? (
                        <p className="text-2xl font-bold">Loading...</p>
                      ) : error ? (
                        <p className="text-2xl font-bold text-red-500">Error</p>
                      ) : (
                        <>
                          <p className="text-2xl font-bold">
                            {dashboardStats?.users?.total?.toLocaleString() || 0}
                          </p>
                          <p className="text-xs text-green-600">
                            +{dashboardStats?.users?.growthRate || 0}% this month
                          </p>
                        </>
                      )}
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
                      {loading ? (
                        <p className="text-2xl font-bold">Loading...</p>
                      ) : error ? (
                        <p className="text-2xl font-bold text-red-500">Error</p>
                      ) : (
                        <>
                          <p className="text-2xl font-bold">
                            ${dashboardStats?.revenue?.total?.toLocaleString() || 0}
                          </p>
                          <p className="text-xs text-green-600">
                            +{dashboardStats?.revenue?.growthRate || 0}% this month
                          </p>
                        </>
                      )}
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
                      {loading ? (
                        <p className="text-2xl font-bold">Loading...</p>
                      ) : error ? (
                        <p className="text-2xl font-bold text-red-500">Error</p>
                      ) : (
                        <>
                          <p className="text-2xl font-bold">
                            {dashboardStats?.apiUsage?.totalCalls?.toLocaleString() || 0}
                          </p>
                          <p className="text-xs text-green-600">
                            +{dashboardStats?.apiUsage?.growthRate || 0}% this month
                          </p>
                        </>
                      )}
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
                      {loading ? (
                        <p className="text-2xl font-bold">Loading...</p>
                      ) : error ? (
                        <p className="text-2xl font-bold text-red-500">Error</p>
                      ) : (
                        <>
                          <p className="text-2xl font-bold">
                            {dashboardStats?.system?.systemHealth || 0}%
                          </p>
                          <p className="text-xs text-green-600">
                            All systems operational
                          </p>
                        </>
                      )}
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
                    {mockServices.map((service) => (
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
              
            </div>

            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Total Users: {usersPagination?.totalUsers || 0}
                </p>
              </CardHeader>
              <CardContent>
                {usersLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                      <p className="text-muted-foreground">Loading users...</p>
                    </div>
                  </div>
                ) : usersError ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="text-center">
                      <AlertTriangle className="w-8 h-8 text-red-500 mx-auto mb-4" />
                      <p className="text-red-500">{usersError}</p>
                    </div>
                  </div>
                ) : (
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
                            Role
                          </th>
                          <th className="text-left py-3 px-4 font-medium">
                            Created
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
                        {!filteredUsers || filteredUsers.length === 0 ? (
                          <tr>
                            <td colSpan="6" className="text-center py-8 text-muted-foreground">
                              No users found
                            </td>
                          </tr>
                        ) : (
                          filteredUsers.map((user) => (
                            <tr
                              key={user._id}
                              className="border-b hover:bg-muted/30"
                            >
                              <td className="py-3 px-4">
                                <div>
                                  <p className="font-medium">{user.name || 'N/A'}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {user.email}
                                  </p>
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <Badge variant={getStatusColor(user.status || 'active')}>
                                  {getStatusIcon(user.status || 'active')}
                                  <span className="ml-1">{user.status || 'active'}</span>
                                </Badge>
                              </td>
                              <td className="py-3 px-4">
                                <Badge variant="outline">
                                  {user.role || 'user'}
                                </Badge>
                              </td>
                              <td className="py-3 px-4">
                                <p className="text-sm text-muted-foreground">
                                  {new Date(user.createdAt).toLocaleDateString()}
                                </p>
                              </td>
                              <td className="py-3 px-4 hidden md:table-cell">
                                <p className="text-sm text-muted-foreground">
                                  {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}
                                </p>
                              </td>
                              <td className="py-3 px-4">
                                <div className="flex items-center space-x-2">
                                  <Button variant="outline" size="sm">
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                  <Button variant="outline" size="sm">
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <Button variant="outline" size="sm">
                                    <MoreHorizontal className="w-4 h-4" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
                
                {/* Pagination */}
                {!usersLoading && !usersError && usersPagination?.totalPages > 1 && (
                  <div className="flex items-center justify-between mt-4">
                    <div className="text-sm text-muted-foreground">
                      Page {usersPagination?.currentPage || 1} of {usersPagination?.totalPages || 1}
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={!usersPagination?.hasPrevPage}
                        onClick={() => setUsersPagination(prev => ({
                          ...prev,
                          currentPage: (prev?.currentPage || 1) - 1
                        }))}
                      >
                        Previous
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={!usersPagination?.hasNextPage}
                        onClick={() => setUsersPagination(prev => ({
                          ...prev,
                          currentPage: (prev?.currentPage || 1) + 1
                        }))}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                )}
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
                  {mockServices.map((service) => (
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
                              {service.requests.toLocaleString()}
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
                <p className="text-sm text-muted-foreground">
                  Total Billing Records: {billingPagination?.totalItems || 0}
                </p>
              </CardHeader>
              <CardContent>
                {billingLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                      <p className="text-muted-foreground">Loading billing data...</p>
                    </div>
                  </div>
                ) : billingError ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="text-center">
                      <AlertTriangle className="w-8 h-8 text-red-500 mx-auto mb-4" />
                      <p className="text-red-500">{billingError}</p>
                    </div>
                  </div>
                ) : (
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
                        {!billingData || billingData.length === 0 ? (
                          <tr>
                            <td colSpan="6" className="text-center py-8 text-muted-foreground">
                              No billing records found
                            </td>
                          </tr>
                        ) : (
                          billingData.map((billing) => (
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
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
                
                {/* Pagination */}
                {!billingLoading && !billingError && billingPagination?.totalPages > 1 && (
                  <div className="flex items-center justify-between mt-4">
                    <div className="text-sm text-muted-foreground">
                      Page {billingPagination?.currentPage || 1} of {billingPagination?.totalPages || 1}
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={!billingPagination?.hasPrevPage}
                        onClick={() => setBillingPagination(prev => ({
                          ...prev,
                          currentPage: (prev?.currentPage || 1) - 1
                        }))}
                      >
                        Previous
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={!billingPagination?.hasNextPage}
                        onClick={() => setBillingPagination(prev => ({
                          ...prev,
                          currentPage: (prev?.currentPage || 1) + 1
                        }))}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <div className="space-y-6">
            {analyticsLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Loading analytics data...</p>
                </div>
              </div>
            ) : analyticsError ? (
              <div className="flex items-center justify-center py-8">
                <div className="text-center">
                  <AlertTriangle className="w-8 h-8 text-red-500 mx-auto mb-4" />
                  <p className="text-red-500">{analyticsError}</p>
                </div>
              </div>
            ) : (
              <>
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
                            {analyticsData?.apiUsage?.totalCalls?.toLocaleString() || 0}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            Monthly API Calls
                          </span>
                          <span className="font-bold">
                            {analyticsData?.apiUsage?.monthlyCalls?.toLocaleString() || 0}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            Average Response Time
                          </span>
                          <span className="font-bold">
                            {analyticsData?.apiUsage?.averageResponseTime || 0}ms
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            Success Rate
                          </span>
                          <span className="font-bold">
                            {analyticsData?.apiUsage?.successRate || 0}%
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            Peak Usage
                          </span>
                          <span className="font-bold">
                            {analyticsData?.apiUsage?.peakUsage || 0} req/min
                          </span>
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
                            Total Revenue
                          </span>
                          <span className="font-bold">
                            ${analyticsData?.revenue?.total?.toLocaleString() || 0}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            Monthly Revenue
                          </span>
                          <span className="font-bold">
                            ${analyticsData?.revenue?.monthly?.toLocaleString() || 0}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            Daily Revenue
                          </span>
                          <span className="font-bold">
                            ${analyticsData?.revenue?.daily?.toLocaleString() || 0}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            Growth Rate
                          </span>
                          <span className="font-bold text-green-600">
                            +{analyticsData?.revenue?.growthRate || 0}%
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            Average Revenue per User
                          </span>
                          <span className="font-bold">
                            ${analyticsData?.revenue?.averagePerUser || 0}
                          </span>
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
                        <p className="font-bold text-lg">
                          {analyticsData?.system?.cpuUsage || 0}%
                        </p>
                        <p className="text-sm text-muted-foreground">CPU Usage</p>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <HardDrive className="w-8 h-8 text-blue-600" />
                        </div>
                        <p className="font-bold text-lg">
                          {analyticsData?.system?.memoryUsage || 0}%
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Memory Usage
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Network className="w-8 h-8 text-purple-600" />
                        </div>
                        <p className="font-bold text-lg">
                          {analyticsData?.system?.networkTraffic || 0} GB/s
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Network Traffic
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Zap className="w-8 h-8 text-orange-600" />
                        </div>
                        <p className="font-bold text-lg">
                          {analyticsData?.apiUsage?.averageResponseTime || 0}ms
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Avg Response Time
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>User Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Users className="w-6 h-6 text-blue-600" />
                        </div>
                        <p className="font-bold text-lg">
                          {analyticsData?.userActivity?.activeUsers || 0}
                        </p>
                        <p className="text-sm text-muted-foreground">Active Users</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <UserPlus className="w-6 h-6 text-green-600" />
                        </div>
                        <p className="font-bold text-lg">
                          {analyticsData?.userActivity?.newUsers || 0}
                        </p>
                        <p className="text-sm text-muted-foreground">New Users</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Activity className="w-6 h-6 text-purple-600" />
                        </div>
                        <p className="font-bold text-lg">
                          {analyticsData?.userActivity?.returningUsers || 0}
                        </p>
                        <p className="text-sm text-muted-foreground">Returning Users</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Clock className="w-6 h-6 text-orange-600" />
                        </div>
                        <p className="font-bold text-lg">
                          {analyticsData?.userActivity?.averageSessionDuration || 0}min
                        </p>
                        <p className="text-sm text-muted-foreground">Avg Session</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
