import React from 'react';
import { SocialTooltip, SocialItem } from '@/components/ui/social-media';

const socialLinks: SocialItem[] = [
  {
    href: 'https://www.facebook.com/cgpavingcompany/',
    ariaLabel: 'Facebook',
    tooltip: 'Facebook',
    color: '#3b5998',
    svgUrl: '/Socials/2023_Facebook_icon.svg.png',
  },
  {
    href: 'https://www.instagram.com/cgpavingcompany',
    ariaLabel: 'Instagram',
    tooltip: 'Instagram',
    color: '#E4405F',
    svgUrl: '/Socials/Instagram_logo_2016.svg.png',
  },
];

const SocialTooltipDemo = () => {
  return (
    <div className="flex items-center justify-center h-full bg-background">
      <SocialTooltip items={socialLinks} />
    </div>
  );
};

export default SocialTooltipDemo;
