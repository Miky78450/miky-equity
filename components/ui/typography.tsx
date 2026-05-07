import { cn } from "@/lib/utils";

// ─── DisplayHeading ───────────────────────────────────────────────────────────
// Newsreader editorial heading — used for hero titles (H1/H2)
interface DisplayHeadingProps {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
}

export function DisplayHeading({
  children,
  className,
  as: Tag = "h1",
}: DisplayHeadingProps) {
  return (
    <Tag className={cn("text-display-hero text-foreground", className)}>
      {children}
    </Tag>
  );
}

// ─── SectionHeading ───────────────────────────────────────────────────────────
// Newsreader 64px — used for section titles
interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
}

export function SectionHeading({
  children,
  className,
  as: Tag = "h2",
}: SectionHeadingProps) {
  return (
    <Tag className={cn("text-headline-lg text-foreground", className)}>
      {children}
    </Tag>
  );
}

// ─── CardHeading ──────────────────────────────────────────────────────────────
// Newsreader 40px — used for card/sub-section titles
interface CardHeadingProps {
  children: React.ReactNode;
  className?: string;
  as?: "h3" | "h4";
}

export function CardHeading({
  children,
  className,
  as: Tag = "h3",
}: CardHeadingProps) {
  return (
    <Tag className={cn("text-headline-md text-foreground", className)}>
      {children}
    </Tag>
  );
}

// ─── Eyebrow ─────────────────────────────────────────────────────────────────
// Inter caps 11px gold — used above headings as category/label
interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
}

export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <span className={cn("text-label-caps text-gold block", className)}>
      {children}
    </span>
  );
}

// ─── KPINumber ────────────────────────────────────────────────────────────────
// Large gold metric with tabular nums — used in KPI strips
interface KPINumberProps {
  value: string;
  label: string;
  className?: string;
}

export function KPINumber({ value, label, className }: KPINumberProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <span className="text-label-caps text-muted-foreground">{label}</span>
      <span className="text-headline-md text-gold tabular">{value}</span>
    </div>
  );
}
