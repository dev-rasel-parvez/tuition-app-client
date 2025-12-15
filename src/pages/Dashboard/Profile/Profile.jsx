import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import ProfileView from "./ProfileView";
import ProfileEdit from "./ProfileEdit";

const Profile = () => {
  const axiosSecure = useAxiosSecure();
  const [profile, setProfile] = useState(null);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    axiosSecure.get("/profile").then(res => {
      setProfile(res.data);
    });
  }, []);

  if (!profile) return <div>Loading...</div>;

  return edit ? (
    <ProfileEdit
      profile={profile}
      setProfile={setProfile}
      setEdit={setEdit}
    />
  ) : (
    <ProfileView profile={profile} setEdit={setEdit} />
  );
};

export default Profile;
