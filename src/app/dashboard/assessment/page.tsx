"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { BrandedLoader } from "@/components/branded-loader";
import { sanaBotScreening } from "@/ai/flows/sana-bot-screening";
import { SanaBotScreeningOutput } from "@/ai/schemas/sana-bot-schemas";
import { AlertCircle, CheckCircle, Lightbulb, RefreshCw, Shield, VenetianMask } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const instruments = [
  {
    name: "PHQ-9 (Depression)",
    questions: [
      { q: "Little interest or pleasure in doing things", o: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
      { q: "Feeling down, depressed, or hopeless", o: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
      { q: "Trouble falling or staying asleep, or sleeping too much", o: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
      { q: "Feeling tired or having little energy", o: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
      { q: "Poor appetite or overeating", o: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
      { q: "Feeling bad about yourself — or that you are a failure or have let yourself or your family down", o: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
      { q: "Trouble concentrating on things, such as reading the newspaper or watching television", o: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
      { q: "Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual", o: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
      { q: "Thoughts that you would be better off dead, or of hurting yourself in some way", o: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
    ],
  },
  {
    name: "GAD-7 (Anxiety)",
    questions: [
      { q: "Feeling nervous, anxious, or on edge", o: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
      { q: "Not being able to stop or control worrying", o: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
      { q: "Worrying too much about different things", o: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
      { q: "Trouble relaxing", o: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
      { q: "Being so restless that it is hard to sit still", o: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
      { q: "Becoming easily annoyed or irritable", o: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
      { q: "Feeling afraid, as if something awful might happen", o: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
    ],
  },
  {
    name: "MDQ (Mood Disorders)",
    questions: [
        { q: "Has there ever been a period of time when you were not your usual self and you felt so good or so hyper that other people thought you were not your normal self or you were so hyper you got into trouble?", o: ["Yes", "No"]},
        { q: "Has there ever been a period of time when you were not your usual self and you were so irritable that you shouted at people or started fights or arguments?", o: ["Yes", "No"]},
        { q: "Have you ever felt more self-confident than usual?", o: ["Yes", "No"]},
        { q: "Have you ever gotten much less sleep than usual and found you didn’t really miss it?", o: ["Yes", "No"]},
        { q: "Have you ever been much more talkative or spoken faster than usual?", o: ["Yes", "No"]},
    ]
  },
  {
    name: "PCL-5 (PTSD)",
    questions: [
        { q: "In the past month, have you had repeated, disturbing, and unwanted memories of the stressful experience?", o: ["Not at all", "A little bit", "Moderately", "Quite a bit", "Extremely"]},
        { q: "In the past month, have you tried to avoid memories, thoughts, or feelings related to the stressful experience?", o: ["Not at all", "A little bit", "Moderately", "Quite a bit", "Extremely"]},
        { q: "In the past month, have you had trouble remembering important parts of the stressful experience?", o: ["Not at all", "A little bit", "Moderately", "Quite a bit", "Extremely"]},
        { q: "In the past month, have you been jumpy or easily startled?", o: ["Not at all", "A little bit", "Moderately", "Quite a bit", "Extremely"]},
    ]
  },
  {
      name: "AUDIT-C & CAGE (Alcohol Use)",
      questions: [
          { q: "How often do you have a drink containing alcohol?", o: ["Never", "Monthly or less", "2-4 times a month", "2-3 times a week", "4 or more times a week"]},
          { q: "How many standard drinks containing alcohol do you have on a typical day when you are drinking?", o: ["1 or 2", "3 or 4", "5 or 6", "7 to 9", "10 or more"]},
          { q: "Have you ever felt you should cut down on your drinking?", o: ["Yes", "No"]},
          { q: "Have people annoyed you by criticizing your drinking?", o: ["Yes", "No"]},
      ]
  },
  {
      name: "SCOFF (Eating Disorders)",
      questions: [
        { q: "Do you make yourself Sick because you feel uncomfortably full?", o: ["Yes", "No"]},
        { q: "Do you worry you have lost Control over how much you eat?", o: ["Yes", "No"]},
        { q: "Have you recently lost more than 14 lbs in a 3-month period?", o: ["Yes", "No"]},
        { q: "Do you believe yourself to be Fat when others say you are too thin?", o: ["Yes", "No"]},
        { q: "Would you say that Food dominates your life?", o: ["Yes", "No"]},
      ]
  },
  {
      name: "ASRS (ADHD)",
       questions: [
        { q: "How often do you have trouble wrapping up the final details of a project, once the challenging parts have been done?", o: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]},
        { q: "How often do you have difficulty getting things in order when you have to do a task that requires organization?", o: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]},
        { q: "How often do you have problems remembering appointments or obligations?", o: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]},
        { q: "When you have a task that requires a lot of thought, how often do you avoid or delay getting started?", o: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]},
      ]
  },
  {
      name: "PQ-B (Psychosis Risk)",
      questions: [
          { q: "Have you ever felt that you were being sent special messages through the TV or radio?", o: ["Yes", "No"]},
          { q: "Have your thoughts ever been so jumbled that you couldn't make sense of them?", o: ["Yes", "No"]},
          { q: "Have you ever heard things other people couldn't hear, like voices?", o: ["Yes", "No"]},
      ]
  }
];

type Answers = Record<string, Record<string, string>>;

export default function AssessmentPage() {
  const [answers, setAnswers] = useState<Answers>({});
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SanaBotScreeningOutput | null>(null);

  const handleAnswerChange = (instrumentName: string, question: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [instrumentName]: {
        ...prev[instrumentName],
        [question]: value,
      },
    }));
  };

  const allQuestionsAnswered = () => {
    const totalQuestions = instruments.reduce((acc, i) => acc + i.questions.length, 0);
    const totalAnswers = Object.values(answers).reduce((acc, a) => acc + Object.keys(a).length, 0);
    return totalQuestions === totalAnswers;
  };

  const handleSubmit = async () => {
    if (!allQuestionsAnswered()) {
        alert("Please answer all questions before submitting.");
        return;
    }
    setLoading(true);
    setResults(null);
    try {
        const assessmentInput = {
            assessments: instruments.map(instrument => ({
                instrument: instrument.name,
                answers: instrument.questions.map(q => ({
                    question: q.q,
                    answer: answers[instrument.name]?.[q.q] || "Not answered",
                }))
            })),
            age: 30, // Mock data
            gender: "Not specified", // Mock data
        };
        const res = await sanaBotScreening(assessmentInput);
        setResults(res);
    } catch (error) {
        console.error("Error submitting assessment:", error);
    } finally {
        setLoading(false);
    }
  };
  
  const handleRestart = () => {
    setAnswers({});
    setResults(null);
    setLoading(false);
  };
  
  if (loading) {
    return <BrandedLoader />;
  }

  if (results) {
    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader className="text-center">
                <div className="w-fit mx-auto p-3 bg-primary/10 rounded-lg">
                    <VenetianMask className="h-12 w-12 text-primary" />
                </div>
                <CardTitle className="text-3xl mt-4">Your SanaBot AI Screening Report</CardTitle>
                <CardDescription>This report summarizes your responses to the comprehensive mental health screening. It is intended to be a supportive guide, not a diagnosis.</CardDescription>
                {results.isHighRisk && (
                     <Alert variant="destructive" className="text-left mt-4">
                        <Shield className="h-4 w-4" />
                        <AlertTitle>High-Risk Area Detected</AlertTitle>
                        <AlertDescription>
                           This report indicates one or more areas of high concern. Please review the recommendations carefully and consider seeking professional support promptly.
                        </AlertDescription>
                    </Alert>
                )}
            </CardHeader>
            <CardContent className="space-y-6">
                <Card className="bg-secondary/50">
                    <CardHeader>
                        <CardTitle className="text-xl">Comprehensive AI Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground whitespace-pre-wrap">{results.summary}</p>
                    </CardContent>
                </Card>

                {results.riskFactors.length > 0 && (
                     <Card className="bg-secondary/50">
                        <CardHeader>
                            <CardTitle className="text-xl">Key Areas Identified</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           {results.riskFactors.map((risk, index) => (
                                <div key={index} className="flex items-start gap-4">
                                     <div className="p-2 bg-primary/10 rounded-full">
                                        <AlertCircle className="h-6 w-6 text-primary" />
                                     </div>
                                     <div>
                                        <p className="font-semibold">{risk.concern}</p>
                                        <p className="text-sm text-muted-foreground">{risk.instrument}</p>
                                     </div>
                                      <Badge className="ml-auto capitalize">{risk.severity}</Badge>
                                </div>
                           ))}
                        </CardContent>
                    </Card>
                )}

                <Card className="bg-secondary/50">
                    <CardHeader>
                        <CardTitle className="text-xl flex items-center gap-2"><Lightbulb /> Recommended Next Steps</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3 list-disc pl-5 text-muted-foreground">
                            {results.recommendations.map((rec, index) => (
                                <li key={index}>{rec}</li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
                 <div className="text-center pt-4">
                    <Button onClick={handleRestart}>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Take Assessment Again
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
  }

  return (
    <div className="flex justify-center items-start h-full py-8">
      <Card className="w-full max-w-3xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">SanaBot AI Comprehensive Screening</CardTitle>
          <CardDescription>
            This confidential screening helps you and your provider understand your well-being.
            <br />
            It consists of 13 short, validated questionnaires. Please answer thoughtfully.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
            {instruments.map((instrument, index) => (
              <AccordionItem value={`item-${index}`} key={instrument.name}>
                <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                  {index + 1}. {instrument.name}
                </AccordionTrigger>
                <AccordionContent className="space-y-8 pt-4">
                  {instrument.questions.map((q) => (
                    <div key={q.q} className="space-y-3">
                      <Label className="text-base">{q.q}</Label>
                      <RadioGroup
                        value={answers[instrument.name]?.[q.q]}
                        onValueChange={(value) => handleAnswerChange(instrument.name, q.q, value)}
                        className="space-y-2"
                      >
                        {q.o.map((option) => (
                          <div key={option} className="flex items-center space-x-2">
                            <RadioGroupItem value={option} id={`${q.q}-${option}`} />
                            <Label htmlFor={`${q.q}-${option}`} className="font-normal">{option}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="flex justify-center pt-6">
            <Button onClick={handleSubmit} disabled={!allQuestionsAnswered()} size="lg">
              Submit & View My Report
            </Button>
          </div>
           {!allQuestionsAnswered() && 
            <p className="text-center text-sm text-muted-foreground">
                Please answer all questions to enable the submit button.
            </p>
           }
        </CardContent>
      </Card>
    </div>
  );
}
