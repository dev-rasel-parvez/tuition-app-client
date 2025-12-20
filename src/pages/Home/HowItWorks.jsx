const steps = [
  { title: "Post Tuition", desc: "Students post tuition requirements" },
  { title: "Tutors Apply", desc: "Verified tutors apply easily" },
  { title: "Hire Securely", desc: "Pay safely & start learning" },
];

const HowItWorks = () => {
  return (
    <section className="bg-gray-50 py-5">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-10 text-center">
          How the Platform Works
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl shadow text-center"
            >
              <div className="text-4xl font-bold text-green-600 mb-3">
                {i + 1}
              </div>
              <h3 className="font-bold text-lg">{s.title}</h3>
              <p className="text-gray-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
