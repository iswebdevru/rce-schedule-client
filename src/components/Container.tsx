import { PropsWithChildren } from 'react';

export default function Container(props: PropsWithChildren) {
  return (
    <div {...props} className="grow w-full max-w-7xl px-4 xl:px-2 mx-auto" />
  );
}
