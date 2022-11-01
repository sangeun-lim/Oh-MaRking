import styles from './Button.module.scss';

interface BtnProps {
  text: string;
}

function Button({ text }: BtnProps): JSX.Element {
  return <button type="button">{text}</button>;
}

export default Button;
