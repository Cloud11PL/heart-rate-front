import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import mqtt, { MqttClient } from "mqtt";

const host = "wss://hairdresser.cloudmqtt.com:35647";
const mqttOptions = {
  port: 35647,
  username: "qdkhlixn",
  password: "5g1bISCQc57i",
  protocol: "wss",
};

const App: React.FC = () => {
  const [mqttClient, setMqttClient] = useState<MqttClient | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<String | null>(null);
  const [payload, setPayload] = useState<any>(null);
  const [lastContact, setLastContact] = useState<any>(false);

  const [vitalParams, setVitalParams] = useState<any>(null);

  const deviceMessageHandler = (msg: string) => {
    const newMsg = msg.split(",");
    const spoPart = newMsg[0].split(":");
    const hrPart = newMsg[1].split(":");
    const statusPart = newMsg[2].split(":");

    const hrVal = hrPart[1];
    const spoVal = spoPart[1];
    const status = statusPart[1];

    console.log(hrVal, spoVal, status);

    setVitalParams({
      hr: hrVal,
      spo: spoVal,
      status,
    });
    setLastContact(true);
  };

  useEffect(() => {
    let timer = setTimeout(() => {
      console.log("hello");
      setLastContact(false);
    }, 4000);

    return () => {
      clearTimeout(timer);
    }
  }, [vitalParams])

  const initMessageHandler = (msg: string) => {};

  useEffect(() => {
    console.log(payload);
    if (payload) {
      console.log(payload);
      const { topic, message } = payload;
      console.log(topic, message);
      switch (topic) {
        case "device":
          deviceMessageHandler(message);
          break;
        case "init":
          initMessageHandler(message);
          break;
        default:
          console.log(topic, message);
          break;
      }
    }
  }, [payload]);

  const mqttConnect = () => {
    const client = mqtt.connect(host, mqttOptions as any);
    setMqttClient(client);
  };

  useEffect(() => {
    mqttConnect();
  }, []);

  useEffect(() => {
    if (mqttClient) {
      console.log(mqttClient);
      mqttClient.on("connect", () => {
        setConnectionStatus("Connected");
        subscribeToTopics();
      });
      mqttClient.on("error", (err) => {
        console.error("Connection error: ", err);
        mqttClient.end();
      });
      mqttClient.on("reconnect", () => {
        setConnectionStatus("Reconnecting");
      });
      mqttClient.on("message", (topic, message) => {
        const payload = { topic, message: message.toString() };
        console.log(payload);
        setPayload(payload);
      });
    }
  }, [mqttClient]);

  const subscribeToTopics = () => {
    if (mqttClient) {
      mqttClient.subscribe("init");
      mqttClient.subscribe("device");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        Connection status: {connectionStatus}
      </header>
      <div className="data-container">
        {vitalParams && (
          <>
            <div>HR: {vitalParams.hr}</div>
            <div>SPO: {vitalParams.spo}</div>
            <div>Device status: {lastContact ? '🟢' : '🔴'}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
