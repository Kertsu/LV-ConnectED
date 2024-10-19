import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StudentsTable from "./StudentsTable";
import ProvidersTable from "./ProvidersTable";

export default function AdminUserManagement() {
  const [activeTab, setActiveTab] = useState("providers");

  return (
    <div className="container mx-auto p-4 space-y-4 flex-grow">
      <h1 className="text-2xl font-bold mb-4">Admin User Management</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="providers" className="flex-1 sm:flex-none">
            Providers
          </TabsTrigger>
          <TabsTrigger value="students" className="flex-1 sm:flex-none">
            Students
          </TabsTrigger>
        </TabsList>
        <TabsContent value="providers" className="mt-4">
          {/* <ProvidersTable/> */}
        </TabsContent>
        <TabsContent value="students" className="mt-4">
          <StudentsTable />
        </TabsContent>
      </Tabs>
    </div>
  );
}
