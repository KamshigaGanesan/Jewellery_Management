import { AppointmentForm } from "@/components/forms/ClientForms";

export default function AppointmentBookingPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 pb-14 pt-24 md:pt-28">
      <h1 className="heading-lg">Bridal Consultation Booking</h1>
      <p className="text-muted mt-2 mb-5 text-sm">
        Reserve showroom visit or video consultation for wedding shopping and custom recommendations.
      </p>
      <AppointmentForm />
    </section>
  );
}
