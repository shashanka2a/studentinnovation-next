"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "motion/react";
import { ArrowRight, Lightbulb, Sprout, Loader2, Shield, AlertCircle } from "lucide-react";

function BulbSproutIcon({ className = "" }: { className?: string }) {
  return (
    <span className={`relative inline-flex items-center justify-center ${className}`}>
      <Lightbulb className="h-5 w-5 text-white" />
      <Sprout className="h-3 w-3 text-emerald-300 absolute" />
    </span>
  );
}

export default function AdminLoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      // No authentication required for MVP
      // Store admin session
      localStorage.setItem('admin_authenticated', 'true');
      localStorage.setItem('admin_email', formData.email || 'admin@example.com');
      router.push('/admin/projects');
    } catch (error) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-slate-600 to-slate-800 rounded-lg flex items-center justify-center">
              <BulbSproutIcon />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Access</h1>
          <p className="mt-2 text-gray-600">Sign in to manage projects and clients</p>
        </motion.div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900 text-lg font-semibold">
                <Shield className="h-5 w-5 mr-2 text-blue-500" />
                Admin Login
              </CardTitle>
              <CardDescription className="text-gray-700 text-base">
                Enter your admin credentials to access the dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-md p-3 flex items-center space-x-2">
                    <AlertCircle className="h-4 w-4 text-red-500" />
                    <span className="text-sm text-red-700">{error}</span>
                  </div>
                )}

                <div>
                  <Label htmlFor="email" className="text-gray-900 font-medium">Admin Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="jagannathamshashank@gmail.com"
                    className="text-gray-900 placeholder:text-gray-500"
                  />
                </div>

                <div>
                  <Label htmlFor="password" className="text-gray-900 font-medium">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    className="text-gray-900 placeholder:text-gray-500"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-black hover:bg-gray-800 text-white transition-all duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    <>
                      Access Admin Dashboard
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>

              {/* Admin Credentials Info */}
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
                <h4 className="text-sm font-semibold text-blue-800 mb-2">Demo Admin Credentials:</h4>
                <div className="text-sm text-blue-700 space-y-1">
                  <p><strong>Email:</strong> jagannathamshashank@gmail.com</p>
                  <p><strong>Password:</strong> admin123</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Back to Main Site */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Button
            variant="outline"
            onClick={() => router.push('/')}
            className="text-gray-600 hover:text-gray-800"
          >
            ← Back to Main Site
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
