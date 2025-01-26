import { routes } from '@/core/routing/utils';
import {
  APP_DESCRIPTION,
  APP_REPOSITORY_URL,
  APP_TITLE,
} from '@/core/shared/utils';
import { ButtonLink } from '@/core/ui/components/button-link';
import { Divider } from '@/core/ui/components/divider';
import { ExternalLinkIcon } from '@/core/ui/components/icons';

export function Hero() {
  return (
    <div className="border-b">
      <div className="flex flex-col items-center gap-4 px-4 py-12 text-center">
        <h1 className="text-primary text-5xl font-black sm:text-7xl lg:text-8xl">
          {APP_TITLE}
        </h1>
        <Divider />
        <div className="flex flex-col items-center gap-2">
          <p className="text-muted-foreground max-w-2xl text-lg font-semibold sm:text-xl">
            {APP_DESCRIPTION}
          </p>
          <ButtonLink className="mt-1" href={APP_REPOSITORY_URL}>
            Check the Source Code
            <ExternalLinkIcon />
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
