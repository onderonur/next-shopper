import { DefaultSeo } from 'next-seo';
import { APP_DESCRIPTION, APP_TITLE } from '@src/common/CommonUtils';

function BaseDefaultSeo() {
  const title = APP_TITLE;

  return (
    <DefaultSeo
      defaultTitle={title}
      titleTemplate={`%s | ${APP_TITLE}`}
      description={APP_DESCRIPTION}
      openGraph={{
        type: 'website',
        title,
        description: APP_DESCRIPTION,
        site_name: APP_TITLE,
        locale: 'en_US',
      }}
    />
  );
}

export default BaseDefaultSeo;
