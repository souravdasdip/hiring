import { notFound } from "next/navigation"
import prisma from "@/lib/prisma"
import { format } from "date-fns"

export const revalidate = 60

export async function generateStaticParams() {
  try {
    const blogs = await prisma.blogPost.findMany({ select: { slug: true } })
    return blogs.map((blog: any) => ({ slug: blog.slug }))
  } catch (e) {
    return []
  }
}

export default async function BlogPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const post = await prisma.blogPost.findUnique({ where: { slug: params.slug } })

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 py-16 sm:py-24">
      <article className="mx-auto max-w-3xl px-6 lg:px-8">
        <header className="mb-12 text-center">
          <div className="text-sm font-semibold text-indigo-600 mb-4">
            {post.publishedAt ? format(new Date(post.publishedAt), "MMMM d, yyyy") : "Draft"} • By {post.author}
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-slate-900 dark:text-white mb-6">
            {post.title}
          </h1>
          <p className="text-xl text-slate-500 dark:text-slate-400">
            {post.excerpt}
          </p>
        </header>

        {post.coverImage && (
          <div className="mb-12 rounded-2xl overflow-hidden shadow-lg">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        <div className="prose prose-lg prose-slate dark:prose-invert mx-auto max-w-none">
          {/* For MVP, we render raw text/html. In production, sanitize HTML or use a Markdown renderer. */}
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </article>
    </main>
  )
}
