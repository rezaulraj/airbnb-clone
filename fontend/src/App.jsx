import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import IndexPage from "./pages/IndexPage";
import Layout from "./Layout";
import Register from "./components/Register";
import axios from "axios";
import { UserContextProvider } from "./context/userContext";
// import AccountPage from "./pages/AccountPage";
import ProfilePage from "./pages/ProfilePage";
import PlacesPage from "./pages/PlacesPage";
import FromPlacePage from "./components/FromPlacePage";
import PlaceDetails from "./pages/PlaceDetails";
import BookingsPage from "./pages/BookingsPage";
import BookingPage from "./components/BookingPage";
// defult axios setup
axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<ProfilePage />} />
          <Route path="/account/places" element={<PlacesPage />} />
          <Route path="/account/places/new" element={<FromPlacePage />} />
          <Route path="/account/places/:id" element={<FromPlacePage />} />
          <Route path="/place/:id" element={<PlaceDetails />} />
          <Route path="/account/bookings" element={<BookingsPage />} />
          <Route path="/account/bookings/:id" element={<BookingPage />} />
          {/* <Route path="/exta" element={<Extra />} /> */}
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
