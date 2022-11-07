import { APP_TITLE } from '@src/common/CommonUtils';

type TitleProps = {
  children?: string;
};

export default function Title({ children }: TitleProps) {
  return <title>{children ? `${children} | ${APP_TITLE}` : APP_TITLE}</title>;
}
