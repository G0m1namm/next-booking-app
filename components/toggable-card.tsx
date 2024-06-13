import React, { useCallback } from 'react';

import { useToggle } from '@mantine/hooks';

import { cn } from '@/lib/utils';

import { Button } from './ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

interface Props {
  onAction?: () => void;
  actionText?: string;
  heading?: string;
  subHeading?: string;
  open?: boolean;
  renderInitialContent?: () => React.ReactNode;
}

export default function ToggableCard({
  children,
  open,
  onAction,
  actionText,
  renderInitialContent,
  heading,
  subHeading,
}: React.PropsWithChildren<Props>) {
  const [defaultOpen, onDefaultAction] = useToggle();
  const activeOpen = open == null ? defaultOpen : open;
  const activeActionHandler = open == null ? onDefaultAction : onAction;

  const canShowSubHeading = subHeading && !defaultOpen && !open;

  const initilContent = useCallback(() => {
    if (renderInitialContent) {
      return renderInitialContent();
    }

    return (
      <div>
        {heading && <h2 className="text-lg">{heading}</h2>}
        {canShowSubHeading && <p>{subHeading}</p>}
      </div>
    );
  }, [heading, subHeading, renderInitialContent, canShowSubHeading]);

  return (
    <Collapsible
      open={activeOpen}
      onOpenChange={activeActionHandler}
      className={cn('py-6 px-4', {
        'border border-gray-200 rounded-lg shadow-md transition-shadow duration-200 ease-linear bg-zinc-50':
          activeOpen,
      })}
    >
      <div className="flex justify-between items-start">
        {initilContent()}
        <CollapsibleTrigger asChild>
          <Button className="text-lg" variant="link">
            {actionText ?? (activeOpen ? 'Close' : 'Edit')}
          </Button>
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent>{children}</CollapsibleContent>
    </Collapsible>
  );
}
