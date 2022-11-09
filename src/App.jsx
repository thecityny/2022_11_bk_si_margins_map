import React from "react";
import { HelmetProvider } from "react-helmet-async";
import MarginsMap from "./components/Map";

import "./styles/app.scss";

export const App = () => {
  return (
    <HelmetProvider>
      <div className="app">
        <MarginsMap />
      </div>
    </HelmetProvider>
  );
};
