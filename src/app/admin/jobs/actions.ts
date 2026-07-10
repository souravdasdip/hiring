"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

function processArrayFields(text: string) {
  return text.split(',').map(s => s.trim()).filter(Boolean)
}

export async function createJob(formData: FormData) {
  const title = formData.get("title") as string
  const department = formData.get("department") as string
  const salaryRange = formData.get("salaryRange") as string
  const aboutCompany = formData.get("aboutCompany") as string
  const type = formData.get("type") as string
  const location = formData.get("location") as string
  const jobSummary = formData.get("jobSummary") as string
  const isActive = formData.get("isActive") === "on"
  
  const requiredSkills = processArrayFields(formData.get("requiredSkills") as string)
  const responsibilities = processArrayFields(formData.get("responsibilities") as string)
  const qualifications = processArrayFields(formData.get("qualifications") as string)

  await prisma.job.create({
    data: {
      title,
      department,
      salaryRange,
      aboutCompany,
      type,
      location,
      jobSummary,
      requiredSkills,
      responsibilities,
      qualifications,
      isActive
    }
  })

  revalidatePath("/admin/jobs")
  revalidatePath("/jobs")
  redirect("/admin/jobs")
}

export async function updateJob(id: string, formData: FormData) {
  const title = formData.get("title") as string
  const department = formData.get("department") as string
  const salaryRange = formData.get("salaryRange") as string
  const aboutCompany = formData.get("aboutCompany") as string
  const type = formData.get("type") as string
  const location = formData.get("location") as string
  const jobSummary = formData.get("jobSummary") as string
  const isActive = formData.get("isActive") === "on"
  
  const requiredSkills = processArrayFields(formData.get("requiredSkills") as string)
  const responsibilities = processArrayFields(formData.get("responsibilities") as string)
  const qualifications = processArrayFields(formData.get("qualifications") as string)

  await prisma.job.update({
    where: { id },
    data: {
      title,
      department,
      salaryRange,
      aboutCompany,
      type,
      location,
      jobSummary,
      requiredSkills,
      responsibilities,
      qualifications,
      isActive
    }
  })

  revalidatePath("/admin/jobs")
  revalidatePath("/jobs")
  redirect("/admin/jobs")
}

export async function deleteJob(id: string) {
  await prisma.job.delete({
    where: { id }
  })

  revalidatePath("/admin/jobs")
  revalidatePath("/jobs")
}
