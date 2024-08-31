import DynamicBreadcrumbs from '@/components/dynamic-breadcrumbs';
import React from 'react';

type Props = {
  title: string | React.ReactNode;
};

export default function AdminPageLayout({
  title,
  children,
}: Readonly<React.PropsWithChildren<Props>>) {
  return (
    <div className="grid gap-5 container">
      <DynamicBreadcrumbs />
      <div className="flex items-center">
        {typeof title === 'string' && (
          <h1 className="text-xl font-semibold md:text-2xl">{title}</h1>
        )}
        {typeof title !== 'string' && title}
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
}
