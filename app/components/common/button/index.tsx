import { type MouseEventHandler } from "react";
import { useFormStatus } from "react-dom";

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
  const { pending } = useFormStatus();

  return (
    <button
      className={`btn ${btnClass}`}
      onClick={onClick}
      type={type}
      aria-disabled={pending}
    >
      {pending && <span className="loading loading-spinner"></span>}
      {title}
    </button>
  );
}
