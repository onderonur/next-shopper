import Button from '@/common/Button';
import { APP_REPOSITORY_URL, APP_TITLE } from '@/common/CommonUtils';
import { GithubIcon } from '@/common/Icons';

export default function AppFooter() {
  return (
    <footer className="bg-background-main px-6 h-16 flex justify-between items-center text-text-light">
      {new Date().getFullYear()} © {APP_TITLE}
      <Button
        aria-label="Check the Source Code on GitHub"
        icon={<GithubIcon />}
        href={APP_REPOSITORY_URL}
        isExternalUrl
      />
    </footer>
  );
}
