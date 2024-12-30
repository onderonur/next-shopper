import { SubmitButton } from '@/core/forms/components/submit-button';
import { getMetadata } from '@/core/seo/utils';
import { Card, CardContent } from '@/core/ui/components/card';
import { Container } from '@/core/ui/components/container';
import {
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
} from '@/core/ui/components/description-list';
import { PageTitle } from '@/core/ui/components/page-title';
import { Section, SectionTitle } from '@/core/ui/components/section';
import { deleteAccount } from '@/features/account/actions';
import { redirectToSignIn } from '@/features/auth/actions';
import { getUser } from '@/features/auth/data';
import Form from 'next/form';

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
      <Container maxWidth="sm" className="flex flex-col gap-6">
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
              <Form action={deleteAccount}>
                <SubmitButton variant="danger">Delete Account</SubmitButton>
              </Form>
            </CardContent>
          </Card>
        </Section>
      </Container>
    </main>
  );
}
