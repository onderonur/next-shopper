import { APP_DESCRIPTION, APP_TITLE, APP_URL } from '@/common/common-utils';
import type { Metadata } from 'next';

export function getMetadata({
  title,
  description,
  pathname,
  images,
}: {
  title?: string;
  description?: string;
  pathname?: string;
  images?: Array<{ url: string; alt: string }>;
}): Metadata {
  const metaTitle = title ? `${title} | ${APP_TITLE}` : APP_TITLE;
  const metaDescription = description || APP_DESCRIPTION;

  return {
    title: metaTitle,
    description: metaDescription,
    creator: 'Onur Önder',
    metadataBase: new URL(APP_URL),
    openGraph: {
      type: 'website',
      title: metaTitle,
      description: metaDescription,
      siteName: APP_TITLE,
      locale: 'en_US',
      images,
      url: pathname,
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images,
      creator: '@onderonur_',
    },
    alternates: {
      canonical: pathname,
    },
  };
}
