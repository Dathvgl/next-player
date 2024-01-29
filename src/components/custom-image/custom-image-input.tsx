"use client";

import { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import { cn } from "~/lib/utils";

type CustomImageInputProps = {
  className?: string;
  src?: string;
  onChange?: (value?: File) => void;
};

export default function CustomImageInput({
  className,
  src,
  onChange,
}: CustomImageInputProps) {
  const ref = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState(src);
  const [selectedFile, setSelectedFile] = useState<File>();

  useEffect(() => {
    onChange?.(selectedFile);

    if (!selectedFile) {
      setPreview(src);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [selectedFile]);

  function onChangeInput(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files || event.target.files.length === 0) {
      setSelectedFile(undefined);
    } else setSelectedFile(event.target.files[0]);
  }

  return (
    <button
      className={cn("w-full h-full", className)}
      style={{
        backgroundImage: !preview ? undefined : `url(${preview})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      type="button"
      onClick={() => ref.current?.click()}
    >
      <Input
        className="hidden"
        ref={ref}
        type="file"
        accept="image/*"
        onChange={onChangeInput}
      />
    </button>
  );
}
