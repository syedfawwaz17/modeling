"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#lookbook', label: 'Lookbook' },
  { href: '#reels', label: 'Reels' },
  { href: '#contact', label: 'Contact' },
];

const Logo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 40"
    className="h-8 w-auto text-foreground"
    fill="currentColor"
  >
    <path d="M10 0 C4.477 0 0 4.477 0 10 L0 30 C0 35.523 4.477 40 10 40 L20 40 C25.523 40 30 35.523 30 30 L30 25 C30 22.239 27.761 20 25 20 L10 20 L10 10 C10 7.239 12.239 5 15 5 L25 5 C27.761 5 30 7.239 30 10 L30 15 L35 15 L35 10 C35 4.477 30.523 0 25 0 L10 0 Z" />
    <path d="M60 0 C54.477 0 50 4.477 50 10 L50 30 C50 35.523 54.477 40 60 40 L70 40 C75.523 40 80 35.523 80 30 L80 10 C80 4.477 75.523 0 70 0 L60 0 Z M60 5 L70 5 C72.761 5 75 7.239 75 10 L75 30 C75 32.761 72.761 35 70 35 L60 35 C57.239 35 55 32.761 55 30 L55 10 C55 7.239 57.239 5 60 5 Z" transform="translate(15, 0)" />
  </svg>
);


export default function Header() {
  const [isSheetOpen, setSheetOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo />
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:hidden">
           <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo />
          </Link>
           <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="grid gap-6 text-lg font-medium mt-10">
                 {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    onClick={() => setSheetOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
