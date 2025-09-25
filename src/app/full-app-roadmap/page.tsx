"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle, Code, Database, Shield, CreditCard, Smartphone, Globe, Zap } from "lucide-react";

function BulbSproutIcon({ className = "" }: { className?: string }) {
  return (
    <span className={`relative inline-flex items-center justify-center ${className}`}>
      <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
        <path d="M11 3a1 1 0 10-2 0v1H8a1 1 0 00-1 1v1H5a1 1 0 00-1 1v8a2 2 0 002 2h8a2 2 0 002-2V7a1 1 0 00-1-1H9V3z" />
      </svg>
      <svg className="h-3 w-3 text-emerald-300 absolute" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 2L3 7v11a1 1 0 001 1h12a1 1 0 001-1V7l-7-5z" />
      </svg>
    </span>
  );
}

export default function FullAppRoadmap() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState("standard");

  const phases = [
    {
      id: 1,
      title: "Database Architecture",
      description: "Design and implement scalable database schema",
      duration: "Day 1",
      features: ["User management", "Data modeling", "API endpoints"],
      icon: Database,
      color: "blue"
    },
    {
      id: 2,
      title: "Authentication System",
      description: "Secure user login and registration",
      duration: "Day 2",
      features: ["Social login", "Password reset", "Session management"],
      icon: Shield,
      color: "green"
    },
    {
      id: 3,
      title: "Core Features",
      description: "Implement main application functionality",
      duration: "Days 3-4",
      features: ["User dashboard", "Content management", "Real-time updates"],
      icon: Code,
      color: "purple"
    },
    {
      id: 4,
      title: "Payment Integration",
      description: "Secure payment processing",
      duration: "Day 5",
      features: ["Stripe integration", "Subscription management", "Billing"],
      icon: CreditCard,
      color: "yellow"
    },
    {
      id: 5,
      title: "Mobile Optimization",
      description: "Responsive design and mobile features",
      duration: "Day 6",
      features: ["Mobile app", "Push notifications", "Offline support"],
      icon: Smartphone,
      color: "pink"
    },
    {
      id: 6,
      title: "Deployment & Testing",
      description: "Production deployment and quality assurance",
      duration: "Day 7",
      features: ["Cloud deployment", "Performance testing", "Security audit"],
      icon: Globe,
      color: "indigo"
    }
  ];

  const plans = [
    {
      id: "basic",
      name: "Basic App",
      price: "$5,000",
      duration: "1 week",
      features: [
        "User authentication",
        "Basic CRUD operations",
        "Simple UI/UX",
        "Basic mobile app",
        "Email support"
      ]
    },
    {
      id: "standard",
      name: "Standard App",
      price: "$10,000",
      duration: "1 week",
      features: [
        "Advanced authentication",
        "Real-time features",
        "Payment integration",
        "Advanced mobile app",
        "Push notifications",
        "Priority support"
      ]
    },
    {
      id: "premium",
      name: "Premium App",
      price: "$15,000",
      duration: "1 week",
      features: [
        "Enterprise authentication",
        "Advanced analytics",
        "Multiple payment methods",
        "Native mobile apps",
        "Real-time collaboration",
        "24/7 support"
      ]
    }
  ];

  const handleProceedToPayment = () => {
    router.push("/payment");
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
              <Button variant="outline" onClick={() => router.push("/full-app-consultation")}>
                Back to Consultation
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center shadow-xl">
              <Zap className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Full App Development Roadmap</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Your complete application will be built in <span className="font-semibold text-purple-600">7 days</span> with 
            advanced features, database integration, and production-ready deployment.
          </p>
        </motion.div>

        {/* Development Phases */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Development Timeline</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {phases.map((phase, index) => (
              <motion.div
                key={phase.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 bg-gradient-to-br from-${phase.color}-500 to-${phase.color}-600 rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <phase.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{phase.title}</CardTitle>
                    <CardDescription className="text-base">{phase.description}</CardDescription>
                    <Badge variant="secondary" className="w-fit mx-auto">
                      {phase.duration}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {phase.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Pricing Plans */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Choose Your Plan</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card 
                  className={`h-full cursor-pointer transition-all ${
                    selectedPlan === plan.id 
                      ? 'ring-2 ring-purple-500 shadow-xl scale-105' 
                      : 'hover:shadow-lg'
                  }`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <div className="text-4xl font-bold text-purple-600 mb-2">{plan.price}</div>
                    <CardDescription className="text-lg">{plan.duration}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* What's Included */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50">
              <CardTitle className="text-2xl text-center text-gray-900 font-bold">What&apos;s Included in Your Full App</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Database className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Database</h3>
                  <p className="text-sm text-gray-700 font-medium">Scalable data architecture</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Security</h3>
                  <p className="text-sm text-gray-700 font-medium">Enterprise-grade protection</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Smartphone className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Mobile</h3>
                  <p className="text-sm text-gray-700 font-medium">Native mobile apps</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="h-8 w-8 text-yellow-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Deployment</h3>
                  <p className="text-sm text-gray-700 font-medium">Production-ready hosting</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Build Your Full App?</h3>
            <p className="text-lg text-gray-600 mb-6">
              Selected plan: <span className="font-semibold text-purple-600">
                {plans.find(p => p.id === selectedPlan)?.name} - {plans.find(p => p.id === selectedPlan)?.price}
              </span>
            </p>
            <Button
              onClick={handleProceedToPayment}
              className="bg-black hover:bg-gray-800 text-white px-12 py-4 text-xl rounded-xl shadow-lg"
            >
              Proceed to Payment
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
