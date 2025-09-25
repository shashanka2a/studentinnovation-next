"use client"
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "motion/react";
import { Lightbulb, Sprout, CheckCircle, Clock, MessageSquare, FileText, Users, Calendar, AlertCircle } from "lucide-react";

function BulbSproutIcon({ className = "" }: { className?: string }) {
  return (
    <span className={`relative inline-flex items-center justify-center ${className}`}>
      <Lightbulb className="h-5 w-5 text-white" />
      <Sprout className="h-3 w-3 text-emerald-300 absolute" />
    </span>
  );
}

export default function ProjectManagementPage() {
  const [activeTab, setActiveTab] = useState("overview");

  const project = {
    name: "MyAwesomeApp",
    status: "In Development",
    progress: 35,
    startDate: "2024-01-15",
    endDate: "2024-01-22",
    team: [
      { name: "Sarah Chen", role: "Lead Developer", avatar: "SC" },
      { name: "Mike Rodriguez", role: "UI/UX Designer", avatar: "MR" },
      { name: "Alex Kim", role: "Backend Developer", avatar: "AK" }
    ]
  };

  const phases = [
    {
      id: 1,
      title: "Design & Planning",
      status: "completed",
      progress: 100,
      startDate: "2024-01-15",
      endDate: "2024-01-16",
      tasks: [
        { name: "UI/UX wireframes", status: "completed" },
        { name: "Database schema", status: "completed" },
        { name: "API architecture", status: "completed" },
        { name: "Brand identity", status: "completed" }
      ]
    },
    {
      id: 2,
      title: "Core Development",
      status: "in-progress",
      progress: 60,
      startDate: "2024-01-17",
      endDate: "2024-01-19",
      tasks: [
        { name: "Frontend development", status: "in-progress" },
        { name: "Backend API", status: "in-progress" },
        { name: "Database setup", status: "completed" },
        { name: "Authentication", status: "pending" }
      ]
    },
    {
      id: 3,
      title: "Integration & Testing",
      status: "pending",
      progress: 0,
      startDate: "2024-01-20",
      endDate: "2024-01-22",
      tasks: [
        { name: "Feature integration", status: "pending" },
        { name: "Payment system", status: "pending" },
        { name: "Testing & QA", status: "pending" },
        { name: "Performance optimization", status: "pending" }
      ]
    }
  ];

  const updates = [
    {
      id: 1,
      type: "progress",
      title: "Frontend Development Started",
      description: "Sarah has begun working on the main dashboard interface. Initial components are taking shape.",
      timestamp: "2 hours ago",
      author: "Sarah Chen"
    },
    {
      id: 2,
      type: "milestone",
      title: "Design Phase Completed",
      description: "All wireframes and design assets have been finalized and approved.",
      timestamp: "1 day ago",
      author: "Mike Rodriguez"
    },
    {
      id: 3,
      type: "question",
      title: "Payment Integration Question",
      description: "Need clarification on preferred payment gateway. Stripe or PayPal?",
      timestamp: "2 days ago",
      author: "Alex Kim"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-500";
      case "in-progress": return "bg-blue-500";
      case "pending": return "bg-gray-400";
      default: return "bg-gray-400";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed": return "Completed";
      case "in-progress": return "In Progress";
      case "pending": return "Pending";
      default: return "Unknown";
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
              <Badge variant="outline" className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {project.progress}% Complete
              </Badge>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Project Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
              <p className="text-gray-600 mt-2">Development Dashboard</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Project Status</p>
              <Badge className="bg-blue-100 text-blue-800">{project.status}</Badge>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Overall Progress</span>
              <span>{project.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-black h-2 rounded-full transition-all duration-500"
                style={{ width: `${project.progress}%` }}
              ></div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: "overview", label: "Overview", icon: FileText },
                { id: "timeline", label: "Timeline", icon: Calendar },
                { id: "team", label: "Team", icon: Users },
                { id: "updates", label: "Updates", icon: MessageSquare }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-black text-black'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-4 w-4 mr-2" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Project Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Project Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Start Date</span>
                    <span className="font-medium">{project.startDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">End Date</span>
                    <span className="font-medium">{project.endDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-medium">1 week</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Budget</span>
                    <span className="font-medium">$2,500</span>
                  </div>
                </CardContent>
              </Card>

              {/* Team Members */}
              <Card>
                <CardHeader>
                  <CardTitle>Development Team</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {project.team.map((member, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-700">{member.avatar}</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{member.name}</p>
                          <p className="text-sm text-gray-500">{member.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "timeline" && (
            <div className="space-y-6">
              {phases.map((phase, index) => (
                <motion.div
                  key={phase.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
                            getStatusColor(phase.status)
                          }`}>
                            {phase.id}
                          </div>
                          <div>
                            <CardTitle>{phase.title}</CardTitle>
                            <CardDescription>
                              {phase.startDate} - {phase.endDate}
                            </CardDescription>
                          </div>
                        </div>
                        <Badge variant="outline">
                          {getStatusText(phase.status)}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                          <span>Progress</span>
                          <span>{phase.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-500 ${
                              getStatusColor(phase.status)
                            }`}
                            style={{ width: `${phase.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {phase.tasks.map((task, taskIndex) => (
                          <div key={taskIndex} className="flex items-center space-x-3">
                            <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                              task.status === 'completed' ? 'bg-green-500' : 
                              task.status === 'in-progress' ? 'bg-blue-500' : 'bg-gray-300'
                            }`}>
                              {task.status === 'completed' && <CheckCircle className="h-3 w-3 text-white" />}
                            </div>
                            <span className={`text-sm ${
                              task.status === 'completed' ? 'text-gray-500 line-through' : 'text-gray-900'
                            }`}>
                              {task.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === "team" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {project.team.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-lg font-medium text-gray-700">{member.avatar}</span>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">{member.name}</h3>
                      <p className="text-sm text-gray-600 mb-4">{member.role}</p>
                      <Button variant="outline" size="sm">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Message
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === "updates" && (
            <div className="space-y-6">
              {updates.map((update, index) => (
                <motion.div
                  key={update.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          update.type === 'progress' ? 'bg-blue-100' :
                          update.type === 'milestone' ? 'bg-green-100' : 'bg-yellow-100'
                        }`}>
                          {update.type === 'progress' && <Clock className="h-5 w-5 text-blue-600" />}
                          {update.type === 'milestone' && <CheckCircle className="h-5 w-5 text-green-600" />}
                          {update.type === 'question' && <AlertCircle className="h-5 w-5 text-yellow-600" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-gray-900">{update.title}</h3>
                            <span className="text-sm text-gray-500">{update.timestamp}</span>
                          </div>
                          <p className="text-gray-600 mb-2">{update.description}</p>
                          <p className="text-sm text-gray-500">by {update.author}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
