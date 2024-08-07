import { type MouseEventHandler } from "react";

interface ButtonProps {
  title: string;
  btnClass?: string;
  onClick?: MouseEventHandler;
}

export default function Button({ btnClass, title, onClick }: ButtonProps) {
  return (
    <button className={`btn ${btnClass}`} onClick={onClick}>
      {title}
    </button>
  );
}
