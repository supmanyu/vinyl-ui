import type { CSSProperties } from 'react';
import type { NeonDrawProps } from './types';

/** Traces SVG shapes with a glowing neon stroke, like a sign warming up. */
export function NeonDraw({
  children,
  viewBox,
  color = 'currentColor',
  strokeWidth = 2,
  duration = 1500,
  glow = true,
  label,
  onEnd,
  className,
}: NeonDrawProps) {
  return (
    <svg
      viewBox={viewBox}
      className={className}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      overflow="visible"
      style={
        {
          '--draw-duration': `${duration}ms`,
          filter: glow ? `drop-shadow(0 0 ${strokeWidth * 2}px ${color})` : undefined,
        } as CSSProperties
      }
    >
      <g
        className="animate-draw"
        onAnimationEnd={(e) => {
          if (e.target === e.currentTarget) onEnd?.();
        }}
      >
        {children}
      </g>
    </svg>
  );
}
