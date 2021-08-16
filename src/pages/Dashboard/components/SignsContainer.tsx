import * as React from "react";
import { useEffect, useState, useMemo, useRef } from "react";
import { Scatter, Line } from "react-chartjs-2";
import { Progress, Segment, Dimmer } from "semantic-ui-react";
import { isNil } from "ramda";
import moment from "moment";

type SignsObj = {
  spo: number;
  hr: number;
  timestamp: Date;
};

type Props = {
  signsArr: SignsObj[];
  hr: number | undefined | null;
  spo: number | undefined | null;
  timestamp: Date;
};

const SignsContainer: React.FC<Props> = ({
  signsArr,
  hr = 0,
  spo = 0,
  timestamp,
}) => {
  console.log(signsArr);
  const chart = useRef() as React.MutableRefObject<any>;
  // const [randomData, setRandomData] = useState([
  //   0.5,
  //   12,
  //   3,
  //   5,
  //   14,
  //   67,
  //   5,
  //   43,
  //   7,
  //   92,
  //   45,
  // ]);
  const [randomData, setRandomData] = useState([]);

  // useEffect(() => {
  //   setInterval(() => {
  //     // addPointToChart();
  //   }, 1000);
  // }, []);

  // useEffect(() => {
  //   console.log(chart);

  //   addPointToChart();
  // }, [chart]);

  // useEffect(() => {
  //   // if (randomData.length > 0) {
  //   if (!isNil(hr) && !isNil(spo)) {
  //     addPointToChart(hr, spo);
  //   }
  //   // }
  // }, [hr, spo, timestamp]);

  // const addPointToChart = (hr: number, spo: number) => {
  //   const { current } = chart;

  //   // if (current && current !== null) current?.update();
  //   // if (!isNil(chart.current)) {
  //   //   console.log(current.data.datasets[0].data);

  //   //   current.data.datasets[0].data.push({
  //   //     x: current.data.datasets[0].data.length + 1,
  //   //     y: spo,
  //   //   });
  //   //   current.data.datasets[1].data.push({
  //   //     x: current.data.datasets[1].data.length + 1,
  //   //     y: hr,
  //   //   });
  //   //   current.update();
  //   // }
  // };

  const chartData = useMemo(
    () => ({
      datasets: [
        {
          label: "SPO",
          yAxisID: "spo-chart",
          data: signsArr.map((val) => ({
            x: moment(val.timestamp),
            y: val.spo,
          })),
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
          data: signsArr.map((val) => {
            return {
              x: moment(val.timestamp),
              y: val.hr,
            };
          }),
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
    [signsArr]
  );

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
            type: "time"
          }
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

  const spoStatus = (val: number) => {
    const obj = {} as any;
    obj.percent = val;

    if (val < 70) {
      obj.error = true;
    }

    if (val > 70 && val < 85) {
      obj.warning = true;
    }

    if (val > 85) {
      obj.success = true;
    }

    return obj;
  };

  const hrStatus = (val: number) => {
    const obj = {} as any;
    obj.percent = val;

    const normalisedVal = val / 2;

    if (normalisedVal < 70) {
      obj.error = true;
    }

    if (normalisedVal > 70 && normalisedVal < 85) {
      obj.warning = true;
    }

    if (normalisedVal > 85) {
      obj.success = true;
    }

    return obj;
  };

  return (
    <div style={{ maxWidth: "90vw", maxHeight: "80vh" }}>
      <Dimmer.Dimmable as={Segment} blurring dimmed={signsArr.length === 0}>
        <>
          <div>
            Current SPO: <h3>{spo || "__"} %</h3>
          </div>
          <Progress {...spoStatus(spo || 0)} />
          <div>
            Current HR: <h3>{hr || "__"} bpm</h3>
          </div>
          <Progress {...hrStatus(hr || 0)} />
          <Scatter data={chartData} options={chartOptions} ref={chart} />
        </>
      </Dimmer.Dimmable>
    </div>
  );
};

export default SignsContainer;
