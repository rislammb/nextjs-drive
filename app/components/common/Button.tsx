import { type MouseEventHandler } from "react";

interface ButtonProps {
  title: string;
  btnClass?: string;
  onClick?: MouseEventHandler;
  type?: "submit" | "reset" | "button" | undefined;
}

export default function Button({
  btnClass,
  title,
  onClick,
  type,
}: ButtonProps) {
  return (
    <button className={`btn ${btnClass}`} onClick={onClick} type={type}>
      {title}
    </button>
  );
}
