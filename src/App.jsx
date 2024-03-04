import React from "react";
import Headeer from "./headeer";
import "../src/index.css";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";

function App() {
  const [name2, setName] = useState("");
  const [zone2, setZone] = useState("");
  const [estaciones, setEstaciones] = useState([]);
  const [loginFormData, setLoginFormData] = useState({
    name: "",
    zone: "",
  });

  const handleInputChange = (e)=>{
    setLoginFormData((prevData)=>({...prevData,[e.target.name]: e.target.value}));
  }

  const url ="http://3.212.142.51/service/";

  const handleSubmit = async () => {
    try {
      const respuesta = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginFormData),
      });
    } catch (error) {
      console.error("Error al enviar el pago:", error);
    }
  };

  const socket = io("http://52.203.193.217");

  useEffect(() => {
    socket.on("receiveEstacion", (event) => {
      console.log(event,"holaaaa");
      setEstaciones(event);
    });
  }, []);

  return (
    <>
      <Headeer></Headeer>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div className="imgContainer">
          <img
            style={{
              height: "300px",
              borderRadius: "5px",
              boxShadow: " -5px 6px 32px -3px ",
            }}
            src="https://scontent.ftgz1-2.fna.fbcdn.net/v/t39.30808-6/245639200_2345509042246715_4010232603378848975_n.jpg?stp=cp0_dst-jpg_e15_q65_s320x320&_nc_cat=108&ccb=1-7&_nc_sid=ab7367&_nc_ohc=sikxM1XQsQEAX-aNuWK&_nc_ht=scontent.ftgz1-2.fna&oh=00_AfCtCEhYTSdq3TxVeSWObOIbdXnN_LTpPYh2v5Co-lFk7Q&oe=65E5B408"
            alt=""
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          margin: "20px",
          gap: "40px",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2>Nombre De La Estacion</h2>
          <input
            style={{
              width: "100%",
              margin: "20px",
              height: "30px",
            }}
            name="name"
            value={loginFormData.name}
            onChange={handleInputChange}
          ></input>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2>Zona De La Estacion</h2>
          <input
            style={{
              width: "100%",
              margin: "20px",
              height: "30px",
            }}
            name="zone"
            value={loginFormData.zone}
            onChange={handleInputChange}
          ></input>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <button onClick={handleSubmit}>Suscribirme</button>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          margin: "60px",
        }}
      >
        <ul>
          <li>
            {estaciones.noti}
          </li>
        </ul> 
      </div>
    </>
  );
}

export default App;
