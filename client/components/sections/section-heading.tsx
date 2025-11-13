import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex w-full max-w-3xl flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left"
      )}
    >
      <span className="text-xs font-semibold uppercase tracking-[0.5em] text-primary">
        {eyebrow}
      </span>
      <h2 className="font-serif text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="text-base text-foreground/65 sm:text-lg">{description}</p>
      ) : null}
    </div>
  );
}
