"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export default function AssessmentPage() {
  return (
    <div className="flex justify-center items-center h-full">
      <Card className="w-full max-w-2xl text-center">
        <CardHeader>
          <CardTitle className="text-3xl">AI Wellness Assessment</CardTitle>
          <CardDescription className="text-lg">
            Take the first step towards understanding your mental wellness.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-6 text-muted-foreground">
            Our confidential wellness assessment, powered by AI, helps you understand your current state of mind and suggests a personalized path forward. It's quick, insightful, and completely private.
          </p>
          <Button size="lg">
            Start Your Assessment
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
