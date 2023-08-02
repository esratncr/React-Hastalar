import React, { useEffect, useState } from "react";
import Header from "../component/Header";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Navigate, useNavigate } from "react-router-dom";

const Hastalar = (props) => {
   const Navigate=useNavigate()
  const [hastalar, setHastlar] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3004/hastalar")
      .then((res) => {
        setHastlar(res.data);
      })
      .catch((err) => console.log("hasta hata", err));
  }, []);

  if (hastalar === null) {
    return <h1>loading</h1>;
  }
  return (
    <div>
      <Header />
      

      <TableContainer style={{ marginTop:"55px" }} component={Paper}>
        <div style={{ marginBottom: "15px", display: "flex", justifyContent:'flex-end'}}>
          <Button onClick={()=>Navigate("/hasta-ekle")} variant="contained">Contained</Button>
        </div>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: "#aaa" }}>
            <TableRow>
              <TableCell>Hasta Adı</TableCell>
              <TableCell>Soyadı</TableCell>
              <TableCell>Telefon</TableCell>
              <TableCell>İşlem</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {hastalar.map((hasta) => (
              <TableRow
                key={hasta.id}
               
              >
                <TableCell>{hasta.firstName}</TableCell>
                <TableCell>{hasta.lastName}</TableCell>
                <TableCell>{hasta.phone}</TableCell>
                <TableCell>butonlar gelecek</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Hastalar;
