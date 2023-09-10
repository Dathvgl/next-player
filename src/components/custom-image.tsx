import Image from "next/image";

interface CustomImageProps {
  className?: string;
  src: string;
  alt: string;
  fill?: boolean;
  objectFit?: "cover" | "contain" | "fill" | "scale-down" | "none";
}

export function CustomImage({
  className,
  src,
  alt,
  fill,
  objectFit,
}: CustomImageProps) {
  return (
    <div className={`${className ?? ""}${fill ? " relative" : ""}`}>
      <Image
        priority
        src={src}
        alt={alt}
        width={0}
        height={0}
        sizes="(max-width: 768px) 70, (max-width: 1200px) 50vw, 100vw"
        fill={fill}
        style={{
          width: "100%",
          height: fill ? "100%" : "auto",
          objectFit,
        }}
      />
    </div>
  );
}
