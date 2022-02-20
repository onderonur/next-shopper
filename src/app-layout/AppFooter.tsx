import Button from '@src/common/Button';
import { APP_REPOSITORY_URL, APP_TITLE } from '@src/common/CommonUtils';
import { GithubIcon } from '@src/common/Icons';

function AppFooter() {
  return (
    <footer className="bg-background-main px-6 h-16 shrink-0 flex justify-between items-center">
      {new Date().getFullYear()} © {APP_TITLE}
      <Button icon={<GithubIcon />} href={APP_REPOSITORY_URL} isExternalUrl />
    </footer>
  );
}

export default AppFooter;
