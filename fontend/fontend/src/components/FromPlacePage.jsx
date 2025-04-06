import { useEffect, useState } from "react";
import axios from "axios";
import PhotoUploader from "./PhotoUploader";
import PerksLables from "./PerksLables";
import AccountNav from "./AccountNav";
import { Navigate, useParams } from "react-router-dom";
const FromPlacePage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [maxGuests, setMaxguests] = useState(1);
  const [price, setPrice] = useState(100);
  const [rediractPage, setRediractPage] = useState(false);
  //   input header should be dynamic for reduce extra code Start
  const inputHeader = (text) => {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  };

  const inputDescription = (text) => {
    return <p className="text-sm text-gray-500">{text}</p>;
  };

  const preInput = (header, description) => {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  };

  //  input header should be dynamic for reduce extra code End

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/places/${id}`);
        const data = response.data;
        setTitle(data?.title);
        setAddress(data?.address);
        setAddedPhotos(data?.photos);
        setDescription(data?.description);
        setPerks(data?.perks);
        setExtraInfo(data?.extraInfo);
        setCheckIn(data?.checkIn);
        setCheckOut(data?.checkOut);
        setMaxguests(data?.maxGuests);
        setPrice(data?.price);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const addNewPlace = async (event) => {
    event.preventDefault();

    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };
    try {
      await axios.post("/api/newplace", placeData);
      setRediractPage(true);
    } catch (error) {
      console.log(error);
    }
  };

  const updateImage = async (event) => {
    event.preventDefault();
    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };
    if (id) {
      await axios.put("/api/updateplace", { id, ...placeData });
      setRediractPage(true);
    }
  };

  if (rediractPage) {
    return <Navigate to={"/account/places"} />;
  }

  return (
    <>
      <div>
        <AccountNav />
        <form onSubmit={!id ? addNewPlace : updateImage}>
          {preInput(
            "Title",
            "Title for you place. should be short and catchy for a advatigment"
          )}
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="title for Example: my lovely place"
          />
          {preInput("Address", "Address to this place")}
          <input
            type="text"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            placeholder="address"
          />
          {preInput("Photo", "more = better")}

          <PhotoUploader onChange={setAddedPhotos} addedPhotos={addedPhotos} />

          {preInput("Description", "description of the place")}

          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          {preInput("Perks", "Select all the perks")}
          <div className="grid gap-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <PerksLables selected={perks} onChange={setPerks} />
          </div>
          {preInput("Extra info", "house roles, etc")}
          <textarea
            value={extraInfo}
            onChange={(event) => setExtraInfo(event.target.value)}
          />
          {preInput(
            "Check In & Out times",
            "add chack in and check out times, remember to have some time window for cleaing room between guests"
          )}

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-2">
            <div>
              <h3 className="mt-2 -mb-1">Check in tile</h3>
              <input
                type="text"
                value={checkIn}
                onChange={(event) => setCheckIn(event.target.value)}
                placeholder="12:00"
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Check out time</h3>
              <input
                type="text"
                value={checkOut}
                onChange={(event) => setCheckOut(event.target.value)}
                placeholder="13:00"
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Max number of guest</h3>
              <input
                type="number"
                value={maxGuests}
                onChange={(event) => setMaxguests(event.target.value)}
                placeholder="example : 2"
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Price per night</h3>
              <input
                type="number"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
              />
            </div>
          </div>

          <button className="primary my-4">{!id ? "Save" : "Update"}</button>
        </form>
      </div>
    </>
  );
};

export default FromPlacePage;
