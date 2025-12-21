import useRole from "../../hooks/useRole";

const QualificationMatch = ({ tuition, profile }) => {
  const { role } = useRole();

  if (!tuition) return null;

  // ================= MATCH LOGIC =================
  const sscMatch = profile && Number(profile.ssc) >= Number(tuition.sscResult);
  const hscMatch = profile && Number(profile.hsc) >= Number(tuition.hscResult);

  const universityMatch =
    profile &&
    tuition.university?.toLowerCase() ===
      profile.university?.toLowerCase();

  const departmentMatch =
    profile &&
    tuition.uniSubject?.toLowerCase() ===
      profile.department?.toLowerCase();

  const experienceMatch =
    profile && Number(profile.experience) >= Number(tuition.experience);

  // ================= ICON WITH TOOLTIP =================
const Icon = ({ ok }) => {
  if (role !== "tutor") return null;

  return (
    <span className="relative inline-block ml-2">
      {/* ICON (HOVER TARGET ONLY) */}
      <span
        className={`cursor-help font-bold text-lg ${
          ok ? "text-green-600" : "text-red-500"
        }`}
      >
        {ok ? "✔" : "✖"}
      </span>

      {/* TOOLTIP (shows ONLY when icon hovered) */}
      <span
        className={`
          pointer-events-none
          absolute bottom-full left-1/2 -translate-x-1/2 mb-2
          whitespace-nowrap px-3 py-1 rounded-md text-sm text-white
          opacity-0 transition
          ${ok ? "bg-green-600" : "bg-red-600"}
        `}
      >
        {ok
          ? "Requirement matches your profile"
          : "Requirement does not match your profile"}
      </span>

      {/* PURE CSS HOVER BINDING */}
      <style>{`
        span:hover + span {
          opacity: 1;
        }
      `}</style>
    </span>
  );
};


  return (
    <div className="grid md:grid-cols-2 gap-6 text-lg">
      {/* LEFT */}
      <div className="space-y-3">
        <p>
          <b>SSC:</b> {tuition.sscResult}
          <Icon ok={sscMatch} />
        </p>

        <p>
          <b>University:</b> {tuition.university}
          <Icon ok={universityMatch} />
        </p>

        <p>
          <b>Experience:</b> {tuition.experience} years
          <Icon ok={experienceMatch} />
        </p>
      </div>

      {/* RIGHT */}
      <div className="space-y-3">
        <p>
          <b>HSC:</b> {tuition.hscResult}
          <Icon ok={hscMatch} />
        </p>

        <p>
          <b>Department:</b> {tuition.uniSubject}
          <Icon ok={departmentMatch} />
        </p>
      </div>
    </div>
  );
};

export default QualificationMatch;
