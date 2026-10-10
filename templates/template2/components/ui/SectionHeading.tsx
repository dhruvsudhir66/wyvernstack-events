import Reveal from "@/templates/template2/components/ui/Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="font-display mt-4 text-[clamp(42px,7vw,82px)] leading-[0.92] tracking-[-0.045em]">
        {title}
      </h2>
      {description && (
        <p className="mt-7 max-w-xl text-sm leading-7 text-[var(--muted)] md:text-base">
          {description}
        </p>
      )}
    </Reveal>
  );
}
