import { useTheme } from '@src/styling/ThemeProvider';
import { Router } from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

Router.events.on('routeChangeStart', () => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function PageProgressBar() {
  const theme = useTheme();
  const color = theme.colors.secondary.light;

  return (
    <style
      jsx
      // If we don't set "global" here, there is a warning as:
      // Received `true` for a non-boolean attribute `jsx`.
      global
    >
      {`
        #nprogress .bar {
          background: ${color};
        }

        #nprogress .peg {
          box-shadow: 0 0 10px ${color}, 0 0 5px ${color};
        }

        #nprogress .spinner-icon {
          display: none;
        }
      `}
    </style>
  );
}

export default PageProgressBar;
