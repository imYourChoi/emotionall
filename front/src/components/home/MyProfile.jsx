import { useUser } from "@/contexts/userContext";

const MyProfile = () => {
  const { user } = useUser();
  return <div className="w-full"></div>;
};

export default MyProfile;
