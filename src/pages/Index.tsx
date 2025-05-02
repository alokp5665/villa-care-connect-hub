
import { Button } from "@/components/ui/button";
import { Globe, Home, MessageSquare, Tool, UserRound, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import LoginForm from "@/components/auth/LoginForm";
import { useState } from "react";

const Index = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="w-full border-b border-gray-200">
        <div className="container mx-auto py-4 px-6 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-primary">
            <Home className="h-6 w-6" />
            <span className="font-bold text-xl">Villa Care Connect</span>
          </div>
          <Button onClick={() => setShowLogin(true)} variant="outline">Sign In</Button>
        </div>
      </header>
      
      {/* Hero section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-10">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Simplified Maintenance Management for Your Property
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              Villa Care Connect provides a comprehensive solution for property maintenance, 
              connecting property owners with maintenance staff for swift and efficient service.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button onClick={() => setShowLogin(true)} size="lg">
                Get Started
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2 mt-10 lg:mt-0 flex justify-center">
            {showLogin ? (
              <LoginForm className="w-full max-w-md" />
            ) : (
              <div className="relative w-full max-w-md aspect-square">
                <div className="absolute inset-0 bg-white shadow-xl rounded-lg transform rotate-3"></div>
                <img
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                  alt="Villa maintenance"
                  className="absolute inset-0 rounded-lg object-cover shadow-xl transform -rotate-3 hover:rotate-0 transition-transform duration-300"
                />
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Features section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">All-in-One Maintenance Solution</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
              <div className="p-4 bg-primary/10 rounded-full">
                <Tool className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mt-4 text-xl font-semibold">Request Management</h3>
              <p className="mt-2 text-gray-600">
                Easily submit and track maintenance requests with detailed descriptions and photo uploads.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
              <div className="p-4 bg-primary/10 rounded-full">
                <UserRound className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mt-4 text-xl font-semibold">Role-Based Access</h3>
              <p className="mt-2 text-gray-600">
                Specialized dashboards and permissions for property owners, technicians, and administrators.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
              <div className="p-4 bg-primary/10 rounded-full">
                <Globe className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mt-4 text-xl font-semibold">Location Tracking</h3>
              <p className="mt-2 text-gray-600">
                Real-time technician location tracking and navigation assistance for prompt service.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
              <div className="p-4 bg-primary/10 rounded-full">
                <Wrench className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mt-4 text-xl font-semibold">Specialized Categories</h3>
              <p className="mt-2 text-gray-600">
                Categorized maintenance services including electrical, plumbing, HVAC, and general repairs.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
              <div className="p-4 bg-primary/10 rounded-full">
                <MessageSquare className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mt-4 text-xl font-semibold">In-App Communication</h3>
              <p className="mt-2 text-gray-600">
                Direct messaging between property owners, technicians, and managers for efficient communication.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
              <div className="p-4 bg-primary/10 rounded-full">
                <Home className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mt-4 text-xl font-semibold">Multi-Property Support</h3>
              <p className="mt-2 text-gray-600">
                Manage maintenance for multiple properties with distinct profiles and service histories.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to streamline your property maintenance?</h2>
          <p className="mb-8 max-w-lg mx-auto">
            Join Villa Care Connect today and experience hassle-free maintenance management for your property.
          </p>
          <Button 
            onClick={() => setShowLogin(true)} 
            size="lg" 
            variant="secondary"
            className="bg-white text-primary hover:bg-gray-100"
          >
            Get Started
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center space-x-2">
                <Home className="h-6 w-6" />
                <span className="font-bold text-xl">Villa Care Connect</span>
              </div>
              <p className="mt-4 text-gray-400 max-w-sm">
                Comprehensive maintenance management solution for residential and commercial properties.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Product</h3>
                <ul className="space-y-2">
                  <li><Link to="#" className="text-gray-400 hover:text-white transition-colors">Features</Link></li>
                  <li><Link to="#" className="text-gray-400 hover:text-white transition-colors">Pricing</Link></li>
                  <li><Link to="#" className="text-gray-400 hover:text-white transition-colors">Demo</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Company</h3>
                <ul className="space-y-2">
                  <li><Link to="#" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
                  <li><Link to="#" className="text-gray-400 hover:text-white transition-colors">Careers</Link></li>
                  <li><Link to="#" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Support</h3>
                <ul className="space-y-2">
                  <li><Link to="#" className="text-gray-400 hover:text-white transition-colors">Help Center</Link></li>
                  <li><Link to="#" className="text-gray-400 hover:text-white transition-colors">Documentation</Link></li>
                  <li><Link to="#" className="text-gray-400 hover:text-white transition-colors">Contact Support</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Villa Care Connect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
