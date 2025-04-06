import { Link, useParams } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";

const PlacesPage = () => {
  useParams();
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const { data } = await axios.get(`/api/user-places`);
        setPlaces(data.places || []);
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    };

    fetchPlaces();
  }, []);
  return (
    <div>
      <AccountNav />

      <div className="flex items-center justify-center">
        <Link
          className="bg-primary text-white py-2 px-4 rounded-full flex gap-2 items-center"
          to={"/account/places/new"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add New place
        </Link>
      </div>
      <div className="mt-4">
        <h1 className="text-2xl text-primary font-bold border-b-4 inline-flex border-primary">
          List of All Added Places
        </h1>
        <div className="mt-4">
          {places.length > 0 &&
            places.map((places, indx) => (
              <Link
                to={`/account/places/${places?._id}`}
                key={indx}
                className="bg-slate-300 rounded-md flex gap-2 cursor-pointer"
              >
                <div className="w-40 h-40 grow shrink-0">
                  <img
                    src={`http://localhost:4000/uploads/` + places?.photos[0]}
                    alt=""
                    className="w-full h-full object-cover p-1 rounded-md"
                  />
                </div>
                <div className="grow-0 shrink">
                  <h2 className="text-xl font-semibold">{places?.title}</h2>
                  <p className="">{places.description}</p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PlacesPage;
