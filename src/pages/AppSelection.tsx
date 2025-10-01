import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut } from 'lucide-react';
import incomeTrackerThumb from '../assets/income-tracker-thumbnail.jpg';
import logoImage from '../assets/zb-autocare-logo.jpg';

interface AppCard {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  route: string;
  requiredRole?: 'owner' | 'editor' | 'staff';
}

// Define available apps - easily add more apps here
const AVAILABLE_APPS: AppCard[] = [
  {
    id: 'income-expense-tracker',
    title: 'Income & Expense Tracker',
    description: 'ZB AutoCare business management system',
    thumbnail: incomeTrackerThumb,
    route: '/income-tracker',
  },
  // Add more apps here in the future:
  // {
  //   id: 'inventory-manager',
  //   title: 'Inventory Manager',
  //   description: 'Manage parts and supplies',
  //   thumbnail: inventoryThumb,
  //   route: '/inventory',
  // },
];

const AppSelection: React.FC = () => {
  const navigate = useNavigate();
  const { signOut, userRole } = useAuth();

  // Filter apps based on user role if needed
  const availableApps = AVAILABLE_APPS.filter(app => {
    if (!app.requiredRole) return true;
    return userRole === app.requiredRole;
  });

  const handleAppClick = (route: string) => {
    navigate(route);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img 
                src={logoImage} 
                alt="ZB Autocare Logo" 
                className="w-12 h-12 object-contain rounded-lg"
              />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  ZB AutoCare
                </h1>
                <p className="text-sm text-muted-foreground">Business Management System</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full capitalize">
                {userRole}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => signOut()}
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">Select an Application</h2>
          <p className="text-muted-foreground text-lg">
            Choose the application you want to access
          </p>
        </div>

        {/* App Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableApps.map((app) => (
            <Card 
              key={app.id}
              className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group"
              onClick={() => handleAppClick(app.route)}
            >
              <div className="relative aspect-video overflow-hidden bg-muted">
                <img 
                  src={app.thumbnail} 
                  alt={app.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {app.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {app.description}
                </p>
                <Button 
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAppClick(app.route);
                  }}
                >
                  Open Application
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State if no apps available */}
        {availableApps.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No applications available for your role.
            </p>
          </div>
        )}

        {/* Info Footer */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            💡 More applications will be added here as they become available
          </p>
        </div>
      </main>
    </div>
  );
};

export default AppSelection;
