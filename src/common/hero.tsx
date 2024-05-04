import {
  APP_DESCRIPTION,
  APP_REPOSITORY_URL,
  APP_TITLE,
} from '@/common/common-utils';
import { ExternalLinkIcon } from '@/common/icons';
import { routes } from '@/routing/routing-utils';
import { ButtonLink } from './button-link';
import { Divider } from './divider';

export function Hero() {
  return (
    <div className="border-b">
      <div className="flex flex-col items-center gap-4 px-4 py-12 text-center">
        <h1 className="text-5xl font-black text-primary sm:text-7xl lg:text-8xl">
          {APP_TITLE}
        </h1>
        <Divider />
        <div className="flex flex-col items-center gap-2">
          <p className="text-lg font-semibold text-muted-foreground sm:text-xl">
            {APP_DESCRIPTION}
          </p>
          <ButtonLink
            className="mt-1"
            href={APP_REPOSITORY_URL}
            isExternalUrl
            icon={<ExternalLinkIcon />}
            iconAlignment="right"
          >
            Check the Source Code
          </ButtonLink>
        </div>
        <Divider />
        <ButtonLink variant="primary" href={routes.search()}>
          Browse Store
        </ButtonLink>
      </div>
    </div>
  );
}
