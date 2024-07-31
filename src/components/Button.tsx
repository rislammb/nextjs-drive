interface ButtonProps {
  title: string;
  btnClass?: string;
  onClick?: () => void
}

export default function Button({ btnClass, title, onClick }: ButtonProps ) {
  return <button className={`btn ${btnClass}`} onClick={onClick}>{title}</button>;
}
