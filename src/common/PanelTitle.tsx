type PanelTitleProps = React.PropsWithChildren<{
  actions?: React.ReactNode;
}>;

export default function PanelTitle({ actions, children }: PanelTitleProps) {
  return (
    <div className="flex items-end mb-1">
      <div className="font-semibold text-lg text-text-light">{children}</div>
      <div className="flex-grow" />
      {actions}
    </div>
  );
}
