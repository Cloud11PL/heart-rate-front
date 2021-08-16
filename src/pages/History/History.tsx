import * as React from "react";
import { useEffect, useState } from "react";
import moment from "moment";

import { List, Segment } from "semantic-ui-react";

import axios from "../../axios";

import SideBar from "../../components/SideBar";
import SpoBar from "../../components/SpoBar";
import MainContent from "../../components/MainContent";

type Series = {
  active: boolean;
  createdAt: string;
  deviceName: string;
  updatedAt: string;
  _id: string;
};

const History: React.FC = () => {
  const [series, setSeries] = useState<Series[]>([]);

  useEffect(() => {
    axios.get("/allSeries").then((res) => {
      console.log(res);
      setSeries(res as any);
    });
  }, []);

  const getDateFromNow = (date: string) => moment(date).fromNow();

  return (
    <>
      <SideBar />
      <MainContent>
        <h3>History series</h3>
        <Segment>
          {series.length > 0 ? (
            <List divided relaxed>
              {series.map((singleSeries) => (
                <List.Item>
                  <List.Icon
                    name="phone"
                    size="large"
                    verticalAlign="middle"
                    color={singleSeries.active ? "green" : "grey"}
                  />
                  <List.Content>
                    <List.Header as="a" href={`/history/${singleSeries._id}`}>{singleSeries.deviceName}</List.Header>
                    <List.Description as="a">
                      {getDateFromNow(singleSeries.createdAt)}
                    </List.Description>
                  </List.Content>
                </List.Item>
              ))}
            </List>
          ) : (
            <div>Series history is empty</div>
          )}
        </Segment>
      </MainContent>
    </>
  );
};

export default History;
