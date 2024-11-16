'use client';

import { Button } from '@/core/ui/components/button';
import { ArrowLeftIcon } from '@/core/ui/components/icons';
import { useRouter } from 'next/navigation';

export function GoBackButton() {
  const router = useRouter();

  return (
    <Button
      size="icon"
      className="rounded-full"
      aria-label="Go Back"
      variant="transparent"
      onClick={() => {
        router.back();
      }}
    >
      <ArrowLeftIcon />
    </Button>
  );
}
