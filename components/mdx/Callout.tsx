interface CalloutProps {
  type?: "info" | "warning" | "tip" | "danger";
  title?: string;
  children: React.ReactNode;
}

const CONFIG = {
  info: {
    icon: "ℹ",
    borderColor: "border-blue-400/40",
    bgColor: "bg-blue-400/5",
    iconColor: "text-blue-400",
    titleColor: "text-blue-300",
  },
  warning: {
    icon: "⚠",
    borderColor: "border-amber-400/40",
    bgColor: "bg-amber-400/5",
    iconColor: "text-amber-400",
    titleColor: "text-amber-300",
  },
  tip: {
    icon: "◆",
    borderColor: "border-gold/40",
    bgColor: "bg-gold/5",
    iconColor: "text-gold",
    titleColor: "text-gold",
  },
  danger: {
    icon: "✕",
    borderColor: "border-red-400/40",
    bgColor: "bg-red-400/5",
    iconColor: "text-red-400",
    titleColor: "text-red-300",
  },
};

export function Callout({ type = "tip", title, children }: CalloutProps) {
  const { icon, borderColor, bgColor, iconColor, titleColor } = CONFIG[type];

  return (
    <div
      className={`my-8 border-l-2 p-5 ${borderColor} ${bgColor}`}
      role="note"
      aria-label={title ?? type}
    >
      <div className="flex items-start gap-3">
        <span
          className={`mt-0.5 shrink-0 text-sm font-bold ${iconColor}`}
          aria-hidden="true"
        >
          {icon}
        </span>
        <div className="min-w-0 flex-1">
          {title && (
            <p className={`text-label-caps mb-2 font-semibold ${titleColor}`}>
              {title}
            </p>
          )}
          <div className="text-body-md text-muted-foreground [&>p]:mb-0 [&>p:last-child]:mb-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
