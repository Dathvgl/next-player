import { LucideProps } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { cn } from "~/lib/utils";

type IconProps = {
  icon: React.FC<LucideProps>;
  className?: string;
  color?: string;
  fill?: string;
  size?: number;
  button?: boolean;
};

export default function LIcon({
  icon: Icon,
  className,
  color,
  fill,
  size,
  button,
}: IconProps) {
  const child = fill ? (
    <Icon className={className} color={color} size={size} fill={fill} />
  ) : (
    <Icon className={className} color={color} size={size} />
  );

  if (!button) return child;
  else {
    return (
      <div
        className={cn(
          "!rounded-full !overflow-hidden",
          buttonVariants({
            size: "icon",
            variant: "ghost",
          })
        )}
      >
        {child}
      </div>
    );
  }
}

export function LinkLIcon({
  href,
  children,
  icon,
  active,
}: {
  href: string;
  children?: React.ReactNode;
  icon?: React.FC<LucideProps>;
  active?: boolean;
  disabled?: boolean;
}) {
  return (
    <Link className="rounded-full overflow-hidden" href={href}>
      <div
        className={
          active
            ? buttonVariants({ size: "icon" })
            : buttonVariants({
                size: "icon",
                variant: "ghost",
              })
        }
      >
        {children}
        {icon && <LIcon icon={icon} className="h-5 w-5" />}
      </div>
    </Link>
  );
}
