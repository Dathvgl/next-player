"use client";

import { File } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Input } from "~/components/ui/input";

type ImageInputProps = {
  className?: string;
  onChange?: (value?: File) => void;
};

export default function ImageInput({ className, onChange }: ImageInputProps) {
  const ref = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File>();

  useEffect(() => {
    onChange?.(selectedFile);
  }, [selectedFile]);

  function onChangeInput(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files || event.target.files.length === 0) {
      setSelectedFile(undefined);
    } else setSelectedFile(event.target.files[0]);
  }

  return (
    <button
      className={className}
      type="button"
      onClick={() => ref.current?.click()}
    >
      <File />
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
