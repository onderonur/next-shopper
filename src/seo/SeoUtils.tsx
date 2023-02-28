import { APP_DESCRIPTION, APP_TITLE } from '@/common/CommonUtils';
import { Metadata } from 'next';

export function getMetadata({
  title,
  description,
  images,
}: {
  title?: string;
  description?: string;
  images?: [{ url: string; alt: string }];
} = {}): Metadata {
  const metaTitle = title ? `${title} | ${APP_TITLE}` : APP_TITLE;
  const metaDescription = description || APP_DESCRIPTION;

  return {
    title: metaTitle,
    description: metaDescription,
    themeColor: '#fff',
    creator: 'Onur Önder',
    metadataBase: new URL('https://next-shopper.vercel.app'),
    openGraph: {
      type: 'website',
      title: metaTitle,
      description: metaDescription,
      siteName: APP_TITLE,
      locale: 'en_US',
      images,
      // TODO:
      // url: '',
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images,
      creator: '@onderonur_',
    },
    alternates: {
      // TODO
      // canonical: '',
    },
  };
}
