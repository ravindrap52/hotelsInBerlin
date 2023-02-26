import { Routes, Route } from "react-router-dom";

import { HotelDetails } from "./pages/HotelDetails";
import { Home } from "./pages/Home";
import "./index.css";

const NoMatch = () => <h1>404 – Page Not Found</h1>;

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/hotelDetails/:hotelId" element={<HotelDetails />}></Route>
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
}

export default App;
