import { HashRouter, Route, Routes } from "react-router-dom";

import Hero from "../components/Hero";
import About from "../components/About";
import Service from "../components/Service";
import Pasien from "../components/Pasien";

function Router() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/about" element={<About />} />
        <Route path="/service" element={<Service />} />
        <Route path="/pasien" element={<Pasien />} />
      </Routes>
    </HashRouter>
  );
}

export default Router;
