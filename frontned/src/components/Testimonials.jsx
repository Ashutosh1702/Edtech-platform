function Testimonials() {
  const data = [
    {
      id: 1,
      name: "Ashutosh Kumar",
      title: "SWE 1 @ Amazon",
      rating: 5,
      text: "I've been using Imagify for nearly two years...",
    },
    {
      id: 2,
      name: "Nitya Singh",
      title: "SWE 2 @ Samsung",
      rating: 4,
      text: "I've been using Imagify for nearly two years...",
    },
    {
      id: 3,
      name: "Ashish Gupta",
      title: "SWE 2 @ Google",
      rating: 4,
      text: "I've been using Imagify for nearly two years...",
    },
  ];
  return (
    <section className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-center text-2xl md:text-3xl font-bold text-slate-900">
          Testimonials
        </h2>
        <p className="text-center text-slate-500 mt-2 mb-8">
          Hear from our learners as they share their journeys.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {data.map((t) => (
            <article
              key={t.id}
              className="border rounded-xl shadow-sm overflow-hidden"
            >
              <div className="bg-slate-100 px-4 py-3 flex items-center gap-3">
                <div className="size-9 rounded-full bg-slate-300" />
                <div>
                  <p className="font-medium text-slate-900 text-sm">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.title}</p>
                </div>
              </div>
              <div className="p-4">
                <div className="text-amber-500 text-sm mb-2">
                  {"★".repeat(t.rating)}
                  {"☆".repeat(5 - t.rating)}
                </div>
                <p className="text-sm text-slate-600 mb-2">{t.text}</p>
                <a className="text-blue-600 text-sm" href="#">
                  Read more
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
