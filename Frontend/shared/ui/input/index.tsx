import { forwardRef, type ChangeEvent, type InputHTMLAttributes } from "react";
import SearchSVG from "@svg/searchSVG/search.svg?react";
import styles from "./style.module.scss";

type InputProps = {
  placeholder: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  Icon?: boolean;
  value?: string | number;
  id?: string | number;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, placeholder, Icon = false, id, ...rest }, ref) => {
    return (
      <>
        <div className={styles.InputWrapper}>
          {Icon && <SearchSVG className={styles.InputSVG} />}
          <input
            ref={ref}
            className={`${styles.Input} ${className}`}
            placeholder={placeholder}
            id={id}
            name="input"
            {...rest}
          />
        </div>
      </>
    );
  }
);

Input.displayName = "Input";
