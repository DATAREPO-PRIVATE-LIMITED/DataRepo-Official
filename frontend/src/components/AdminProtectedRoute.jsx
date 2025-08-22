import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Shield, AlertTriangle } from 'lucide-react';

const AdminProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // Temporarily disabled authentication for testing
  // if (!user) {
  //   return <Navigate to="/signin" replace />;
  // }

  // Check if user has admin role
  if (user && user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
  
  // const { user, isAuthenticated } = useAuth();
  // const navigate = useNavigate();

  // // Check if user is authenticated and has admin role
  // if (!isAuthenticated) {
  //   return (
  //     <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
  //       <div className="text-center max-w-md mx-auto p-8">
  //         <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
  //           <AlertTriangle className="w-8 h-8 text-red-600" />
  //         </div>
  //         <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
  //         <p className="text-muted-foreground mb-6">
  //           Please sign in to access the admin dashboard.
  //         </p>
  //         <Button onClick={() => navigate('/signin')}>
  //           Sign In
  //         </Button>
  //       </div>
  //     </div>
  //   );
  // }

  // // Check if user has admin role
  // if (!user || user.role !== 'admin') {
  //   return (
  //     <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
  //       <div className="text-center max-w-md mx-auto p-8">
  //       <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
  //         <Shield className="w-8 h-8 text-orange-600" />
  //       </div>
  //       <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
  //       <p className="text-muted-foreground mb-6">
  //         You don't have permission to access the admin dashboard. 
  //         Only administrators can view this page.
  //       </p>
  //       <div className="space-x-4">
  //         <Button variant="outline" onClick={() => navigate('/dashboard')}>
  //           Go to Dashboard
  //         </Button>
  //         <Button onClick={() => navigate('/')}>
  //           Go Home
  //         </Button>
  //       </div>
  //     </div>
  //   );
  // }

  // return children;
};

export default AdminProtectedRoute;
