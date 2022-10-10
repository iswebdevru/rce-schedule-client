import { PropsWithChildren } from 'react';
import ReactDOM from 'react-dom';

interface PopUpProps extends PropsWithChildren {
  show: boolean;
}

export function PopUp({ children, show }: PopUpProps) {
  return ReactDOM.createPortal(
    show ? children : null,
    document.getElementById('root')!
  );
}
