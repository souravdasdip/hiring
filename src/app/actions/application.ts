"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function submitApplication(formData: FormData) {
  const jobId = formData.get("jobId") as string
  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string
  const email = formData.get("email") as string
  const phoneNumber = formData.get("phone") as string
  const linkedInUrl = formData.get("linkedin") as string
  
  // For MVP, we'll just store a dummy URL since file upload to S3/Blob is complex to setup without keys
  // A real implementation would parse the File object and upload it.
  const resumeUrl = "https://example.com/resume.pdf" 

  if (!jobId || !firstName || !lastName || !email) {
    throw new Error("Missing required fields")
  }

  try {
    await prisma.jobApplication.create({
      data: {
        jobId,
        firstName,
        lastName,
        email,
        phoneNumber,
        linkedInUrl,
        resumeUrl,
      }
    })
    
    // We might want to revalidate the admin dashboard path if we had one showing counts
    revalidatePath("/admin/applications")
    
    return { success: true }
  } catch (error) {
    console.error("Failed to submit application:", error)
    throw new Error("Failed to submit application")
  }
}
