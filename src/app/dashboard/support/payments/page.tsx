
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CreditCard, PlusCircle } from "lucide-react";
import { useState } from "react";

const transactions: any[] = [
    // {
    //     id: "txn_123",
    //     date: "2024-07-15",
    //     description: "Telehealth Session with Dr. John O.",
    //     amount: "- KES 3,500",
    //     status: "Completed"
    // },
    // {
    //     id: "txn_124",
    //     date: "2024-07-01",
    //     description: "Monthly Subscription Fee",
    //     amount: "- KES 1,000",
    //     status: "Completed"
    // },
    // {
    //     id: "txn_125",
    //     date: "2024-06-15",
    //     description: "Telehealth Session with Dr. John O.",
    //     amount: "- KES 3,500",
    //     status: "Completed"
    // }
]

export default function PaymentsPage() {
    const [paymentHistory, setPaymentHistory] = useState(transactions);

  return (
    <div className="space-y-8">
        <div>
            <h1 className="text-3xl font-bold">Billing & Payments</h1>
            <p className="text-muted-foreground">Manage your subscription, payment methods, and view your transaction history.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
                 <Card>
                    <CardHeader>
                        <CardTitle>Transaction History</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {paymentHistory.length > 0 ? paymentHistory.map(txn => (
                                    <TableRow key={txn.id}>
                                        <TableCell>{txn.date}</TableCell>
                                        <TableCell>{txn.description}</TableCell>
                                        <TableCell className="font-medium">{txn.amount}</TableCell>
                                        <TableCell>
                                            <Badge variant={txn.status === "Completed" ? "default" : "secondary"}>{txn.status}</Badge>
                                        </TableCell>
                                    </TableRow>
                                )) : (
                                    <TableRow>
                                        <TableCell colSpan={4} className="h-24 text-center">
                                            No transactions yet.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Payment Methods</CardTitle>
                        <CardDescription>Your saved payment methods.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* <div className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-3">
                                <CreditCard className="h-8 w-8 text-muted-foreground" />
                                <div>
                                    <p className="font-semibold">Visa ending in 4242</p>
                                    <p className="text-sm text-muted-foreground">Expires 12/2026</p>
                                </div>
                            </div>
                            <Button variant="ghost" size="sm">Remove</Button>
                        </div> */}
                        <div className="text-center text-sm text-muted-foreground py-4">No saved payment methods.</div>
                         <Button variant="outline" className="w-full">
                            <PlusCircle className="mr-2 h-4 w-4"/> Add New Method
                        </Button>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Current Subscription</CardTitle>
                    </CardHeader>
                     <CardContent className="space-y-2">
                        <p className="text-lg font-semibold">MindFiti Free Plan</p>
                        <p className="text-muted-foreground">KES 0 / month</p>
                        <Button variant="secondary" className="w-full mt-2">Upgrade Subscription</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  );
}
