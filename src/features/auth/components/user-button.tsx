import { SubmitButton } from '@/core/forms/components/submit-button';
import { redirectToSignIn } from '@/features/auth/auth.actions';
import { getUser } from '@/features/auth/auth.data';
import { UserMenu } from '@/features/auth/components/user-menu';

export async function UserButton() {
  const user = await getUser();

  if (!user) {
    return (
      <form action={redirectToSignIn}>
        <SubmitButton className="px-2 py-1">Sign In</SubmitButton>
      </form>
    );
  }

  return <UserMenu user={user} />;
}
