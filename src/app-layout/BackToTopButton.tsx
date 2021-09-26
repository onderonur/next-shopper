import Button from '@src/common/Button';
import { IS_SERVER } from '@src/common/CommonUtils';
import { ArrowUpIcon } from '@src/common/Icons';
import FadeIn from '@src/transitions/FadeIn';
import { useState } from 'react';
import { useEffect } from 'react';

const thresholdY = 800;

function BackToTopButton() {
  const [scrollY, setScrollY] = useState<number>(
    IS_SERVER ? 0 : window.scrollY,
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <FadeIn isIn={scrollY >= thresholdY}>
      <Button
        className="fixed bottom-16 right-6 bg-background-main opacity-80"
        icon={<ArrowUpIcon />}
        onClick={() => window.scrollTo({ behavior: 'smooth', top: 0 })}
      />
    </FadeIn>
  );
}

export default BackToTopButton;
