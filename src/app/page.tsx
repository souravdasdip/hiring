import { HeroSection } from "@/components/blocks/HeroSection"
import { JobCard } from "@/components/blocks/JobCard"
import { BlogCard } from "@/components/blocks/BlogCard"
import prisma from "@/lib/prisma"

import { Metadata } from "next"
import {
  ArrowRight,
  Search,
  Briefcase,
  MapPin,
  Code,
  Palette,
  Megaphone,
  Stethoscope,
  BarChart3,
  Globe,
  Sparkles,
  Send,
  Award,
  Clock,
  CheckCircle2,
  ChevronRight
} from "lucide-react"
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

      {/* Next Section: Trust Metrics, Hiring Categories & 3-Step Flow */}
      <section className="py-20 relative overflow-hidden bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
        <div className="absolute inset-0 dot-grid opacity-25 dark:opacity-10" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* 1. Live Platform Metrics Strip */}
          <div className="mb-20 bg-slate-50/80 dark:bg-slate-950/60 rounded-3xl p-6 sm:p-8 border border-slate-200/70 dark:border-slate-800/80 shadow-sm">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {[
                {
                  value: "500+",
                  label: "Active Roles",
                  sub: "Updated this week",
                  icon: Briefcase,
                  color: "text-indigo-600 dark:text-indigo-400",
                  bg: "bg-indigo-50 dark:bg-indigo-950/50",
                },
                {
                  value: "50 States",
                  label: "Nationwide Coverage",
                  sub: "Remote & on-site",
                  icon: Globe,
                  color: "text-violet-600 dark:text-violet-400",
                  bg: "bg-violet-50 dark:bg-violet-950/50",
                },
                {
                  value: "48 Hours",
                  label: "Avg. First Response",
                  sub: "Direct hiring reviews",
                  icon: Clock,
                  color: "text-emerald-600 dark:text-emerald-400",
                  bg: "bg-emerald-50 dark:bg-emerald-950/50",
                },
                {
                  value: "98%",
                  label: "Candidate Satisfaction",
                  sub: "Verified employer ratings",
                  icon: Award,
                  color: "text-amber-600 dark:text-amber-400",
                  bg: "bg-amber-50 dark:bg-amber-950/50",
                },
              ].map((stat) => {
                const IconComponent = stat.icon;
                return (
                  <div key={stat.label} className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center shrink-0`}>
                      <IconComponent className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <div>
                      <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        {stat.value}
                      </div>
                      <div className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                        {stat.label}
                      </div>
                      <div className="text-[11px] text-slate-400 dark:text-slate-500">
                        {stat.sub}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. Popular Hiring Categories
          <div className="mb-24">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <p className="text-xs sm:text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-2">
                  Explore by Field
                </p>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  High-Demand Job Categories
                </h2>
                <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-1">
                  Discover openings across our fastest growing departments and specialties.
                </p>
              </div>

              <Link
                href="/jobs"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors group"
              >
                View all categories
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  title: "Technology & Engineering",
                  roles: "140+ Openings",
                  description: "Full Stack, Frontend, DevOps, Data & Cloud infrastructure roles.",
                  icon: Code,
                  color: "from-blue-500 to-indigo-600",
                },
                {
                  title: "Product & UI/UX Design",
                  roles: "65+ Openings",
                  description: "Product Managers, Design Systems, UX Researchers, and Leads.",
                  icon: Palette,
                  color: "from-purple-500 to-violet-600",
                },
                {
                  title: "Marketing & Growth",
                  roles: "85+ Openings",
                  description: "Brand Strategy, Performance Marketing, SEO, and Content.",
                  icon: Megaphone,
                  color: "from-pink-500 to-rose-600",
                },
                {
                  title: "Healthcare & Clinical",
                  roles: "95+ Openings",
                  description: "Nursing, Clinical Operations, Health Tech, and Care Coordinators.",
                  icon: Stethoscope,
                  color: "from-emerald-500 to-teal-600",
                },
                {
                  title: "Sales & Operations",
                  roles: "70+ Openings",
                  description: "Account Executives, Business Development, Operations & HR.",
                  icon: BarChart3,
                  color: "from-amber-500 to-orange-600",
                },
                {
                  title: "100% Remote USA",
                  roles: "110+ Openings",
                  description: "Flexible, location-independent positions across all disciplines.",
                  icon: Globe,
                  color: "from-cyan-500 to-blue-600",
                },
              ].map((category) => {
                const IconComponent = category.icon;
                return (
                  <Link
                    key={category.title}
                    href="/jobs"
                    className="group relative p-6 rounded-2xl bg-slate-50/70 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform duration-300`}>
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300 group-hover:bg-indigo-50 group-hover:text-indigo-600 dark:group-hover:bg-indigo-950/60 dark:group-hover:text-indigo-300 transition-colors">
                          {category.roles}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {category.title}
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                        {category.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-200/50 dark:border-slate-800/60 flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                      <span>Browse positions</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
          */}

          {/* 3. Modernized 3-Step Candidate Journey */}
          <div>
            <div className="mb-14 text-center max-w-2xl mx-auto">
              <p className="text-xs sm:text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-2">
                Candidate Process
              </p>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-slate-900 dark:text-white">
                Start Your Journey in 3 Simple Steps
              </h2>
              <p className="mt-3 text-base sm:text-lg text-slate-500 dark:text-slate-400">
                From finding your match to your first day — transparent, fast, and respectful of your time.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {/* Connector line (desktop only) */}
              <div className="hidden md:block absolute top-14 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-indigo-200 via-violet-300 to-indigo-200 dark:from-indigo-900 dark:via-violet-800 dark:to-indigo-900 z-0" />

              {[
                {
                  step: "01",
                  icon: Search,
                  title: "Discover Your Match",
                  description: "Explore curated full-time and part-time openings. Filter by location, remote flexibility, tech stack, and salary expectations.",
                  badge: "Smart Discovery",
                  color: "from-indigo-500 to-indigo-600",
                },
                {
                  step: "02",
                  icon: Send,
                  title: "1-Click Direct Application",
                  description: "Apply in minutes with your resume or LinkedIn. No endless account forms or repetitive question fields required.",
                  badge: "Instant Review",
                  color: "from-violet-500 to-violet-600",
                  elevated: true,
                },
                {
                  step: "03",
                  icon: Sparkles,
                  title: "Interview & Land the Role",
                  description: "Connect directly with company hiring managers, receive quick constructive feedback, and secure competitive offers.",
                  badge: "Direct Contact",
                  color: "from-cyan-500 to-blue-600",
                },
              ].map(({ step, icon: StepIcon, title, description, badge, color, elevated }) => (
                <div
                  key={step}
                  className={`relative z-10 bg-white dark:bg-slate-950 p-8 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 group ${
                    elevated
                      ? "md:-translate-y-3 shadow-md shadow-indigo-500/5 ring-2 ring-indigo-500/20 dark:ring-indigo-500/30"
                      : ""
                  }`}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform duration-300`}>
                      <StepIcon className="w-7 h-7" />
                    </div>
                    <span className="text-3xl font-black text-slate-200 dark:text-slate-800 select-none">
                      {step}
                    </span>
                  </div>

                  <span className="inline-block text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 mb-3">
                    {badge}
                  </span>

                  <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
                    {title}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                    {description}
                  </p>
                </div>
              ))}
            </div>
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
