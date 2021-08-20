import * as React from "react";
import { useRef } from "react";
import { Progress, Segment, Dimmer } from "semantic-ui-react";
import Chart from "react-apexcharts";


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

  const seriesOptions = [
    {
      name: "SPO",
      data: signsArr.map((val) => {
        return {
          x: new Date(val.timestamp).getTime(),
          y: val.spo,
        };
      }),
    },
    {
      name: "HR",
      data: signsArr.map((val) => {
        return {
          x: new Date(val.timestamp).getTime(),
          y: val.hr,
        };
      }),
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
          <Chart type="line" options={options as any} series={seriesOptions} />
        </>
      </Dimmer.Dimmable>
    </div>
  );
};

export default SignsContainer;
