export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative mx-auto size-full p-4 sm:min-h-[calc(100dvh-3.5rem)]">
      {children}
    </div>
  );
}
