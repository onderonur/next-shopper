import Button from '@/common/Button';
import {
  APP_DESCRIPTION,
  APP_REPOSITORY_URL,
  APP_TITLE,
} from '@/common/CommonUtils';
import { ExternalLinkIcon } from '@/common/Icons';
import { routes } from '@/routing/RoutingUtils';

function Hero() {
  return (
    <div className="bg-background-main shadow-sm">
      <div className="flex flex-col items-center gap-4 text-center py-12 px-4">
        <h1 className="text-primary-main text-3xl sm:text-4xl lg:text-5xl font-black uppercase">
          {APP_TITLE}
        </h1>
        <div className="flex flex-col items-center">
          <p className="text-primary-dark font-semibold">{APP_DESCRIPTION}</p>
          <Button
            className="mt-1"
            variant="transparent"
            href={APP_REPOSITORY_URL}
            isExternalUrl
            icon={<ExternalLinkIcon />}
            iconAlignment="right"
          >
            Check the Source Code
          </Button>
        </div>
        <hr className="w-24 border-t-4 border-secondary-lighter" />
        <Button href={routes.search()}>Browse Store</Button>
      </div>
    </div>
  );
}

export default Hero;
