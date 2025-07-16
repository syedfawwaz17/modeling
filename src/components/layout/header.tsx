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
    <path d="M10,40 C10,40 2.5,35 2.5,20 C2.5,5 10,0 10,0 L12,0 C12,0 20,5 20,20 C20,35 12,40 12,40 L10,40 Z M11,5 C11,5 6,8 6,20 C6,32 11,35 11,35 L13,35 C13,35 17,32 17,20 C17,8 13,5 13,5 L11,5 Z" />
    <path d="M40,0 C30,0 25,10 25,20 C25,30 30,40 40,40 L45,40 C55,40 60,30 60,20 C60,10 55,0 45,0 L40,0 Z M40,5 L45,5 C52,5 55,12 55,20 C55,28 52,35 45,35 L40,35 C33,35 30,28 30,20 C30,12 33,5 40,5 Z" transform="translate(15,0)"/>
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
