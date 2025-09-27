"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "motion/react";
import { ArrowRight, Plus, Lightbulb, Sprout, Sparkles, Clock, CheckCircle, Loader2 } from "lucide-react";

function BulbSproutIcon({ className = "" }: { className?: string }) {
  return (
    <span className={`relative inline-flex items-center justify-center ${className}`}>
      <Lightbulb className="h-5 w-5 text-white" />
      <Sprout className="h-3 w-3 text-emerald-300 absolute" />
    </span>
  );
}

export default function NewProjectPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [projectData, setProjectData] = useState({
    // Basic Info
    name: "",
    description: "",
    website: "",
    logo: null as File | null,
    targetAudience: "",
    
    // Landing Page Specific
    heroHeadline: "",
    heroSubheadline: "",
    heroImage: null as File | null,
    primaryCTA: "",
    secondaryCTA: "",
    aboutContent: "",
    keyFeatures: [] as string[],
    benefits: [] as string[],
    testimonials: [] as string[],
    teamInfo: "",
    contactEmail: "",
    contactPhone: "",
    socialLinks: {
      twitter: "",
      linkedin: "",
      instagram: "",
      facebook: ""
    },
    
    // Design Preferences
    brandColors: {
      primary: "#3B82F6",
      secondary: "#1E40AF",
      accent: "#F59E0B"
    },
    brandVoice: "professional",
    layoutStyle: "modern",
    imageStyle: "photography",
    
    // Technical Requirements
    domain: "",
    hosting: "managed",
    seo: true,
    analytics: true,
    
    // Project Type & Pricing
    projectType: "landing-page",
    budget: "",
    timeline: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProjectData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProjectData(prev => ({
        ...prev,
        logo: e.target.files![0]
      }));
    }
  };

  const addFeature = () => {
    const feature = prompt("Add a feature:");
    if (feature) {
      setProjectData(prev => ({
        ...prev,
        keyFeatures: [...prev.keyFeatures, feature]
      }));
    }
  };

  const removeFeature = (index: number) => {
    setProjectData(prev => ({
      ...prev,
      keyFeatures: prev.keyFeatures.filter((_, i) => i !== index)
    }));
  };

  const nextStep = async () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit project data to database
      setIsLoading(true);
      try {
        const response = await fetch('/api/projects', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(projectData)
        });

        if (response.ok) {
          const result = await response.json();
          console.log('Project created:', result);
          router.push("/client-dashboard");
        } else {
          console.error('Failed to create project');
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error creating project:', error);
        setIsLoading(false);
      }
    }
  };

  const steps = [
    { number: 1, title: "Project Overview", description: "Basic information about your project" },
    { number: 2, title: "Content & Features", description: "What content and features you need" },
    { number: 3, title: "Design & Branding", description: "Your brand preferences and style" },
    { number: 4, title: "Technical Setup", description: "Domain, hosting, and technical requirements" }
  ];

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
              <span className="text-sm text-gray-600">New Project</span>
              <Button variant="outline" size="sm" onClick={() => router.push("/client-dashboard")}>
                Back to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  currentStep >= step.number ? 'bg-black text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {currentStep > step.number ? <CheckCircle className="h-4 w-4" /> : step.number}
                </div>
                <div className="ml-3">
                  <p className={`text-sm font-medium ${
                    currentStep >= step.number ? 'text-black' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-500">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    currentStep > step.number ? 'bg-black' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900 text-xl font-bold">
                <Sparkles className="h-5 w-5 mr-2 text-yellow-500" />
                {steps[currentStep - 1].title}
              </CardTitle>
              <CardDescription className="text-gray-700 text-base font-medium">
                {steps[currentStep - 1].description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {currentStep === 1 && (
                <>
                  <div>
                    <Label htmlFor="name" className="text-gray-900 font-semibold">Project Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={projectData.name}
                      onChange={handleInputChange}
                      placeholder="e.g., MyAwesomeApp"
                      className="text-gray-900 placeholder:text-gray-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description" className="text-gray-900 font-semibold">One-liner Description</Label>
                    <Input
                      id="description"
                      name="description"
                      value={projectData.description}
                      onChange={handleInputChange}
                      placeholder="A brief description of what you're building"
                      className="text-gray-900 placeholder:text-gray-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="targetAudience" className="text-gray-900 font-semibold">Target Audience</Label>
                    <Input
                      id="targetAudience"
                      name="targetAudience"
                      value={projectData.targetAudience}
                      onChange={handleInputChange}
                      placeholder="Who will use your product?"
                      className="text-gray-900 placeholder:text-gray-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="website" className="text-gray-900 font-semibold">Current Website (if any)</Label>
                    <Input
                      id="website"
                      name="website"
                      value={projectData.website}
                      onChange={handleInputChange}
                      placeholder="https://yourwebsite.com"
                      className="text-gray-900 placeholder:text-gray-500"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-900 font-semibold">Logo Upload</Label>
                    <div className="mt-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
                      />
                      {projectData.logo && (
                        <p className="mt-2 text-sm text-green-600 flex items-center">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Logo uploaded: {projectData.logo.name}
                        </p>
                      )}
                    </div>
                  </div>
                </>
              )}

              {currentStep === 2 && (
                <>
                  <div>
                    <Label htmlFor="heroHeadline" className="text-gray-900 font-semibold">Hero Headline</Label>
                    <Input
                      id="heroHeadline"
                      name="heroHeadline"
                      value={projectData.heroHeadline}
                      onChange={handleInputChange}
                      placeholder="Your main headline that grabs attention"
                      className="text-gray-900 placeholder:text-gray-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="heroSubheadline" className="text-gray-900 font-semibold">Hero Subheadline</Label>
                    <Input
                      id="heroSubheadline"
                      name="heroSubheadline"
                      value={projectData.heroSubheadline}
                      onChange={handleInputChange}
                      placeholder="Supporting text that explains your value proposition"
                      className="text-gray-900 placeholder:text-gray-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="primaryCTA" className="text-gray-900 font-semibold">Primary Call-to-Action</Label>
                    <Input
                      id="primaryCTA"
                      name="primaryCTA"
                      value={projectData.primaryCTA}
                      onChange={handleInputChange}
                      placeholder="e.g., Get Started, Sign Up, Learn More"
                      className="text-gray-900 placeholder:text-gray-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="aboutContent" className="text-gray-900 font-semibold">About Section Content</Label>
                    <textarea
                      id="aboutContent"
                      name="aboutContent"
                      value={projectData.aboutContent}
                      onChange={handleInputChange}
                      placeholder="Tell your story and explain what you do"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 text-gray-900 bg-white h-24"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-900 font-semibold">Key Features</Label>
                    <div className="mt-2 space-y-2">
                      {projectData.keyFeatures.map((feature, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                          <span className="text-gray-900 font-medium">{feature}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFeature(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        onClick={addFeature}
                        className="w-full"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Feature
                      </Button>
                    </div>
                  </div>
                </>
              )}

              {currentStep === 3 && (
                <>
                  <div>
                    <Label className="text-gray-900 font-semibold">Brand Colors</Label>
                    <div className="grid grid-cols-3 gap-4 mt-2">
                      <div>
                        <Label htmlFor="primaryColor" className="text-sm text-gray-600">Primary Color</Label>
                        <Input
                          id="primaryColor"
                          type="color"
                          value={projectData.brandColors.primary}
                          onChange={(e) => setProjectData(prev => ({
                            ...prev,
                            brandColors: { ...prev.brandColors, primary: e.target.value }
                          }))}
                          className="h-10"
                        />
                      </div>
                      <div>
                        <Label htmlFor="secondaryColor" className="text-sm text-gray-600">Secondary Color</Label>
                        <Input
                          id="secondaryColor"
                          type="color"
                          value={projectData.brandColors.secondary}
                          onChange={(e) => setProjectData(prev => ({
                            ...prev,
                            brandColors: { ...prev.brandColors, secondary: e.target.value }
                          }))}
                          className="h-10"
                        />
                      </div>
                      <div>
                        <Label htmlFor="accentColor" className="text-sm text-gray-600">Accent Color</Label>
                        <Input
                          id="accentColor"
                          type="color"
                          value={projectData.brandColors.accent}
                          onChange={(e) => setProjectData(prev => ({
                            ...prev,
                            brandColors: { ...prev.brandColors, accent: e.target.value }
                          }))}
                          className="h-10"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="brandVoice" className="text-gray-900 font-semibold">Brand Voice</Label>
                    <select
                      id="brandVoice"
                      name="brandVoice"
                      value={projectData.brandVoice}
                      onChange={(e) => setProjectData(prev => ({ ...prev, brandVoice: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 text-gray-900 bg-white"
                    >
                      <option value="professional">Professional</option>
                      <option value="friendly">Friendly</option>
                      <option value="casual">Casual</option>
                      <option value="authoritative">Authoritative</option>
                      <option value="creative">Creative</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="layoutStyle" className="text-gray-900 font-semibold">Layout Style</Label>
                    <select
                      id="layoutStyle"
                      name="layoutStyle"
                      value={projectData.layoutStyle}
                      onChange={(e) => setProjectData(prev => ({ ...prev, layoutStyle: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 text-gray-900 bg-white"
                    >
                      <option value="modern">Modern</option>
                      <option value="minimalist">Minimalist</option>
                      <option value="corporate">Corporate</option>
                      <option value="creative">Creative</option>
                      <option value="traditional">Traditional</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="imageStyle" className="text-gray-900 font-semibold">Image Style</Label>
                    <select
                      id="imageStyle"
                      name="imageStyle"
                      value={projectData.imageStyle}
                      onChange={(e) => setProjectData(prev => ({ ...prev, imageStyle: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 text-gray-900 bg-white"
                    >
                      <option value="photography">Photography</option>
                      <option value="illustrations">Illustrations</option>
                      <option value="graphics">Graphics</option>
                      <option value="mixed">Mixed</option>
                    </select>
                  </div>
                </>
              )}

              {currentStep === 4 && (
                <>
                  <div>
                    <Label htmlFor="domain" className="text-gray-900 font-semibold">Preferred Domain</Label>
                    <Input
                      id="domain"
                      name="domain"
                      value={projectData.domain}
                      onChange={handleInputChange}
                      placeholder="yourdomain.com"
                      className="text-gray-900 placeholder:text-gray-500"
                    />
                    <p className="text-sm text-gray-500 mt-1">We'll help you register this domain if available</p>
                  </div>
                  <div>
                    <Label htmlFor="hosting" className="text-gray-900 font-semibold">Hosting Preference</Label>
                    <select
                      id="hosting"
                      name="hosting"
                      value={projectData.hosting}
                      onChange={(e) => setProjectData(prev => ({ ...prev, hosting: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 text-gray-900 bg-white"
                    >
                      <option value="managed">Managed Hosting (Recommended)</option>
                      <option value="vps">VPS Hosting</option>
                      <option value="cloud">Cloud Hosting</option>
                      <option value="existing">I have existing hosting</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="seo"
                        checked={projectData.seo}
                        onChange={(e) => setProjectData(prev => ({ ...prev, seo: e.target.checked }))}
                        className="rounded"
                      />
                      <Label htmlFor="seo" className="text-gray-900 font-medium">SEO Optimization</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="analytics"
                        checked={projectData.analytics}
                        onChange={(e) => setProjectData(prev => ({ ...prev, analytics: e.target.checked }))}
                        className="rounded"
                      />
                      <Label htmlFor="analytics" className="text-gray-900 font-medium">Analytics Setup</Label>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="contactEmail" className="text-gray-900 font-semibold">Contact Email</Label>
                    <Input
                      id="contactEmail"
                      name="contactEmail"
                      type="email"
                      value={projectData.contactEmail}
                      onChange={handleInputChange}
                      placeholder="contact@yourdomain.com"
                      className="text-gray-900 placeholder:text-gray-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactPhone" className="text-gray-900 font-semibold">Contact Phone (Optional)</Label>
                    <Input
                      id="contactPhone"
                      name="contactPhone"
                      value={projectData.contactPhone}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 123-4567"
                      className="text-gray-900 placeholder:text-gray-500"
                    />
                  </div>
                </>
              )}

              <div className="flex justify-between pt-6">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                >
                  Previous
                </Button>
                <Button
                  onClick={nextStep}
                  className="bg-black hover:bg-gray-800 text-white transition-all duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Project...
                    </>
                  ) : (
                    <>
                      {currentStep === 4 ? "Create Project" : "Next Step"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-blue-500 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Fast Delivery</p>
                  <p className="text-xs text-gray-500">2 days to 1 week</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Sparkles className="h-8 w-8 text-yellow-500 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Smart Form</p>
                  <p className="text-xs text-gray-500">Comprehensive requirements</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-green-500 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Quality Assured</p>
                  <p className="text-xs text-gray-500">Professional results</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
