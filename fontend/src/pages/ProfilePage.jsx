import { useContext, useState } from "react";
import { UserContext } from "../context/userContext";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../components/AccountNav";

const ProfilePage = () => {
  const [redirect, setRedirect] = useState(null);
  const { user, ready, setUser } = useContext(UserContext);
  let { subpage } = useParams();

  if (subpage === undefined) {
    subpage = "profile";
  }

  const Logout = async () => {
    await axios.post(`/logout`);
    setRedirect("/");
    setUser(null);
  };

  if (!ready) {
    return "Loading......";
  }

  //   ============ if user not found and user is not ready and redirect value is null then back to login page ==========
  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <AccountNav />
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email}) <br />
          <button
            onClick={Logout}
            className="bg-primary primary max-w-sm mt-2 text-white px-4 py-2 rounded-full"
          >
            Logout
          </button>
        </div>
      )}
      {/* Places page */}
      {subpage === "places" && (
        <div>
          <PlacesPage />
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
