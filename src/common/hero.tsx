import {
  APP_DESCRIPTION,
  APP_REPOSITORY_URL,
  APP_TITLE,
} from '@/common/common-utils';
import { ExternalLinkIcon } from '@/common/icons';
import { routes } from '@/routing/routing-utils';
import ButtonLink from './button-link';

function Hero() {
  return (
    <div className="bg-background-main shadow-sm">
      <div className="flex flex-col items-center gap-4 px-4 py-12 text-center">
        <h1 className="text-3xl font-black uppercase text-primary-main sm:text-4xl lg:text-5xl">
          {APP_TITLE}
        </h1>
        <div className="flex flex-col items-center">
          <p className="font-semibold text-primary-dark">{APP_DESCRIPTION}</p>
          <ButtonLink
            className="mt-1"
            variant="transparent"
            href={APP_REPOSITORY_URL}
            isExternalUrl
            icon={<ExternalLinkIcon />}
            iconAlignment="right"
          >
            Check the Source Code
          </ButtonLink>
        </div>
        <hr className="w-24 border-t-4 border-secondary-lighter" />
        <ButtonLink href={routes.search()}>Browse Store</ButtonLink>
      </div>
    </div>
  );
}

export default Hero;
