export function Footer() {
  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container mx-auto px-4 md:px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-sm text-muted-foreground text-center sm:text-start">
          &copy; {new Date().getFullYear()} طبيبك. جميع الحقوق محفوظة.
        </p>
        <div className="text-sm text-muted-foreground text-center sm:text-end">
            <p>Developed by: Eng. Angelos Rizk</p>
            <p>للتواصل: <a href="tel:01228668228" className="font-semibold hover:text-primary">01228668228</a></p>
        </div>
      </div>
    </footer>
  );
}
