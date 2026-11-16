import Link from 'next/link';

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20 space-y-6">
      <h1 className="text-3xl font-medium text-white">Podmienky spolupráce</h1>
      <p className="text-white/75 leading-relaxed">
        Každý audit procesov aj 14-dňový pilotný projekt má vopred dohodnutý rozsah, merateľný cieľ a cenu pred začiatkom programovania.
      </p>
      <p>
        <Link href="/" className="text-[#93f1f7] hover:underline">
          ← Späť na EastFlow AI
        </Link>
      </p>
    </main>
  );
}
