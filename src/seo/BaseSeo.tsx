import { APP_DESCRIPTION, APP_TITLE } from '@src/common/CommonUtils';
import { NextSeo, NextSeoProps } from 'next-seo';
import { OpenGraph } from 'next-seo/lib/types';

type BaseSeoProps = Pick<NextSeoProps, 'title' | 'description'> &
  Pick<OpenGraph, 'images'>;

export default function BaseSeo({ title, description, images }: BaseSeoProps) {
  const metaTitle = title ? `${title} | ${APP_TITLE}` : APP_TITLE;
  const metaDescription = description || APP_DESCRIPTION;

  return (
    <NextSeo
      useAppDir
      title={metaTitle}
      description={metaDescription}
      openGraph={{
        type: 'website',
        title: metaTitle,
        description: metaDescription,
        images,
        site_name: APP_TITLE,
        locale: 'en_US',
      }}
      twitter={{
        handle: '@onderonur_',
      }}
    />
  );
}
