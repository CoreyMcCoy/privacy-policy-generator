// components/privacy-policy-generator/HeroSection.jsx
'use client';

import React from 'react';
import { FileText, Shield, Zap, Copy as CopyIcon } from 'lucide-react';
import { Button } from '@/components/ui/button'; // Adjust path if needed

const HeroSection = ({ onStartBuilding }) => {
  return (
    <div>
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl mb-8 shadow-lg">
            <Shield className="w-10 h-10 text-white" />
          </div>

          <h1 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Privacy Policy Generator
          </h1>

          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Look, nobody likes writing privacy policies. They're boring,
            confusing, and everyone just copies them anyway. We'll ask you a few
            questions and generate one that actually makes sense for your
            business.
          </p>

          <Button
            onClick={onStartBuilding}
            className="gap-3 shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <FileText className="w-5 h-5" />
            Start Building Your Policy
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
              <Zap className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Fast & Simple
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Answer 8-10 questions and get a complete privacy policy. No legal
              jargon, no confusing forms.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Actually Compliant
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Covers the basics you need for GDPR, CCPA, and general privacy
              best practices.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
              <CopyIcon className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Ready to Use
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Copy as beautifully formatted markdown. Paste it on your website
              and you're done.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
