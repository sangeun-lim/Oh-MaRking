import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Toast.scss';

interface ToastComponentProps {
  message: string;
}

export function ToastComponent({ message }: ToastComponentProps): JSX.Element {
  return <div>{message}</div>;
}

export const Toast = (message: string, type: string) => {
  const inputType = type.toLowerCase();
  if (inputType.includes('success')) {
    toast.success(<ToastComponent message={message} />, {
      autoClose: 2000,
      position: toast.POSITION.TOP_CENTER,
      hideProgressBar: true,
      progress: undefined,
    });
  } else if (inputType.includes('fail')) {
    toast.error(<ToastComponent message={message} />, {
      autoClose: 2000,
      position: toast.POSITION.TOP_CENTER,
      hideProgressBar: true,
      progress: undefined,
    });
  }
};
