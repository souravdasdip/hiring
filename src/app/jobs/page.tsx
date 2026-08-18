import prisma from "@/lib/prisma"
import { JobCard } from "@/components/blocks/JobCard"

import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Careers",
  description: "Join our team and help us build the future. Explore our open roles and find your perfect fit.",
}

export const revalidate = 60

export default async function JobsPage() {
  let jobs: any[] = [];
  try {
    jobs = await prisma.job.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    });
  } catch (e) {
    console.error("Database connection failed during build, using empty fallback");
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-slate-900 dark:text-white">
            Open <span className="text-blue-600 dark:text-blue-500">Positions</span>
          </h1>
          <p className="mt-6 text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Join our team and help us build the future. Explore our open roles and find your perfect fit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
              <p className="text-lg text-slate-500">No open positions at the moment. Check back soon!</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
