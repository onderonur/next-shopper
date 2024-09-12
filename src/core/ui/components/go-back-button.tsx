'use client';

import { Button } from '@/core/ui/components/button';
import { ArrowLeftIcon } from '@/core/ui/components/icons';
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
