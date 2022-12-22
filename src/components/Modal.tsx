import { PropsWithChildren } from 'react';
import ReactDOM from 'react-dom';

interface ModalProps extends PropsWithChildren {
  hidden: boolean;
}

export function Modal({ children, hidden }: ModalProps) {
  return ReactDOM.createPortal(hidden ? null : children, document.body);
}
