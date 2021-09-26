import Button from '@src/common/Button';
import {
  APP_DESCRIPTION,
  APP_REPOSITORY_URL,
  APP_TITLE,
} from '@src/common/CommonUtils';
import { ExternalLinkIcon } from '@src/common/Icons';
import { routes } from '@src/routing/routes';

function Hero() {
  return (
    <div className="bg-background-main shadow-sm">
      <div className="flex flex-col items-center gap-4 text-center py-12 px-4">
        <h1 className="text-primary-main text-3xl sm:text-4xl lg:text-5xl font-bold uppercase">
          {APP_TITLE}
        </h1>
        <div className="flex flex-col items-center">
          <p className="text-primary-dark font-semibold">{APP_DESCRIPTION}</p>
          <Button
            variant="transparent"
            href={APP_REPOSITORY_URL}
            isExternalUrl
            icon={<ExternalLinkIcon />}
            iconAlignment="right"
          >
            Learn More
          </Button>
        </div>
        <hr className="w-24 border-t-4 border-secondary-lighter" />
        <Button href={routes.search({})}>Browse Store</Button>
      </div>
    </div>
  );
}

export default Hero;
