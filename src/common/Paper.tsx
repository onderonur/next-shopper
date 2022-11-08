type PaperProps = React.PropsWithChildren;

export default function Paper({ children }: PaperProps) {
  return (
    <div className="shadow-md rounded-lg p-6 bg-background-main">
      {children}
    </div>
  );
}
