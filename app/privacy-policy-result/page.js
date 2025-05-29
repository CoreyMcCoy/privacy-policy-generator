'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Copy, Check, ArrowLeft, Download } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Button, buttonVariants } from '@/components/ui/button';

export default function PrivacyPolicyResultPage() {
  const router = useRouter();
  const [policy, setPolicy] = useState('');
  const [answers, setAnswers] = useState({});
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get the policy from localStorage
    const storedPolicy = localStorage.getItem('generatedPolicy');
    const storedAnswers = localStorage.getItem('policyAnswers');

    if (storedPolicy) {
      setPolicy(storedPolicy);
      if (storedAnswers) {
        setAnswers(JSON.parse(storedAnswers));
      }
    } else {
      // If no policy found, redirect back to generator
      router.push('/');
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
      console.error('Failed to copy:', err);
      alert('Failed to copy to clipboard');
    }
  };
  const downloadPolicy = () => {
    const element = document.createElement('a');
    const file = new Blob([policy], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = `${answers.businessName || 'privacy'}-policy.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const createNewPolicy = () => {
    // Clear the stored data and go back to generator
    sessionStorage.removeItem('generatedPolicy');
    sessionStorage.removeItem('policyAnswers');
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-primary"></div>
          <p className="mt-4 text-gray-600">Loading your privacy policy...</p>
        </div>
      </div>
    );
  }

  if (!policy) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Policy Not Found
          </h1>
          <p className="text-gray-600 mb-6">No generated policy was found.</p>
          <button onClick={() => router.push('/')} className="btn btn-primary">
            Create Privacy Policy
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {' '}
        {/* Header */}
        <div className="flex gap-4 mb-10 flex-row justify-between">
          <Button
            variant="ghost"
            onClick={() => router.push('/')}
            className="gap-2"
          >
            <ArrowLeft />
            Back to Generator
          </Button>

          <div className="flex gap-3">
            <Button size="icon" onClick={downloadPolicy}>
              <Download />
            </Button>
            <Button size="icon" onClick={copyToClipboard}>
              {copied ? <Check /> : <Copy />}
            </Button>
          </div>
        </div>
        {/* Success Message */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Your Privacy Policy is Ready!
          </h1>
          <p className="text-gray-600">
            Review the policy below and copy it to your website.
          </p>
        </div>
        {/* Policy Display */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900">
              Privacy Policy for {answers.businessName || 'Your Business'}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Generated on {new Date().toLocaleDateString()}
            </p>
          </div>{' '}
          <div className="p-8">
            <div className="whitespace-pre-wrap max-w-none prose-headings:text-gray-900 prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900">
              <ReactMarkdown>{policy}</ReactMarkdown>
            </div>
          </div>
        </div>
        {/* Disclaimer */}
        <div className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-2xl">
          <div className="flex items-start gap-3">
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
          </div>
        </div>
      </div>
    </div>
  );
}
