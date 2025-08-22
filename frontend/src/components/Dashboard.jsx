import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
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
  Download
} from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Redirect admin users to admin dashboard
  useEffect(() => {
    if (user && user.role === 'admin') {
      navigate('/admin');
    }
  }, [user, navigate]);

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

  // Temporarily commented out for testing
  // if (!user) {
  //   return (
  //     <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
  //       <div className="text-center">
  //         <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
  //         <p className="text-muted-foreground mb-4">Please log in to access your dashboard.</p>
  //         <Button onClick={() => navigate('/signin')}>Sign In</Button>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
    

             <div className="container mx-auto px-4 py-6 max-w-7xl mt-5">
         {/* Welcome Banner */}
         <div className="mb-8 p-8 bg-card via-primary/5 to-primary/10 rounded-xl border border-primary/20 shadow-sm">
           <div className="flex items-center space-x-6">
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
             <div className="text-right">
               <p className="text-sm text-muted-foreground">Current Month</p>
               <p className="text-2xl font-bold text-primary">${mockBillingData.currentMonthBill}</p>
             </div>
           </div>



         </div>


{/* Settings Options */}
         {/* <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div> */}

         <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                     {/* User Profile Card */}
           <div className="xl:col-span-1">
             <Card className="h-fit sticky top-8">
               <CardHeader className="pb-4">
                 <CardTitle className="flex items-center text-lg">
                   <User className="w-5 h-5 mr-2" />
                   Profile
                 </CardTitle>
               </CardHeader>
               <CardContent className="space-y-6">
                 <div className="flex items-center space-x-4">
                   <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center shadow-lg">
                     <User className="w-10 h-10 text-primary-foreground" />
                   </div>
                   <div>
                     <h3 className="font-bold text-lg">{currentUser.fullName || 'User'}</h3>
                     <p className="text-sm text-muted-foreground">{currentUser.email}</p>
                     <Badge variant="secondary" className="mt-2">
                       {currentUser.role || 'User'}
                     </Badge>
                   </div>
                 </div>
                 
                 <Separator />
                 
                 <div className="space-y-4">
                   <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                     <Mail className="w-4 h-4 text-muted-foreground" />
                     <span className="text-sm font-medium">{currentUser.email}</span>
                   </div>
                   {currentUser.phone && (
                     <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                       <Phone className="w-4 h-4 text-muted-foreground" />
                       <span className="text-sm font-medium">{currentUser.phone}</span>
                     </div>
                   )}
                   <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                     <Calendar className="w-4 h-4 text-muted-foreground" />
                     <span className="text-sm font-medium">
                       Joined {new Date(currentUser.createdAt || Date.now()).toLocaleDateString()}
                     </span>
                   </div>
                 </div>
               </CardContent>
             </Card>
           </div>

           {/* Main Dashboard Content */}
           <div className="xl:col-span-3 space-y-8">
                         {/* Quick Stats */}
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                    <div className="p-4 bg-card rounded-lg border ">
                      <h3 className="font-semibold  mb-2">Pay As You Use</h3>
                      <p className="text-sm  mb-3">
                        Only pay for what you use. No monthly fees, no hidden costs.
                      </p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="">Rate per API request:</span>
                          <span className="font-medium ">${mockBillingData.ratePerRequest}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="">Billing cycle:</span>
                          <span className="font-medium ">Monthly</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="">Example:</span>
                          <span className="font-medium ">5,000 requests = ${mockBillingData.currentMonthBill}</span>
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
                          <span className="font-extrabold ">${mockBillingData.currentMonthBill}</span>
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

             {/* API Keys Management */}
             <Card>
               <CardHeader>
                 <CardTitle className="flex items-center">
                   <Key className="w-5 h-5 mr-2" />
                   API Keys
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
                               <Badge variant={apiKey.status === 'active' ? 'default' : 'secondary'}>
                                 {apiKey.status}
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
                          <p className="text-2xl font-bold ">${mockBillingData.currentMonthBill}</p>
                          <p className="text-sm text-muted-foreground">This month's bill</p>
                          <p className="text-xs text-muted-foreground">{mockBillingData.apiCalls.toLocaleString()} × ${mockBillingData.ratePerRequest}</p>
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
                             <Badge variant={invoice.status === 'paid' ? 'default' : 'secondary'}>
                               {invoice.status}
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
         </div>
       </div>
     </div>
   );
 };

export default Dashboard;
