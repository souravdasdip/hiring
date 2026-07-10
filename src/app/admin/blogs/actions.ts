"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

export async function createBlog(formData: FormData) {
  const title = formData.get("title") as string
  const excerpt = formData.get("excerpt") as string
  const content = formData.get("content") as string
  const author = formData.get("author") as string
  const coverImage = formData.get("coverImage") as string
  const isPublished = formData.get("isPublished") === "on"
  
  const slug = generateSlug(title)

  await prisma.blogPost.create({
    data: {
      title,
      slug,
      excerpt,
      content,
      author,
      coverImage: coverImage || null,
      publishedAt: isPublished ? new Date() : null,
    }
  })

  revalidatePath("/admin/blogs")
  revalidatePath("/blogs")
  redirect("/admin/blogs")
}

export async function updateBlog(id: string, formData: FormData) {
  const title = formData.get("title") as string
  const excerpt = formData.get("excerpt") as string
  const content = formData.get("content") as string
  const author = formData.get("author") as string
  const coverImage = formData.get("coverImage") as string
  const isPublished = formData.get("isPublished") === "on"
  
  const slug = generateSlug(title)

  await prisma.blogPost.update({
    where: { id },
    data: {
      title,
      slug,
      excerpt,
      content,
      author,
      coverImage: coverImage || null,
      publishedAt: isPublished ? new Date() : null,
    }
  })

  revalidatePath("/admin/blogs")
  revalidatePath("/blogs")
  redirect("/admin/blogs")
}

export async function deleteBlog(id: string) {
  await prisma.blogPost.delete({
    where: { id }
  })

  revalidatePath("/admin/blogs")
  revalidatePath("/blogs")
}
