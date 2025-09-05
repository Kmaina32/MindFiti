"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { aiJournalSummary, AiJournalSummaryOutput } from "@/ai/flows/ai-journal-summary";
import { detectCrisisRisk, DetectCrisisRiskOutput } from "@/ai/flows/crisis-risk-detection";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function JournalPage() {
  const [entry, setEntry] = useState("");
  const [analysis, setAnalysis] = useState<AiJournalSummaryOutput | null>(null);
  const [crisisRisk, setCrisisRisk] = useState<DetectCrisisRiskOutput | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    setAnalysis(null);
    setCrisisRisk(null);

    try {
      const [summaryResult, crisisResult] = await Promise.all([
        aiJournalSummary({ text: entry }),
        detectCrisisRisk({ text: entry }),
      ]);

      setAnalysis(summaryResult);

      if (crisisResult.riskDetected) {
        setCrisisRisk(crisisResult);
      }
    } catch (error) {
      console.error("Error analyzing journal entry:", error);
    } finally {
      setLoading(false);
    }
  };

  const getSentimentBadgeVariant = (score: number) => {
    if (score > 0.3) return "default";
    if (score < -0.3) return "destructive";
    return "secondary";
  };
  
  const getSentimentText = (score: number) => {
    if (score > 0.3) return "Positive";
    if (score < -0.3) return "Negative";
    return "Neutral";
  };


  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>My Journal</CardTitle>
          <CardDescription>
            Write down your thoughts and feelings. Our AI will provide a summary
            and sentiment analysis.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Start writing your thoughts here..."
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            rows={10}
            className="text-base"
          />
        </CardContent>
        <CardFooter>
          <Button onClick={handleAnalyze} disabled={loading || !entry}>
            {loading ? "Analyzing..." : "Analyze Entry"}
          </Button>
        </CardFooter>
      </Card>
      {crisisRisk && crisisRisk.riskDetected && (
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Crisis Risk Detected</AlertTitle>
          <AlertDescription>
            <p className="mb-2">It seems like you're going through a difficult time. Please know there is support available. Here are some immediate actions you can take:</p>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              {crisisRisk.suggestedActions.map((action: string, index: number) => (
                <li key={index}>{action}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}
      {loading && (
        <Card>
          <CardHeader>
            <CardTitle>AI Analysis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Summary</h3>
                <Skeleton className="h-12 w-full" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Sentiment</h3>
                <Skeleton className="h-8 w-24" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Tags</h3>
                 <div className="flex flex-wrap gap-2">
                    <Skeleton className="h-6 w-20 rounded-full" />
                    <Skeleton className="h-6 w-24 rounded-full" />
                    <Skeleton className="h-6 w-16 rounded-full" />
                 </div>
              </div>
          </CardContent>
        </Card>
      )}
      {analysis && !loading && (
        <Card>
          <CardHeader>
            <CardTitle>AI Analysis</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6">
              <div>
                <h3 className="font-semibold text-lg">Summary</h3>
                <p className="text-muted-foreground mt-2">{analysis.summary}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-lg">Sentiment</h3>
                  <div className="mt-2">
                    <Badge variant={getSentimentBadgeVariant(analysis.sentimentScore)}>
                      {getSentimentText(analysis.sentimentScore)} (Score: {analysis.sentimentScore.toFixed(2)})
                    </Badge>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Privacy-Preserving Tags</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {analysis.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
