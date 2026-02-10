"use client";

import { useState, useTransition } from "react";

type FormState = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const [form, setForm] = useState<FormState>({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const validate = (values: FormState) => {
    if (!values.email.trim()) {
      return "Email is required.";
    }
    if (!values.password.trim()) {
      return "Password is required.";
    }
    return null;
  };

  const handleChange =
    (field: keyof FormState) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: event.target.value }));
      if (error) {
        setError(null);
      }
    };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationError = validate(form);

    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);

    startTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 800));
    });
  };

  return (
    <main className="min-h-screen bg-white px-6 py-12">
      <div className="mx-auto flex w-full max-w-md flex-col gap-6">
        <header className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-semibold text-gray-900">Log in</h1>
          <p className="text-sm text-gray-600">
            Enter your email and password to continue....
          </p>
        </header>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
          <label className="flex flex-col gap-2 text-sm font-medium text-gray-800">
            Email
            <input
              type="email"
              name="email"
              autoComplete="email"
              value={form.email}
              onChange={handleChange("email")}
              required
              className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-gray-500 focus:outline-none"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium text-gray-800">
            Password
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              value={form.password}
              onChange={handleChange("password")}
              required
              className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-gray-500 focus:outline-none"
            />
          </label>

          {error ? (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isPending}
            className="rounded-md bg-black px-4 py-2 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? "Logging in..." : "Log in"}
          </button>
        </form>
      </div>
    </main>
  );
}