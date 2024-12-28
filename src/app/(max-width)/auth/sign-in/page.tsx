import { routes } from '@/core/routing/utils';
import { getMetadata } from '@/core/seo/utils';
import { APP_TITLE } from '@/core/shared/utils';
import { Card, CardContent } from '@/core/ui/components/card';
import { Container } from '@/core/ui/components/container';
import { GithubIcon } from '@/core/ui/components/icons';
import { PageTitle } from '@/core/ui/components/page-title';
import { providerMap } from '@/features/auth/auth.config';
import { SignInWithProvider } from '@/features/auth/components/sign-in-with-provider';
import { getUser } from '@/features/auth/data';
import { redirect } from 'next/navigation';
import type { IconType } from 'react-icons/lib';

const ProviderIconsByName: Record<string, IconType> = {
  github: GithubIcon,
};

export const metadata = getMetadata({
  title: 'Sign In',
  pathname: routes.signIn(),
});

export default async function SignInPage() {
  const user = await getUser();

  if (user) redirect('/');

  return (
    <main>
      <PageTitle srOnly title="Sign In" />
      <Container maxWidth="sm">
        <Card className="py-8">
          <CardContent className="flex flex-col items-center gap-12">
            <div className="text-center">
              <p className="mb-1 text-4xl font-black text-primary">
                {APP_TITLE}
              </p>
              <p className="text-lg font-semibold text-muted-foreground">
                Sign in to your {APP_TITLE} account
              </p>
            </div>
            {Object.values(providerMap).map((provider) => {
              const Icon = ProviderIconsByName[provider.id];

              return (
                <SignInWithProvider key={provider.id} providerId={provider.id}>
                  <Icon />
                  Sign in with {provider.name}
                </SignInWithProvider>
              );
            })}
          </CardContent>
        </Card>
      </Container>
    </main>
  );
}
