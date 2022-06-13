type BadgeProps = React.PropsWithChildren<{
  value: number;
}>;

function Badge({ value, children }: BadgeProps) {
  return (
    <div className="relative">
      {children}
      {!!value && (
        <div className="absolute -top-2 -right-2 rounded-full bg-secondary-main text-white px-2">
          {value}
        </div>
      )}
    </div>
  );
}

export default Badge;
