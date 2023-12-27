import { ComponentProps, ReactNode } from "react";

type ButtonProps = ComponentProps<"button"> & {
  children: ReactNode;
};

const Button = ({ children, ...props }: ButtonProps) => {
  return <button {...props}>{children}</button>;
};

export default Button;
