'use client';

import { useState, useRef, type FormEvent } from 'react';

interface FormErrors {
  name?: string;
  email?: string;
  process?: string;
}

export function AuditForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [process, setProcess] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [statusMessage, setStatusMessage] = useState('');

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const processRef = useRef<HTMLInputElement>(null);

  function validate(): FormErrors {
    const next: FormErrors = {};
    if (!name.trim()) {
      next.name = 'Napíšte svoje meno, aby sme vedeli, koho osloviť.';
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = 'Zadajte pracovný e-mail so znakom @, napríklad meno@firma.sk.';
    }
    if (!process.trim()) {
      next.process = 'Napíšte názov firmy a proces, ktorý chcete zrýchliť.';
    }
    return next;
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatusMessage(`Skontrolujte označené polia (${Object.keys(nextErrors).length}).`);
      if (nextErrors.name) {
        nameRef.current?.focus();
      } else if (nextErrors.email) {
        emailRef.current?.focus();
      } else if (nextErrors.process) {
        processRef.current?.focus();
      }
      return;
    }

    const subject = encodeURIComponent(`Audit procesov — ${name.trim()}`);
    const body = encodeURIComponent(
      `Meno: ${name.trim()}\nE-mail: ${email.trim()}\nFirma a proces: ${process.trim()}`
    );
    window.location.href = `mailto:ahoj@eastflow.example?subject=${subject}&body=${body}`;
    setStatusMessage('Otvára sa e-mailový klient s predvyplneným zadaním auditu.');
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-labelledby="audit-heading"
      className="rounded-lg border border-[#d4d4cc] bg-white p-6 sm:p-8 space-y-5"
    >
      <div>
        <label htmlFor="audit-name" className="block font-mono-code text-xs uppercase tracking-wider text-[#141413] mb-2">
          Vaše meno
        </label>
        <input
          ref={nameRef}
          id="audit-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
          }}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'audit-name-err' : undefined}
          className="field-input"
        />
        {errors.name && (
          <p id="audit-name-err" className="mt-1.5 text-xs text-red-700">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="audit-email" className="block font-mono-code text-xs uppercase tracking-wider text-[#141413] mb-2">
          Pracovný e-mail
        </label>
        <input
          ref={emailRef}
          id="audit-email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          autoCorrect="off"
          autoCapitalize="none"
          spellCheck={false}
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
          }}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'audit-email-err' : undefined}
          className="field-input"
        />
        {errors.email && (
          <p id="audit-email-err" className="mt-1.5 text-xs text-red-700">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="audit-process" className="block font-mono-code text-xs uppercase tracking-wider text-[#141413] mb-2">
          Firma a proces na zrýchlenie
        </label>
        <input
          ref={processRef}
          id="audit-process"
          name="process"
          type="text"
          autoComplete="organization"
          required
          value={process}
          onChange={(e) => {
            setProcess(e.target.value);
            if (errors.process) setErrors((prev) => ({ ...prev, process: undefined }));
          }}
          aria-invalid={Boolean(errors.process)}
          aria-describedby={errors.process ? 'audit-process-err' : undefined}
          className="field-input"
        />
        {errors.process && (
          <p id="audit-process-err" className="mt-1.5 text-xs text-red-700">
            {errors.process}
          </p>
        )}
      </div>

      <div className="pt-1">
        <button type="submit" className="btn-lime w-full sm:w-auto">
          Objednať audit procesov →
        </button>
      </div>

      <p role="status" className="font-mono-code text-xs text-[#141413] min-h-[18px]">
        {statusMessage}
      </p>
      <p className="font-mono-code text-[11px] uppercase tracking-wider text-[#7a7d6e]">
        Odpoveď priamo od vývojárov z Košíc do 24 hodín
      </p>
    </form>
  );
}
