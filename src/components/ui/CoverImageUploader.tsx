"use client";

import { useRef, useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";
import { Upload, X, ImageIcon, Loader2 } from "lucide-react";
import Image from "next/image";

interface CoverImageUploaderProps {
  /** The hidden input name consumed by the Server Action */
  name?: string;
  /** Pre-populate with an existing URL (edit page) */
  defaultValue?: string;
}

export function CoverImageUploader({
  name = "coverImage",
  defaultValue = "",
}: CoverImageUploaderProps) {
  const { edgestore } = useEdgeStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [imageUrl, setImageUrl] = useState(defaultValue);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");
    setUploading(true);
    setProgress(0);

    try {
      const res = await edgestore.blogImages.upload({
        file,
        onProgressChange: (p) => setProgress(p),
        // Replace the previous image if there was one
        options: imageUrl ? { replaceTargetUrl: imageUrl } : undefined,
      });
      setImageUrl(res.url);
    } catch (err) {
      setError("Upload failed. Please try again.");
      console.error(err);
    } finally {
      setUploading(false);
    }
  }

  function handleRemove() {
    setImageUrl("");
    setProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  return (
    <div className="space-y-3">
      {/* Hidden input that carries the final URL to the Server Action */}
      <input type="hidden" name={name} value={imageUrl} />

      {imageUrl ? (
        /* ── Preview ── */
        <div className="relative w-full rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 aspect-video bg-slate-100 dark:bg-slate-800">
          <Image
            src={imageUrl}
            alt="Cover image preview"
            fill
            className="object-cover"
            sizes="(max-width: 896px) 100vw, 896px"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-1.5 shadow-lg transition-colors"
            aria-label="Remove cover image"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        /* ── Drop-zone ── */
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="w-full flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors aspect-video cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {uploading ? (
            <>
              <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
              <span className="text-sm text-slate-600 dark:text-slate-400">
                Uploading… {progress}%
              </span>
              {/* Progress bar */}
              <div className="w-48 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-500 transition-all duration-200"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-indigo-50 dark:bg-indigo-900/30">
                <ImageIcon className="h-7 w-7 text-indigo-500" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  <span className="text-indigo-600 dark:text-indigo-400">
                    Click to upload
                  </span>{" "}
                  a cover image
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  JPG, PNG, WebP or GIF · max 4 MB
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Upload className="h-3.5 w-3.5" />
                Stored on EdgeStore
              </div>
            </>
          )}
        </button>
      )}

      {/* Native file input (hidden) */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleFileChange}
        className="sr-only"
        aria-label="Upload cover image"
      />

      {error && (
        <p className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
          <X className="h-3.5 w-3.5" />
          {error}
        </p>
      )}
    </div>
  );
}
