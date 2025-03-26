export default function Home() {
  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-12">
        <h1 className="mb-6 text-3xl font-bold">Welcome to Secure Pal</h1>
        <p className="mb-4 text-lg">
          Your trusted partner for all security solutions. Browse our services
          and offers using the navigation menu above.
        </p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Sample content cards */}
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-lg border p-6 shadow-sm">
              <h2 className="mb-2 text-xl font-semibold">
                Security Solution {i + 1}
              </h2>
              <p className="text-muted-foreground">
                Professional security systems tailored to your needs. Protect
                what matters most.
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
