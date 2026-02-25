import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-12">
      <div className="mx-auto flex w-full max-w-md flex-col gap-6">
        <header className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-semibold text-gray-900">Log in</h1>
          <p className="text-sm text-gray-600">
            Enter your email and password to continue.
          </p>
        </header>

        <LoginForm />
      </div>
    </main>
  );
}