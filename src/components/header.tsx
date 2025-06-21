import Link from "next/link";
import { Button } from "./ui/button";
import { StethoscopeIcon } from "./icons";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link href="/" className="me-6 flex items-center space-x-2">
          <StethoscopeIcon className="h-6 w-6 text-primary" />
          <span className="font-bold sm:inline-block font-headline">طبيبك</span>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center">
            <Button variant="ghost" asChild>
              <Link href="/login">تسجيل الدخول</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">إنشاء حساب</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
