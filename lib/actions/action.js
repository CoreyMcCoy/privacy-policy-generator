"use server";

import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function buildPrompt(answers) {
  const {
    businessType,
    businessName,
    contactEmail,
    dataCollection = [],
    dataUse = [],
    thirdPartySharing,
    thirdPartyServices = [],
    dataRetention,
    userRights = [],
  } = answers;

  // Map business types to readable descriptions
  const businessTypeMap = {
    website: "website",
    webapp: "web application",
    mobileapp: "mobile application",
    ecommerce: "e-commerce platform",
    saas: "SaaS platform",
    newsletter: "newsletter service",
    other: "digital service",
  };

  // Map data collection to detailed descriptions
  const dataCollectionMap = {
    name: "full names and display names",
    email: "email addresses for communication and account management",
    phone: "phone numbers for verification and support",
    address: "physical addresses for billing and shipping",
    payment: "payment information and billing details",
    usage: "usage analytics, page views, and interaction data",
    location: "location data and IP addresses",
    device: "device information, browser type, and technical specifications",
    cookies: "cookies, local storage, and tracking technologies",
  };

  // Map data usage to detailed descriptions
  const dataUseMap = {
    service: "provide and maintain our core service functionality",
    communication:
      "send important updates, notifications, and customer support",
    analytics: "analyze usage patterns and improve our service performance",
    marketing: "send promotional emails and marketing communications",
    personalization: "customize and personalize the user experience",
    security: "detect fraud, prevent abuse, and maintain security",
    legal: "comply with legal obligations and enforce our terms",
  };

  // Map third-party services to descriptions
  const thirdPartyMap = {
    "google-analytics": "Google Analytics for website traffic analysis",
    stripe: "Stripe for secure payment processing",
    mailchimp: "email marketing and newsletter services",
    aws: "Amazon Web Services for cloud hosting and infrastructure",
    intercom: "customer support and live chat services",
    hotjar: "user behavior analytics and heatmap tools",
    facebook: "Facebook and Meta advertising and analytics services",
    other: "additional third-party service providers",
  };

  const prompt = `You are an expert privacy policy attorney tasked with creating a comprehensive, legally-compliant privacy policy. Write a professional privacy policy that incorporates all the provided information. Make sure the policy is clear, thorough, and follows current privacy law best practices.

BUSINESS DETAILS:
- Business Name: ${businessName}
- Business Type: ${businessTypeMap[businessType] || businessType}
- Contact Email: ${contactEmail}

DATA COLLECTION:
The business collects the following types of personal information:
${dataCollection
  .map((item) => `- ${dataCollectionMap[item] || item}`)
  .join("\n")}

DATA USAGE:
The collected information is used to:
${dataUse.map((item) => `- ${dataUseMap[item] || item}`).join("\n")}

THIRD-PARTY SHARING:
${
  thirdPartySharing === "none"
    ? "The business does not share personal data with third parties."
    : `Data sharing approach: ${thirdPartySharing}`
}

${
  thirdPartyServices.length > 0
    ? `
THIRD-PARTY SERVICES:
The business uses these third-party services:
${thirdPartyServices
  .map((service) => `- ${thirdPartyMap[service] || service}`)
  .join("\n")}
`
    : ""
}

DATA RETENTION:
${
  dataRetention === "account-active"
    ? "Data is retained while the user account remains active."
    : `Data retention period: ${dataRetention?.replace("-", " ")}`
}

USER RIGHTS:
Users have the following rights regarding their personal data:
${userRights
  .map((right) => `- Right to ${right} their personal information`)
  .join("\n")}

REQUIREMENTS:
1. Write in clear, professional language that users can understand
2. Include all standard privacy policy sections
3. Make it legally compliant with GDPR, CCPA, and general privacy best practices
4. Format as clean markdown with proper headers (# ## ###), lists, and emphasis
5. Include proper legal disclaimers and update mechanisms
6. Be specific about data practices based on the provided information
7. Include contact information for privacy inquiries
8. Add sections about cookies, data security, and international transfers where relevant
9. Keep the tone professional but conversational
10. Ensure the policy is comprehensive and covers all major privacy concerns

Generate a complete privacy policy in markdown format now:`;

  return prompt;
}

export async function generatePrivacyPolicy(answers) {
  try {
    // Validate required fields
    if (!answers.businessName || !answers.contactEmail) {
      return {
        success: false,
        error: "Business name and contact email are required",
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(answers.contactEmail)) {
      return {
        success: false,
        error: "Please provide a valid email address",
      };
    }

    const prompt = buildPrompt(answers);

    const response = await client.responses.create({
      model: "gpt-4o",
      input: prompt,
    });

    const generatedPolicy = response.output_text;

    // Add generation timestamp and disclaimer
    const finalPolicy = `${generatedPolicy}

---

*This privacy policy was generated on ${new Date().toLocaleDateString()} and should be reviewed by a legal professional before implementation. Privacy laws vary by jurisdiction and change frequently.*`;

    return {
      success: true,
      policy: finalPolicy,
    };
  } catch (error) {
    console.error("Privacy policy generation failed:", error);

    // Handle specific API errors
    if (error.status === 401) {
      return {
        success: false,
        error: "API authentication failed. Please check your API key.",
      };
    }

    if (error.status === 429) {
      return {
        success: false,
        error: "Too many requests. Please try again in a moment.",
      };
    }

    if (error.status >= 500) {
      return {
        success: false,
        error: "Service temporarily unavailable. Please try again later.",
      };
    }

    return {
      success: false,
      error: "Failed to generate privacy policy. Please try again.",
    };
  }
}
