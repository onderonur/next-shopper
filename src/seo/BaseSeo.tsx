import { NextSeo, NextSeoProps } from 'next-seo';
import { OpenGraph } from 'next-seo/lib/types';

type BaseSeoProps = Pick<NextSeoProps, 'title' | 'description'> &
  Pick<OpenGraph, 'images'>;

function BaseSeo({ title, description, images }: BaseSeoProps) {
  return (
    <NextSeo
      title={title}
      description={description}
      openGraph={{
        title,
        description,
        images,
      }}
      twitter={{
        handle: '@onderonur_',
      }}
    />
  );
}

export default BaseSeo;
