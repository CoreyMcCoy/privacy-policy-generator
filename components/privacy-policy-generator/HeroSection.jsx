// components/privacy-policy-generator/HeroSection.jsx
"use client";

import React from "react";
import { FileText, Shield, Zap, Copy as CopyIcon } from "lucide-react";
import { Button } from "@/components/ui/button"; // Adjust path if needed
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const HeroSection = ({ onStartBuilding }) => {
  return (
    <div>
      <main className="max-w-6xl mx-auto px-4 pt-12 md:pt-16">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
            Free Privacy Policy Generator
          </h1>

          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
            Answer a few questions and get a complete, legally compliant privacy
            policy that fits your business.
          </p>

          <Button
            onClick={onStartBuilding}
            className="gap-3 shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <FileText className="w-4 h-4" />
            Start Building Your Policy
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="shadow-xs border hover:shadow-sm transition-all duration-300 transform hover:-translate-y-1">
            <CardHeader>
              <div className="w-8 h-8 bg-blue-100 rounded-sm flex items-center justify-center">
                <Zap className="w-4 h-4 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <h3 className="text-xl font-bold mb-3">Fast & Simple</h3>
              <p className="text-muted-foreground leading-relaxed">
                Answer 8-10 questions and get a complete privacy policy. No
                legal jargon, no confusing forms.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-xs border hover:shadow-sm transition-all duration-300 transform hover:-translate-y-1">
            <CardHeader>
              <div className="w-8 h-8 bg-green-100 rounded-sm flex items-center justify-center">
                <Shield className="w-4 h-4 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <h3 className="text-xl font-bold mb-3">Actually Compliant</h3>
              <p className="text-muted-foreground leading-relaxed">
                Covers the basics you need for GDPR, CCPA, and general privacy
                best practices.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-xs border hover:shadow-sm transition-all duration-300 transform hover:-translate-y-1">
            <CardHeader>
              <div className="w-8 h-8 bg-purple-100 rounded-sm flex items-center justify-center">
                <CopyIcon className="w-4 h-4 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent>
              <h3 className="text-xl font-bold mb-3">Ready to Use</h3>
              <p className="text-muted-foreground leading-relaxed">
                Copy as beautifully formatted markdown. Paste it on your website
                and you're done.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default HeroSection;
