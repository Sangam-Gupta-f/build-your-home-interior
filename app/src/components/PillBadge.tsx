interface PillBadgeProps {
  text: string;
  variant?: 'light' | 'dark';
}

export default function PillBadge({ text, variant = 'light' }: PillBadgeProps) {
  const isLight = variant === 'light';
  return (
    <span
      className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-medium tracking-[0.08em] uppercase border ${
        isLight
          ? 'text-charcoal border-[rgba(201,169,110,0.25)]'
          : 'text-white border-white/20'
      }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${isLight ? 'bg-champagne-gold' : 'bg-champagne-gold'}`} />
      {text}
    </span>
  );
}
