import Link from "next/link";
import { CreateBlogForm } from "./CreateBlogForm";

export default function CreateBlogPage() {
  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Create New Blog Post
        </h1>
        <Link
          href="/admin/blogs"
          className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 font-medium text-sm"
        >
          &larr; Back to Blogs
        </Link>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
        <CreateBlogForm />
      </div>
    </div>
  );
}
