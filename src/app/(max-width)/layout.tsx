export default function AppLayout({ children }: LayoutProps<'/'>) {
  return <div className="mx-auto max-w-7xl p-2 md:p-4">{children}</div>;
}
