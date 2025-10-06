import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import IncomeExpenseTracker from "@/components/IncomeExpenseTracker";
import LeadSheet from "@/components/LeadSheet";
import { EmployeeManagement } from "@/components/EmployeeManagement";
import { AIAssistant } from "@/components/AIAssistant";
import { IndianRupee, Users, UserCog } from "lucide-react";
import logo from "@/assets/zb-autocare-logo.jpg";

const Index = () => {
  const [activeTab, setActiveTab] = useState("income-expense");

  return (
    <>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto py-8 px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <img src={logo} alt="ZB Autocare" className="h-16 w-16 rounded-lg object-cover" />
              <div>
                <h1 className="text-3xl font-bold">ZB Autocare</h1>
                <p className="text-muted-foreground">Business Management System</p>
              </div>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="income-expense" className="flex items-center gap-2">
                <IndianRupee className="h-4 w-4" />
                Income & Expense
              </TabsTrigger>
              <TabsTrigger value="lead-sheet" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Lead Sheet
              </TabsTrigger>
              <TabsTrigger value="employees" className="flex items-center gap-2">
                <UserCog className="h-4 w-4" />
                Employees
              </TabsTrigger>
            </TabsList>

            <TabsContent value="income-expense" className="mt-6">
              <IncomeExpenseTracker />
            </TabsContent>

            <TabsContent value="lead-sheet" className="mt-6">
              <div className="text-center py-8 text-muted-foreground">
                <p>Lead Sheet functionality coming soon...</p>
                <p className="text-sm mt-2">This will show customer history from income entries</p>
              </div>
            </TabsContent>

            <TabsContent value="employees" className="mt-6">
              <EmployeeManagement />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <AIAssistant />
    </>
  );
};

export default Index;
