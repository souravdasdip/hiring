import { HeroSection } from "@/components/blocks/HeroSection"
import { JobCard } from "@/components/blocks/JobCard"
import { BlogCard } from "@/components/blocks/BlogCard"
import prisma from "@/lib/prisma"

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
      
      {/* Featured Jobs Section */}
      <section className="py-24 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Featured Opportunities</h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">Join teams that are changing the world.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))
          ) : (
            <p className="col-span-full text-center text-slate-500">No open positions at the moment. Check back soon!</p>
          )}
        </div>
      </section>

      {/* Latest Insights Section */}
      <section className="py-24 mx-auto max-w-7xl px-6 lg:px-8 border-t border-slate-200 dark:border-slate-800">
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
            <p className="col-span-full text-center text-slate-500">No articles published yet.</p>
          )}
        </div>
      </section>
    </main>
  );
}
