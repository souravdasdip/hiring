import { createBlog } from "../actions"
import Link from "next/link"

export default function CreateBlogPage() {
  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Create New Blog Post</h1>
        <Link 
          href="/admin/blogs" 
          className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 font-medium text-sm"
        >
          &larr; Back to Blogs
        </Link>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
        <form action={createBlog} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">Title *</label>
            <input type="text" id="title" name="title" required className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700" />
            <p className="text-xs text-slate-500">The slug will be automatically generated from the title.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="author" className="text-sm font-medium">Author *</label>
              <input type="text" id="author" name="author" required className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700" />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="coverImage" className="text-sm font-medium">Cover Image URL</label>
              <input type="url" id="coverImage" name="coverImage" className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700" placeholder="https://example.com/image.jpg" />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="excerpt" className="text-sm font-medium">Excerpt *</label>
            <textarea id="excerpt" name="excerpt" required rows={3} className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700"></textarea>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="content" className="text-sm font-medium">Content * (Markdown/HTML supported if configured)</label>
            <textarea id="content" name="content" required rows={10} className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700 font-mono"></textarea>
          </div>

          <div className="space-y-2 flex items-center h-full pt-4">
            <input type="checkbox" id="isPublished" name="isPublished" defaultChecked className="h-4 w-4 text-indigo-600 rounded border-slate-300" />
            <label htmlFor="isPublished" className="ml-2 text-sm font-medium text-slate-700 dark:text-slate-300">Publish Immediately</label>
          </div>

          <div className="pt-4 flex justify-end">
            <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md font-medium transition-colors">
              Save Blog Post
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
