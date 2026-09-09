import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Digitala produktpass & Blippa | Selectec Nordic',
  description: 'Förstå DPP-regelverket och se hur Blippa kopplar samman produktdata, service, IoT och cirkulära flöden.',
};

export default function DppLayout({children}:{children:React.ReactNode}){
  return children;
}
