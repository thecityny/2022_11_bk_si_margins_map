export const Legend = ({ isTurnoutMap }) => (
  <div className="map-overlay mixed">
    <p className="slider-legend-title">
      {isTurnoutMap ? "Voter Turnout" : "Percentage Point Margin"}
    </p>
    {isTurnoutMap ? (
      <br />
    ) : (
      <div className="slider-legend-labels">
        <p className="label-left">Zeldin</p>
        <p className="label-right">Hochul</p>
      </div>
    )}
    <div className="slider-legend chart-key-mixed">
      <svg width="160" height="35">
        <defs>
          <linearGradient id="Gradient1">
            <stop offset="10%" stopColor="#fafaf8" />
            <stop offset="90%" stopColor="#000" />
          </linearGradient>
          <linearGradient id="Gradient2">
            <stop offset="0%" stopColor="#d02d3c" />
            <stop offset="50%" stopColor="#FFF" />
            <stop offset="100%" stopColor="#214da5" />
          </linearGradient>
        </defs>
        <rect
          id="rect1"
          x="15"
          width="130"
          height="15"
          fill={`url(#Gradient${isTurnoutMap ? "1" : "2"})`}
        />
        <g
          transform="translate(0,15)"
          fill="none"
          fontSize="10"
          fontFamily="sans-serif"
          textAnchor="middle"
        >
          <path
            className="domain"
            stroke="currentColor"
            d="M15,6V0H145V6"
          ></path>
          <g className="tick" opacity="1" transform="translate(15,0)">
            <line stroke="currentColor" y2="6" y1="-15"></line>
            <text fill="currentColor" y="9" dy="0.71em">
              {isTurnoutMap ? "0%" : "100"}
            </text>
          </g>
          {!isTurnoutMap && (
            <g className="tick" opacity="1" transform="translate(80,0)">
              <line stroke="currentColor" y2="6" y1="-15"></line>
              <text fill="currentColor" y="9" dy="0.71em">
                0
              </text>
            </g>
          )}
          <g className="tick" opacity="1" transform="translate(145,0)">
            <line stroke="currentColor" y2="6" y1="-15"></line>
            <text fill="currentColor" y="9" dy="0.71em">
              {isTurnoutMap ? "60%+" : "100"}
            </text>
          </g>
        </g>
      </svg>
    </div>
  </div>
);
