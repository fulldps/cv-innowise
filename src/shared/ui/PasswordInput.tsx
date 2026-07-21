'use client';

import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { Input } from './input';

export function PasswordInput(props: React.ComponentProps<'input'>) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-full">
      <Input
        {...props}
        className="w-140 h-12 pr-10 rounded-xs"
        placeholder="Password"
        type={showPassword ? 'text' : 'password'}
      />
      <button
        type="button"
        className="absolute right-3 top-2"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
      </button>
    </div>
  );
}
