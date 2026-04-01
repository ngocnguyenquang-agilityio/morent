const AppLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <div className="flex h-screen flex-col">{children}</div>
);

export default AppLayout;
