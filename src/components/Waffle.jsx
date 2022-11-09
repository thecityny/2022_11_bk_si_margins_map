import { ResponsiveWaffle } from "@nivo/waffle";

const RED_COLOR = "#d02d3c";
const BLUE_COLOR = "#214da5";
const LIGHT_RED_COLOR = "#e5c5c7";
const LIGHT_BLUE_COLOR = "#c2cbdc";

const BACKGROUND_COLOR = "#ebebeb";

const WaffleChartData = {
  Dem2018: [
    {
      id: "nyc",
      label: "NYC",
      value: 1705310,
      color: BLUE_COLOR,
    },
    {
      id: "upstate",
      label: "Outside NYC",
      value: 1930030,
      color: LIGHT_BLUE_COLOR,
    },
  ],
  Dem2022: [
    {
      id: "nyc",
      label: "NYC",
      value: 1180993,
      color: BLUE_COLOR,
    },
    {
      id: "upstate",
      label: "Outside NYC",
      value: 1763463,
      color: LIGHT_BLUE_COLOR,
    },
  ],
  Rep2018: [
    {
      id: "nyc",
      label: "NYC",
      value: 318000,
      color: RED_COLOR,
    },
    {
      id: "upstate",
      label: "Outside NYC",
      value: 1889602,
      color: LIGHT_RED_COLOR,
    },
  ],
  Rep2022: [
    {
      id: "nyc",
      label: "NYC",
      value: 514175,
      color: RED_COLOR,
    },
    {
      id: "upstate",
      label: "Outside NYC",
      value: 2144978,
      color: LIGHT_RED_COLOR,
    },
  ],
};

const WaffleColumn = ({ columnData, label }) => (
  <div className="waffle-chart-column">
    <ResponsiveWaffle
      data={columnData}
      total={4000000}
      rows={20}
      columns={4}
      colors={[columnData[0].color, columnData[1].color]}
      emptyColor={BACKGROUND_COLOR}
      borderWidth={1}
      borderColor={BACKGROUND_COLOR}
      tooltip={({ label, value }) => (
        <div className="waffle-chart-tooltip">
          <b>{label}</b> <br />
          {value.toLocaleString()} votes
        </div>
      )}
    />
    {label}
  </div>
);

export const WaffleChart = () => (
  <div className="waffle-chart-container">
    {" "}
    <div className="title">
      Voter turnout in 2022 compared with 2018’s final count for governor
    </div>
    <div className="description">
      Total votes counted statewide for Democratic and Republican candidates in
      2018 and 2022 New York gubernatorial elections.{" "}
      <b>
        <span>Darker</span> <span>colors</span>
      </b>{" "}
      indicate votes in NYC.
    </div>
    <div className="waffle-chart-headers">
      <div>2018</div>
      <div>2022</div>
    </div>
    <div className="waffle-chart-section">
      <WaffleColumn
        columnData={WaffleChartData.Dem2018}
        label={<div className="waffle-chart-label">Cuomo</div>}
      />
      <WaffleColumn
        columnData={WaffleChartData.Rep2018}
        label={<div className="waffle-chart-label">Molinaro</div>}
      />
      <WaffleColumn
        columnData={WaffleChartData.Dem2022}
        label={<div className="waffle-chart-label">Hochul</div>}
      />
      <WaffleColumn
        columnData={WaffleChartData.Rep2022}
        label={<div className="waffle-chart-label">Zeldin</div>}
      />
    </div>
    <span className="byline-content">
      Chart: Sam Rabiyah / THE CITY · Source:{" "}
      <a
        href="https://www.elections.ny.gov/2018ElectionResults.html"
        target="_blank"
        rel="noopener noreferrer"
      >
        NY State Board of Elections
      </a>
    </span>
  </div>
);
