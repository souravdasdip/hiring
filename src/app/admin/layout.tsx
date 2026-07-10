import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import Link from "next/link"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)
  
  if (!session || (session.user as any)?.role !== 'ADMIN') {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 hidden md:block">
        <div className="h-full flex flex-col">
          <div className="h-16 flex items-center px-6 font-bold text-xl text-indigo-600">
            Admin Panel
          </div>
          <nav className="flex-1 px-4 py-4 space-y-2">
            <Link href="/admin" className="block px-4 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
              Dashboard
            </Link>
            <Link href="/admin/jobs" className="block px-4 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
              Jobs
            </Link>
            <Link href="/admin/blogs" className="block px-4 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
              Blogs
            </Link>
            <Link href="/" className="block px-4 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
              Back to Site
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <header className="h-16 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center px-6 justify-between">
          <h1 className="font-semibold text-lg">Overview</h1>
          <div className="flex items-center gap-4">
             <span className="text-sm font-medium">{session.user?.name || session.user?.email}</span>
             <Link href="/api/auth/signout" className="text-sm text-red-600 hover:underline">Sign out</Link>
          </div>
        </header>
        <div className="flex-1 p-8 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
