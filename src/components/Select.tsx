import { ComponentPropsWithoutRef, ComponentPropsWithRef } from 'react';

export default function Select({
  className,
  ...props
}: ComponentPropsWithRef<'select'>) {
  return (
    <select
      {...props}
      className={`p-2 rounded-md text-sm transition-[outline] outline outline-1 outline-slate-400 focus:outline-slate-900 dark:bg-neutral-900 dark:outline-neutral-800 dark:focus:outline-neutral-700 dark:text-neutral-300 ${
        className ?? ''
      }`}
    />
  );
}

export function Option({
  className,
  ...props
}: ComponentPropsWithoutRef<'option'>) {
  return (
    <option {...props} className={`dark:text-neutral-400 ${className ?? ''}`} />
  );
}
