"use client"

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { motion } from "motion/react";
import { 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  Edit, 
  Eye, 
  Link, 
  Upload, 
  User, 
  Calendar,
  Palette,
  Code,
  Globe,
  Image as ImageIcon,
  Loader2
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
  user: {
    name: string;
    email: string;
  };
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateData, setUpdateData] = useState({
    landingPageUrl: '',
    adminNotes: '',
    screenshots: [] as string[]
  });

  useEffect(() => {
    // No authentication required for MVP
    fetchProjects();
  }, [router]);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/admin/projects');
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

  const handleUpdateProject = async (projectId: string) => {
    setIsUpdating(true);
    try {
      const response = await fetch(`/api/admin/projects/${projectId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData)
      });

      if (response.ok) {
        await fetchProjects();
        setSelectedProject(null);
        setUpdateData({ landingPageUrl: '', adminNotes: '', screenshots: [] });
      }
    } catch (error) {
      console.error('Error updating project:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_authenticated');
    localStorage.removeItem('admin_email');
    router.push('/admin/login');
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
      case 'DRAFT': return <Edit className="h-4 w-4" />;
      case 'IN_DEVELOPMENT': return <Clock className="h-4 w-4" />;
      case 'IN_REVIEW': return <Eye className="h-4 w-4" />;
      case 'COMPLETED': return <CheckCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading projects...</p>
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
              <span className="text-xl text-black font-semibold">Admin Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Project Management</span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
                <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                  <Eye className="h-4 w-4 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">In Review</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {projects.filter(p => p.status === 'IN_REVIEW').length}
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

        {/* Projects List */}
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
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{project.user.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {new Date(project.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Palette className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{project.layoutStyle}</span>
                    </div>
                  </div>
                  
                  {project.landingPageUrl && (
                    <div className="flex items-center space-x-2 mb-4">
                      <Link className="h-4 w-4 text-green-600" />
                      <a 
                        href={project.landingPageUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-green-600 hover:text-green-700 text-sm"
                      >
                        View Landing Page
                      </a>
                    </div>
                  )}
                  
                  {project.screenshots.length > 0 && (
                    <div className="flex items-center space-x-2 mb-4">
                      <ImageIcon className="h-4 w-4 text-blue-600" />
                      <span className="text-sm text-blue-600">
                        {project.screenshots.length} screenshot(s) uploaded
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedProject(project);
                      setUpdateData({
                        landingPageUrl: project.landingPageUrl || '',
                        adminNotes: project.adminNotes || '',
                        screenshots: project.screenshots || []
                      });
                    }}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Update
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Update Modal */}
        {selectedProject && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle>Update Project: {selectedProject.name}</CardTitle>
                <CardDescription>
                  Update project status, add landing page URL, screenshots, and notes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="landingPageUrl">Landing Page URL</Label>
                  <Input
                    id="landingPageUrl"
                    value={updateData.landingPageUrl}
                    onChange={(e) => setUpdateData(prev => ({ ...prev, landingPageUrl: e.target.value }))}
                    placeholder="https://yourlandingpage.com"
                  />
                </div>
                
                <div>
                  <Label htmlFor="adminNotes">Admin Notes</Label>
                  <textarea
                    id="adminNotes"
                    value={updateData.adminNotes}
                    onChange={(e) => setUpdateData(prev => ({ ...prev, adminNotes: e.target.value }))}
                    placeholder="Add notes about the project status, issues, or next steps..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 text-gray-900 bg-white h-24"
                  />
                </div>
                
                <div>
                  <Label>Screenshots</Label>
                  <div className="mt-2">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Upload screenshots of the landing page
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-4">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedProject(null)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => handleUpdateProject(selectedProject.id)}
                    disabled={isUpdating}
                  >
                    {isUpdating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      <>
                        Update Project
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
