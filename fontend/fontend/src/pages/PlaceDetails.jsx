import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "../components/BookingWidget";
const PlaceDetails = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [showAllImg, setShowAllImg] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/places/${id}`);
        setPlace(response.data);
        console.log("data", id, response.data);
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    };
    fetchData();
  }, []);

  if (!place) {
    return (
      <div className="text-center">
        <div>Sorry for our server kindly back agin 😢 </div>
      </div>
    );
  }

  if (showAllImg) {
    return (
      <div className="absolute inset-0 min-w-full min-h-screen bg-black">
        <div className="bg-black flex flex-col items-center justify-center pt-4">
          <div>
            <h1 className="text-white font-semibold text-2xl">
              {place?.title}
            </h1>
            <button
              onClick={() => setShowAllImg(false)}
              className="fixed right-10 top-2 px-3 py-2 flex gap-2 z-40 bg-red-500 rounded-lg text-white"
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
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
              Close Image
            </button>
          </div>
          <div className="bg-black flex flex-col items-center justify-center mt-6 gap-4">
            {place?.photos?.length > 0 &&
              place?.photos.map((photo) => (
                <div key={photo?._id}>
                  <img
                    src={"http://localhost:4000/uploads/" + photo}
                    alt=""
                    className="rounded-lg object-cover h-full w-full"
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen mt-4">
      <div className="bg-gray-100 px-8 py-6 max-w-[1200px] mx-auto relative">
        <div className="text-3xl">{place?.title}</div>
        <a
          target="_blank"
          className="underline block font-semibold my-2"
          href={"http://maps.google.com/?q=" + place?.address}
          rel="noopener noreferrer"
        >
          {place?.address}
        </a>
        <div className="relative">
          <div className="grid grid-cols-3 gap-x-2">
            <div className="col-span-2 flex">
              {place?.photos?.[0] && (
                <img
                  onClick={() => setShowAllImg(true)}
                  src={"http://localhost:4000/uploads/" + place.photos[0]}
                  alt=""
                  className="rounded-l-lg cursor-pointer"
                />
              )}
            </div>
            <div className="col-span-1 flex flex-col gap-y-2">
              {place?.photos?.[1] && (
                <img
                  onClick={() => setShowAllImg(true)}
                  src={"http://localhost:4000/uploads/" + place.photos[1]}
                  alt=""
                  className="rounded-tr-lg cursor-pointer"
                  style={{ flex: "1" }}
                />
              )}
              {place?.photos?.[2] && (
                <img
                  onClick={() => setShowAllImg(true)}
                  src={"http://localhost:4000/uploads/" + place.photos[2]}
                  alt=""
                  className="rounded-br-lg cursor-pointer"
                  style={{ flex: "1" }}
                />
              )}
            </div>
          </div>
          <button
            onClick={() => setShowAllImg(true)}
            className="absolute bottom-2 right-2 px-2 py-1 rounded-xl bg-white cursor-pointer shadow shadow-gray-500 font-semibold flex gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                clipRule="evenodd"
              />
            </svg>
            Show more photos
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] mt-8 gap-8">
          <div>
            <div className="my-5">
              <span className="mb-4 text-2xl font-bold">Description</span>
              <p>{place.description}</p>
            </div>
            Check-in: {place?.checkIn}
            <br />
            Check-Out: {place?.checkOut}
            <br />
            Max number of Guests: {place?.maxGuests}
          </div>
          <div>
            <BookingWidget plase={place} />
          </div>
        </div>
        {/* extra info */}
        <div className="bg-white -mx-8 px-6 py-4 mt-2">
          <h2 className="mb-2 text-2xl font-bold">Extra Info</h2>
          <p className="leading-5 text-gray-600 text-sm ">{place?.extraInfo}</p>
        </div>
      </div>
    </div>
  );
};

export default PlaceDetails;
