import Link from "next/link";
import { Button } from "./ui/button";
import { StethoscopeIcon } from "./icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LifeBuoy, LogOut, User } from "lucide-react";


export function Header() {
  const isLoggedIn = true; // Temporary: Toggle this to see different states

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link href="/" className="me-6 flex items-center space-x-2">
          <StethoscopeIcon className="h-6 w-6 text-primary" />
          <span className="font-bold sm:inline-block font-headline">طبيبك</span>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-2">
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="/avatars/01.png" alt="صورة المستخدم" />
                    <AvatarFallback>علي</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">علي محمد</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      ali@example.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <User className="me-2 h-4 w-4" />
                    <span>ملفي الشخصي</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LifeBuoy className="me-2 h-4 w-4" />
                  <span>الدعم</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="me-2 h-4 w-4" />
                  <span>تسجيل الخروج</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

          ) : (
            <nav className="flex items-center">
              <Button variant="ghost" asChild>
                <Link href="/login">تسجيل الدخول</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">إنشاء حساب</Link>
              </Button>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
