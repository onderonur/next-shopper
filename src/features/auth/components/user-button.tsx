import { SubmitButton } from '@/core/forms/components/submit-button';
import { redirectToSignIn } from '@/features/auth/actions';
import { UserMenu } from '@/features/auth/components/user-menu';
import { getUser } from '@/features/auth/data';
import Form from 'next/form';

export async function UserButton() {
  const user = await getUser();

  if (!user) {
    return (
      <Form action={redirectToSignIn}>
        <SubmitButton className="px-2 py-1">Sign In</SubmitButton>
      </Form>
    );
  }

  return <UserMenu user={user} />;
}
