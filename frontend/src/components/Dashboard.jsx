import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Input } from './ui/input';
import { 
  User, 
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
  CheckCircle,
  Clock,
  AlertTriangle,
  X,
  Save
} from 'lucide-react';
import { Label } from './ui/label';


const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');




  
  // Modal states
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  
  // Form states
  const [editForm, setEditForm] = useState({
    fullName: '',
    email: '',
    phone: ''
  });
  
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  // Loading states
  const [isUpdating, setIsUpdating] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Redirect admin users to admin dashboard
  useEffect(() => {
    if (user && user.role === 'admin') {
      navigate('/admin');
    }
  }, [user, navigate]);

  // Initialize edit form when user data changes
  useEffect(() => {
    if (user) {
      setEditForm({
        fullName: user.fullName || '',
        email: user.email || '',
        phone: user.phone || ''
      });
    }
  }, [user]);

  // Show loading while redirecting admin users
  if (user && user.role === 'admin') {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Redirecting to admin dashboard...</p>
        </div>
      </div>
    );
  }
  
  // Temporary mock user data for testing when not authenticated
  const mockUser = {
    fullName: 'Test User',
    email: 'test@example.com',
    role: 'User',
    createdAt: new Date().toISOString()
  };

  // Mock billing and API data
  const mockBillingData = {
    currentPlan: 'Pay As You Use',
    monthlyUsage: 85,
    apiCalls: 5000,
    storageUsed: '2.5 GB',
    nextBilling: '2024-02-15',
    balance: 50.00,
    cardLast4: '4242',
    cardBrand: 'Visa',
    cardExpiry: '12/25',
    ratePerRequest: 0.01,
    currentMonthBill: 50.00,
    lastMonthBill: 45.75,
  };

  const mockApiKeys = [
    { id: 1, name: 'Production API Key', key: 'sk_live_...abc123', status: 'active', lastUsed: '2 hours ago' },
    { id: 2, name: 'Development API Key', key: 'sk_test_...def456', status: 'active', lastUsed: '1 day ago' },
    { id: 3, name: 'Webhook Key', key: 'whk_...ghi789', status: 'inactive', lastUsed: '1 week ago' }
  ];

  const mockInvoices = [
    { id: 'INV-001', date: '2024-01-15', amount: 50.00, status: 'paid', description: 'Pay As You Use - January 2024 (5,000 API calls)' },
    { id: 'INV-002', date: '2023-12-15', amount: 45.75, status: 'paid', description: 'Pay As You Use - December 2023 (4,575 API calls)' },
    { id: 'INV-003', date: '2023-11-15', amount: 38.90, status: 'paid', description: 'Pay As You Use - November 2023 (3,890 API calls)' }
  ];
  
  const currentUser = user || mockUser;

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      navigate('/');
    }
  };

  // Handle edit profile form submission
  const handleEditProfile = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update local user state (in real app, this would update the backend)
      if (user) {
        // Update the user context with new data
        // This would typically be done through an API call
        console.log('Profile updated:', editForm);
      }
      
      setShowEditProfile(false);
      // Show success message (you can add a toast notification here)
    } catch (error) {
      console.error('Error updating profile:', error);
      // Show error message
    } finally {
      setIsUpdating(false);
    }
  };

  // Handle change password form submission
  const handleChangePassword = async (e) => {
    e.preventDefault();
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    
    if (passwordForm.newPassword.length < 6) {
      alert('New password must be at least 6 characters long');
      return;
    }
    
    setIsChangingPassword(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In real app, this would call the backend to change password
      console.log('Password changed successfully');
      
      setShowChangePassword(false);
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      // Show success message
    } catch (error) {
      console.error('Error changing password:', error);
      // Show error message
    } finally {
      setIsChangingPassword(false);
    }
  };



  // Reset forms when modals are closed
  const handleCloseEditProfile = () => {
    setShowEditProfile(false);
    if (user) {
      setEditForm({
        fullName: user.fullName || '',
        email: user.email || '',
        phone: user.phone || ''
      });
    }
  };

  const handleCloseChangePassword = () => {
    setShowChangePassword(false);
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'default';
      case 'inactive': return 'secondary';
      case 'paid': return 'default';
      case 'pending': return 'secondary';
      default: return 'secondary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
      case 'paid':
        return <CheckCircle className="w-4 h-4" />;
      case 'inactive':
      case 'pending':
        return <Clock className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  // Quick Actions handlers
  const handleGoToApiKeys = () => {
    setActiveTab('apikeys');
  };

  const handleGoToBilling = () => {
    setActiveTab('billing');
  };

  const handleGoToAnalytics = () => {
    setActiveTab('analytics');
  };

  // const handleDownloadInvoices = () => {
  //   try {
  //     // Export mock invoices to CSV (replace with real data when backend is ready)
  //     const rows = [
  //       ['Invoice ID', 'Date', 'Amount', 'Status', 'Description'],
  //       ...mockInvoices.map(inv => [
  //         inv.id,
  //         inv.date,
  //         inv.amount,
  //         inv.status,
  //         inv.description
  //       ])
  //     ];
  //     const csvContent = rows
  //       .map(r => r
  //         .map(value => {
  //           const cell = String(value ?? '');
  //           const needsQuotes = /[",\n]/.test(cell);
  //           const escaped = cell.replace(/"/g, '""');
  //           return needsQuotes ? `"${escaped}"` : escaped;
  //         })
  //         .join(','))
  //       .join('\n');
  //     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  //     const url = URL.createObjectURL(blob);
  //     const link = document.createElement('a');
  //     link.href = url;
  //     link.download = 'invoices.csv';
  //     link.click();
  //     URL.revokeObjectURL(url);
  //   } catch (err) {
  //     console.error('Failed to download invoices:', err);
  //   }
  // };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'billing', label: 'Billing', icon: DollarSign },
    { id: 'apikeys', label: 'API Keys', icon: Key },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground mt-12">
      {/* Header */}
      {/* <div className="border-b bg-card w-full sm:w-[90%] md:w-[85%] lg:w-[80%] mx-auto rounded-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <User className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">User Dashboard</h1>
                <p className="text-sm text-muted-foreground">Manage your account and API usage</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
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
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Welcome Banner */}
            {/* <div className="p-6 sm:p-8 bg-card via-primary/5 to-primary/10 rounded-xl border border-primary/20 shadow-sm">
              <div className="flex flex-col md:flex-row items-center md:items-center md:space-x-6 gap-4">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg">
                  <User className="w-8 h-8 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Welcome back, {currentUser.fullName || currentUser.email}!
                  </h2>
                  <p className="text-muted-foreground text-lg">
                    Here's your API marketplace overview for this month
                  </p>
                </div>
                <div className="md:text-right text-center w-full md:w-auto">
                  <p className="text-sm text-muted-foreground">Current Month</p>
                  <p className="text-2xl font-bold text-primary">${mockBillingData.currentMonthBill}</p>
                </div>
              </div>
            </div> */}

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Database className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total APIs</p>
                      <p className="text-2xl font-bold">3</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Activity className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">API Calls</p>
                      <p className="text-2xl font-bold">{mockBillingData.apiCalls.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Current Bill</p>
                      <p className="text-2xl font-bold">${mockBillingData.currentMonthBill}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Rate/Request</p>
                      <p className="text-2xl font-bold">${mockBillingData.ratePerRequest}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" onClick={handleGoToApiKeys}>
                    <Key className="w-4 h-4 mr-2" />
                    Generate New API Key
                    
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={handleGoToBilling}>
                    <CreditCard className="w-4 h-4 mr-2" />
                    Update Payment Method
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={handleGoToAnalytics}>
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View Usage Analytics
                  </Button>
                  <Button variant="outline" className="w-full justify-start" >
                    <Receipt className="w-4 h-4 mr-2" />
                    Download Invoices
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Account Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Account Status</span>
                      <Badge variant="default">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Active
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Billing Plan</span>
                      <span className="text-sm">{mockBillingData.currentPlan}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Next Billing</span>
                      <span className="text-sm">{new Date(mockBillingData.nextBilling).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">API Keys</span>
                      <span className="text-sm">{mockApiKeys.filter(k => k.status === 'active').length} active</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Profile Picture and Basic Info */}
                  <div className="lg:col-span-1">
                    <div className="text-center space-y-4">
                      <div className="w-32 h-32 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center shadow-lg mx-auto">
                        <User className="w-16 h-16 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-bold text-xl">{currentUser.fullName || 'User'}</h3>
                        <p className="text-muted-foreground">{currentUser.email}</p>
                        <Badge variant="secondary" className="mt-2">
                          {currentUser.role || 'User'}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Profile Details */}
                  <div className="lg:col-span-2 space-y-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-lg">Personal Information</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Full Name</Label>
                          <div className="p-3 bg-muted/30 rounded-lg">
                            {currentUser.fullName || 'Not provided'}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Email</Label>
                          <div className="p-3 bg-muted/30 rounded-lg">
                            {currentUser.email}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Role</Label>
                          <div className="p-3 bg-muted/30 rounded-lg">
                            {currentUser.role || 'User'}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Member Since</Label>
                          <div className="p-3 bg-muted/30 rounded-lg">
                            {new Date(currentUser.createdAt || Date.now()).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h4 className="font-semibold text-lg">Account Settings</h4>
                      <div className="flex space-x-3">
                        <Button onClick={() => setShowEditProfile(true)}>
                          <Settings className="w-4 h-4 mr-2" />
                          Edit Profile
                        </Button>
                        <Button variant="outline" onClick={() => setShowChangePassword(true)}>
                          <Shield className="w-4 h-4 mr-2" />
                          Change Password
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Billing Tab */}
        {activeTab === 'billing' && (
          <div className="space-y-6">
            {/* Pricing Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="w-5 h-5 mr-2" />
                  Pricing Model
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-card rounded-lg border">
                    <h3 className="font-semibold mb-2">Pay As You Use</h3>
                    <p className="text-sm mb-3">
                      Only pay for what you use. No monthly fees, no hidden costs.
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Rate per API request:</span>
                        <span className="font-medium">${mockBillingData.ratePerRequest}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Billing cycle:</span>
                        <span className="font-medium">Monthly</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Example:</span>
                        <span className="font-medium">5,000 requests = ${mockBillingData.currentMonthBill}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Billing & Payment Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Billing & Payment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Payment Method */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Payment Method</h3>
                    <div className="p-4 border rounded-lg bg-muted/30">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <CreditCard className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">{mockBillingData.cardBrand} •••• {mockBillingData.cardLast4}</p>
                          <p className="text-sm text-muted-foreground">Expires {mockBillingData.cardExpiry}</p>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Update Payment Method
                    </Button>
                  </div>

                  {/* Billing Summary */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Billing Summary</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Pricing Model:</span>
                        <span className="font-medium">{mockBillingData.currentPlan}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Rate per Request:</span>
                        <span className="font-medium">${mockBillingData.ratePerRequest}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Current Month Bill:</span>
                        <span className="font-extrabold">${mockBillingData.currentMonthBill}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Last Month Bill:</span>
                        <span className="font-medium">${mockBillingData.lastMonthBill}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Next Billing:</span>
                        <span className="font-medium">{new Date(mockBillingData.nextBilling).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Invoices */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Receipt className="w-5 h-5 mr-2" />
                  Recent Invoices
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">Your recent billing history</p>
                    <Button variant="outline" size="sm">
                      <Receipt className="w-4 h-4 mr-2" />
                      View All Invoices
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    {mockInvoices.map((invoice) => (
                      <div key={invoice.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium">{invoice.id}</h4>
                            <Badge variant={getStatusColor(invoice.status)}>
                              {getStatusIcon(invoice.status)}
                              <span className="ml-1">{invoice.status}</span>
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{invoice.description}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(invoice.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${invoice.amount}</p>
                          <Button variant="outline" size="sm" className="mt-2">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* API Keys Tab */}
        {activeTab === 'apikeys' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Key className="w-5 h-5 mr-2" />
                  API Keys Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">Manage your API keys for accessing data services</p>
                    <Button size="sm">
                      <Key className="w-4 h-4 mr-2" />
                      Generate New Key
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    {mockApiKeys.map((apiKey) => (
                      <div key={apiKey.id} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <h4 className="font-medium">{apiKey.name}</h4>
                              <Badge variant={getStatusColor(apiKey.status)}>
                                {getStatusIcon(apiKey.status)}
                                <span className="ml-1">{apiKey.status}</span>
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1 font-mono">
                              {apiKey.key}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Last used: {apiKey.lastUsed}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            {/* Usage Analytics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Usage Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* API Usage Chart */}
                  <div className="space-y-3">
                    <h4 className="font-medium">API Calls (This Month)</h4>
                    <div className="h-32 bg-muted/30 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-primary">{mockBillingData.apiCalls.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">Total calls</p>
                        <p className="text-xs text-muted-foreground">${mockBillingData.ratePerRequest} per request</p>
                      </div>
                    </div>
                  </div>

                  {/* Monthly Usage */}
                  <div className="space-y-3">
                    <h4 className="font-medium">Cost Calculation</h4>
                    <div className="h-32 bg-muted/30 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-2xl font-bold">${mockBillingData.currentMonthBill}</p>
                        <p className="text-sm text-muted-foreground">This month's bill</p>
                        <p className="text-xs text-muted-foreground">{mockBillingData.apiCalls.toLocaleString()} × ${mockBillingData.ratePerRequest}</p>
                      </div>
                    </div>
                  </div>

                  {/* Storage Usage */}
                  {/* <div className="space-y-3">
                    <h4 className="font-medium">Storage Usage</h4>
                    <div className="h-32 bg-muted/30 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">{mockBillingData.storageUsed}</p>
                        <p className="text-sm text-muted-foreground">Current usage</p>
                        <p className="text-xs text-muted-foreground">Unlimited storage</p>
                      </div>
                    </div>
                  </div> */}
                </div>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Activity className="w-8 h-8 text-green-600" />
                    </div>
                    <p className="font-bold text-lg">99.9%</p>
                    <p className="text-sm text-muted-foreground">API Uptime</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <TrendingUp className="w-8 h-8 text-blue-600" />
                    </div>
                    <p className="font-bold text-lg">245ms</p>
                    <p className="text-sm text-muted-foreground">Avg Response Time</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Database className="w-8 h-8 text-purple-600" />
                    </div>
                    <p className="font-bold text-lg">3</p>
                    <p className="text-sm text-muted-foreground">Active APIs</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <DollarSign className="w-8 h-8 text-orange-600" />
                    </div>
                    <p className="font-bold text-lg">${mockBillingData.ratePerRequest}</p>
                    <p className="text-sm text-muted-foreground">Per Request Cost</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Edit Profile Modal */}
      {showEditProfile && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Edit Profile</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCloseEditProfile}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <form onSubmit={handleEditProfile} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={editForm.fullName}
                  onChange={(e) => setEditForm({...editForm, fullName: e.target.value})}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone (Optional)</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={editForm.phone}
                  onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                  placeholder="Enter your phone number"
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCloseEditProfile}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isUpdating}
                  className="flex-1"
                >
                  {isUpdating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showChangePassword && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Change Password</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCloseChangePassword}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                  placeholder="Enter current password"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                  placeholder="Enter new password"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                  placeholder="Confirm new password"
                  required
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCloseChangePassword}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isChangingPassword}
                  className="flex-1"
                >
                  {isChangingPassword ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Changing...
                    </>
                  ) : (
                    <>
                      <Shield className="w-4 h-4 mr-2" />
                      Change Password
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
