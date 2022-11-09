import * as React from "react";
import Map, {
  FullscreenControl,
  GeolocateControl,
  Layer,
  NavigationControl,
  Source,
} from "react-map-gl";
import maplibregl from "maplibre-gl";
import { feature } from "topojson-client";
import { MapPopup } from "./Popup";
import SearchBar from "./SearchBar";
import { Legend } from "./Legend";
import {
  CircularProgress,
  FormControlLabel,
  FormGroup,
  Switch,
} from "@mui/material";
import { Attribution } from "./Attribution";
import {
  isMapboxURL,
  transformMapboxUrl,
} from "maplibregl-mapbox-request-transformer";

import "maplibre-gl/dist/maplibre-gl.css";

/**
 * This is a public access token connected to THE CITY's MapBox account:
 */
const MAPBOX_TOKEN =
  "pk.eyJ1IjoidGhlLWNpdHkiLCJhIjoiY2xhMWVuaDNqMDZ1ZzNxbzNkM3poMHBheSJ9.SJAnL4rHAR6jShHQniZZHg";

/**
 * This is a link to our custom MapBox Studio basemap style:
 */
const MAPBOX_STYLE_URL = "mapbox://styles/the-city/cla76ue2h001514o67feib2ey";

/**
 * Since our custom style does not include links for map sprites, let's specify a fallback map style to load in:
 */
const FALLBACK_STYLE_URL_ROOT =
  "https://tiles.basemaps.cartocdn.com/gl/positron-gl-style/sprite@2x";

const transformStyleRequest = (url, resourceType) => {
  if (resourceType === "SpriteImage") {
    return {
      url: `${FALLBACK_STYLE_URL_ROOT}.png`,
    };
  }
  if (resourceType === "SpriteJSON") {
    return {
      url: `${FALLBACK_STYLE_URL_ROOT}.json`,
    };
  }
  if (isMapboxURL(url)) {
    return transformMapboxUrl(url, resourceType, MAPBOX_TOKEN);
  }
  return { url };
};

const getLayerStyle = () => {
  const breaks = [-100, -50, 0, 50, 100];
  const mixedColorScheme = [
    "#d02d3c",
    "#e99498",
    "#f7f7f7",
    "#91a5d3",
    "#214da5",
  ];
  const mixedColors = mixedColorScheme.map((v, i, a) => [breaks[i], v]);
  return {
    id: "eds",
    type: "fill",
    paint: {
      "fill-color": [
        "case",
        [
          "to-boolean",
          [
            ">=",
            ["+", ["+", ["get", "dem"], ["get", "rep"]], ["get", "other"]],
            10,
          ],
        ],
        ["interpolate", ["linear"], ["to-number", ["get", "margin"]]].concat(
          ...mixedColors
        ),
        "#e1e1e1",
      ],
      "fill-opacity": [
        "interpolate",
        ["linear"],
        ["zoom"],
        // When zoom is 10 or lower, buildings will be 90% opaque.
        10,
        0.9,
        // When zoom is 16 or higher, buildings will be 20% opaque.
        16,
        0.2,
      ],
    },
  };
};

const getHoverStyle = () => ({
  id: "eds-highlighted",
  type: "line",
  source: "eds",
  paint: {
    "line-width": 1.5,
    "line-color": "#000",
  },
});

const MarginsMap = () => {
  /**
   * Which map type are we showing? Margins map or voter turnout map?
   */
  const [is2018Map, setIs2018Map] = React.useState(false);
  const [mapData22, setMapData22] = React.useState(null);
  const [mapData18, setMapData18] = React.useState(null);
  const [hoverInfo, setHoverInfo] = React.useState(null);

  React.useEffect(() => {
    fetch("./data/2022/eds.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((json) => {
        setMapData22(feature(json, json.objects.eds));
        console.log("2022 Election data loaded");
      })
      .catch((err) => console.error("Could not load 2022 data", err)); // eslint-disable-line

    fetch("./data/2018/eds.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((json) => {
        setMapData18(feature(json, json.objects.eds));
        console.log("2018 Election data loaded");
      })
      .catch((err) => console.error("Could not load 2018 data", err)); // eslint-disable-line
  }, []);

  const onHover = React.useCallback((event) => {
    const district = event.features && event.features[0];
    setHoverInfo({
      longitude: event.lngLat.lng,
      latitude: event.lngLat.lat,
      districtData: !!district ? district.properties : null,
    });
  }, []);

  const selectedDistrict =
    (hoverInfo && hoverInfo.districtData && hoverInfo.districtData.ed) || "";

  const filter = React.useMemo(
    () => ["in", "ed", selectedDistrict],
    [selectedDistrict]
  );

  const onMouseLeave = React.useCallback(() => setHoverInfo(null), []);

  return !!mapData22 ? (
    <Map
      mapLib={maplibregl}
      initialViewState={{
        longitude: -74.039708344928,
        latitude: 40.613323256573386,
        zoom: 10,
      }}
      style={{ width: "100%", height: "100vh" }}
      mapStyle={MAPBOX_STYLE_URL}
      transformRequest={transformStyleRequest}
      onMouseMove={onHover}
      interactiveLayerIds={["eds"]}
      scrollZoom={false}
      dragRotate={false}
      onMouseLeave={onMouseLeave}
      minZoom={9}
      maxZoom={18}
      mapboxAccessToken={MAPBOX_TOKEN}
      attributionControl={false}
    >
      <Source
        id="election-margins-data"
        type="geojson"
        data={is2018Map ? mapData18 : mapData22}
      >
        <Layer {...getLayerStyle()} />
        <Layer {...getHoverStyle()} filter={filter} />
      </Source>

      {hoverInfo && hoverInfo.districtData && (
        <MapPopup hoverInfo={hoverInfo} is2018Map={is2018Map} />
      )}

      {/* MuiFormControlLabel */}
      <FormGroup
        className={is2018Map ? "turnout-map-selected" : "margins-map-selected"}
      >
        <span>2018</span>
        <FormControlLabel
          control={
            <Switch
              checked={!is2018Map}
              onChange={() => setIs2018Map(!is2018Map)}
              color="default"
            />
          }
          label="2022"
          aria-label="Select map to show"
        />
      </FormGroup>

      <GeolocateControl />
      <FullscreenControl />
      <NavigationControl showCompass={false} />
      <SearchBar mapboxAccessToken={MAPBOX_TOKEN} position="top-left" />
      <Attribution />

      <Legend is2018Map={is2018Map} />
    </Map>
  ) : (
    <div className="loading-screen">
      <div>
        <CircularProgress color="inherit" />
        <p>Loading...</p>
      </div>
    </div>
  );
};

export default MarginsMap;
