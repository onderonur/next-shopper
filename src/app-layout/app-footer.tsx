import ButtonLink from '@/common/button-link';
import { APP_REPOSITORY_URL, APP_TITLE } from '@/common/common-utils';
import { GithubIcon } from '@/common/icons';

export default function AppFooter() {
  return (
    <footer className="flex h-16 items-center justify-between bg-background-main px-6 text-text-light">
      <p>
        {new Date().getFullYear()} © {APP_TITLE}
      </p>
      <ButtonLink
        aria-label="Check the Source Code on GitHub"
        icon={<GithubIcon />}
        href={APP_REPOSITORY_URL}
        isExternalUrl
      />
    </footer>
  );
}
