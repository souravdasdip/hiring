import { notFound } from "next/navigation"
import prisma from "@/lib/prisma"
import { Badge } from "@/components/ui/badge"
import { ApplyForm } from "@/components/blocks/ApplyForm"

export const revalidate = 60

export async function generateStaticParams() {
  try {
    const jobs = await prisma.job.findMany({ select: { id: true } })
    return jobs.map((job) => ({ id: job.id }))
  } catch (e) {
    return []
  }
}

export default async function JobPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const job = await prisma.job.findUnique({ where: { id: params.id } })

  if (!job || !job.isActive) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-5xl mb-4">{job.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
              {job.department && <Badge variant="secondary" className="bg-slate-100">{job.department}</Badge>}
              {job.salaryRange && <Badge variant="outline" className="text-indigo-600 border-indigo-200 bg-indigo-50 dark:bg-indigo-900/30 dark:border-indigo-800">{job.salaryRange}</Badge>}
            </div>
            
            {job.requiredSkills && job.requiredSkills.length > 0 && (
              <div className="mt-8 flex gap-4 flex-wrap items-center">
                 <span className="font-semibold text-slate-900 dark:text-white">Required Skills:</span>
                 {job.requiredSkills.map(skill => (
                    <Badge key={skill} variant="outline" className="font-normal text-slate-600">{skill}</Badge>
                 ))}
              </div>
            )}
          </div>

          <hr className="border-slate-200 dark:border-slate-800" />

          {/* Details */}
          <div className="prose prose-slate dark:prose-invert max-w-none">
            {job.aboutCompany && (
              <>
                <h3>About Company</h3>
                <p>{job.aboutCompany}</p>
              </>
            )}
            
            <div className="my-8">
               <p className="mb-2"><strong>Job Type:</strong> {job.type}</p>
               <p><strong>Location:</strong> {job.location}</p>
            </div>

            <h3 className="mt-8">Job Summary</h3>
            <p className="whitespace-pre-wrap">{job.jobSummary}</p>

            {job.responsibilities && job.responsibilities.length > 0 && (
              <>
                <h3 className="mt-8">Key Responsibilities</h3>
                <ul className="list-disc pl-6 space-y-2">
                  {job.responsibilities.map((resp, i) => (
                    <li key={i}>{resp}</li>
                  ))}
                </ul>
              </>
            )}

            {job.qualifications && job.qualifications.length > 0 && (
              <>
                <h3 className="mt-8">Required Skills and Qualifications</h3>
                <ul className="list-disc pl-6 space-y-2">
                  {job.qualifications.map((qual, i) => (
                    <li key={i}>{qual}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>

        {/* Sidebar / Application Form */}
        <div className="lg:col-span-1">
          <div className="sticky top-12">
            <ApplyForm jobId={job.id} />
          </div>
        </div>
      </div>
    </main>
  )
}
