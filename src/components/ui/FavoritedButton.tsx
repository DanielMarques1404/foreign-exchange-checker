import { cva } from "class-variance-authority";
import type { ButtonHTMLAttributes, MouseEvent } from "react";
import { useState } from "react";

import { cn } from "../../utils/cn";

const favoritedButtonVariants = cva(
  "flex cursor-pointer items-center justify-center gap-2 rounded-xl border text-sm font-medium tracking-[0.2em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed w-[117px]",
  {
    variants: {
      favorited: {
        true: "border-Lime-500 bg-Lime-500 text-Neutral-900 hover:border-Lime-300 focus-visible:outline-Lime-500 disabled:border-Neutral-500 disabled:bg-Neutral-700 disabled:text-Neutral-300",
        false:
          "border-Neutral-300 bg-Neutral-700 text-Neutral-50 hover:border-Lime-500 focus-visible:outline-Lime-500 disabled:border-Neutral-500 disabled:text-Neutral-300",
      },
      label: {
        true: "h-12 w-43 whitespace-nowrap px-5",
        false: "h-12 w-12 p-0",
      },
    },
    defaultVariants: {
      favorited: false,
      label: true,
    },
  },
);

type FavoritedButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isFavorited?: boolean;
  defaultFavorited?: boolean;
  showLabel?: boolean;
  favoriteLabel?: string;
  favoritedLabel?: string;
  onFavoritedChange?: (isFavorited: boolean) => void;
};

export const FavoritedButton = ({
  isFavorited,
  defaultFavorited = false,
  showLabel = true,
  favoriteLabel = "FAVORITE",
  favoritedLabel = "FAVORITED",
  className,
  onFavoritedChange,
  disabled,
  onClick,
  ...props
}: FavoritedButtonProps) => {
  const [internalIsFavorited, setInternalIsFavorited] =
    useState(defaultFavorited);
  const currentIsFavorited = isFavorited ?? internalIsFavorited;
  const label = currentIsFavorited ? favoritedLabel : favoriteLabel;

  const toggleFavorite = (event: MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);

    if (event.defaultPrevented || disabled) {
      return;
    }

    const nextIsFavorited = !currentIsFavorited;

    if (isFavorited === undefined) {
      setInternalIsFavorited(nextIsFavorited);
    }

    onFavoritedChange?.(nextIsFavorited);
  };

  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={currentIsFavorited}
      disabled={disabled}
      onClick={toggleFavorite}
      className={cn(
        favoritedButtonVariants({
          favorited: currentIsFavorited,
          label: showLabel,
          className,
        }),
      )}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="none"
        viewBox="0 0 16 16"
        aria-hidden="true"
        className="h-5 w-5"
      >
        <path
          fill="currentColor"
          d={
            currentIsFavorited
              ? "M7.332 2.41c.281-.562 1.078-.538 1.336 0l1.547 3.118 3.422.492c.61.094.843.844.398 1.29l-2.46 2.413.585 3.399c.094.61-.562 1.078-1.101.797l-3.047-1.617-3.07 1.617c-.54.28-1.196-.188-1.102-.797l.586-3.399L1.965 7.31c-.446-.445-.211-1.195.398-1.289l3.446-.492z"
              : "M13.637 6.02c.61.094.843.844.398 1.29l-2.46 2.413.585 3.399c.094.61-.562 1.078-1.101.797l-3.047-1.617-3.07 1.617c-.54.28-1.196-.188-1.102-.797l.586-3.399L1.965 7.31c-.446-.445-.211-1.195.398-1.289l3.446-.492 1.523-3.117c.281-.563 1.078-.54 1.336 0l1.547 3.117zm-3.282 3.305 2.368-2.297-3.258-.469-1.453-2.953L6.535 6.56l-3.258.469 2.367 2.297-.562 3.234 2.93-1.523 2.906 1.523z"
          }
        />
      </svg>
      {showLabel && <span>{label}</span>}
    </button>
  );
};
