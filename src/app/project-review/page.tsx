"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle, Edit, Clock, Target, Palette, Code, Loader2 } from "lucide-react";

function BulbSproutIcon({ className = "" }: { className?: string }) {
  return (
    <span className={`relative inline-flex items-center justify-center ${className}`}>
      <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
        <path d="M11 3a1 1 0 10-2 0v1H8a1 1 0 00-1 1v1H5a1 1 0 00-1 1v8a2 2 0 002 2h8a2 2 0 002-2V7a1 1 0 00-1-1h-1V5a1 1 0 00-1-1H9V3z" />
      </svg>
      <svg className="h-3 w-3 text-emerald-300 absolute" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 2L3 7v11a1 1 0 001 1h12a1 1 0 001-1V7l-7-5z" />
      </svg>
    </span>
  );
}

export default function ProjectReview() {
  const router = useRouter();
  const [isConfirming, setIsConfirming] = useState(false);

  // Mock project data - in real app, this would come from context/API
  const projectData = {
    name: "EcoTrack",
    description: "A mobile app to track carbon footprint and suggest eco-friendly alternatives",
    category: "Landing Page",
    targetAudience: "Environmentally conscious individuals",
    heroHeadline: "Track Your Carbon Footprint",
    heroSubheadline: "Make sustainable choices with our easy-to-use tracking app",
    primaryCTA: "Get Started",
    aboutContent: "EcoTrack helps individuals understand and reduce their environmental impact through smart tracking and personalized recommendations.",
    keyFeatures: [
      "Carbon footprint calculator",
      "Eco-friendly product recommendations", 
      "Progress tracking dashboard",
      "Social sharing features"
    ],
    brandColors: {
      primary: "#10B981",
      secondary: "#059669", 
      accent: "#F59E0B"
    },
    brandVoice: "friendly",
    layoutStyle: "modern",
    imageStyle: "photography",
    domain: "ecotrack.app",
    hosting: "managed",
    seo: true,
    analytics: true,
    contactEmail: "hello@ecotrack.app",
    timeline: "2 days",
    budget: "$500"
  };

  const handleConfirm = () => {
    setIsConfirming(true);
    // Simulate processing with smooth transition
    setTimeout(() => {
      router.push("/awaiting-developer");
    }, 1200);
  };

  const handleEdit = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-slate-600 to-slate-800 rounded-lg flex items-center justify-center">
                <BulbSproutIcon />
              </div>
              <span className="text-xl text-black font-semibold">gatorinnovation</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={handleEdit}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Details
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Review Your Landing Page</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Please review your landing page details below. Once confirmed, we&apos;ll start building your professional landing page in 2 days.
          </p>
        </motion.div>

        {/* Project Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {/* Basic Info */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
              <CardTitle className="flex items-center text-xl text-gray-900 font-bold">
                <Target className="h-6 w-6 mr-3 text-blue-600" />
                Project Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{projectData.name}</h3>
                  <p className="text-gray-700 mb-4 font-medium">{projectData.description}</p>
                  <Badge variant="secondary" className="text-sm">
                    {projectData.category}
                  </Badge>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Target Audience</h4>
                    <p className="text-gray-700 font-medium">{projectData.targetAudience}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Timeline</h4>
                    <p className="text-gray-700 font-medium">{projectData.timeline}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Budget Range</h4>
                    <p className="text-gray-700 font-medium">{projectData.budget}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Landing Page Preview */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50">
              <CardTitle className="flex items-center text-xl">
                <Palette className="h-6 w-6 mr-3 text-green-600" />
                Landing Page Preview
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="bg-gray-50 rounded-lg p-6 border-2 border-dashed border-gray-300">
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-2" style={{ color: projectData.brandColors.primary }}>
                    {projectData.heroHeadline}
                  </h2>
                  <p className="text-gray-600 mb-4">{projectData.heroSubheadline}</p>
                  <button 
                    className="px-6 py-2 rounded-lg text-white font-semibold"
                    style={{ backgroundColor: projectData.brandColors.primary }}
                  >
                    {projectData.primaryCTA}
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Features */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50">
              <CardTitle className="flex items-center text-xl">
                <Code className="h-6 w-6 mr-3 text-green-600" />
                Key Features
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-4">
                {projectData.keyFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tech Stack */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
              <CardTitle className="flex items-center text-xl">
                <Palette className="h-6 w-6 mr-3 text-purple-600" />
                Technology Stack
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-wrap gap-3">
                {projectData.techStack.map((tech, index) => (
                  <Badge key={index} variant="outline" className="px-4 py-2 text-sm">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="shadow-lg border-2 border-blue-200">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="flex items-center text-xl">
                <Clock className="h-6 w-6 mr-3 text-blue-600" />
                What Happens Next?
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Landing Page Development</h4>
                    <p className="text-gray-600">We&apos;ll create your landing page in 2 days</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Review & Feedback</h4>
                    <p className="text-gray-600">You&apos;ll review the landing page and provide feedback</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Optional: Full App Development</h4>
                    <p className="text-gray-600">Upgrade to full application development if needed</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
        >
            <Button
              onClick={handleConfirm}
              disabled={isConfirming}
              className="bg-black hover:bg-gray-800 text-white px-8 py-3 text-lg rounded-xl shadow-lg transition-all duration-300"
            >
              {isConfirming ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Confirming & Starting Development...
                </>
              ) : (
                <>
                  Confirm & Start Development
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          <Button
            variant="outline"
            onClick={handleEdit}
            className="px-8 py-3 text-lg rounded-xl"
          >
            <Edit className="mr-2 h-5 w-5" />
            Edit Details
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
