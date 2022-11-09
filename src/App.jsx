import React from "react";
import { HelmetProvider } from "react-helmet-async";
import {
  CountyTurnoutMap,
  HistoricalTurnoutChart,
} from "./components/DataWrapper";
import { Footer, Header } from "./components/HeaderFooter";
import TurnoutMap from "./components/Map";
import { WaffleChart } from "./components/Waffle";
import { Newsletter } from "./components/Newsletter";

import "./styles/app.scss";

const SHOW_STATE_DATA = false;

const byline = JSON.parse(process.env.REACT_APP_AUTHOR);

const getDateUpdated = () => {
  const date = new Date(process.env.REACT_APP_UPDATE_DATE.replace(/-/g, "/"));
  const dateFormatted = date.toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const timeFormatted = date.toLocaleTimeString("en-us", {
    hour12: true,
    hour: "numeric",
    minute: "2-digit",
  });

  return dateFormatted + " at " + timeFormatted;
};

export const App = () => {
  return (
    <HelmetProvider>
      <article>
        <Header />
        <div className="app">
          <div className="container">
            <h1 className="headline">{process.env.REACT_APP_SITE_NAME}</h1>
            <div className="attribution">
              <p className="byline">
                By{" "}
                {byline.map((author, i) => (
                  <span key={i} className="author">
                    <a href={author.url}>{author.name}</a>
                    {i < byline.length - 2
                      ? ", "
                      : i < byline.length - 1
                      ? " and "
                      : ""}
                  </span>
                ))}
              </p>
              <p className="article-date">Last updated: {getDateUpdated()}.</p>
            </div>
          </div>

          <div className="copy-container">
            <p className="copy">
              In the contest for governor, the election results that led to
              Kathy Hochul’s win over Lee Zeldin were shaped by voter turnout —
              how many registered voters actually decided to show up at the
              polls or cast an absentee ballot.
            </p>
            <p className="copy">
              This map shows the percent of active registered voters in each New
              York City election district who cast a ballot for governor,
              including absentee ballots counted by the city Board of Elections
              to date.{" "}
              <a href="https://www.thecity.nyc/2022/11/8/23448087/hochul-zeldin-election-results-new-york">
                <b>Related Story: Gov. Hochul defeats right-wing challenger</b>
              </a>
            </p>
          </div>

          <div className="copy-container">
            <div className="copy">
              <TurnoutMap />
            </div>
          </div>

          <div className="copy-container">
            <p className="copy">
              Click to select “Who won” and it will show which candidates for
              governor and lieutenant governor — Kathy Hochul/Antonio Delgado or
              Lee Zeldin/Alison Esposito — secured the most votes in each
              election district in New York City.
            </p>
            {SHOW_STATE_DATA && (
              <>
                <p className="copy">
                  Voter turnout so far is [higher/lower] than in the final count
                  for the last election for governor in 2018, with New York City
                  accounting for a [smaller/larger] share of the state’s votes.
                  Some absentee ballots remain outstanding.
                </p>
                <br />
                <WaffleChart />
                <br />
                <p className="copy">
                  TKTKTK Lorem ipsum dolor sit amet, consectetur adipiscing
                  elit, sed do eiusmod tempor incididunt ut labore et dolore
                  magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo
                  consequat.
                </p>
                <br />
                <CountyTurnoutMap />
                <br />
                <br />
                <p className="copy">
                  TKTKTK Duis aute irure dolor in reprehenderit in voluptate
                  velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                  sint occaecat cupidatat non proident, sunt in culpa qui
                  officia deserunt mollit anim id est laborum.
                </p>
                <br />
              </>
            )}
            <p className="copy">
              Hochul secured the most votes in New York City, 1,178,182 to
              513,097 as of 11:35 p.m. Tuesday, amounting to 69.5% of the
              preliminary vote. But she won a smaller share statewide, as Zeldin
              picked up votes in his home base of Long Island and upstate.
            </p>

            <HistoricalTurnoutChart />

            <p className="copy">
              Methodology Notes: Data is from the NYC Board of Elections.
              Results are unofficial and were last accessed Nov. 9, 2022, 12:08
              a.m. Neighborhood borders are from the NYC Department of City
              Planning. To calculate turnout by Neighborhood Tabulation Area
              (NTA), we merged election district geographies from both the 2018
              and 2022 elections with the 2020 NTA shapefile. In cases where
              election districts fell within more than one NTA we counted it as
              being part of the NTA that included its largest area.
            </p>
            <Newsletter />
          </div>
        </div>
        <Footer />
      </article>
    </HelmetProvider>
  );
};
