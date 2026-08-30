import { HeroSection } from "@/components/blocks/HeroSection"
import { JobCard } from "@/components/blocks/JobCard"
import { BlogCard } from "@/components/blocks/BlogCard"
import prisma from "@/lib/prisma"

import { Metadata } from "next"
import { ArrowRight, Search, Briefcase, MapPin } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Home",
  description: "Find the best job opportunities matching your skills and experience.",
}

// ISR: revalidate this page every 60 seconds
export const revalidate = 60;

export default async function Home() {
  let jobs: any[] = [];
  let blogs: any[] = [];
  try {
    const results = await Promise.all([
      prisma.job.findMany({
        where: { isActive: true },
        orderBy: { createdAt: 'desc' },
        take: 6,
      }),
      prisma.blogPost.findMany({
        orderBy: { publishedAt: 'desc' },
        take: 3,
      })
    ]);
    jobs = results[0];
    blogs = results[1];
  } catch (e) {
    console.error("Database connection failed during build, using empty fallback");
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <HeroSection />

      {/* How It Works */}
      <section className="py-24 relative overflow-hidden bg-white dark:bg-slate-900">
        <div className="absolute inset-0 dot-grid opacity-30 dark:opacity-10" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16 text-center max-w-2xl mx-auto">
            <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-3">How It Works</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-slate-900 dark:text-white">
              Start Your Journey in 3 Simple Steps
            </h2>
            <p className="mt-4 text-lg text-slate-500 dark:text-slate-400">
              From discovery to your first day — we make the process simple, fast, and effective.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connector line (desktop only) */}
            <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-px bg-gradient-to-r from-indigo-200 via-violet-200 to-indigo-200 dark:from-indigo-800 dark:via-violet-800 dark:to-indigo-800" />

            {[
              {
                step: "01",
                icon: "🔍",
                title: "Browse Opportunities",
                description: "Explore hundreds of part-time and full-time roles across every state. Filter by location, job type, and salary range.",
                color: "from-indigo-500 to-indigo-600",
                bg: "bg-indigo-50 dark:bg-indigo-900/20",
              },
              {
                step: "02",
                icon: "📝",
                title: "Submit Application",
                description: "Apply with your resume and LinkedIn profile in minutes. No lengthy registration required to get started.",
                color: "from-violet-500 to-violet-600",
                bg: "bg-violet-50 dark:bg-violet-900/20",
                elevated: true,
              },
              {
                step: "03",
                icon: "🎯",
                title: "Land the Role",
                description: "Get contacted directly by hiring managers and take the next step toward the career you deserve.",
                color: "from-cyan-500 to-cyan-600",
                bg: "bg-cyan-50 dark:bg-cyan-900/20",
              },
            ].map(({ step, icon, title, description, color, bg, elevated }) => (
              <div
                key={step}
                className={`relative bg-white dark:bg-slate-950 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 group ${elevated ? "md:-translate-y-4 shadow-md shadow-slate-100 dark:shadow-none ring-1 ring-slate-100 dark:ring-slate-800" : ""}`}
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {icon}
                </div>
                <div className="absolute top-6 right-6 text-5xl font-black text-slate-100 dark:text-slate-800 select-none leading-none">
                  {step}
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">{title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-24 relative bg-slate-50 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-3">Open Positions</p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-slate-900 dark:text-white">
                Explore Job Opportunities
              </h2>
              <p className="mt-3 text-lg text-slate-500 dark:text-slate-400 max-w-xl">
                Discover part-time, full-time, office, and remote employment opportunities across the United States.
              </p>
            </div>
            <Link
              href="/jobs"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all duration-200 shrink-0 group"
            >
              View all jobs
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4 text-3xl">
                  <Briefcase className="w-8 h-8 text-slate-400" />
                </div>
                <p className="text-slate-500 dark:text-slate-400 font-medium">No open positions at the moment.</p>
                <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">Check back soon — new roles are added weekly!</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white dark:bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-violet-50 dark:from-indigo-950/30 dark:via-slate-900 dark:to-violet-950/20" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-3">Testimonials</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-slate-900 dark:text-white">
              What Our Community Says
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "Found my dream marketing role within two weeks. The job listings are curated and top quality — exactly what I was looking for.",
                name: "Michael T.",
                role: "Marketing Director",
                img: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
                elevated: false,
              },
              {
                quote: "As a hiring manager, the quality of applicants we receive is outstanding. It's completely transformed how we build our team.",
                name: "Sarah Jenkins",
                role: "VP of Human Resources",
                img: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
                elevated: true,
              },
              {
                quote: "The entire application process was seamless. I loved the transparency around role requirements and compensation expectations.",
                name: "David L.",
                role: "Product Designer",
                img: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
                elevated: false,
              },
            ].map(({ quote, name, role, img, elevated }) => (
              <div
                key={name}
                className={`relative p-8 rounded-3xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 ${elevated ? "md:-translate-y-4 shadow-2xl shadow-slate-200/60 dark:shadow-none ring-1 ring-indigo-100 dark:ring-indigo-900/50" : "shadow-sm"} transition-all duration-300 hover:shadow-lg`}
              >
                {/* Large quote mark */}
                <div className="absolute top-5 right-7 text-7xl font-serif text-indigo-100 dark:text-slate-800 leading-none select-none">"</div>

                {/* Stars */}
                <div className="flex gap-0.5 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-7 relative z-10 text-[15px]">"{quote}"</p>

                <div className="flex items-center gap-3.5">
                  <img src={img} alt={name} className="w-11 h-11 rounded-full object-cover ring-2 ring-white dark:ring-slate-800 shadow-sm" />
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white text-sm">{name}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Insights Section */}
      {blogs.length > 0 && (
        <section className="py-24 bg-slate-50 dark:bg-slate-950">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mb-12 text-center">
              <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-3">From the Blog</p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-slate-900 dark:text-white">Latest Insights</h2>
              <p className="mt-4 text-lg text-slate-500 dark:text-slate-400">Career tips, hiring news, and company updates.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <BlogCard key={blog.id} post={blog} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
