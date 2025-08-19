import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  type = "button",
  children,
  className = "",
  ...props
}: ButtonProps) => {
  return (
    <>
      <button className={className} {...props} type={type}>
        {children}
      </button>
    </>
  );
};
