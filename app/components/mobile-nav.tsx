'use client';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { useAuthStore } from '../store/use-auth-store';
import { useLogout } from '../hooks/use-logout';
import { cn } from '@/lib/utils';

type Props = {
  variant?: 'primary' | 'secondary';
};

export function MobileNav({ variant = 'primary' }: Props) {
  const { auth } = useAuthStore();
  const { handleLogout } = useLogout();

  const isPrimary = variant === 'primary';

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={cn('size-10 lg:hidden', isPrimary && 'bg-primary')}
        >
          <Menu size={20} className={isPrimary ? 'text-white' : 'text-black'} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-2" collisionPadding={16}>
        <div className="flex flex-col">
          {menus.map((menu) => (
            <Link
              key={menu.title}
              href={menu.href}
              className={cn(
                'text-foreground rounded-md px-3 py-1.5 transition hover:bg-gray-200'
              )}
            >
              {menu.title}
            </Link>
          ))}
        </div>

        {!auth.email ? (
          <>
            <div className="bg-border my-4 h-px" />
            <div className="flex flex-col gap-2">
              <Link href="/auth/signin">
                <Button className="w-full hover:underline">Login</Button>
              </Link>
              <Link href="/auth/signup">
                <Button variant="secondary" size="cta" className="w-full">
                  Register
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <Button
            className="mt-4 w-full hover:underline"
            onClick={handleLogout}
          >
            Logout
          </Button>
        )}
      </PopoverContent>
    </Popover>
  );
}
