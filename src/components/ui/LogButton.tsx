import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes, MouseEvent } from "react";
import { useState } from "react";

import { cn } from "../../utils/cn";

const logButtonVariants = cva(
  "flex h-12 w-49 cursor-pointer items-center justify-center gap-3 rounded-xl border text-sm font-medium tracking-[0.2em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed",
  {
    variants: {
      logged: {
        true: "border-Lime-500 bg-Lime-500 text-Neutral-900 hover:border-Lime-300 focus-visible:outline-Lime-500 disabled:border-Neutral-500 disabled:bg-Neutral-700 disabled:text-Neutral-300",
        false:
          "border-Lime-500 bg-transparent text-Neutral-50 hover:bg-Lime-500/20 focus-visible:outline-Lime-500 disabled:border-Neutral-500 disabled:text-Neutral-300",
      },
    },
    defaultVariants: {
      logged: false,
    },
  },
);

type LogButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  Omit<VariantProps<typeof logButtonVariants>, "logged"> & {
    isLogged?: boolean;
    defaultLogged?: boolean;
    logLabel?: string;
    loggedLabel?: string;
    onLoggedChange?: (isLogged: boolean) => void;
  };

export const LogButton = ({
  isLogged,
  defaultLogged = false,
  logLabel = "LOG CONVERSION",
  loggedLabel = "Logged",
  className,
  disabled,
  onClick,
  onLoggedChange,
  ...props
}: LogButtonProps) => {
  const [internalIsLogged, setInternalIsLogged] = useState(defaultLogged);
  const currentIsLogged = isLogged ?? internalIsLogged;
  const label = currentIsLogged ? loggedLabel : logLabel;

  const toggleLogged = (event: MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);

    if (event.defaultPrevented || disabled) {
      return;
    }

    const nextIsLogged = !currentIsLogged;

    if (isLogged === undefined) {
      setInternalIsLogged(nextIsLogged);
    }

    onLoggedChange?.(nextIsLogged);
  };

  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={currentIsLogged}
      disabled={disabled}
      onClick={toggleLogged}
      className={cn(
        logButtonVariants({ logged: currentIsLogged, className }),
      )}
      {...props}
    >
      {currentIsLogged && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          fill="none"
          viewBox="0 0 12 12"
          aria-hidden="true"
          className="h-4 w-4"
        >
          <path
            fill="currentColor"
            d="M10.207 1.957c.117-.117.305-.117.398 0l.68.656c.094.117.094.305 0 .399l-7.031 7.031a.27.27 0 0 1-.399 0L.715 6.926c-.094-.117-.094-.305 0-.399l.68-.68c.093-.093.28-.093.398 0l2.25 2.274z"
          />
        </svg>
      )}
      <span>{label}</span>
    </button>
  );
};
