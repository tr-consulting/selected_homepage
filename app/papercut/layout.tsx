import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PaperCut | Selectec Nordic',
  description: 'PaperCut MF och PaperCut Hive för säker, enkel och kostnadseffektiv utskrift i hela organisationen.'
};

export default function PaperCutLayout({children}:{children:React.ReactNode}){return children;}
