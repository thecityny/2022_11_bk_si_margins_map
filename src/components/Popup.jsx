import { Popup } from "react-map-gl";

const formatNtaName = (nta) => nta.replace("-", " / ");
const formatElectionDistrict = (ed) =>
  ed.toString().slice(0, 2) + "/" + ed.toString().slice(2, 5);

export const MapPopup = ({ hoverInfo, isTurnoutMap }) => {
  const { latitude, longitude, districtData } = hoverInfo;
  const totalVotes = districtData.dem + districtData.rep + districtData.other;
  return (
    <Popup
      longitude={longitude}
      latitude={latitude}
      closeButton={false}
      className="county-info"
      closeOnClick={false}
    >
      <div className="popup-content">
        <div className="report">
          {totalVotes < 10 ? (
            <>
              <h3>
                Election District: {formatElectionDistrict(districtData.ed)}
              </h3>
              <p>
                {totalVotes === 0
                  ? `No one voted here.`
                  : totalVotes === 1
                  ? `Only 1 person voted here.`
                  : `Only ${totalVotes} people voted here.`}
              </p>
            </>
          ) : isTurnoutMap ? (
            <>
              <h3>
                Election District: {formatElectionDistrict(districtData.ed)}
              </h3>
              <p>
                2022 Turnout:{" "}
                {districtData.t22
                  ? Math.abs(Math.round(districtData.t22 * 10) / 10)
                  : "0"}
                %
              </p>
              <br />

              <p>
                <b>Neighborhood:</b> {formatNtaName(districtData.nta)}
              </p>
              <table className="results">
                <thead>
                  <tr>
                    <th>Year</th>
                    <th className="number">Turnout</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>2018</td>
                    <td className="number">
                      {districtData.nta18
                        ? Math.round(districtData.nta18 * 10) / 10
                        : "0"}
                      %
                    </td>
                  </tr>
                  <tr>
                    <td>2022</td>
                    <td className="number">
                      {districtData.nta22
                        ? Math.round(districtData.nta22 * 10) / 10
                        : "0"}
                      %
                    </td>
                  </tr>
                  <tr>
                    <td>Change</td>
                    <td className="number">
                      {districtData.nta18 && districtData.nta22
                        ? Math.round(
                            (districtData.nta22 - districtData.nta18) * 10
                          ) / 10
                        : "0"}
                      %
                    </td>
                  </tr>
                </tbody>
              </table>
            </>
          ) : (
            <>
              <h3>
                Election District: {formatElectionDistrict(districtData.ed)}
              </h3>
              <table className="results">
                <thead>
                  <tr>
                    <th>Candidate</th>
                    <th>Party</th>
                    <th className="number">Votes</th>
                    <th className="number">Pct.</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Kathy Hochul</td>
                    <td>DEM</td>
                    <td className="number">{districtData.dem}</td>
                    <td className="number">
                      {totalVotes !== 0
                        ? (districtData.dem / totalVotes).toLocaleString(
                            "en-US",
                            {
                              style: "percent",
                              maximumFractionDigits: 1,
                              minimumFractionDigits: 1,
                            }
                          )
                        : "0%"}
                    </td>
                  </tr>
                  <tr>
                    <td>Lee Zeldin</td>
                    <td>REP</td>
                    <td className="number">{districtData.rep}</td>
                    <td className="number">
                      {totalVotes !== 0
                        ? (districtData.rep / totalVotes).toLocaleString(
                            "en-US",
                            {
                              style: "percent",
                              maximumFractionDigits: 1,
                              minimumFractionDigits: 1,
                            }
                          )
                        : "0%"}
                    </td>
                  </tr>
                  <tr>
                    <td>Other</td>
                    <td></td>
                    <td className="number">{districtData.other}</td>
                    <td className="number">
                      {totalVotes !== 0
                        ? (districtData.other / totalVotes).toLocaleString(
                            "en-US",
                            {
                              style: "percent",
                              maximumFractionDigits: 1,
                              minimumFractionDigits: 1,
                            }
                          )
                        : "0%"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    </Popup>
  );
};
