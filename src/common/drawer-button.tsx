'use client';

import type { ButtonProps } from './button';
import Button from './button';
import { useDrawerContext } from './drawer-context';

type DrawerButtonProps = Pick<
  ButtonProps,
  'aria-label' | 'icon' | 'variant' | 'children'
>;

export default function DrawerButton(props: DrawerButtonProps) {
  const { open } = useDrawerContext();

  return <Button {...props} onClick={open} />;
}
