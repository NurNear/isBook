import Link from "next/link";
import { BookOpen, Boxes, LibraryBig, ScanBarcode, Settings, Users } from "lucide-react";

import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/", label: "Dashboard", icon: LibraryBig },
  { href: "/books", label: "Books", icon: BookOpen },
  { href: "/collection", label: "Collection", icon: Boxes },
  { href: "/storage", label: "Storage", icon: ScanBarcode },
  { href: "/borrow", label: "Borrow", icon: Users },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-pink-50 text-slate-950">
      <div className="pointer-events-none absolute inset-0 -z-0 bg-[radial-gradient(circle_at_12%_8%,rgba(244,114,182,0.18),transparent_28%),radial-gradient(circle_at_86%_4%,rgba(125,211,252,0.18),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.9),rgba(253,242,248,0.72))]" />
      <header className="relative z-10 border-b border-pink-100/80 bg-white/85 shadow-sm shadow-pink-100/60 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-md bg-pink-400 text-white shadow-sm shadow-pink-200">
              <LibraryBig className="size-5" />
            </span>
            <span>
              <span className="block text-lg font-semibold leading-5">isBook</span>
              <span className="text-sm text-pink-900/60">Personal book collection manager</span>
            </span>
          </Link>
          <nav className="flex gap-2 overflow-x-auto pb-1 lg:pb-0">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <Button key={item.href} asChild variant="ghost" size="sm" className="shrink-0 text-slate-700 hover:bg-pink-100 hover:text-pink-700">
                  <Link href={item.href}>
                    <Icon className="size-4" />
                    {item.label}
                  </Link>
                </Button>
              );
            })}
          </nav>
        </div>
      </header>
      <main className="relative z-10 mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
