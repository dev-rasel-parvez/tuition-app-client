import {
  FaUserCheck,
  FaLock,
  FaBolt,
  FaUserShield,
  FaMoneyBillWave,
  FaChartLine,
} from "react-icons/fa";

const features = [
  {
    title: "Verified Tutors",
    icon: <FaUserCheck />,
    desc: "All tutors are manually verified for quality and authenticity.",
  },
  {
    title: "Secure Payments",
    icon: <FaLock />,
    desc: "Your payments are protected with industry-standard security.",
  },
  {
    title: "Fast Matching",
    icon: <FaBolt />,
    desc: "Get matched with the right tutor in minutes, not days.",
  },
  {
    title: "Admin Approved Profiles",
    icon: <FaUserShield />,
    desc: "Every profile is reviewed and approved by our admin team.",
  },
  {
    title: "Transparent Pricing",
    icon: <FaMoneyBillWave />,
    desc: "No hidden charges. Clear and honest pricing every time.",
  },
  {
    title: "Real-time Analytics",
    icon: <FaChartLine />,
    desc: "Track applications, payments, and performance in real-time.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-5">
      <h2 className="text-3xl font-bold mb-12 text-center">
        Why Choose Us
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <div
            key={i}
            className="bg-green-50 rounded-2xl p-6 text-center
                       shadow hover:shadow-xl
                       hover:-translate-y-1
                       transition-all duration-300"
          >
            {/* ICON */}
            <div
              className="w-14 h-14 mx-auto mb-4
                         rounded-full bg-green-600
                         flex items-center justify-center
                         text-white text-2xl"
            >
              {f.icon}
            </div>

            {/* TITLE */}
            <h3 className="text-lg font-bold mb-2">
              {f.title}
            </h3>

            {/* DESCRIPTION */}
            <p className="text-sm text-gray-600">
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
