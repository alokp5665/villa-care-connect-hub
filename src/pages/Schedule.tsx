
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarIcon, Clock, MapPin, ArrowRight } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { Link } from "react-router-dom";

// Sample schedule data with technician assignments
const scheduleData = [
  {
    id: "task-1",
    title: "Fix AC Unit",
    technician: "Ahmed Hassan",
    location: "Villa 45, Palm Jumeirah",
    time: "9:00 AM - 11:00 AM",
    status: "pending",
    requestId: "REQ-2023-001"
  },
  {
    id: "task-2",
    title: "Plumbing Inspection",
    technician: "Mohammed Ali",
    location: "Apartment 12, Marina Tower",
    time: "11:30 AM - 1:30 PM",
    status: "in-progress",
    requestId: "REQ-2023-002"
  },
  {
    id: "task-3",
    title: "Electrical Repair",
    technician: "Sara Khan",
    location: "Villa 23, Arabian Ranches",
    time: "2:00 PM - 4:00 PM",
    status: "completed",
    requestId: "REQ-2023-003"
  },
  {
    id: "task-4",
    title: "Garden Maintenance",
    technician: "John Smith",
    location: "Villa 78, Emirates Hills",
    time: "4:30 PM - 6:30 PM",
    status: "pending",
    requestId: "REQ-2023-004"
  }
];

const Schedule = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Get day of week from date
  const dayOfWeek = date ? new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date) : '';
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Schedule</h1>
        <p className="text-muted-foreground">View and manage technician schedules and job assignments.</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Select Date</CardTitle>
            <CardDescription>Choose a date to view scheduled tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>
        
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Technician Tasks</CardTitle>
                <CardDescription>
                  {date ? (
                    <>
                      <CalendarIcon className="inline-block h-4 w-4 mr-1" />
                      {dayOfWeek}, {date.toLocaleDateString()}
                    </>
                  ) : (
                    "No date selected"
                  )}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {scheduleData.map((task) => (
                <div 
                  key={task.id}
                  className={`p-4 rounded-lg border ${
                    task.status === 'pending' ? 'border-yellow-200 bg-yellow-50' :
                    task.status === 'in-progress' ? 'border-blue-200 bg-blue-50' :
                    'border-green-200 bg-green-50'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{task.title}</h3>
                      <p className="text-sm text-muted-foreground">Assigned to: {task.technician}</p>
                    </div>
                    <div 
                      className={`text-xs font-medium px-2 py-1 rounded-full ${
                        task.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        task.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}
                    >
                      {task.status === 'pending' ? 'Pending' : 
                       task.status === 'in-progress' ? 'In Progress' : 'Completed'}
                    </div>
                  </div>
                  
                  <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{task.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span className="truncate">{task.location}</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex justify-end">
                    <Link to={`/technician-location/${task.requestId}`} className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800">
                      View on map <ArrowRight className="h-3 w-3 ml-1" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Schedule;
