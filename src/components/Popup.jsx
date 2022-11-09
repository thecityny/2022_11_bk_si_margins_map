import { Popup } from "react-map-gl";

const formatElectionDistrict = (ed) =>
  ed.toString().slice(0, 2) + "/" + ed.toString().slice(2, 5);

export const MapPopup = ({ hoverInfo, is2018Map }) => {
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
                    <td>{is2018Map ? "Andrew Cuomo" : "Kathy Hochul"}</td>
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
                    <td>{is2018Map ? "Marc Molinaro" : "Lee Zeldin"}</td>
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
