import { ButtonLink } from '@/core/ui/components/button-link';
import {
  BlueskyIcon,
  GithubIcon,
  LinkedinIcon,
  WorldIcon,
  XIcon,
} from '@/core/ui/components/icons';

const socialProfileLinks = [
  {
    href: 'https://onderonur.github.io/',
    title: 'Blog',
    icon: WorldIcon,
  },
  {
    href: 'https://github.com/onderonur',
    title: 'GitHub Profile',
    icon: GithubIcon,
  },
  {
    href: 'https://www.linkedin.com/in/onderonur/',
    title: 'LinkedIn Profile',
    icon: LinkedinIcon,
  },
  {
    href: 'https://bsky.app/profile/onderonur.bsky.social',
    title: 'Bluesky Profile',
    icon: BlueskyIcon,
  },
  {
    href: 'https://x.com/onderonur_',
    title: 'X Profile',
    icon: XIcon,
  },
];

export function SocialProfiles() {
  return (
    <ul className="flex gap-2">
      {socialProfileLinks.map((link) => {
        return (
          <li key={link.href}>
            <ButtonLink
              aria-label={link.title}
              variant="transparent"
              size="icon"
              href={link.href}
            >
              <link.icon className="text-lg" />
            </ButtonLink>
          </li>
        );
      })}
    </ul>
  );
}
