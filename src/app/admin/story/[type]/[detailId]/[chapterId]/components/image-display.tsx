import { useEffect, useState } from "react";
import { CustomImage } from "~/components/custom-image/custom-image";

export default function ImageDisplay({ file }: { file: File }) {
  const [src, setSrc] = useState<string>();

  useEffect(() => {
    const objectUrl = URL.createObjectURL(file);
    setSrc(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, []);

  if (!src) return null;
  return <CustomImage src={src} alt={file.name} />;
}
