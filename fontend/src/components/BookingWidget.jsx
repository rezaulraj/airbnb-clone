import React, { useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";
const BookingWidget = ({ plase }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [redirect, setRedirect] = useState("");
  let numberOfDay = 0;
  if (checkIn && checkOut) {
    numberOfDay = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }
  console.log(numberOfDay * plase.price);

  const hendelSaveBooking = async () => {
    const bookData = {
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      address,
      email,
      phone,
      places: plase?._id,
      price: numberOfDay * plase?.price,
    };
    try {
      const response = await axios.post(`/api/booking`, bookData);
      const bookingId = response.data.saveBooking._id;
      setRedirect("/account/bookings/" + bookingId);
    } catch (error) {
      console.log(error);
    }
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <>
      <div className="bg-white shadow p-4 rounded-2xl">
        <div className="text-2xl text-center">
          Price: ${plase?.price} / per night
        </div>
        <div className="border rounded-2xl my-4">
          <div className="flex">
            <div className="px-4 py-3">
              <label htmlFor="">Check In: </label>
              <input
                type="date"
                value={checkIn}
                onChange={(event) => setCheckIn(event.target.value)}
              />
            </div>
            <div className="px-4 py-3 border-l">
              <label htmlFor="">Check Out: </label>
              <input
                type="date"
                value={checkOut}
                onChange={(event) => setCheckOut(event.target.value)}
              />
            </div>
          </div>
          <div className="px-4 py-3 border-t">
            <label htmlFor="">Number of Guests: </label>
            <input
              type="number"
              value={numberOfGuests}
              onChange={(event) => setNumberOfGuests(event.target.value)}
            />
          </div>
          {numberOfDay > 0 && (
            <div className="px-4 py-3 border-t">
              <label htmlFor="">Your Full Neme: </label>
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
              <label htmlFor="">Your Email: </label>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <label htmlFor="">Your Phone: </label>
              <input
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
              <label htmlFor="">Your Full Address: </label>
              <input
                type="text"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
              />
            </div>
          )}
        </div>
        <button onClick={hendelSaveBooking} className="primary">
          Book this place
          {numberOfDay > 0 && <span>${numberOfDay * plase?.price}</span>}
        </button>
      </div>
    </>
  );
};

export default BookingWidget;
