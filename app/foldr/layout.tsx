import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Foldr | Selectec Nordic',
  description:
    'Samla åtkomsten till OneDrive, SharePoint, nätverksdiskar och annan lagring i en säker arbetsyta med Foldr.',
};

export default function FoldrLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
