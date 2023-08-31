import { ComponentPropsWithoutRef, ComponentPropsWithRef } from 'react';

export default function Select({
  className,
  children,
  ...props
}: ComponentPropsWithRef<'select'>) {
  return (
    <select
      {...props}
      className={`p-2 rounded-md text-sm transition-[outline] ring-blue-300 dark:ring-blue-800 outline outline-1 outline-slate-300 focus:ring-4 focus:outline-blue-500 dark:bg-neutral-900 dark:outline-neutral-800 dark:focus:outline-neutral-700 dark:text-neutral-300 ${
        className ?? ''
      }`}
    >
      {children}
    </select>
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
