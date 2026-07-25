import { Search } from 'lucide-react';

interface SearchInputProps {
  value: string;
  onValueChange(value: string): void;
}

export function SearchInput({ value, onValueChange }: SearchInputProps) {
  return (
    <div className="relative w-full max-w-75">
      <Search className="absolute left-2.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

      <input
        value={value}
        onChange={(event) => onValueChange(event.target.value)}
        placeholder="Search"
        className="h-9 w-full rounded-full border border-ring bg-transparent pl-10 pr-4 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-muted-foreground"
      />
    </div>
  );
}
