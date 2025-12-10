import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { FaTimes } from "react-icons/fa";
import { useState, useEffect } from "react";

const ApplicantModal = ({ data, close }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [unlocked, setUnlocked] = useState(false);

  const checkUnlock = async () => {
    const res = await axiosSecure.get(
      `/unlock/check?ownerEmail=${user.email}&tutorEmail=${data.tutorEmail}&tuitionId=${data.tuitionId}`
    );
    setUnlocked(res.data.unlocked);
  };

  useEffect(() => {
    checkUnlock();
  }, []);

  const unlockNow = async () => {
    await axiosSecure.post("/unlock", {
      ownerEmail: user.email,
      tutorEmail: data.tutorEmail,
      tuitionId: data.tuitionId
    });

    setUnlocked(true);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">

      <div className="bg-white rounded-xl shadow-xl p-6 w-11/12 md:w-1/3 relative">

        <button className="absolute top-3 right-3" onClick={close}>
          <FaTimes />
        </button>

        <img src={data.photo} className="w-24 h-24 rounded-full mx-auto" />

        <h3 className="text-center text-xl font-bold mt-3">
          {data.tutorName}
        </h3>

        <p className="text-center text-gray-500">
          {data.university} • {data.department}
        </p>

        <div className="mt-4 space-y-2">

          <p><strong>SSC:</strong> {data.sscResult}</p>
          <p><strong>HSC:</strong> {data.hscResult}</p>
          <p><strong>Running Year:</strong> {data.runningYear}</p>
          <p><strong>Experience:</strong> {data.experience} years</p>

          <p><strong>Email:</strong>
            {unlocked ? (
              <span className="text-green-600">{data.tutorEmail}</span>
            ) : (
              <span className="blur-sm">**************</span>
            )}
          </p>

          <p><strong>Phone:</strong>
            {unlocked ? (
              <span>01*********</span>
            ) : (
              <span className="blur-sm">01*********</span>
            )}
          </p>

        </div>

        {!unlocked && (
          <button
            className="btn btn-primary w-full mt-4"
            onClick={unlockNow}
          >
            Unlock Contact (৳1000)
          </button>
        )}

        {unlocked && (
          <p className="text-green-600 text-center mt-2">
            Contact Unlocked ✓
          </p>
        )}

      </div>

    </div>
  );
};

export default ApplicantModal;
