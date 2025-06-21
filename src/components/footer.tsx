export function Footer() {
  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container mx-auto px-4 md:px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-sm text-muted-foreground text-center sm:text-start">
          &copy; 2025 طبيبك. جميع الحقوق محفوظة.
        </p>
        <div className="text-sm text-muted-foreground text-center sm:text-end">
            <span>Developed by <strong className="font-semibold text-foreground">Ang;uos Rezq</strong></span>
            <span className="mx-2 hidden md:inline-block">|</span>
            <span className="block sm:inline-block">للتواصل: <a href="tel:01228668228" className="font-semibold hover:text-primary">01228668228</a></span>
        </div>
      </div>
    </footer>
  );
}
