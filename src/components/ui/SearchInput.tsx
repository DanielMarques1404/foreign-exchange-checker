import { cn } from "../../utils/cn";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  ariaLabel?: string;
  className?: string;
};

export const SearchInput = ({
  value,
  onChange,
  placeholder = "Search ...",
  ariaLabel = "Search",
  className,
}: SearchInputProps) => {
  return (
    <label
      className={cn(
        "flex items-center gap-2 rounded-md border border-Neutral-200 bg-Neutral-800 p-3 text-Neutral-200",
        className,
      )}
    >
      <img
        src="/assets/images/icon-search.svg"
        alt=""
        aria-hidden="true"
        className="h-6 w-6"
      />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel}
        className="w-full bg-transparent text-[16px] text-Neutral-50 font-light placeholder:text-Neutral-300 outline-none"
      />
    </label>
  );
};
