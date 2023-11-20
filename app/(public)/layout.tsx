export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // NOTE: does not have a header or a navigation bar
    <>
      <main className="flex min-h-screen max-w-md justify-center items-center m-auto">{children}</main>
    </>
  );
}
