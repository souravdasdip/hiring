import { createJob } from "../actions"
import Link from "next/link"
import { RichTextInput } from "@/components/ui/RichTextInput"

export default function CreateJobPage() {
  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Create New Job</h1>
        <Link 
          href="/admin/jobs" 
          className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 font-medium text-sm"
        >
          &larr; Back to Jobs
        </Link>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
        <form action={createJob} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">Job Title *</label>
              <input type="text" id="title" name="title" required className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Job Type *</label>
              <div className="flex flex-wrap gap-4 px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700">
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="type" value="Full-time" className="h-4 w-4 text-indigo-600 rounded border-slate-300" />
                  <span className="text-sm">Full-time</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="type" value="Part-time" className="h-4 w-4 text-indigo-600 rounded border-slate-300" />
                  <span className="text-sm">Part-time</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="type" value="Contract" className="h-4 w-4 text-indigo-600 rounded border-slate-300" />
                  <span className="text-sm">Contract</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="type" value="Internship" className="h-4 w-4 text-indigo-600 rounded border-slate-300" />
                  <span className="text-sm">Internship</span>
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="department" className="text-sm font-medium">Department</label>
              <input type="text" id="department" name="department" className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700" />
            </div>

            <div className="space-y-2">
              <label htmlFor="location" className="text-sm font-medium">Location *</label>
              <input type="text" id="location" name="location" required className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700" placeholder="e.g. Remote, New York, NY" />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="salaryRange" className="text-sm font-medium">Salary Range</label>
              <input type="text" id="salaryRange" name="salaryRange" className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700" placeholder="e.g. $100k - $120k" />
            </div>
            
            <div className="space-y-2 flex items-center h-full pt-6">
              <input type="checkbox" id="isActive" name="isActive" defaultChecked className="h-4 w-4 text-indigo-600 rounded border-slate-300" />
              <label htmlFor="isActive" className="ml-2 text-sm font-medium text-slate-700 dark:text-slate-300">Is Active (Visible on site)</label>
            </div>

            <div className="space-y-2 col-span-1 md:col-span-2">
              <label htmlFor="applyUrl" className="text-sm font-medium">External Apply URL</label>
              <input type="url" id="applyUrl" name="applyUrl" className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700" placeholder="https://external-site.com/apply/job-id (Leave blank for internal form)" />
              <p className="text-xs text-slate-500">If provided, the Apply button will redirect to this link.</p>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="jobSummary" className="text-sm font-medium">Job Summary *</label>
            <RichTextInput name="jobSummary" />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="aboutCompany" className="text-sm font-medium">About Company</label>
            <RichTextInput name="aboutCompany" />
          </div>

          <div className="space-y-2">
            <label htmlFor="requiredSkills" className="text-sm font-medium">Required Skills (Comma separated)</label>
            <input type="text" id="requiredSkills" name="requiredSkills" className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700" placeholder="React, TypeScript, Next.js" />
          </div>

          <div className="space-y-2">
            <label htmlFor="responsibilities" className="text-sm font-medium">Responsibilities (Comma separated)</label>
            <textarea id="responsibilities" name="responsibilities" rows={4} className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700" placeholder="Develop UI components, Write tests, ..."></textarea>
          </div>

          <div className="space-y-2">
            <label htmlFor="qualifications" className="text-sm font-medium">Qualifications (Comma separated)</label>
            <textarea id="qualifications" name="qualifications" rows={4} className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700" placeholder="3+ years experience, BS in Computer Science, ..."></textarea>
          </div>

          <div className="pt-4 flex justify-end">
            <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md font-medium transition-colors">
              Save Job
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
