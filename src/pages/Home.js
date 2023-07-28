import React,{useEffect,useState} from "react";
import Header from "../component/Header"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from "axios";

const Home =()=>{
    const [randevular,setRandevular]=useState(null)
    const [hastalar,setHastalar] =useState(null)

  useEffect(()=>{
    axios
    .get(" http://localhost:3004/randevular")
    .then((resRandevular)=>{

        setRandevular(resRandevular.data)
        axios.get(" http://localhost:3004/hastalar")
        .then((reshastalar)=>{
            setHastalar(reshastalar.data)

        })
        .catch((err)=>console.log("hasta hata",err))
    })
   

    .catch((err)=>console.log("randevu hata",err))
  },[]);

  if (randevular === null || hastalar === null){
    return(
        <h1>loading</h1>
    )
  }

    return(
        <div>
            <Header />
            <TableContainer style={{margin:"50px"}} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{backgroundColor:"#aaa"}}>
          <TableRow>
            <TableCell>Tarih</TableCell>
            <TableCell >Hasta Adı</TableCell>
            <TableCell >Soyadı</TableCell>
            <TableCell >Telefon</TableCell>
            <TableCell >İşlem</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {
                randevular.map(randevu=>{
                    const aradigimhasta= hastalar.find((hasta)=> hasta.id === randevu.hastaId)
                    return(
                        <TableRow
                        key={randevu.id}
             
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
               {randevu.date}
              </TableCell>
              <TableCell >{aradigimhasta.name}</TableCell>
              <TableCell >{aradigimhasta.surname}</TableCell>
              <TableCell >{aradigimhasta.phone}</TableCell>
              <TableCell >butonlar gelecek</TableCell>
            </TableRow>

                    )
                })
            }
         
            
          
        </TableBody>
      </Table>
    </TableContainer>
        </div>

    )
}
export default Home