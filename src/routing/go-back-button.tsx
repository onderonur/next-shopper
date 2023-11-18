'use client';

import { Button } from '@/common/button';
import { ArrowLeftIcon } from '@/common/icons';
import { useRouter } from 'next/navigation';

export function GoBackButton() {
  const router = useRouter();

  return (
    <Button
      aria-label="Go Back"
      circle
      variant="transparent"
      icon={<ArrowLeftIcon />}
      onClick={() => {
        router.back();
      }}
    />
  );
}
