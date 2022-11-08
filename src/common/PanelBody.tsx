type PanelBodyProps = React.PropsWithChildren;

export default function PanelBody({ children }: PanelBodyProps) {
  return (
    <div className="shadow-md rounded-lg p-6 bg-background-main">
      {children}
    </div>
  );
}
