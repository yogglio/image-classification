export default function ImagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="mx-auto max-w-lg p-4">{children}</div>;
}
