import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";

function LineGraph({casesType}) {
  const [data, setData] = useState({});
  const options = {
    legend: {
      display: false,
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    maintainAspectRatio: false,
    tooltips: {
      mode: "index",
      intersect: false,
      callbacks: {
        label: function (tooltipItem, data) {
          return numeral(tooltipItem.value).format("+0,0");
        },
      },
    },
    scales: {
      xAxes: [
        {
          type: "time",
          time: {
            format: "MM/DD/YY",
            tooltipFormat: "ll",
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            // Include a dollar sign in the ticks
            callback: function (value, index, values) {
              return numeral(value).format("0a");
            },
          },
        },
      ],
    },
  };  

  
const buildChartData = (data, casesType = "cases") => {
    let chartData = [];
    let lastDataPoint;
  
    for (let dateAndValue in data[casesType]) {
      if (lastDataPoint) {
        let newDataPoint = {
          x: dateAndValue, //time
          y: data[casesType][dateAndValue] - lastDataPoint, // to get the difference (new cases) frpm previous day
        };
        chartData.push(newDataPoint);
      }
      lastDataPoint = data[casesType][dateAndValue];
    }
    console.log({ chartData });
    return chartData;
  };
  
  useEffect(() => {
    const fetch120DaysData = async () => {
      await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        .then((response) => response.json())
        .then((data) => {
          console.log("120 days data=", data);
          const chartData = buildChartData(data, casesType);
          setData(chartData);
        });
    };

    fetch120DaysData();
  }, [casesType]);

  return (
    <div>
      {data?.length > 0 && (
        <Line className="line"
          data={{
            datasets: [
              {
                data: data,
                backgroundColor: "rgba(204, 16, 52, 0.5)",
                borderColor: "#CC1034",
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
  );
}

export default LineGraph;
