import {
  Card,
  CardContent,
  FormControl,
  MenuItem,
  Select,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import "./App.css";
import InfoBox from "./components/infobox/InfoBox";
import LineGraph from "./components/LineGraph/LineGraph";
import Map from "./components/map/Map";
import Table from "./components/table/Table";
import { sortData } from "./util";
import "leaflet/dist/leaflet.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  const [mapCenter, setMapCenter] = useState([34.80746, -40.4796]);
  const [zoom, setZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");

  // at first component loads, worldwide data is loaded
  useEffect(() => {
    console.log("useeffect for startting(worldwide)");

    fetch(`https://disease.sh/v3/covid-19/all`)
      .then((response) => response.json())
      .then((countryData) => {
        // console.log({countryData});

        setCountryInfo(countryData);
      });
  }, []);

  useEffect(() => {
    console.log("useeffect for countries list");
    function getCountriesData() {
      // const result = await fetch('https://api.caw.sh/v3/covid-19/countries');
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          const countriesList = data.map((country) => {
            return {
              name: country.country,
              value: country.countryInfo.iso2,
            };
          });
          console.log(countriesList.length);
          setCountries(countriesList);

          setTableData(sortData(data));
          setMapCountries(data);
        });
    }
    getCountriesData();
  }, []);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    console.log({ countryCode });
    setCountry(countryCode);

    const url =
      countryCode === "worldwide"
        ? `https://disease.sh/v3/covid-19/all`
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((countryData) => {
        console.log({ countryData });

        setCountryInfo(countryData);

        countryCode === "worldwide"
          ? setMapCenter([34.80746, -40.4796])
          : setMapCenter([
              countryData.countryInfo.lat,
              countryData.countryInfo.long,
            ]);
        setZoom(4);
      });
  };

  return (
    <div className="app">
      <div className="app_col-left">
        <div className="app_header">
          <h1>Covid-19 Tracker</h1>
          <FormControl className="app_dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries?.map((country, index) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app_stats">
          <InfoBox
            isRed
            active={casesType === "cases"}
            onClick={() => setCasesType("cases")}
            title="Active Cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />
          <InfoBox
            active={casesType === "recovered"}
            onClick={() => setCasesType("recovered")}
            title="Recovered"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />
          <InfoBox
            isRed
            active={casesType === "deaths"}
            onClick={() => setCasesType("deaths")}
            title="Deaths"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
        </div>

        <Map
          countries={mapCountries}
          casesType={casesType}
          center={mapCenter}
          zoom={zoom}
        />
      </div>
      <div className="app_col-right">
        <Card>
          <CardContent>
            <h3>Live cases by country</h3>
            {/* Table */}
            <Table countriesData={tableData} />

            <div>
              <h3 className="app_chartTitle">Worldwide new {casesType}</h3>

              {/* Graph */}
              <LineGraph casesType={casesType} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
