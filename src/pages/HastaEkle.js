import React, { useState, useEffect } from "react";
import Header from "../component/Header";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HastaEkle = () => {
  const navigate=useNavigate()

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [hastalar, setHastalar] = useState(null);

  useEffect(() => {
    axios
      .get(" http://localhost:3004/hastalar")
      .then((res) => {
        setHastalar(res.data);
      })
      .catch((err) => console.log("hata ekleme hatası", err));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (firstName === "" || lastName === "" || phone === "") {
      alert("Bok bırakmayınız...");
      return;
    }
    if (phone.length !== 11) {
      alert("Telefon numarası 11 haneli olmalıdır");
    }
    const hasNumber=hastalar.find(hasta => hasta.phone === phone)
    
    if(hasNumber !== undefined){
      alert('Bu telefona ait bir hasta zaten var')
      return
    }
    const newHasta={
      id:String(new Date().getTime()),
      firstName:firstName,
      lastName:lastName,
      phone:phone,
      islemIds:[]
    }
    
    axios.post(" http://localhost:3004/hastalar",newHasta)
    .then((res)=>{
      navigate("/hastalar")



    })
    .catch((err)=>console.log("hasta ekleme post hatası",err))
 
 

  };

  if(hastalar===null){
    return(
      <h1>Loading....</h1>

    )
  }

  return (
    <div>
      <Header />
      <form onSubmit={handleSubmit}>
        <div
          style={{ display: "flex", justifyContent: "center", margin: "25px" }}
        >
          <TextField
            style={{ width: "30%" }}
            id="outlined-basic"
            label="Hasta Adı"
            variant="outlined"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
        </div>
        <div
          style={{ display: "flex", justifyContent: "center", margin: "25px" }}
        >
          <TextField
            style={{ width: "30%" }}
            id="outlined-basic"
            label="Hasta Soyadı"
            variant="outlined"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
        </div>
        <div
          style={{ display: "flex", justifyContent: "center", margin: "25px" }}
        >
          <TextField
            style={{ width: "30%" }}
            id="outlined-basic"
            label="Telefon Numarısı"
            variant="outlined"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
        </div>
        <div
          style={{ display: "flex", justifyContent: "center", margin: "50px" }}
        >
          <Button type="submit" variant="contained">
            Kaydet
          </Button>
        </div>
      </form>
    </div>
  );
};

export default HastaEkle;
