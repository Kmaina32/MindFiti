"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, ArrowRight, RefreshCw, CheckCircle, AlertTriangle, Shield, Lightbulb } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { aiPoweredAssessment, AiPoweredAssessmentOutput } from "@/ai/flows/ai-powered-assessment";
import { BrandedLoader } from "@/components/branded-loader";

const questions = [
  {
    question: "Over the last 2 weeks, how often have you been bothered by feeling down, depressed, or hopeless?",
    options: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
  },
  {
    question: "Over the last 2 weeks, how often have you been bothered by little interest or pleasure in doing things?",
    options: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
  },
  {
    question: "How would you rate your sleep quality over the last 2 weeks?",
    options: ["Very good", "Good", "Fair", "Poor", "Very poor"],
  },
  {
    question: "Over the last 2 weeks, how often have you been bothered by feeling tired or having little energy?",
    options: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
  },
  {
    question: "Over the last 2 weeks, how often have you been bothered by feeling nervous, anxious, or on edge?",
    options: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
  },
];

export default function AssessmentPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<AiPoweredAssessmentOutput | null>(null);

  const currentQuestion = questions[step];
  const progress = ((step + 1) / questions.length) * 100;

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleAnswerChange = (value: string) => {
    setAnswers({ ...answers, [step]: value });
  };
  
  const handleSubmit = async () => {
    setLoading(true);
    setResults(null);
    try {
        const assessmentInput = {
            answers: questions.map((q, i) => ({
                question: q.question,
                answer: answers[i] || "Not answered",
            })),
            age: 30, // Mock data as auth is removed
            gender: "Not specified", // Mock data as auth is removed
            locale: "en-US", // Mock data as auth is removed
        };
        const res = await aiPoweredAssessment(assessmentInput);
        setResults(res);
    } catch (error) {
        console.error("Error submitting assessment:", error);
    } finally {
        setLoading(false);
    }
  };

  const handleRestart = () => {
    setStep(0);
    setAnswers({});
    setResults(null);
    setLoading(false);
  };
  
  if (loading) {
    return <BrandedLoader />;
  }

  if (results) {
    const riskColor = results.risk === 'high' ? 'text-destructive' : results.risk === 'medium' ? 'text-yellow-600' : 'text-primary';
    const RiskIcon = results.risk === 'high' ? Shield : results.risk === 'medium' ? AlertTriangle : CheckCircle;

    return (
        <Card className="w-full max-w-3xl mx-auto">
            <CardHeader className="text-center">
                <CardTitle className="text-3xl">Your Wellness Report</CardTitle>
                <CardDescription>Here is a summary of your AI-powered assessment.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold flex items-center justify-center gap-2">
                        <RiskIcon className={`h-6 w-6 ${riskColor}`} />
                        Overall Risk Level: <span className={`capitalize font-bold ${riskColor}`}>{results.risk}</span>
                    </h3>
                    <Card className="bg-secondary/50">
                        <CardHeader>
                            <CardTitle className="text-lg">AI Summary</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{results.summary}</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-secondary/50">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2"><Lightbulb /> Recommendations</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2 list-disc pl-5 text-muted-foreground">
                                {results.recommendations.map((rec, index) => (
                                    <li key={index}>{rec}</li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>
                 <div className="text-center">
                    <Button onClick={handleRestart}>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Take Again
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
  }

  return (
    <div className="flex justify-center items-start h-full py-8">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center">AI Wellness Assessment</CardTitle>
          <CardDescription className="text-center">
            Answer the following questions to get a personalized wellness overview.
          </CardDescription>
          <Progress value={progress} className="mt-4" />
        </CardHeader>
        <CardContent>
          <div className="my-8">
            <h3 className="text-lg font-semibold mb-4 text-center">{currentQuestion.question}</h3>
            <RadioGroup
              value={answers[step]}
              onValueChange={handleAnswerChange}
              className="space-y-2 flex flex-col items-center"
            >
              {currentQuestion.options.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={option} />
                  <Label htmlFor={option} className="text-base">{option}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="flex justify-between mt-8">
            <Button variant="outline" onClick={handleBack} disabled={step === 0}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            {step < questions.length - 1 ? (
              <Button onClick={handleNext} disabled={!answers[step]}>
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={!answers[step]}>
                Submit & See Results
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
