import { useState } from "react";
import TutorDetailsModal from "./TutorDetailsModal";

const maskPhone = phone =>
  phone ? phone.slice(0, 6) + "*****" + phone.slice(-2) : "";

const TutorCard = ({ tutor }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="border rounded-xl p-4 cursor-pointer hover:shadow"
      >
        <img src={tutor.photoURL} className="w-20 h-20 rounded-full mx-auto" />
        <h3 className="font-bold text-center mt-2">{tutor.name}</h3>
        <p className="text-sm text-center">{tutor.university}</p>
        <p className="text-sm text-center">{tutor.department}</p>
        <p className="text-sm text-center">{maskPhone(tutor.contactPhone)}</p>
      </div>

      {open && (
        <TutorDetailsModal tutor={tutor} close={() => setOpen(false)} />
      )}
    </>
  );
};

export default TutorCard;
