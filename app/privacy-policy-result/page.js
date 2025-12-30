"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Copy, Check, ArrowLeft, Download } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default function PrivacyPolicyResultPage() {
  const router = useRouter();
  const [policy, setPolicy] = useState("");
  const [answers, setAnswers] = useState({});
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get the policy from localStorage
    const storedPolicy = localStorage.getItem("generatedPolicy");
    const storedAnswers = localStorage.getItem("policyAnswers");

    if (storedPolicy) {
      setPolicy(storedPolicy);
      if (storedAnswers) {
        setAnswers(JSON.parse(storedAnswers));
      }
    } else {
      // If no policy found, redirect back to generator
      router.push("/");
    }
    setLoading(false);
  }, [router]);

  const copyToClipboard = async () => {
    if (!policy) return;
    try {
      await navigator.clipboard.writeText(policy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
      alert("Failed to copy to clipboard");
    }
  };
  const downloadPolicy = () => {
    const element = document.createElement("a");
    const file = new Blob([policy], { type: "text/markdown" });
    element.href = URL.createObjectURL(file);
    element.download = `${answers.businessName || "privacy"}-policy.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const createNewPolicy = () => {
    // Clear the stored data and go back to generator
    sessionStorage.removeItem("generatedPolicy");
    sessionStorage.removeItem("policyAnswers");
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-primary"></div>
          <p className="mt-4 text-muted-foreground">
            Loading your privacy policy...
          </p>
        </div>
      </div>
    );
  }

  if (!policy) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Policy Not Found</h1>
          <p className="text-muted-foreground mb-6">
            No generated policy was found.
          </p>
          <Button onClick={() => router.push("/")}>
            Create Privacy Policy
          </Button>
        </div>
      </div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 pt-12">
      <div className="space-y-4">
        {/* Success Message */}
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">
            Your Privacy Policy is Ready!
          </h1>
          <p>Review the policy and copy it to your website.</p>
        </div>

        {/* Header */}
        <div className="flex gap-4 flex-row justify-between">
          <Button
            variant="ghost"
            onClick={() => router.push("/")}
            className="gap-2"
          >
            <ArrowLeft />
            Back to Generator
          </Button>

          <div className="flex gap-1.5">
            <Button variant="outline" size="icon" onClick={downloadPolicy}>
              <Download />
            </Button>
            <Button variant="outline" size="icon" onClick={copyToClipboard}>
              {copied ? <Check /> : <Copy />}
            </Button>
          </div>
        </div>

        {/* Policy Display */}
        <Card className="shadow-sm border overflow-hidden">
          <CardHeader>
            <h2 className="text-xl font-semibold">
              Privacy Policy for {answers.businessName || "Your Business"}
            </h2>
            <p className="text-sm text-muted-foreground">
              Generated on {new Date().toLocaleDateString()}
            </p>
          </CardHeader>
          <CardContent>
            <div className="whitespace-pre-wrap max-w-none prose-headings:text-normal prose-h1:text-2xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-base prose-li:text-base prose-strong:text-base">
              <ReactMarkdown>{policy}</ReactMarkdown>
            </div>
          </CardContent>
        </Card>
        {/* Disclaimer */}
        <Card className="bg-yellow-50/50 border rounded-2xl">
          <CardContent className="flex items-start gap-3">
            <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-sm font-bold">!</span>
            </div>
            <div>
              <h3 className="font-semibold text-yellow-800 mb-2">
                Important Legal Notice
              </h3>
              <p className="text-yellow-700 text-sm">
                This privacy policy was generated automatically and should be
                reviewed by a qualified legal professional before
                implementation. Privacy laws vary by jurisdiction and change
                frequently. Ensure compliance with all applicable laws in your
                region.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
