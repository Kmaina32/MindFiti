"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";

export default function ClientsPage() {
  return (
    <div className="flex flex-col gap-6">
       <div className="flex justify-between items-center">
        <div>
            <h1 className="text-2xl font-bold">Your Clients</h1>
            <p className="text-muted-foreground">
            View and manage your list of clients.
            </p>
        </div>
        <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Client
        </Button>
       </div>
        <Card className="text-center">
            <CardHeader>
                <CardTitle>No Clients Yet</CardTitle>
                <CardDescription>
                You haven't added any clients yet. Add your first client to get started.
                </CardDescription>
            </CardHeader>
            <CardContent>
                 <Button>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Your First Client
                </Button>
            </CardContent>
        </Card>
    </div>
  );
}
