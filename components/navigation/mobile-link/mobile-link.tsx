import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";

interface MobileLinkProps extends LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onOpenChange?: (open: boolean) => void;
  [key: string]: unknown;
}

export function MobileLink({
  href,
  children,
  className,
  onOpenChange,
  ...props
}: MobileLinkProps) {
  const router = useRouter();

  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={cn(className)}
      {...props}>
      {children}
    </Link>
  );
}
