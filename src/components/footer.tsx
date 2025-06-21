export function Footer() {
  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container mx-auto px-4 md:px-6">
        <p className="text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} طبيبك. جميع الحقوق محفوظة.
        </p>
      </div>
    </footer>
  );
}
