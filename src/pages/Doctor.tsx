import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { 
  Calendar, 
  Search, 
  Bell, 
  Users, 
  FileText, 
  BarChart2, 
  Clock, 
  ArrowUpRight, 
  Filter, 
  Plus,
  MessageSquare
} from "lucide-react";

const Doctor = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(2025, 4, 3)); // May 3, 2025
  
  // Mock data for doctor's dashboard
  const patientAppointments = [
    { 
      id: 1, 
      name: "Emma Wilson", 
      time: "9:00 AM", 
      type: "Follow-up", 
      condition: "Eczema",
      image: "/placeholder.svg",
      age: 34,
      status: "Checked In"
    },
    { 
      id: 2, 
      name: "Michael Brown", 
      time: "10:30 AM", 
      type: "New Patient", 
      condition: "Acne",
      image: "/placeholder.svg",
      age: 22,
      status: "Scheduled"
    },
    { 
      id: 3, 
      name: "Sophia Chen", 
      time: "11:45 AM", 
      type: "Consultation", 
      condition: "Psoriasis",
      image: "/placeholder.svg",
      age: 45,
      status: "Scheduled"
    },
    { 
      id: 4, 
      name: "James Miller", 
      time: "1:15 PM", 
      type: "Follow-up", 
      condition: "Rosacea",
      image: "/placeholder.svg",
      age: 39,
      status: "Scheduled"
    },
  ];
  
  const recentSkinAnalyses = [
    { 
      id: 101, 
      patientName: "Emma Wilson", 
      date: "May 2, 2025", 
      conditions: ["Eczema", "Dry Skin"],
      severity: "Moderate",
      aiConfidence: "94%"
    },
    { 
      id: 102, 
      patientName: "Michael Brown", 
      date: "May 1, 2025", 
      conditions: ["Acne", "Oily Skin"],
      severity: "Mild",
      aiConfidence: "92%"
    },
    { 
      id: 103, 
      patientName: "Sophia Chen", 
      date: "April 30, 2025", 
      conditions: ["Psoriasis"],
      severity: "Severe",
      aiConfidence: "97%"
    }
  ];

  const patientQueue = [
    { id: 1, name: "Emma Wilson", waitTime: "5 minutes", status: "In Room" },
    { id: 2, name: "Alex Johnson", waitTime: "10 minutes", status: "Waiting" },
    { id: 3, name: "Sam Rodriguez", waitTime: "Just arrived", status: "Check-in" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Doctor Dashboard Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#354745] dark:text-[#d0caca]">Doctor Dashboard</h1>
            <p className="text-gray-500 dark:text-gray-400">Welcome back, Dr. Sarah Johnson</p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div className="relative">
              <Bell className="h-5 w-5 text-gray-500 cursor-pointer hover:text-[#62d5d0] transition-colors" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </div>
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8 border border-gray-200 dark:border-gray-700">
                <AvatarImage src="/placeholder.svg" alt="Dr. Sarah Johnson" />
                <AvatarFallback className="bg-[#62d5d0] text-white">SJ</AvatarFallback>
              </Avatar>
              <span className="hidden md:inline text-sm font-medium">Dr. Johnson</span>
            </div>
          </div>
        </div>
        
        {/* Main Dashboard Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-8">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 mb-8 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="patients">Patients</TabsTrigger>
            <TabsTrigger value="analyses">Skin Analyses</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="messages" className="hidden lg:block">Messages</TabsTrigger>
          </TabsList>
          
          {/* Dashboard Content */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Today's Patients</p>
                      <h3 className="text-2xl font-bold mt-1">12</h3>
                      <p className="text-xs text-green-500 mt-1 flex items-center">
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                        <span>4% from yesterday</span>
                      </p>
                    </div>
                    <div className="bg-[#62d5d0]/10 p-3 rounded-full">
                      <Users className="h-5 w-5 text-[#62d5d0]" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Skin Analyses</p>
                      <h3 className="text-2xl font-bold mt-1">24</h3>
                      <p className="text-xs text-green-500 mt-1 flex items-center">
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                        <span>12% from last week</span>
                      </p>
                    </div>
                    <div className="bg-[#62d5d0]/10 p-3 rounded-full">
                      <FileText className="h-5 w-5 text-[#62d5d0]" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Average Wait Time</p>
                      <h3 className="text-2xl font-bold mt-1">14m</h3>
                      <p className="text-xs text-red-500 mt-1 flex items-center">
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                        <span>3m from last week</span>
                      </p>
                    </div>
                    <div className="bg-[#62d5d0]/10 p-3 rounded-full">
                      <Clock className="h-5 w-5 text-[#62d5d0]" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">AI Accuracy</p>
                      <h3 className="text-2xl font-bold mt-1">96%</h3>
                      <p className="text-xs text-green-500 mt-1 flex items-center">
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                        <span>2% from last month</span>
                      </p>
                    </div>
                    <div className="bg-[#62d5d0]/10 p-3 rounded-full">
                      <BarChart2 className="h-5 w-5 text-[#62d5d0]" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Upcoming Appointments & Patient Queue Side-by-Side */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle>Today's Appointments</CardTitle>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex items-center gap-1 text-xs h-9 pl-3 pr-3"
                        >
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          <span>{format(selectedDate, "d MMM, yyyy")}</span>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="end">
                        <CalendarComponent
                          mode="single"
                          selected={selectedDate}
                          onSelect={(date) => date && setSelectedDate(date)}
                          initialFocus
                          className="rounded-md border"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 dark:text-gray-400">Patient</th>
                          <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 dark:text-gray-400">Time</th>
                          <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 dark:text-gray-400">Type</th>
                          <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 dark:text-gray-400">Status</th>
                          <th className="text-right py-3 px-6 text-xs font-medium text-gray-500 dark:text-gray-400">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {patientAppointments.map((appointment) => (
                          <tr key={appointment.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                            <td className="py-3 px-6">
                              <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={appointment.image} />
                                  <AvatarFallback className="bg-gray-200 text-gray-600">
                                    {appointment.name.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium text-sm">{appointment.name}</p>
                                  <p className="text-xs text-gray-500">{appointment.age} years • {appointment.condition}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-6 text-sm">{appointment.time}</td>
                            <td className="py-3 px-6">
                              <Badge variant="outline" className="font-normal">
                                {appointment.type}
                              </Badge>
                            </td>
                            <td className="py-3 px-6">
                              <Badge variant={appointment.status === "Checked In" ? "default" : "secondary"} className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 font-normal">
                                {appointment.status}
                              </Badge>
                            </td>
                            <td className="py-3 px-6 text-right">
                              <Button variant="ghost" size="sm">View</Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Patient Queue</CardTitle>
                  <CardDescription>Current waiting room status</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {patientQueue.map((patient) => (
                    <div key={patient.id} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 dark:border-gray-700">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${
                          patient.status === "In Room" ? "bg-green-500" : 
                          patient.status === "Waiting" ? "bg-yellow-500" : "bg-blue-500"
                        }`}></div>
                        <div>
                          <p className="font-medium text-sm">{patient.name}</p>
                          <p className="text-xs text-gray-500">{patient.waitTime}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {patient.status}
                      </Badge>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full mt-2 text-[#62d5d0] border-[#62d5d0]/30 hover:bg-[#62d5d0]/5" size="sm">
                    Manage Queue
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            {/* Recent Analyses */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Skin Analyses</CardTitle>
                  <Button variant="ghost" size="sm" className="text-sm">View All</Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 dark:text-gray-400">Patient</th>
                        <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 dark:text-gray-400">Date</th>
                        <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 dark:text-gray-400">Condition</th>
                        <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 dark:text-gray-400">Severity</th>
                        <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 dark:text-gray-400">AI Confidence</th>
                        <th className="text-right py-3 px-6 text-xs font-medium text-gray-500 dark:text-gray-400">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentSkinAnalyses.map((analysis) => (
                        <tr key={analysis.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                          <td className="py-3 px-6 text-sm font-medium">{analysis.patientName}</td>
                          <td className="py-3 px-6 text-sm">{analysis.date}</td>
                          <td className="py-3 px-6">
                            <div className="flex flex-wrap gap-1">
                              {analysis.conditions.map((condition, index) => (
                                <Badge key={index} variant="outline" className="font-normal text-xs">
                                  {condition}
                                </Badge>
                              ))}
                            </div>
                          </td>
                          <td className="py-3 px-6">
                            <Badge 
                              variant="outline" 
                              className={`font-normal ${
                                analysis.severity === "Mild" ? "bg-green-100 text-green-800 border-green-200" :
                                analysis.severity === "Moderate" ? "bg-yellow-100 text-yellow-800 border-yellow-200" :
                                "bg-red-100 text-red-800 border-red-200"
                              }`}
                            >
                              {analysis.severity}
                            </Badge>
                          </td>
                          <td className="py-3 px-6 text-sm">{analysis.aiConfidence}</td>
                          <td className="py-3 px-6 text-right">
                            <Button variant="ghost" size="sm">View Report</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Patients Tab Content */}
          <TabsContent value="patients" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                  <CardTitle>Patient Management</CardTitle>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <Input 
                        placeholder="Search patients..." 
                        className="pl-9 w-full sm:w-[220px]" 
                      />
                    </div>
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Filter className="h-3.5 w-3.5" />
                      <span>Filter</span>
                    </Button>
                    <Button size="sm" className="bg-[#62d5d0] hover:bg-[#62d5d0]/90 text-white">
                      <Plus className="h-3.5 w-3.5 mr-1" />
                      New Patient
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                  Patient management functionality would be implemented here
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Skin Analyses Tab Content */}
          <TabsContent value="analyses" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Skin Analysis Reports</CardTitle>
                <CardDescription>Review and manage patient skin analyses</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                  Detailed skin analysis reports and trends would be displayed here
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Appointments Tab Content */}
          <TabsContent value="appointments" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Appointment Calendar</CardTitle>
                    <CardDescription>Manage your schedule and patient appointments</CardDescription>
                  </div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 mr-1" />
                        <span>{format(selectedDate, "d MMM, yyyy")}</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="end">
                      <CalendarComponent
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => date && setSelectedDate(date)}
                        initialFocus
                        className="rounded-md border"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400 py-8">
                  <Calendar className="h-5 w-5" />
                  <span>Appointment schedule for {format(selectedDate, "MMMM d, yyyy")}</span>
                </div>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Calendar view with appointment management would be displayed here
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Messages Tab Content */}
          <TabsContent value="messages" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Patient Messages</CardTitle>
                <CardDescription>Secure messaging with patients</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400 py-8">
                  <MessageSquare className="h-5 w-5" />
                  <span>Messaging functionality would be displayed here</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Doctor;