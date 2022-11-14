type PaperProps = React.PropsWithChildren;

export default function Paper({ children }: PaperProps) {
  return (
    <div className="bg-background-main shadow-md p-2 md:p-6 md:rounded-lg">
      {children}
    </div>
  );
}
