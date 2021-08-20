import * as React from "react";
import { useEffect, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { Scatter, Line } from "react-chartjs-2";
import Chart from "react-apexcharts";

import MainContent from "../../components/MainContent";
import SideBar from "../../components/SideBar";

import axios from "../../axios";
import moment from "moment";

type ResponseObj = {
  hrVal: number;
  spoVal: number;
  createdAt: string;
};

const Series: React.FC = () => {
  console.log(useLocation());
  const id = useLocation().pathname.split("/")[2];

  const [chartArrHr, setChartArrHr] = useState<any>([]);
  const [chartArrSpo, setChartArrSpo] = useState<any>([]);
  const [labels, setLabels] = useState<any>([]);

  useEffect(() => {
    console.log(id);

    axios.get(`/seriesPerId?seriesId=${id}`).then((response) => {
      const res = (response as unknown) as ResponseObj[];
      console.log(res);
      // const tempArrHr = res.map((el) => ({
      //   x: moment(el.createdAt),
      //   y: el.hrVal,
      // }))

      const tempArrHr = res.map((el, i) => [new Date(el.createdAt).getTime(), el.hrVal]);

      setLabels(res.map((el) => moment(el.createdAt)));

      const tempArrSpo = res.map((el, i) => [new Date(el.createdAt).getTime(), el.spoVal]);

      console.log(tempArrHr);

      // const tempArrSpo = res.map((el) => ({
      //   x: moment(el.createdAt),
      //   y: el.spoVal,
      // }))

      setChartArrHr(tempArrHr);
      setChartArrSpo(tempArrSpo);
    });
  }, []);

  const chartData = useMemo(
    () => ({
      datasets: [
        {
          label: "SPO",
          yAxisID: "spo-chart",
          data: chartArrSpo,
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          showLine: true,
          borderColor: "red",
          pointBackgroundColor: "red",
          borderWidth: 0.5,
          tension: 0.05,
          fillColor: "rgba(220,220,220,0.2)",
          strokeColor: "rgba(220,220,220,1)",
          pointColor: "rgba(220,220,220,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          fill: true,
        },
        {
          label: "Heart Rate",
          yAxisID: "hr-chart",
          data: chartArrHr,
          backgroundColor: "rgba(135, 242, 245, 0.5)",
          showLine: true,
          borderColor: "rgba(135, 242, 245, 0.8)",
          pointBackgroundColor: "rgba(135, 242, 245, 1)",
          borderWidth: 0.5,
          tension: 0.05,
          fillColor: "rgba(220,220,220,0.2)",
          strokeColor: "rgba(220,220,220,1)",
          pointColor: "rgba(220,220,220,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          fill: true,
        },
      ],
    }),
    [chartArrSpo]
  );

  const seriesOptions = [
    {
      name: "SPO",
      data: chartArrSpo,
    },
    {
      name: "HR",
      data: chartArrHr,
    },
  ];

  const options = {
    chart: {
      height: 350,
      type: 'scatter',
      zoom: {
        enabled: true,
        type: 'xy'
      },
      animations: {
        enabled: false
      }
    },
    xaxis: {
      type: 'datetime',
      tickAmount: 10,
    },
    yaxis: {
      tickAmount: 7
    },
    tooltip: {
      x: {
        format: 'hh:mm:ss'
      }
    }
  }

  const chartOptions = useMemo(
    () => ({
      scales: {
        xAxes: [
          {
            type: "time",
            time: {
              parser: "YYYY-MM-DD HH:mm:ss",
              unit: "minute",
              displayFormats: {
                minute: "YYYY-MM-DD HH:mm:ss",
                hour: "YYYY-MM-DD HH:mm:ss",
              },
            },
            scaleLabel: {
              display: true,
              labelString: "Date",
            },
            ticks: {
              source: "auto",
            },
          },
          {
            type: "time",
          },
        ],
        yAxes: [
          {
            id: "spo-chart",
            position: "right",
            display: false,
            scaleLabel: {
              display: true,
              labelString: "SPO",
            },
            ticks: {
              max: 100,
              min: 75,
              suggestedMin: 75,
            },
          },
          {
            id: "hr-chart",
            position: "left",
            display: false,
            scaleLabel: {
              display: true,
              labelString: "SPO",
            },
            ticks: {
              max: 100,
              min: 75,
              suggestedMin: 75,
            },
          },
        ],
      },
      responsive: true,
      animation: false,
    }),
    []
  );

  const chartRender = () => {
    return <Scatter options={chartOptions} data={chartData} />;
  };

  return (
    <>
      <SideBar />
      <MainContent>
        {chartArrHr.length > 0 && chartArrSpo.length > 0 && (
          <Chart series={seriesOptions} options={options as any} type="line" />
        )}
      </MainContent>
    </>
  );
};

export default Series;
