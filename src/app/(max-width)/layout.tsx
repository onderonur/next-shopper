type AppLayoutProps = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  return <div className="mx-auto max-w-screen-xl p-2 md:p-4">{children}</div>;
}
