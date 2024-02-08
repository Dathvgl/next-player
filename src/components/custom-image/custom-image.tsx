import Image from "next/image";
import { cn } from "~/lib/utils";

type CustomImageProps = {
  className?: string;
  src?: string;
  alt?: string;
  fill?: boolean;
  hover?: boolean;
  objectFit?: "cover" | "contain" | "fill" | "scale-down" | "none";
};

// fill center nhưng phải có w và h

export function CustomImage({
  className,
  src,
  alt,
  fill,
  hover,
  objectFit,
}: CustomImageProps) {
  if (!src || alt == undefined) return null;

  return (
    <div className={cn("relative group", className)}>
      {hover && (
        <div className="absolute hidden w-full h-full group-hover:block group-hover:bg-black group-hover:bg-opacity-30" />
      )}
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
