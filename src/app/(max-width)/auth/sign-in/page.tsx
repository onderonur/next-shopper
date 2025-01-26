import { signInPageSearchParamsSchema } from '@/core/routing/schemas';
import type { SearchParams } from '@/core/routing/types';
import { parseSearchParams, routes } from '@/core/routing/utils';
import { getMetadata } from '@/core/seo/utils';
import { APP_TITLE } from '@/core/shared/utils';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/core/ui/components/alert';
import { Card, CardContent } from '@/core/ui/components/card';
import { GithubIcon, WarningIcon } from '@/core/ui/components/icons';
import { PageTitle } from '@/core/ui/components/page-title';
import { providerMap } from '@/features/auth/auth';
import { SignInWithProvider } from '@/features/auth/components/sign-in-with-provider';
import { getUser } from '@/features/auth/data';
import { redirect } from 'next/navigation';
import type { IconType } from 'react-icons/lib';

// https://github.com/nextauthjs/next-auth/blob/60db749f62f478e306b9539ebb940ad00a90493e/packages/core/src/lib/pages/signin.tsx#L17
const signInErrors: Record<string, string> = {
  default: 'Unable to sign in.',
  Signin: 'Try signing in with a different account.',
  OAuthSignin: 'Try signing in with a different account.',
  OAuthCallbackError: 'Try signing in with a different account.',
  OAuthCreateAccount: 'Try signing in with a different account.',
  EmailCreateAccount: 'Try signing in with a different account.',
  Callback: 'Try signing in with a different account.',
  OAuthAccountNotLinked:
    'To confirm your identity, sign in with the same account you used originally.',
  EmailSignin: 'The e-mail could not be sent.',
  CredentialsSignin:
    'Sign in failed. Check the details you provided are correct.',
  SessionRequired: 'Please sign in to access this page.',
};

const providerIconsByName: Record<string, IconType> = {
  github: GithubIcon,
  google: GithubIcon,
};

type SignInPageProps = {
  searchParams: Promise<SearchParams>;
};

export const metadata = getMetadata({
  title: 'Sign In',
  pathname: routes.signIn(),
});

export default async function SignInPage(props: SignInPageProps) {
  const user = await getUser();

  if (user) redirect('/');

  const searchParams = await props.searchParams;
  const { callbackUrl, error } = parseSearchParams({
    schema: signInPageSearchParamsSchema,
    searchParams,
  });

  return (
    <main>
      <PageTitle srOnly title="Sign In" />
      <Card className="mx-auto max-w-md py-8">
        <CardContent className="flex flex-col items-center gap-12">
          {error && (
            <Alert icon={<WarningIcon />}>
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {signInErrors[error] ?? signInErrors.default}
              </AlertDescription>
            </Alert>
          )}
          <div className="text-center">
            <p className="text-primary mb-1 text-4xl font-black">{APP_TITLE}</p>
            <p className="text-muted-foreground text-lg font-semibold">
              Sign in to your {APP_TITLE} account
            </p>
          </div>
          <div className="flex w-full max-w-sm flex-col gap-3">
            {Object.values(providerMap).map((provider) => {
              const Icon = providerIconsByName[provider.id];

              return (
                <SignInWithProvider
                  key={provider.id}
                  providerId={provider.id}
                  callbackUrl={callbackUrl}
                >
                  <Icon />
                  Sign in with {provider.name}
                </SignInWithProvider>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
