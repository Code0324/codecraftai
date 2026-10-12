import Image from 'next/image';

interface TeamAvatarProps {
  src: string;
  alt: string;
  /** Rendered diameter in px. */
  size: number;
  priority?: boolean;
  className?: string;
}

/** Clean circular avatar: nothing is drawn outside the circle's edge. */
export default function TeamAvatar({ src, alt, size, priority = false, className = '' }: TeamAvatarProps) {
  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-full border border-cyan-400/40 bg-slate-800 ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={`${size}px`}
        priority={priority}
        className="rounded-full object-cover object-[center_top]"
      />
    </div>
  );
}
