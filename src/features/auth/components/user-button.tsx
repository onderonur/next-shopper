import { SubmitButton } from '@/core/forms/components/submit-button';
import { redirectToSignIn } from '@/features/auth/actions';
import { UserMenu } from '@/features/auth/components/user-menu';
import { getUser } from '@/features/auth/data';

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
