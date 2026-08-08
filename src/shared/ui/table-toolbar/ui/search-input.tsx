import { Input } from '@/shared/ui/input';
import { Search } from 'lucide-react';

interface SearchInputProps {
  value: string;
  onValueChange(value: string): void;
}

export function SearchInput({ value, onValueChange }: SearchInputProps) {
  return (
    <div className="relative w-50 lg:w-full lg:max-w-75">
      <Search className="absolute left-2.5 z-10 top-1/2 h-5 w-5 -translate-y-1/2 text-foreground" />

      <Input
        value={value}
        onChange={(event) => onValueChange(event.target.value)}
        placeholder="Search"
        className="h-9 rounded-full pl-10 pr-4"
      />
    </div>
  );
}
