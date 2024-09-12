import type { ButtonLinkProps } from '@/core/ui/components/button-link';

type MobileNavButtonBaseProps = Pick<
  ButtonLinkProps,
  'variant' | 'className' | 'iconAlignment' | 'icon'
>;

export function getMobileNavButtonBaseProps({
  icon,
}: {
  icon: React.ReactNode;
}): MobileNavButtonBaseProps {
  return {
    variant: 'transparent',
    className: 'w-full py-1 text-xs opacity-60',
    iconAlignment: 'top',
    icon: <span className="text-xl">{icon}</span>,
  };
}
