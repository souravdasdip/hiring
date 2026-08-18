import prisma from "@/lib/prisma"
import { BlogCard } from "@/components/blocks/BlogCard"

import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog",
  description: "Discover the latest insights, news, and tips from our team. Stay updated on our journey.",
}

export const revalidate = 60

export default async function BlogsPage() {
  let blogs: any[] = [];
  try {
    blogs = await prisma.blogPost.findMany({
      orderBy: { publishedAt: 'desc' },
    });
  } catch (e) {
    console.error("Database connection failed during build, using empty fallback");
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-slate-900 dark:text-white">
            Our <span className="text-blue-600 dark:text-blue-500">Blog</span>
          </h1>
          <p className="mt-6 text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Discover the latest insights, news, and tips from our team. Stay updated on our journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <BlogCard key={blog.id} post={blog} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
              <p className="text-lg text-slate-500">No articles published yet. Check back soon!</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
