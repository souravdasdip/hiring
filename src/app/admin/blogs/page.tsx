import prisma from "@/lib/prisma"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { deleteBlog } from "./actions"

export default async function AdminBlogsPage() {
  const blogs = await prisma.blogPost.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Manage Blogs</h1>
        <Link 
          href="/admin/blogs/create" 
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md font-medium transition-colors text-sm"
        >
          Create New Blog
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Blog Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Published Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blogs.map(blog => (
                <TableRow key={blog.id}>
                  <TableCell className="font-medium">{blog.title}</TableCell>
                  <TableCell>{blog.author}</TableCell>
                  <TableCell>
                    {blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString() : (
                      <span className="text-slate-400 italic">Draft</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right space-x-3">
                    <Link href={`/admin/blogs/${blog.id}`} className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 text-sm font-medium">
                      Edit
                    </Link>
                    <form action={async () => {
                      "use server";
                      await deleteBlog(blog.id);
                    }} className="inline">
                      <button type="submit" className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium">
                        Delete
                      </button>
                    </form>
                  </TableCell>
                </TableRow>
              ))}
              {blogs.length === 0 && (
                 <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-slate-500">No blog posts created yet.</TableCell>
                 </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
