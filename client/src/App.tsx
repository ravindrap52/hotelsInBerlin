import { Routes, Route } from "react-router-dom";

import { HotelDetails } from "./pages/HotelDetails";
import { ListOfHotels } from "./pages/ListOfHotels";
import "./index.css";

const NoMatch = () => <h1>404 – Page Not Found</h1>;

function App() {
  return (
    <Routes>
      <Route path="/" element={<ListOfHotels />}></Route>
      <Route path="/hotelDetails/:id" element={<HotelDetails />}></Route>
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
}

export default App;
