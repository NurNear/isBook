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
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-md bg-emerald-700 text-white">
              <LibraryBig className="size-5" />
            </span>
            <span>
              <span className="block text-lg font-semibold leading-5">isBook</span>
              <span className="text-sm text-slate-500">Personal book collection manager</span>
            </span>
          </Link>
          <nav className="flex gap-2 overflow-x-auto pb-1 lg:pb-0">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <Button key={item.href} asChild variant="ghost" size="sm" className="shrink-0">
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
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
