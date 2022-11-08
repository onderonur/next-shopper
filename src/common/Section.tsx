import React from 'react';

type SectionProps = React.ComponentPropsWithoutRef<'section'>;

const Section = React.forwardRef<React.ComponentRef<'section'>, SectionProps>(
  function Section({ children, ...rest }, ref) {
    return (
      <section ref={ref} {...rest}>
        {children}
      </section>
    );
  },
);

export default Section;
