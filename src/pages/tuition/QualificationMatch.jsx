import useRole from "../../hooks/useRole";

const QualificationMatch = ({ tuition, profile }) => {
  const { role } = useRole();

  if (!tuition) return null;

  // Matching logic (only meaningful for tutor)
  const sscMatch = profile && Number(profile.ssc) >= Number(tuition.sscResult);
  const hscMatch = profile && Number(profile.hsc) >= Number(tuition.hscResult);
  const universityMatch =
    profile &&
    tuition.university?.toLowerCase() === profile.university?.toLowerCase();
  const departmentMatch =
    profile &&
    tuition.uniSubject?.toLowerCase() === profile.department?.toLowerCase();
  const experienceMatch =
    profile && Number(profile.experience) >= Number(tuition.experience);

  // Icon only for tutor
  const Icon = ({ ok }) =>
    role === "tutor" ? (
      <span className={`ml-2 font-bold ${ok ? "text-green-600" : "text-red-500"}`}>
        {ok ? "✔" : "✖"}
      </span>
    ) : null;

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
