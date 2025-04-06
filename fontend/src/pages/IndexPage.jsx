import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import { Link } from "react-router-dom";

const IndexPage = () => {
  const [allPlaces, setAllPlaces] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/places`);
        setAllPlaces([...response.data, ...response.data, ...response.data]);
        console.log("data", response.data);
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4 cursor-pointer">
      {allPlaces.length > 0 &&
        allPlaces.map((place, indx) => (
          <Link key={indx} to={"/place/" + place?._id}>
            <div className="bg-gray-500 h-72 rounded-2xl flex">
              {place?.photos?.[0] && (
                <img
                  src={`http://localhost:4000/uploads/` + place?.photos?.[0]}
                  alt=""
                  className="h-full w-full rounded-2xl object-cover aspect-square"
                />
              )}
            </div>
            <h2 className="text-sm font-semibold">{place?.address}</h2>
            <p className="text-sm text-slate-500">{place?.owner?.name}</p>
            <p className="text-sm font-semibold">{place?.price}$ <span>per night</span></p>
          </Link>
        ))}
    </div>
  );
};

export default IndexPage;
