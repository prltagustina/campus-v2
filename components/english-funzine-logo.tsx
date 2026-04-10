interface EnglishFunzineLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function EnglishFunzineLogo({ className = "", size = "md" }: EnglishFunzineLogoProps) {
  const sizes = {
    sm: { width: 180, height: 70 },
    md: { width: 280, height: 110 },
    lg: { width: 400, height: 160 },
  };

  const { width, height } = sizes[size];

  return (
    <svg
      viewBox="0 0 400 160"
      width={width}
      height={height}
      className={className}
      aria-label="English Funzine"
    >
      {/* ENGLISH text */}
      <text
        x="20"
        y="38"
        fill="#FFCB02"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="28"
        fontWeight="700"
        letterSpacing="2"
      >
        ENGLISH
      </text>

      {/* Yellow parallelogram background for "Fun" */}
      <polygon
        points="15,50 200,50 180,140 0,140"
        fill="#FFCB02"
      />

      {/* "Fun" text in white */}
      <text
        x="25"
        y="120"
        fill="#FFFFFF"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="72"
        fontWeight="800"
        fontStyle="italic"
      >
        Fun
      </text>

      {/* "zine" text in yellow */}
      <text
        x="185"
        y="120"
        fill="#FFCB02"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="72"
        fontWeight="800"
      >
        zine
      </text>
    </svg>
  );
}
