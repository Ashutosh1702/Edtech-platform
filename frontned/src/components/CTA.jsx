function CTA() {
  return (
    <section className="bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
          Learn anything, anytime, anywhere
        </h3>
        <p className="text-slate-500 mb-6">
          Incididunt sint fugiat pariatur cupidatat consectetur sit cillum anim
          id veniam aliqua.
        </p>
        <div className="flex items-center justify-center gap-4">
          <a
            href="#"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-sm font-semibold"
          >
            Get started
          </a>
          <a
            href="#"
            className="text-blue-600 hover:text-blue-700 text-sm font-semibold inline-flex items-center gap-2"
          >
            Learn more<span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default CTA;
