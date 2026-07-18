import HomeLayout from "../Layouts/HomeLayout";

function ContactUs() {
  return (
    <HomeLayout>
      <div className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/5 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#b8932e]">
          Get In Touch
        </span>

        <h1 className="mt-4 text-4xl font-black text-[#0a1f44] lg:text-5xl">
          Contact Us
        </h1>

        <p className="mt-4 max-w-xl text-lg text-slate-500">
          Have a question or need help? Reach out and our team will get back
          to you as soon as possible.
        </p>
      </div>
    </HomeLayout>
  );
}

export default ContactUs;