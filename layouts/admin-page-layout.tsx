import React from 'react';

type Props = {
  title: string;
};

export default function AdminPageLayout({
  title,
  children,
}: Readonly<React.PropsWithChildren<Props>>) {
  return (
    <div className="grid gap-5">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold md:text-2xl">{title}</h1>
      </div>
      <div className="flex flex-1">{children}</div>
    </div>
  );
}
