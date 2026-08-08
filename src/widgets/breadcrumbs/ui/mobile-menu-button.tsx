import { Menu } from 'lucide-react';

import { Button } from '@/shared/ui/button';

interface MobileMenuButtonProps {
  onClick(): void;
}

export function MobileMenuButton({ onClick }: MobileMenuButtonProps) {
  return (
    <Button variant="ghost" size="icon" onClick={onClick} className="lg:hidden">
      <Menu className="size-5" />
      <span className="sr-only">Open navigation menu</span>
    </Button>
  );
}
