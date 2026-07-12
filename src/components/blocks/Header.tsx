"use client";

import Link from "next/link";
import { Briefcase, FileText, LayoutDashboard, Menu, Search, X } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/20 bg-white/60 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-blue-600 text-white p-1.5 rounded-lg group-hover:bg-blue-700 transition-colors">
                <Briefcase className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                JobFlow
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              href="/" 
              className="text-gray-600 hover:text-blue-600 font-medium text-sm transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/jobs" 
              className="text-gray-600 hover:text-blue-600 font-medium text-sm transition-colors flex items-center gap-1.5"
            >
              <Search className="w-4 h-4" />
              Find Jobs
            </Link>
            <Link 
              href="/blogs" 
              className="text-gray-600 hover:text-blue-600 font-medium text-sm transition-colors flex items-center gap-1.5"
            >
              <FileText className="w-4 h-4" />
              Resources
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              href="/admin/jobs" 
              className="text-gray-500 hover:text-gray-900 transition-colors"
              title="Admin Dashboard"
            >
              <LayoutDashboard className="w-5 h-5" />
            </Link>
            <Link 
              href="/admin/jobs/create" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all shadow-md hover:shadow-lg active:scale-95"
            >
              Post a Job
            </Link>
          </div>

          {/* Mobile menu button (Simplified for now) */}
          <div className="md:hidden flex items-center">
            <button className="text-gray-600 hover:text-gray-900 focus:outline-none p-2">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
