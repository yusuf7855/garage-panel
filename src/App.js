import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Tv1 from "./tv1";
import Tv2 from "./tv2";
import Tv3 from "./tv3";
import Tv4 from "./tv4";
import Tv5 from "./tv5";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Tv1 />} />
          <Route path="/tv2" element={<Tv2 />} />
            <Route path="/tv3" element={<Tv3 />} />
            <Route path="/tv4" element={<Tv4 />} />
            <Route path="/tv5" element={<Tv5 />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
