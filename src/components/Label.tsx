import { ComponentPropsWithoutRef } from 'react';

export default function Label({
  className,
  ...props
}: ComponentPropsWithoutRef<'label'>) {
  return (
    <label
      {...props}
      className={`block font-semibold dark:text-neutral-400 ${className ?? ''}`}
    />
  );
}
