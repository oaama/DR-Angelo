import { cn } from "@/lib/utils";
import type { SVGProps } from "react";

export function StethoscopeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.8 2.3A.3.3 0 1 0 5 2a.3.3 0 0 0-.2.3" />
      <path d="M8 2a2 2 0 0 1 2 2v10a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V4a2 2 0 0 1 2-2" />
      <path d="M19.8 17.8a.3.3 0 1 0 .4.4.3.3 0 0 0-.4-.4" />
      <path d="M16 16v1.4a.6.6 0 0 1-.6.6H8.6a.6.6 0 0 1-.6-.6V16" />
      <path d="M11 22a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
  );
}

export function Spinner({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("animate-spin", className)}
      {...props}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}

export function GoogleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
        <title>Google</title>
        <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.02-2.62 1.98-4.66 1.98-3.57 0-6.47-2.92-6.47-6.55s2.9-6.55 6.47-6.55c2.03 0 3.33.83 4.1 1.59l2.5-2.5C18.16 3.7 15.65 2.5 12.48 2.5c-5.48 0-9.88 4.4-9.88 9.88s4.4 9.88 9.88 9.88c5.77 0 9.4-4.12 9.4-9.68 0-.9-.08-1.46-.22-2.08h-9.18z"/>
    </svg>
  );
}
