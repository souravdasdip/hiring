"use client";

import { useState } from "react";
import { RichTextEditor } from "./RichTextEditor";

interface RichTextInputProps {
  name: string;
  defaultValue?: string;
}

export function RichTextInput({ name, defaultValue = "" }: RichTextInputProps) {
  const [content, setContent] = useState(defaultValue);

  return (
    <>
      <input type="hidden" name={name} value={content} />
      <RichTextEditor content={content} onChange={setContent} />
    </>
  );
}
