type AlertProps = {
  icon?: React.ReactNode;
  children: React.ReactNode;
};

export function Alert({ icon, children }: AlertProps) {
  return (
    <div className="border-error text-error flex gap-2 rounded-sm border p-3">
      <div className="text-2xl">{icon}</div>
      <div>{children}</div>
    </div>
  );
}

type AlertTitleProps = {
  children: React.ReactNode;
};

export function AlertTitle({ children }: AlertTitleProps) {
  return <p className="font-semibold">{children}</p>;
}

type AlertDescriptionProps = {
  children: React.ReactNode;
};

export function AlertDescription({ children }: AlertDescriptionProps) {
  return <p className="text-sm">{children}</p>;
}
