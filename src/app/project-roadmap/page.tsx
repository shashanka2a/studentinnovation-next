"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "motion/react";
import { ArrowRight, Lightbulb, Sprout, CheckCircle, Clock, DollarSign, Users, Zap, Star, ArrowLeft } from "lucide-react";

function BulbSproutIcon({ className = "" }: { className?: string }) {
  return (
    <span className={`relative inline-flex items-center justify-center ${className}`}>
      <Lightbulb className="h-5 w-5 text-white" />
      <Sprout className="h-3 w-3 text-emerald-300 absolute" />
    </span>
  );
}

export default function ProjectRoadmapPage() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const roadmap = {
    projectName: "MyAwesomeApp",
    timeline: "1 week",
    budget: "$2,500",
    features: [
      "User authentication system",
      "Dashboard with analytics",
      "Mobile-responsive design",
      "Payment integration",
      "Admin panel"
    ],
    phases: [
      {
        phase: 1,
        title: "Design & Planning",
        duration: "Day 1-2",
        tasks: [
          "UI/UX wireframes",
          "Database schema design",
          "API architecture planning",
          "Brand identity creation"
        ],
        deliverables: ["Wireframes", "Design system", "Technical specification"]
      },
      {
        phase: 2,
        title: "Core Development",
        duration: "Day 3-5",
        tasks: [
          "Frontend development",
          "Backend API development",
          "Database setup",
          "Authentication implementation"
        ],
        deliverables: ["Working prototype", "API endpoints", "Database"]
      },
      {
        phase: 3,
        title: "Integration & Testing",
        duration: "Day 6-7",
        tasks: [
          "Feature integration",
          "Payment system setup",
          "Testing & bug fixes",
          "Performance optimization"
        ],
        deliverables: ["Production-ready app", "Test reports", "Documentation"]
      }
    ]
  };

  const plans = [
    {
      id: "landing",
      name: "Landing Page",
      price: "$500",
      duration: "2 days",
      features: [
        "Custom landing page",
        "Contact form",
        "Mobile responsive",
        "SEO optimized"
      ],
      popular: false
    },
    {
      id: "mvp",
      name: "Full MVP",
      price: "$2,500",
      duration: "1 week",
      features: [
        "Complete web application",
        "User authentication",
        "Database integration",
        "Payment processing",
        "Admin dashboard",
        "Mobile responsive"
      ],
      popular: true
    },
    {
      id: "premium",
      name: "Premium Package",
      price: "$5,000",
      duration: "2 weeks",
      features: [
        "Everything in MVP",
        "Mobile app (React Native)",
        "Advanced analytics",
        "Third-party integrations",
        "Custom features",
        "Priority support"
      ],
      popular: false
    }
  ];

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
  };

  const proceedToPayment = () => {
    if (selectedPlan) {
      router.push("/payment");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-slate-600 to-slate-800 rounded-lg flex items-center justify-center">
                <BulbSproutIcon />
              </div>
              <span className="text-xl text-black font-semibold">gatorinnovation</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={() => router.back()}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Project Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Project Roadmap</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Based on our AI consultation, here&apos;s your personalized development plan
          </p>
        </motion.div>

        {/* Project Summary */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="h-5 w-5 mr-2 text-yellow-500" />
              Project Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Project</h3>
                <p className="text-sm text-gray-600">{roadmap.projectName}</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Timeline</h3>
                <p className="text-sm text-gray-600">{roadmap.timeline}</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <DollarSign className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Budget</h3>
                <p className="text-sm text-gray-600">{roadmap.budget}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Development Phases */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Development Phases</h2>
          <div className="space-y-6">
            {roadmap.phases.map((phase, index) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center">
                          <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center mr-3">
                            {phase.phase}
                          </div>
                          {phase.title}
                        </CardTitle>
                        <CardDescription>{phase.duration}</CardDescription>
                      </div>
                      <Badge variant="outline">{phase.duration}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Tasks</h4>
                        <ul className="space-y-2">
                          {phase.tasks.map((task, taskIndex) => (
                            <li key={taskIndex} className="flex items-center text-sm text-gray-600">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                              {task}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Deliverables</h4>
                        <ul className="space-y-2">
                          {phase.deliverables.map((deliverable, deliverableIndex) => (
                            <li key={deliverableIndex} className="flex items-center text-sm text-gray-600">
                              <Star className="h-4 w-4 text-yellow-500 mr-2" />
                              {deliverable}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Pricing Plans */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Package</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card 
                  className={`cursor-pointer transition-all ${
                    selectedPlan === plan.id 
                      ? 'ring-2 ring-black border-black' 
                      : 'hover:shadow-lg'
                  } ${plan.popular ? 'border-2 border-yellow-400' : ''}`}
                  onClick={() => handleSelectPlan(plan.id)}
                >
                  {plan.popular && (
                    <div className="bg-yellow-400 text-black text-center py-1 text-sm font-semibold">
                      Most Popular
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-center">{plan.name}</CardTitle>
                    <div className="text-center">
                      <span className="text-3xl font-bold text-black">{plan.price}</span>
                      <span className="text-gray-600 ml-2">/ {plan.duration}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className={`w-full mt-6 ${
                        selectedPlan === plan.id 
                          ? 'bg-black text-white' 
                          : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                      }`}
                    >
                      {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          <Button
            variant="outline"
            onClick={() => router.push("/ai-consultation")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Consultation
          </Button>
          <Button
            onClick={proceedToPayment}
            disabled={!selectedPlan}
            className="bg-black hover:bg-gray-800 text-white"
          >
            Proceed to Payment
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Guarantees */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 text-blue-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Fast Delivery</h3>
              <p className="text-sm text-gray-600">Landing pages in 2 days, full apps in 1 week</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Quality Guaranteed</h3>
              <p className="text-sm text-gray-600">Unlimited revisions until you&apos;re satisfied</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Star className="h-8 w-8 text-yellow-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Expert Team</h3>
              <p className="text-sm text-gray-600">Student entrepreneurs who understand your needs</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
