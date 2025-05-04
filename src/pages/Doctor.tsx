import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { supabase } from "../lib/supabase";
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
  MessageSquare,
} from "lucide-react";

interface Doctor {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  license_number: string;
  specialty?: string;
  education?: string;
  years_experience?: number;
  bio?: string;
  profile_image?: string;
  created_at: string;
}

interface AnalysisRecord {
  id: string;
  user_id: string;
  name: string;
  analysis_data: {
    analysis: {
      severity: string;
      final_analysis?: string;
      initial_diagnosis?: string;
    };
    response: string;
  };
  created_at: string;
}

interface PatientAppointment {
  id: string;
  name: string;
  time: string;
  type: string;
  condition: string;
  image: string;
  age?: number;
  status: string;
}

const Doctor = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);
  const [patientAppointments, setPatientAppointments] = useState<PatientAppointment[]>([]);
  const [loadingAppointments, setLoadingAppointments] = useState(true);

  // Fetch doctors from Supabase
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);

        // Get current user
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user?.email) {
          setCurrentUserEmail(user.email);
          console.log("Current user email:", user.email);
        }

        // Get all doctors
        const { data, error } = await supabase.from("doctors").select("*");

        if (error) {
          console.error("Error fetching doctors:", error);
          return;
        }

        if (data) {
          console.log("Doctors fetched:", data);
          setDoctors(data);
        }
      } catch (err) {
        console.error("Failed to fetch doctors:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Fetch analysis records as appointments
  useEffect(() => {
    const fetchAnalysisRecords = async () => {
      try {
        setLoadingAppointments(true);

        // Get today's date in ISO format for comparison (YYYY-MM-DD)
        const today = new Date();
        const todayStr = today.toISOString().split("T")[0];

        // Get all analysis records
        const { data, error } = await supabase
          .from("analysis_records")
          .select(`
            id, 
            user_id, 
            name, 
            created_at, 
            analysis_data,
            user_profiles(first_name, last_name, date_of_birth, gender)
          `)
          .gte("created_at", `${todayStr}T00:00:00`) // Only get records from today
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching analysis records:", error);
          return;
        }

        if (data) {
          console.log("Analysis records fetched:", data);

          // Transform analysis records to appointment format
          const appointments: PatientAppointment[] = data.map((record: any) => {
            // Calculate appointment time (convert from ISO to readable time)
            const appointmentDate = new Date(record.created_at);
            const hours = appointmentDate.getHours();
            const minutes = appointmentDate.getMinutes();
            const ampm = hours >= 12 ? "PM" : "AM";
            const formattedHours = hours % 12 || 12;
            const formattedMinutes = minutes.toString().padStart(2, "0");
            const timeStr = `${formattedHours}:${formattedMinutes} ${ampm}`;

            // Calculate age if date_of_birth is available
            let age;
            if (record.user_profiles?.date_of_birth) {
              const birthDate = new Date(record.user_profiles.date_of_birth);
              const ageDifMs = Date.now() - birthDate.getTime();
              const ageDate = new Date(ageDifMs);
              age = Math.abs(ageDate.getUTCFullYear() - 1970);
            }

            // Get patient name or use a placeholder
            const patientName = record.user_profiles
              ? `${record.user_profiles.first_name || ""} ${
                  record.user_profiles.last_name || ""
                }`.trim()
              : `Patient ${record.id.slice(0, 5)}`;

            return {
              id: record.id,
              name: patientName,
              time: timeStr,
              type: "Consultation",
              condition:
                record.analysis_data?.analysis?.final_analysis ||
                record.analysis_data?.analysis?.initial_diagnosis ||
                "Unknown",
              image: "/placeholder.svg",
              age: age,
              status:
                new Date().getTime() - appointmentDate.getTime() <
                30 * 60 * 1000
                  ? "Checked In"
                  : "Scheduled",
            };
          });

          setPatientAppointments(appointments);
        }
      } catch (err) {
        console.error("Failed to fetch analysis records:", err);
      } finally {
        setLoadingAppointments(false);
      }
    };

    fetchAnalysisRecords();
  }, [selectedDate]); // Refetch if selected date changes

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Doctor Dashboard Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#354745] dark:text-[#d0caca]">
              Doctor Dashboard
            </h1>
            {loading ? (
              <p className="text-gray-500 dark:text-gray-400">
                Loading your profile...
              </p>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">
                Welcome back,{" "}
                {doctors.find((doc) => doc.email === currentUserEmail)
                  ? `Dr. ${
                      doctors.find((doc) => doc.email === currentUserEmail)
                        ?.first_name
                    } ${
                      doctors.find((doc) => doc.email === currentUserEmail)
                        ?.last_name
                    }`
                  : "Doctor"}
              </p>
            )}
          </div>

          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div className="relative">
              <Bell className="h-5 w-5 text-gray-500 cursor-pointer hover:text-[#62d5d0] transition-colors" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </div>
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8 border border-gray-200 dark:border-gray-700">
                <AvatarImage src="/placeholder.svg" alt="Doctor Profile" />
                {!loading &&
                  doctors.find((doc) => doc.email === currentUserEmail) && (
                    <AvatarFallback className="bg-[#62d5d0] text-white">
                      {`${
                        doctors
                          .find((doc) => doc.email === currentUserEmail)
                          ?.first_name?.charAt(0) || ""
                      }${
                        doctors
                          .find((doc) => doc.email === currentUserEmail)
                          ?.last_name?.charAt(0) || ""
                      }`}
                    </AvatarFallback>
                  )}
              </Avatar>
              {!loading &&
                doctors.find((doc) => doc.email === currentUserEmail) && (
                  <span className="hidden md:inline text-sm font-medium">
                    Dr.{" "}
                    {
                      doctors.find((doc) => doc.email === currentUserEmail)
                        ?.last_name
                    }
                  </span>
                )}
            </div>
          </div>
        </div>

        {/* Main Dashboard Navigation */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full mb-8"
        >
          <TabsList className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-6 mb-8 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="patients">Patients</TabsTrigger>
            <TabsTrigger value="analyses">Skin Analyses</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="messages" className="hidden lg:block">
              Messages
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Content */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Today's Patients
                      </p>
                      <h3 className="text-2xl font-bold mt-1">12</h3>
                      <p className="text-xs text-green-500 mt-1 flex items-center"></p>
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
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Skin Analyses
                      </p>
                      <h3 className="text-2xl font-bold mt-1">24</h3>
                      <p className="text-xs text-green-500 mt-1 flex items-center"></p>
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
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Average Wait Time
                      </p>
                      <h3 className="text-2xl font-bold mt-1">14m</h3>
                      <p className="text-xs text-red-500 mt-1 flex items-center"></p>
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
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        AI Accuracy
                      </p>
                      <h3 className="text-2xl font-bold mt-1">96%</h3>
                      <p className="text-xs text-green-500 mt-1 flex items-center"></p>
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
              <Card className="lg:col-span-4">
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
                  {loadingAppointments ? (
                    <div className="flex items-center justify-center py-12">
                      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#62d5d0] border-r-transparent align-[-0.125em]" role="status">
                        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                      </div>
                      <p className="ml-3 text-gray-600 dark:text-gray-300">Loading patient appointments...</p>
                    </div>
                  ) : patientAppointments.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-gray-500 dark:text-gray-400">No appointments found for today.</p>
                      <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">Patient analyses will appear here when they are submitted.</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200 dark:border-gray-700">
                            <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 dark:text-gray-400">Patient</th>
                            <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 dark:text-gray-400">Time</th>
                            <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 dark:text-gray-400">Type</th>
                            <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 dark:text-gray-400">Condition</th>
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
                                    {appointment.age && (
                                      <p className="text-xs text-gray-500">{appointment.age} years</p>
                                    )}
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
                                <Badge 
                                  variant="outline" 
                                  className={`font-normal ${
                                    appointment.condition.toLowerCase().includes('mild') || 
                                    appointment.condition.toLowerCase().includes('minor')
                                      ? "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300" 
                                    : appointment.condition.toLowerCase().includes('moderate')
                                      ? "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300"
                                    : appointment.condition.toLowerCase().includes('severe') || 
                                      appointment.condition.toLowerCase().includes('serious')
                                      ? "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300"
                                    : "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300"
                                  }`}
                                >
                                  {appointment.condition}
                                </Badge>
                              </td>
                              <td className="py-3 px-6">
                                <Badge
                                  variant={appointment.status === "Checked In" ? "default" : "secondary"}
                                  className={`font-normal ${
                                    appointment.status === "Checked In"
                                      ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
                                      : "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300"
                                  }`}
                                >
                                  {appointment.status}
                                </Badge>
                              </td>
                              <td className="py-3 px-6 text-right">
                                <Button variant="ghost" size="sm">View Analysis</Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
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
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      <Filter className="h-3.5 w-3.5" />
                      <span>Filter</span>
                    </Button>
                    <Button
                      size="sm"
                      className="bg-[#62d5d0] hover:bg-[#62d5d0]/90 text-white"
                    >
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
                <CardDescription>
                  Review and manage patient skin analyses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                  Detailed skin analysis reports and trends would be displayed
                  here
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
                    <CardDescription>
                      Manage your schedule and patient appointments
                    </CardDescription>
                  </div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1"
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
              <CardContent>
                <div className="flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400 py-8">
                  <Calendar className="h-5 w-5" />
                  <span>
                    Appointment schedule for{" "}
                    {format(selectedDate, "MMMM d, yyyy")}
                  </span>
                </div>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Calendar view with appointment management would be displayed
                  here
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Messages Tab Content */}
          <TabsContent value="messages" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Patient Messages</CardTitle>
                <CardDescription>
                  Secure messaging with patients
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400 py-8">
                  <MessageSquare className="h-5 w-5" />
                  <span>Messaging functionality would be displayed here</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Team Tab Content */}
          <TabsContent value="team" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                  <div>
                    <CardTitle>Medical Team</CardTitle>
                    <CardDescription>
                      View and manage doctor information
                    </CardDescription>
                  </div>
                  <Button
                    size="sm"
                    className="bg-[#62d5d0] hover:bg-[#62d5d0]/90 text-white"
                  >
                    <Plus className="h-3.5 w-3.5 mr-1" />
                    Add Doctor
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <div
                      className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#62d5d0] border-r-transparent align-[-0.125em]"
                      role="status"
                    >
                      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                        Loading...
                      </span>
                    </div>
                    <p className="ml-3 text-gray-600 dark:text-gray-300">
                      Loading doctor information...
                    </p>
                  </div>
                ) : doctors.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 dark:text-gray-400">
                      No doctors found in the database.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {doctors.map((doctor) => (
                      <Card key={doctor.id} className="overflow-hidden">
                        <div className="bg-gradient-to-r from-[#62d5d0]/80 to-[#62d5d0]/40 h-8"></div>
                        <CardContent className="pt-6 relative">
                          <Avatar className="h-16 w-16 border-4 border-white dark:border-gray-800 absolute -top-8 left-4 shadow-md">
                            <AvatarImage
                              src={doctor.profile_image || "/placeholder.svg"}
                            />
                            <AvatarFallback className="bg-[#62d5d0] text-white text-lg">
                              {`${doctor.first_name?.charAt(0) || ""}${
                                doctor.last_name?.charAt(0) || ""
                              }`}
                            </AvatarFallback>
                          </Avatar>

                          <div className="mt-8">
                            <h3 className="text-lg font-semibold">
                              Dr. {doctor.first_name} {doctor.last_name}
                            </h3>

                            <div className="grid grid-cols-1 gap-3 mt-4">
                              <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                  Email
                                </p>
                                <p className="text-sm">{doctor.email}</p>
                              </div>

                              <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                  License Number
                                </p>
                                <p className="text-sm">
                                  {doctor.license_number || "Not specified"}
                                </p>
                              </div>

                              {doctor.specialty && (
                                <div>
                                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Specialty
                                  </p>
                                  <p className="text-sm">
                                    {doctor.specialty || "General Practice"}
                                  </p>
                                </div>
                              )}

                              {doctor.education && (
                                <div>
                                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Education
                                  </p>
                                  <p className="text-sm">{doctor.education}</p>
                                </div>
                              )}

                              {doctor.years_experience !== undefined && (
                                <div>
                                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Years of Experience
                                  </p>
                                  <p className="text-sm">
                                    {doctor.years_experience} years
                                  </p>
                                </div>
                              )}

                              {doctor.bio && (
                                <div>
                                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Bio
                                  </p>
                                  <p className="text-sm line-clamp-3">
                                    {doctor.bio}
                                  </p>
                                </div>
                              )}

                              <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                  Joined
                                </p>
                                <p className="text-sm">
                                  {new Date(
                                    doctor.created_at
                                  ).toLocaleDateString()}
                                </p>
                              </div>
                            </div>

                            <div className="flex space-x-2 mt-4">
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex-1"
                              >
                                View Profile
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex-1 text-[#62d5d0] border-[#62d5d0]/30 hover:bg-[#62d5d0]/5"
                              >
                                Edit
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Current Doctor Profile */}
            {!loading &&
              currentUserEmail &&
              doctors.find((doc) => doc.email === currentUserEmail) && (
                <Card>
                  <CardHeader>
                    <CardTitle>Your Profile</CardTitle>
                    <CardDescription>
                      Update your professional information
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {(() => {
                      const currentDoctor = doctors.find(
                        (doc) => doc.email === currentUserEmail
                      );
                      if (!currentDoctor) return null;

                      return (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div className="flex items-center gap-4">
                              <Avatar className="h-20 w-20">
                                <AvatarImage
                                  src={
                                    currentDoctor.profile_image ||
                                    "/placeholder.svg"
                                  }
                                />
                                <AvatarFallback className="bg-[#62d5d0] text-white text-xl">
                                  {`${
                                    currentDoctor.first_name?.charAt(0) || ""
                                  }${currentDoctor.last_name?.charAt(0) || ""}`}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="text-xl font-semibold">
                                  Dr. {currentDoctor.first_name}{" "}
                                  {currentDoctor.last_name}
                                </h3>
                                <p className="text-[#62d5d0]">
                                  {currentDoctor.specialty ||
                                    "General Practice"}
                                </p>
                                <p className="text-sm text-gray-500">
                                  License #: {currentDoctor.license_number}
                                </p>
                              </div>
                            </div>

                            <div className="pt-4">
                              <p className="text-sm font-medium text-gray-500 mb-1">
                                About
                              </p>
                              <p className="text-sm">
                                {currentDoctor.bio ||
                                  "No bio information available. Click Edit Profile to add your professional bio."}
                              </p>
                            </div>

                            <div>
                              <p className="text-sm font-medium text-gray-500 mb-1">
                                Contact
                              </p>
                              <p className="text-sm">{currentDoctor.email}</p>
                            </div>

                            <Button className="bg-[#62d5d0] hover:bg-[#62d5d0]/90 text-white w-full mt-4">
                              Edit Profile
                            </Button>
                          </div>

                          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6">
                            <h4 className="font-medium mb-4">
                              Professional Details
                            </h4>
                            <div className="space-y-4">
                              {currentDoctor.education && (
                                <div>
                                  <p className="text-sm font-medium text-gray-500">
                                    Education
                                  </p>
                                  <p className="text-sm">
                                    {currentDoctor.education}
                                  </p>
                                </div>
                              )}

                              {currentDoctor.years_experience !== undefined && (
                                <div>
                                  <p className="text-sm font-medium text-gray-500">
                                    Years of Experience
                                  </p>
                                  <p className="text-sm">
                                    {currentDoctor.years_experience} years
                                  </p>
                                </div>
                              )}

                              <div>
                                <p className="text-sm font-medium text-gray-500">
                                  CerebrumAI Status
                                </p>
                                <div className="flex items-center mt-1">
                                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                                  <p className="text-sm">Verified Doctor</p>
                                </div>
                              </div>

                              <div>
                                <p className="text-sm font-medium text-gray-500">
                                  Account Created
                                </p>
                                <p className="text-sm">
                                  {new Date(
                                    currentDoctor.created_at
                                  ).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </CardContent>
                </Card>
              )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Doctor;
