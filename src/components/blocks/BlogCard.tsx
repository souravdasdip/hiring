import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { BlogPost } from "@prisma/client"
import { format } from "date-fns" // we might need to install date-fns

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blogs/${post.slug}`}>
      <Card className="hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300 bg-white dark:bg-slate-900 cursor-pointer h-full flex flex-col group overflow-hidden">
        {post.coverImage && (
          <div className="h-48 w-full overflow-hidden">
            {/* Using img for simplicity, next/image is better for prod */}
            <img 
               src={post.coverImage} 
               alt={post.title}
               className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            />
          </div>
        )}
        <CardHeader>
          <div className="text-xs text-indigo-600 font-semibold mb-2">
            {post.publishedAt ? format(new Date(post.publishedAt), "MMM d, yyyy") : "Draft"}
          </div>
          <CardTitle className="text-xl font-bold group-hover:text-indigo-600 transition-colors line-clamp-2">
            {post.title}
          </CardTitle>
          <CardDescription className="mt-2 text-slate-500">
            By {post.author}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="line-clamp-3 text-sm text-slate-600 dark:text-slate-400">
            {post.excerpt}
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}
