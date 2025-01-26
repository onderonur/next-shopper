'use client';

import type { NumberFlowProps } from '@number-flow/react';
import NumberFlow, { continuous } from '@number-flow/react';

type AnimatedNumberProps = Pick<NumberFlowProps, 'value' | 'format' | 'suffix'>;

export function AnimatedNumber(props: AnimatedNumberProps) {
  return <NumberFlow plugins={[continuous]} {...props} />;
}
