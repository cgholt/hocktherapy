export default function SectionDivider({
  from,
  to,
  variant = 1,
}: {
  from: "primary" | "secondary";
  to: "primary" | "secondary";
  variant?: 1 | 2 | 3 | 4;
}) {
  const fromColor = from === "primary" ? "var(--primary)" : "var(--secondary)";
  const toColor = to === "primary" ? "var(--primary)" : "var(--secondary)";

  // Different asymmetrical shapes for variety
  const shapes: Record<number, string> = {
    1: "0,70 1440,0 1440,100 0,100",      // steep left-to-right
    2: "0,0 1440,50 1440,100 0,100",      // gentle right-to-left
    3: "0,30 720,80 1440,20 1440,100 0,100", // valley
    4: "0,60 600,10 1440,40 1440,100 0,100", // irregular
  };

  return (
    <div
      className="relative w-full h-16 md:h-20 -my-px"
      style={{ backgroundColor: fromColor }}
    >
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon points={shapes[variant]} fill={toColor} />
      </svg>
    </div>
  );
}
