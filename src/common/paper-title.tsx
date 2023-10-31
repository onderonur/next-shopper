type PaperTitleProps = React.PropsWithChildren;

export default function PaperTitle({ children }: PaperTitleProps) {
  return (
    <div className="mb-1 font-semibold text-lg text-text-light">{children}</div>
  );
}
