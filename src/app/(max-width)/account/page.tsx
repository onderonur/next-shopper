import { getMetadata } from '@/core/seo/utils';
import { Card, CardContent } from '@/core/ui/components/card';
import {
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
} from '@/core/ui/components/description-list';
import { PageTitle } from '@/core/ui/components/page-title';
import { Section, SectionTitle } from '@/core/ui/components/section';
import { DeleteAccountButton } from '@/features/account/components/delete-account-button';
import { redirectToSignIn } from '@/features/auth/actions';
import { getUser } from '@/features/auth/data';

export const metadata = getMetadata({
  title: 'Account',
  description: 'View your account details',
  pathname: '/account',
});

export default async function OrdersPage() {
  const user = await getUser();
  if (!user) return await redirectToSignIn();

  return (
    <main>
      <PageTitle title="Account" />
      <div className="mx-auto flex max-w-screen-sm flex-col gap-6">
        <Section>
          <SectionTitle>Details</SectionTitle>
          <Card>
            <CardContent>
              <DescriptionList>
                {
                  <>
                    <DescriptionTerm>Username</DescriptionTerm>
                    <DescriptionDetails>{user.name}</DescriptionDetails>
                  </>
                }
                {user.email && (
                  <>
                    <DescriptionTerm>E-mail</DescriptionTerm>
                    <DescriptionDetails>{user.email}</DescriptionDetails>
                  </>
                )}
              </DescriptionList>
            </CardContent>
          </Card>
        </Section>
        <Section>
          <SectionTitle>Danger Zone</SectionTitle>
          <Card>
            <CardContent>
              <DeleteAccountButton />
            </CardContent>
          </Card>
        </Section>
      </div>
    </main>
  );
}
