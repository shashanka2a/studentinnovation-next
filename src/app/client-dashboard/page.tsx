"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "motion/react";
import { 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  Eye, 
  Link, 
  User, 
  Calendar,
  Palette,
  Code,
  Globe,
  Image as ImageIcon,
  Loader2,
  Plus,
  Sparkles
} from "lucide-react";

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

interface Project {
  id: string;
  name: string;
  description: string;
  status: string;
  projectType: string;
  heroHeadline: string;
  heroSubheadline: string;
  primaryCTA: string;
  aboutContent: string;
  features: string[];
  brandPrimaryColor: string;
  brandSecondaryColor: string;
  brandAccentColor: string;
  brandVoice: string;
  layoutStyle: string;
  imageStyle: string;
  domain: string;
  contactEmail: string;
  contactPhone: string;
  landingPageUrl: string;
  screenshots: string[];
  adminNotes: string;
  createdAt: string;
  timeline: string;
  budget: string;
}

export default function ClientDashboardPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      if (response.ok) {
        const data = await response.json();
        setProjects(data.projects);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DRAFT': return 'bg-gray-100 text-gray-800';
      case 'IN_DEVELOPMENT': return 'bg-blue-100 text-blue-800';
      case 'IN_REVIEW': return 'bg-yellow-100 text-yellow-800';
      case 'COMPLETED': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'DRAFT': return <Clock className="h-4 w-4" />;
      case 'IN_DEVELOPMENT': return <Clock className="h-4 w-4" />;
      case 'IN_REVIEW': return <Eye className="h-4 w-4" />;
      case 'COMPLETED': return <CheckCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusMessage = (status: string) => {
    switch (status) {
      case 'DRAFT': return 'Your project is being prepared for development';
      case 'IN_DEVELOPMENT': return 'Your landing page is being built by our developers';
      case 'IN_REVIEW': return 'Your landing page is ready for review';
      case 'COMPLETED': return 'Your landing page is live and ready!';
      default: return 'Project status unknown';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading your projects...</p>
        </div>
      </div>
    );
  }

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
              <span className="text-sm text-gray-600">Welcome back!</span>
              <Button variant="outline" size="sm">Logout</Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Projects</h1>
          <p className="text-gray-600">Track the progress of your landing pages and applications</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <Clock className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">In Development</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {projects.filter(p => p.status === 'IN_DEVELOPMENT').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {projects.filter(p => p.status === 'COMPLETED').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                  <Globe className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Projects</p>
                  <p className="text-2xl font-bold text-gray-900">{projects.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Create New Project Button */}
        <div className="mb-8">
          <Button
            onClick={() => router.push('/new-project')}
            className="bg-black hover:bg-gray-800 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Start New Project
          </Button>
        </div>

        {/* Projects List */}
        {projects.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No projects yet</h3>
              <p className="text-gray-600 mb-6">Start your first project to get your landing page built in 2 days!</p>
              <Button
                onClick={() => router.push('/new-project')}
                className="bg-black hover:bg-gray-800 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Project
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-4">
                      <h3 className="text-xl font-semibold text-gray-900">{project.name}</h3>
                      <Badge className={getStatusColor(project.status)}>
                        <span className="flex items-center space-x-1">
                          {getStatusIcon(project.status)}
                          <span>{project.status.replace('_', ' ')}</span>
                        </span>
                      </Badge>
                      <Badge variant="outline">{project.projectType}</Badge>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Clock className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-800">Status Update</span>
                      </div>
                      <p className="text-sm text-blue-700">{getStatusMessage(project.status)}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          Created {new Date(project.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Palette className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{project.layoutStyle}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Code className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{project.timeline}</span>
                      </div>
                    </div>
                    
                    {project.landingPageUrl && (
                      <div className="flex items-center space-x-2 mb-4">
                        <Link className="h-4 w-4 text-green-600" />
                        <a 
                          href={project.landingPageUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-green-600 hover:text-green-700 text-sm font-medium"
                        >
                          View Your Landing Page →
                        </a>
                      </div>
                    )}
                    
                    {project.screenshots.length > 0 && (
                      <div className="flex items-center space-x-2 mb-4">
                        <ImageIcon className="h-4 w-4 text-blue-600" />
                        <span className="text-sm text-blue-600">
                          {project.screenshots.length} screenshot(s) available
                        </span>
                      </div>
                    )}
                    
                    {project.adminNotes && (
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Developer Notes</h4>
                        <p className="text-sm text-gray-700">{project.adminNotes}</p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
