import { toast } from 'react-toastify';

interface ToastComponentProps {
  message: string;
}

export function ToastComponent({ message }: ToastComponentProps): JSX.Element {
  return <div>{message}</div>;
}

export const Toast = (message: string, type: string) =>
  toast(<ToastComponent message={message} />, {
    autoClose: 2000,
    hideProgressBar: false,
    progress: undefined,
  });
