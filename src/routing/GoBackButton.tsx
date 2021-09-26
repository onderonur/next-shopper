import Button from '@src/common/Button';
import { ArrowLeftIcon } from '@src/common/Icons';
import { useRouter } from 'next/dist/client/router';

function GoBackButton() {
  const router = useRouter();

  return (
    <Button
      circle
      variant="transparent"
      icon={<ArrowLeftIcon />}
      onClick={router.back}
    />
  );
}

export default GoBackButton;
