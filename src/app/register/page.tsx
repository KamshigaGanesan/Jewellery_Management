import { AuthForm } from "@/components/forms/ClientForms";

export default function RegisterPage() {
  return (
    <section className="mx-auto max-w-xl px-4 pb-14 pt-24 md:pt-28">
      <h1 className="heading-lg mb-5">Create Account</h1>
      <AuthForm mode="register" />
    </section>
  );
}
