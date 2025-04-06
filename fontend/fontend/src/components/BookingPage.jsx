import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BookingPage = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState([]);
  const [showAllImg, setShowAllImg] = useState(false);
  useEffect(() => {
    const getdata = async () => {
      if (id) {
        const response = await axios.get("/api/allbooking");
        console.log("data", response.data);

        const foundBooking = response.data.find(({ _id }) => _id === id);
        console.log(foundBooking);

        if (foundBooking) {
          setBooking(foundBooking);
        }
      }
    };
    getdata();
  }, [id]);
  if (!booking) {
    return "";
  }

  if (showAllImg) {
    return (
      <div className="absolute inset-0 min-w-full min-h-screen bg-black">
        <div className="bg-black flex flex-col items-center justify-center pt-4">
          <div>
            <h1 className="text-white font-semibold text-2xl">
              {booking?.places?.title}
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
            {booking?.places?.photos?.length > 0 &&
              booking?.places?.photos.map((photo) => (
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
    <div className="px-8 py-6 max-w-[1200px] mx-auto">
      <h1 className="text-3xl">{booking?.places?.title}</h1>

      <a
        target="_blank"
        className="underline font-semibold my-2 flex items-center"
        href={"http://maps.google.com/?q=" + booking?.places?.address}
        rel="noopener noreferrer"
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
            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
          />
        </svg>
        {booking?.places?.address}
      </a>
      <div className="bg-gray-300 rounded-lg px-2 py-4 my-3">
        <h1 className="text-xl">Your Booking Information</h1>
      </div>
      <div className="relative">
        <div className="grid grid-cols-3 gap-x-2">
          <div className="col-span-2 flex">
            {booking?.places?.photos?.[0] && (
              <img
                onClick={() => setShowAllImg(true)}
                src={
                  "http://localhost:4000/uploads/" + booking?.places?.photos[0]
                }
                alt=""
                className="rounded-l-lg cursor-pointer"
              />
            )}
          </div>
          <div className="col-span-1 flex flex-col gap-y-2">
            {booking?.places?.photos?.[1] && (
              <img
                onClick={() => setShowAllImg(true)}
                src={
                  "http://localhost:4000/uploads/" + booking?.places?.photos[1]
                }
                alt=""
                className="rounded-tr-lg cursor-pointer"
                style={{ flex: "1" }}
              />
            )}
            {booking?.places?.photos?.[2] && (
              <img
                onClick={() => setShowAllImg(true)}
                src={
                  "http://localhost:4000/uploads/" + booking?.places?.photos[2]
                }
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
    </div>
  );
};

export default BookingPage;
