import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20 space-y-6">
      <h1 className="text-3xl font-medium text-white">Ochrana údajov</h1>
      <p className="text-white/75 leading-relaxed">
        Údaje odoslané cez formulár na audit procesov používame výhradne na dohodnutie úvodného stretnutia a prípravu návrhu automatizácie.
      </p>
      <p>
        <Link href="/" className="text-[#93f1f7] hover:underline">
          ← Späť na EastFlow AI
        </Link>
      </p>
    </main>
  );
}
