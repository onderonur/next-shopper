import { SubmitButton } from '@/core/forms/components/submit-button';
import { searchParamParser } from '@/core/routing/schemas';
import type { SearchParams } from '@/core/routing/types';
import { parseSearchParams, routes } from '@/core/routing/utils';
import { getMetadata } from '@/core/seo/utils';
import { APP_TITLE } from '@/core/shared/utils';
import { Card, CardContent } from '@/core/ui/components/card';
import { Container } from '@/core/ui/components/container';
import { GithubIcon } from '@/core/ui/components/icons';
import { PageTitle } from '@/core/ui/components/page-title';
import { providerMap, signIn } from '@/features/auth/auth';
import { getUser } from '@/features/auth/data';
import { AuthError } from 'next-auth';
import Form from 'next/form';
import { redirect } from 'next/navigation';
import { z } from 'zod';

// TODO: Change this
const SIGNIN_ERROR_URL = '/';

export const metadata = getMetadata({
  title: 'Sign In',
  pathname: routes.signIn(),
});

const searchParamsSchema = z
  .object({
    callbackUrl: searchParamParser.toSingle(z.string()),
  })
  .partial();

type SignInPageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function SignInPage(props: SignInPageProps) {
  const user = await getUser();

  if (user) redirect('/');

  const searchParams = await props.searchParams;
  const { callbackUrl } = parseSearchParams({
    searchParamsSchema,
    searchParams,
  });

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
            {Object.values(providerMap).map((provider) => (
              <Form
                key={provider.id}
                className="w-full max-w-sm"
                action={async () => {
                  'use server';
                  try {
                    await signIn(provider.id, {
                      redirectTo: callbackUrl ?? '',
                    });
                  } catch (error) {
                    // Signin can fail for a number of reasons, such as the user
                    // not existing, or the user not having the correct role.
                    // In some cases, you may want to redirect to a custom error
                    if (error instanceof AuthError) {
                      return redirect(
                        `${SIGNIN_ERROR_URL}?error=${error.type}`,
                      );
                    }

                    // Otherwise if a redirects happens Next.js can handle it
                    // so you can just re-thrown the error and let Next.js handle it.
                    // Docs:
                    // https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
                    throw error;
                  }
                }}
              >
                <SubmitButton className="w-full">
                  <GithubIcon />
                  Sign in with {provider.name}
                </SubmitButton>
              </Form>
            ))}
          </CardContent>
        </Card>
      </Container>
    </main>
  );
}
