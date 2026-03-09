import React from 'react';
import { cn } from '@/lib/utils';

export interface SocialItem {
  href: string;
  ariaLabel: string;
  tooltip: string;
  svgUrl: string;
  color: string;
}

export interface SocialTooltipProps extends React.HTMLAttributes<HTMLUListElement> {
  items: SocialItem[];
}

const SocialTooltip = React.forwardRef<HTMLUListElement, SocialTooltipProps>(
  ({ className, items, ...props }, ref) => {
    const baseIconStyles =
      'relative flex items-center justify-center w-11 h-11 rounded-full bg-[#a3a9b1] border border-[#6f7680] overflow-hidden transition-all duration-300 ease-in-out shadow-[0_8px_22px_rgba(0,0,0,0.35)] group-hover:shadow-lg';
    const baseSvgStyles =
      'relative z-10 w-[22px] h-[22px] object-contain transition-transform duration-300 ease-in-out group-hover:scale-105';
    const baseFilledStyles =
      'absolute bottom-0 left-0 w-full h-0 transition-all duration-300 ease-in-out group-hover:h-full';
    const baseTooltipStyles =
      'absolute bottom-[-34px] left-1/2 -translate-x-1/2 px-2 py-1 text-[11px] text-white whitespace-nowrap rounded-md opacity-0 invisible transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:visible group-hover:bottom-[-42px]';

    return (
      <ul
        ref={ref}
        className={cn('flex items-center justify-center gap-2', className)}
        {...props}
      >
        {items.map((item, index) => (
          <li key={index} className="relative group">
            <a
              href={item.href}
              aria-label={item.ariaLabel}
              className={cn(baseIconStyles)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div
                className={cn(baseFilledStyles)}
                style={{ backgroundColor: item.color }}
              />
              <img
                src={item.svgUrl}
                alt={item.ariaLabel}
                className={cn(baseSvgStyles)}
              />
            </a>
            <div
              className={cn(baseTooltipStyles)}
              style={{ backgroundColor: item.color }}
            >
              {item.tooltip}
            </div>
          </li>
        ))}
      </ul>
    );
  }
);

SocialTooltip.displayName = 'SocialTooltip';

export { SocialTooltip };
