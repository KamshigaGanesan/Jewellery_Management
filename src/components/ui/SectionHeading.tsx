interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  title,
  subtitle,
  align = "center",
}: SectionHeadingProps) {
  return (
    <div
      className={`mb-12 ${align === "center" ? "text-center" : "text-left"}`}
    >
      <div className={`mb-4 h-px w-20 bg-gold/70 ${align === "center" ? "mx-auto" : ""}`} />
      <p className={`text-xs uppercase tracking-[0.45em] text-gold/65 ${align === "center" ? "mx-auto" : ""}`}>
        Indiran Jewellers
      </p>
      <h2 className="heading-lg mt-4 gold-text">{title}</h2>
      {subtitle && (
        <p className="mt-4 max-w-2xl text-[var(--color-text-muted)] md:text-lg">{subtitle}</p>
      )}
    </div>
  );
}
