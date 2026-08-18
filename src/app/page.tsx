import { HeroSection } from "@/components/blocks/HeroSection"
import { JobCard } from "@/components/blocks/JobCard"
import { BlogCard } from "@/components/blocks/BlogCard"
import prisma from "@/lib/prisma"

import { Metadata } from "next"

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

      {/* Our Clients Section */}
      <section className="py-12 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-center text-sm font-semibold text-slate-500 dark:text-slate-400 mb-8 uppercase tracking-wider">Trusted by innovative teams worldwide</p>
          <div className="flex flex-wrap justify-center gap-10 md:gap-20 items-center opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Using simple text placeholders for logos for now */}
            <span className="text-xl font-bold font-serif">tatari</span>
            <span className="text-xl font-bold font-sans">Brex</span>
            <span className="text-xl font-bold tracking-tight">Assembled</span>
            <span className="text-xl font-bold">Thumbtack</span>
            <span className="text-xl font-bold italic">Benchling</span>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-slate-900 dark:text-white">Quickly Expand your Workforce.</h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">Take advantage of our global employment products to hire who you want, wherever you want - starting in just minutes.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 text-center">
            <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">🔍</div>
            <h3 className="text-xl font-bold mb-3">1. Find Talent</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Post jobs and reach thousands of qualified candidates looking for their next big opportunity.</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 text-center relative md:-translate-y-4">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">🤝</div>
            <h3 className="text-xl font-bold mb-3">2. Connect & Interview</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Review applications, schedule interviews, and find the perfect culture and skill fit for your team.</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">🚀</div>
            <h3 className="text-xl font-bold mb-3">3. Hire & Onboard</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Make the offer and start the onboarding process seamlessly through our integrated platform.</p>
          </div>
        </div>
      </section>
      
      {/* Featured Jobs Section */}
      <section className="py-24 bg-slate-100/50 dark:bg-slate-900/50 border-y border-slate-200/50 dark:border-slate-800/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Featured Opportunities</h2>
              <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">Join teams that are changing the world.</p>
            </div>
            <a href="/jobs" className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors">View all jobs &rarr;</a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))
            ) : (
              <p className="col-span-full text-center text-slate-500 py-10">No open positions at the moment. Check back soon!</p>
            )}
          </div>
        </div>
      </section>

      {/* About Us / Banner */}
      <section className="py-24 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="bg-indigo-600 rounded-[3rem] overflow-hidden relative">
          <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dcbpbntcj/image/upload/v1720626359/grid_1_h3l8tz.svg')] opacity-30 mix-blend-overlay"></div>
          <div className="relative px-8 py-20 md:px-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-5xl text-white mb-6">The help you Need, When you Need it.</h2>
              <p className="text-indigo-100 text-lg mb-8 leading-relaxed">
                Lattice People Platform simplifies HR Operations across the entire employee and team impact cycle, offering a comprehensive solution for modern organizations.
              </p>
              <a href="/about" className="inline-flex bg-white text-indigo-900 font-semibold px-6 py-3 rounded-full hover:bg-indigo-50 transition-colors">
                Learn more about us
              </a>
            </div>
            <div className="relative h-64 lg:h-full min-h-[300px] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/20">
               <img src="https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Office collaboration" className="absolute inset-0 w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Client Review Slider (Static representation) */}
      <section className="py-24 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-16 text-slate-900 dark:text-white">What our users say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 text-left relative">
              <div className="text-4xl text-indigo-300 absolute top-4 right-6">"</div>
              <p className="text-slate-600 dark:text-slate-400 italic mb-6 relative z-10">"Lattice helped me find my dream job in marketing within two weeks. The platform is incredibly intuitive and the roles are top-tier."</p>
              <div className="flex items-center gap-4">
                <img src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2" alt="User" className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white">Michael T.</div>
                  <div className="text-sm text-slate-500">Marketing Director</div>
                </div>
              </div>
            </div>
            <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 text-left relative transform md:-translate-y-4 shadow-lg shadow-slate-200/50 dark:shadow-none">
              <div className="text-4xl text-indigo-300 absolute top-4 right-6">"</div>
              <p className="text-slate-600 dark:text-slate-400 italic mb-6 relative z-10">"As an employer, the quality of candidates we've sourced through this platform is unmatched. It's transformed our hiring process entirely."</p>
              <div className="flex items-center gap-4">
                <img src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2" alt="User" className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white">Sarah Jenkins</div>
                  <div className="text-sm text-slate-500">VP of HR, TechCorp</div>
                </div>
              </div>
            </div>
            <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 text-left relative">
              <div className="text-4xl text-indigo-300 absolute top-4 right-6">"</div>
              <p className="text-slate-600 dark:text-slate-400 italic mb-6 relative z-10">"The application process was so seamless. I loved how transparent the companies were about their requirements and salary ranges."</p>
              <div className="flex items-center gap-4">
                <img src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2" alt="User" className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white">David L.</div>
                  <div className="text-sm text-slate-500">Product Designer</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Insights Section */}
      <section className="py-24 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Latest Insights</h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">Read our latest news, tips, and company updates.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <BlogCard key={blog.id} post={blog} />
            ))
          ) : (
            <p className="col-span-full text-center text-slate-500 py-10">No articles published yet.</p>
          )}
        </div>
      </section>
      
      {/* Contact CTA */}
      <section className="py-16 bg-slate-900 text-white border-t border-slate-800">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to start hiring?</h2>
          <p className="text-slate-400 mb-8">Get in touch with our team to learn more about our enterprise solutions.</p>
          <a href="/contact" className="inline-flex bg-indigo-600 text-white font-semibold px-8 py-4 rounded-md hover:bg-indigo-500 transition-colors">
            Contact Sales
          </a>
        </div>
      </section>
    </main>
  );
}
