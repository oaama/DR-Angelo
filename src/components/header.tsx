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
import { Crown, LifeBuoy, LogOut, User } from "lucide-react";


// This is a temporary simulation of a logged-in user.
// In a real application, you would get this from a session or context.
const currentUser = {
  name: 'د. أحمد محمود',
  email: 'ahmed.mahmoud@dox.com',
  userType: 'doctor' as const,
  avatar: 'https://placehold.co/100x100'
};
const isLoggedIn = !!currentUser;


export function Header() {

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
                    <AvatarImage src={currentUser.avatar} alt={`صورة ${currentUser.name}`} data-ai-hint="doctor portrait" />
                    <AvatarFallback>{currentUser.name.substring(3, 5)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{currentUser.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {currentUser.email}
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
                {currentUser.userType === 'doctor' && (
                  <DropdownMenuItem asChild>
                    <Link href="/profile/subscription">
                      <Crown className="me-2 h-4 w-4" />
                      <span>الاشتراك</span>
                    </Link>
                  </DropdownMenuItem>
                )}
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
