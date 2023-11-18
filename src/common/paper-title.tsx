type PaperTitleProps = React.PropsWithChildren;

export default function PaperTitle({ children }: PaperTitleProps) {
  return (
    <div className="mb-1 text-lg font-semibold text-text-light">{children}</div>
  );
}
