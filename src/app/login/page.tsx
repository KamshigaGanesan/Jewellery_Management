import { AuthForm } from "@/components/forms/ClientForms";

export default function LoginPage() {
  return (
    <section className="mx-auto max-w-xl px-4 pb-14 pt-24 md:pt-28">
      <h1 className="heading-lg mb-5">Customer Login</h1>
      <AuthForm mode="login" />
    </section>
  );
}
