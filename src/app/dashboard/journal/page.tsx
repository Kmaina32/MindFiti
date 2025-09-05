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
import { aiJournalSummary } from "@/ai/flows/ai-journal-summary";
import { detectCrisisRisk } from "@/ai/flows/crisis-risk-detection";

export default function JournalPage() {
  const [entry, setEntry] = useState("");
  const [summary, setSummary] = useState("");
  const [sentiment, setSentiment] = useState<number | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [crisisRisk, setCrisisRisk] = useState<any>(null);

  const handleAnalyze = async () => {
    setLoading(true);
    setSummary("");
    setSentiment(null);
    setTags([]);
    setCrisisRisk(null);

    try {
      const [summaryResult, crisisResult] = await Promise.all([
        aiJournalSummary({ text: entry }),
        detectCrisisRisk({ text: entry }),
      ]);

      setSummary(summaryResult.summary);
      setSentiment(summaryResult.sentimentScore);
      setTags(summaryResult.tags);

      if (crisisResult.riskDetected) {
        setCrisisRisk(crisisResult);
      }
    } catch (error) {
      console.error("Error analyzing journal entry:", error);
    } finally {
      setLoading(false);
    }
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
            placeholder="Start writing..."
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            rows={10}
          />
        </CardContent>
        <CardFooter>
          <Button onClick={handleAnalyze} disabled={loading || !entry}>
            {loading ? "Analyzing..." : "Analyze Entry"}
          </Button>
        </CardFooter>
      </Card>
      {crisisRisk && (
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Crisis Risk Detected</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              It seems like you're going through a difficult time. Please reach out
              for help.
            </p>
            <ul className="mt-4 list-disc pl-5">
              {crisisRisk.suggestedActions.map((action: string, index: number) => (
                <li key={index}>{action}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
      {(summary || loading) && (
        <Card>
          <CardHeader>
            <CardTitle>AI Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p>Analyzing...</p>
            ) : (
              <div className="grid gap-4">
                <div>
                  <h3 className="font-semibold">Summary</h3>
                  <p>{summary}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Sentiment</h3>
                  <p>
                    {sentiment !== null
                      ? `Score: ${sentiment.toFixed(2)}`
                      : "N/A"}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <div
                        key={tag}
                        className="rounded-full bg-secondary px-3 py-1 text-sm"
                      >
                        {tag}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
