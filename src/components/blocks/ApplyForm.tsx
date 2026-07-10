"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { submitApplication } from "@/app/actions/application"

export function ApplyForm({ jobId }: { jobId: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  async function action(formData: FormData) {
    setIsSubmitting(true)
    try {
      formData.append("jobId", jobId)
      // In a real app with file upload, you'd upload the file to S3/Vercel Blob first
      // and append the URL. For this MVP, we simulate it or pass the file.
      await submitApplication(formData)
      setIsSuccess(true)
    } catch (error) {
      console.error(error)
      alert("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="p-8 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-lg border border-green-200 text-center">
        <h3 className="text-xl font-bold mb-2">Application Submitted!</h3>
        <p>Thank you for applying. We will review your application and get back to you soon.</p>
      </div>
    )
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800">
      <h3 className="text-2xl font-bold mb-6">Interested?</h3>
      <form action={action} className="space-y-6">
        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="firstName">First name</Label>
            <Input id="firstName" name="firstName" required className="mt-2 bg-white dark:bg-slate-950" />
          </div>
          <div>
            <Label htmlFor="lastName">Last name</Label>
            <Input id="lastName" name="lastName" required className="mt-2 bg-white dark:bg-slate-950" />
          </div>
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required className="mt-2 bg-white dark:bg-slate-950" />
        </div>

        <div>
          <Label htmlFor="phone">Phone number</Label>
          <Input id="phone" name="phone" type="tel" className="mt-2 bg-white dark:bg-slate-950" />
        </div>

        <div>
          <Label htmlFor="linkedin">LinkedIn profile URL</Label>
          <Input id="linkedin" name="linkedin" type="url" placeholder="https://linkedin.com/in/..." className="mt-2 bg-white dark:bg-slate-950" />
        </div>

        <div>
          <Label htmlFor="resume">Upload your resume (PDF)</Label>
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-slate-300 px-6 py-8 hover:bg-slate-100 transition-colors cursor-pointer bg-white dark:bg-slate-950">
            <div className="text-center">
              <div className="mt-4 flex text-sm leading-6 text-slate-600 justify-center">
                <label
                  htmlFor="resume"
                  className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                >
                  <span>Click to upload or drag & drop</span>
                  <Input id="resume" name="resume" type="file" accept=".pdf" className="sr-only" required />
                </label>
              </div>
              <p className="text-xs leading-5 text-slate-500 mt-2">PDF up to 10MB</p>
            </div>
          </div>
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-6 text-lg">
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </Button>
      </form>
    </div>
  )
}
