'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { motion } from 'motion/react'
import { 
  ArrowLeft,
  User,
  Mail,
  Calendar,
  DollarSign,
  MessageSquare,
  CheckCircle,
  Clock,
  AlertCircle,
  Edit,
  Save,
  X
} from 'lucide-react'

interface ProjectDetails {
  id: string
  name: string
  description: string
  website: string
  logo: string
  category: string
  status: string
  timeline: string
  budget: string
  targetAudience: string
  features: string[]
  createdAt: string
  updatedAt: string
  user: {
    id: string
    name: string
    email: string
    userType: string
    createdAt: string
  }
  consultations: any[]
  milestones: any[]
  payments: any[]
}

export default function ProjectDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const [project, setProject] = useState<ProjectDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editStatus, setEditStatus] = useState('')

  useEffect(() => {
    if (params.id) {
      fetchProjectDetails()
    }
  }, [params.id])

  const fetchProjectDetails = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/admin/projects/${params.id}`)
      
      if (!response.ok) {
        if (response.status === 403) {
          setError('Admin access required')
          return
        }
        if (response.status === 404) {
          setError('Project not found')
          return
        }
        throw new Error('Failed to fetch project details')
      }

      const { project } = await response.json()
      setProject(project)
      setEditStatus(project.status)
    } catch (err) {
      console.error('Error fetching project details:', err)
      setError('Failed to load project details')
    } finally {
      setLoading(false)
    }
  }

  const updateProjectStatus = async () => {
    try {
      const response = await fetch(`/api/admin/projects/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: editStatus })
      })

      if (response.ok) {
        const { project } = await response.json()
        setProject(project)
        setIsEditing(false)
      }
    } catch (err) {
      console.error('Error updating project status:', err)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DRAFT': return 'bg-gray-100 text-gray-800'
      case 'IN_CONSULTATION': return 'bg-blue-100 text-blue-800'
      case 'IN_DEVELOPMENT': return 'bg-yellow-100 text-yellow-800'
      case 'IN_REVIEW': return 'bg-purple-100 text-purple-800'
      case 'COMPLETED': return 'bg-green-100 text-green-800'
      case 'CANCELLED': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading project details...</p>
        </div>
      </div>
    )
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {error || 'Project not found'}
          </h2>
          <Button onClick={() => router.push('/admin')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Button
                variant="outline"
                onClick={() => router.push('/admin')}
                className="mr-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
                <p className="text-gray-600">Project Details & Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className={getStatusColor(project.status)}>
                {project.status.replace('_', ' ')}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Project Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Project Overview</CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      {isEditing ? 'Cancel' : 'Edit Status'}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Description</label>
                    <p className="text-gray-900">{project.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Category</label>
                      <p className="text-gray-900">{project.category}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Timeline</label>
                      <p className="text-gray-900">{project.timeline}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Budget</label>
                      <p className="text-gray-900">{project.budget}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Target Audience</label>
                      <p className="text-gray-900">{project.targetAudience}</p>
                    </div>
                  </div>

                  {isEditing && (
                    <div className="border-t pt-4">
                      <label className="text-sm font-medium text-gray-700">Status</label>
                      <div className="flex items-center space-x-2 mt-2">
                        <select
                          value={editStatus}
                          onChange={(e) => setEditStatus(e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="DRAFT">Draft</option>
                          <option value="IN_CONSULTATION">In Consultation</option>
                          <option value="IN_DEVELOPMENT">In Development</option>
                          <option value="IN_REVIEW">In Review</option>
                          <option value="COMPLETED">Completed</option>
                          <option value="CANCELLED">Cancelled</option>
                        </select>
                        <Button onClick={updateProjectStatus} size="sm">
                          <Save className="h-4 w-4 mr-1" />
                          Save
                        </Button>
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="text-sm font-medium text-gray-700">Features</label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.features.map((feature, index) => (
                        <Badge key={index} variant="outline">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Consultations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageSquare className="h-5 w-5 mr-2" />
                    Consultations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {project.consultations.length > 0 ? (
                    <div className="space-y-4">
                      {project.consultations.map((consultation, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">{consultation.type.replace('_', ' ')}</p>
                              <p className="text-sm text-gray-600">
                                {formatDate(consultation.createdAt)}
                              </p>
                            </div>
                            <Badge className={getStatusColor(consultation.status)}>
                              {consultation.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No consultations yet</p>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Milestones */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Milestones
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {project.milestones.length > 0 ? (
                    <div className="space-y-4">
                      {project.milestones.map((milestone, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">{milestone.title}</p>
                              <p className="text-sm text-gray-600">{milestone.description}</p>
                              <p className="text-xs text-gray-500 mt-1">
                                {formatDate(milestone.createdAt)}
                              </p>
                            </div>
                            <Badge className={getStatusColor(milestone.status)}>
                              {milestone.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No milestones yet</p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Client Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Client Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Name</label>
                    <p className="text-gray-900">{project.user.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <p className="text-gray-900">{project.user.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">User Type</label>
                    <Badge variant="outline">{project.user.userType}</Badge>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Joined</label>
                    <p className="text-gray-900">{formatDate(project.user.createdAt)}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Payments */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSign className="h-5 w-5 mr-2" />
                    Payments
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {project.payments.length > 0 ? (
                    <div className="space-y-4">
                      {project.payments.map((payment, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">{formatCurrency(payment.amount)}</p>
                              <p className="text-sm text-gray-600">
                                {formatDate(payment.createdAt)}
                              </p>
                            </div>
                            <Badge className={getStatusColor(payment.status)}>
                              {payment.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No payments yet</p>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Project Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Created</label>
                      <p className="text-gray-900">{formatDate(project.createdAt)}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Last Updated</label>
                      <p className="text-gray-900">{formatDate(project.updatedAt)}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Expected Timeline</label>
                      <p className="text-gray-900">{project.timeline}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
