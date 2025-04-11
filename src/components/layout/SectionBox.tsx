import { ReactNode } from 'react';

export default function SectionBox({ children }: { children: ReactNode }) {
  return (
    <div className="bg-background m-4 xl:m-6 3xl:m-8 p-4 shadow rounded-xl">
      {children}
    </div>
  );
}