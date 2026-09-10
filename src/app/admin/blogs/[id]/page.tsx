import prisma from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EditBlogForm } from "./EditBlogForm";

export default async function EditBlogPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const blog = await prisma.blogPost.findUnique({
    where: { id: params.id },
  });

  if (!blog) {
    notFound();
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Edit Blog Post
        </h1>
        <Link
          href="/admin/blogs"
          className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 font-medium text-sm"
        >
          &larr; Back to Blogs
        </Link>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
        <EditBlogForm
          blogId={blog.id}
          defaultTitle={blog.title}
          defaultAuthor={blog.author}
          defaultExcerpt={blog.excerpt}
          defaultContent={blog.content}
          defaultCoverImage={blog.coverImage ?? ""}
          defaultIsPublished={blog.publishedAt !== null}
        />
      </div>
    </div>
  );
}
