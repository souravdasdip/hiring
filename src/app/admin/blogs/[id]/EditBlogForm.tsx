"use client";

import { updateBlog } from "../actions";
import { RichTextInput } from "@/components/ui/RichTextInput";
import { CoverImageUploader } from "@/components/ui/CoverImageUploader";

interface EditBlogFormProps {
  blogId: string;
  defaultTitle: string;
  defaultAuthor: string;
  defaultExcerpt: string;
  defaultContent: string;
  defaultCoverImage: string;
  defaultIsPublished: boolean;
}

export function EditBlogForm({
  blogId,
  defaultTitle,
  defaultAuthor,
  defaultExcerpt,
  defaultContent,
  defaultCoverImage,
  defaultIsPublished,
}: EditBlogFormProps) {
  const updateBlogWithId = updateBlog.bind(null, blogId);

  return (
    <form action={updateBlogWithId} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium">
          Title *
        </label>
        <input
          type="text"
          id="title"
          name="title"
          defaultValue={defaultTitle}
          required
          className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700"
        />
        <p className="text-xs text-slate-500">
          The slug will be automatically regenerated from the title if you change it.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="author" className="text-sm font-medium">
            Author *
          </label>
          <input
            type="text"
            id="author"
            name="author"
            defaultValue={defaultAuthor}
            required
            className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium block">Cover Image</label>
          <CoverImageUploader name="coverImage" defaultValue={defaultCoverImage} />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="excerpt" className="text-sm font-medium">
          Excerpt *
        </label>
        <textarea
          id="excerpt"
          name="excerpt"
          defaultValue={defaultExcerpt}
          required
          rows={3}
          className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="content" className="text-sm font-medium">
          Content *
        </label>
        <RichTextInput name="content" defaultValue={defaultContent} />
      </div>

      <div className="space-y-2 flex items-center h-full pt-4">
        <input
          type="checkbox"
          id="isPublished"
          name="isPublished"
          defaultChecked={defaultIsPublished}
          className="h-4 w-4 text-indigo-600 rounded border-slate-300"
        />
        <label
          htmlFor="isPublished"
          className="ml-2 text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          Published
        </label>
      </div>

      <div className="pt-4 flex justify-end">
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
        >
          Update Blog Post
        </button>
      </div>
    </form>
  );
}
