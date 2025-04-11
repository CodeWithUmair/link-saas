import { ReactNode } from 'react';

export default function SectionBox({ children }: { children: ReactNode }) {
  return (
    <div className="bg-white m-8 p-4 shadow">
      {children}
    </div>
  );
}