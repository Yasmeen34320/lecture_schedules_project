import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { Helmet } from 'react-helmet';
import  { useRef } from 'react';
import {useDownloadExcel} from "react-export-table-to-excel";
import {useNavigate} from 'react-router-dom'
import './MyTble.css'; 
import 'bootstrap-icons/font/bootstrap-icons.css';

import './App.css';

 import axios from "axios";
 import { useEffect, useState } from "react";

const daysOfWeek = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday']; 
const periods = ['1st', '2nd', '3rd', '4th', '5th'];
const grades = ['First Grade', 'Second Grade', 'Third Grade', 'Fourth Grade'];


const MyTable = () => {
 
  const [details, setUsers] = useState([]);
  const [details1, setUsers1] = useState([]);
  const [idMapping, setIdMapping] = useState({});
  const navigate=useNavigate();

  const mapping = {};
  
  mapping["Physics (3-A)"]= "#D3CBB8";
   mapping["Introduction to Programming"]= "#B8D3D0";
  mapping["Electrical Circuits (1)"]="#B8D3C1" ;
  mapping["Logic Circuits (1)"]="#C1B8D3";
  mapping["Mathematics (3-A)"]="#D0B8D3" ;
  mapping["Fluid Mechanics and Thermodynamics"]="#C1AD8D" ;
  mapping["Development of Thinking Skills"]="#8DA3C1" ; 

  
const tableRef=useRef(null);
 const {onDownload}=useDownloadExcel({
  currentTableRef:tableRef.current,
  filename: "Data college",
  sheetName: "dd",
 });
 
const getBackgroundColor = (value) => {
 if (value === "None") {
  return "#ffffff"; 
   
 }  else { 
     return mapping[value]; 

 }
};

  useEffect(() => {
   
    const fetchData = async () => {
    
      const result = await axios.get(`http://localhost:8000/user/getAll?departement=${window.departement}`
      );
      setUsers(result.data.data);
    };

   
      fetchData();
    

    const mapping = {};
    if(details!=undefined){
    details.forEach((course) => {
      const id = `${course.time}`;
      mapping[id] = { lecture: course.course_name, room: course.room, professor: course.name };
      
    });
  }

    setIdMapping(mapping);
  }, [details,window.departement]);

  return (
   
 
    <div>
    <Helmet> 
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto|Varela+Round"/>
          </Helmet>
          
          <div class="row center-container">
          <div class="col cc2">
                                <h2 >{window.departement} <b>Departement</b></h2>
                            </div>
                            <div class="col-2">
                           
                                <button onClick={()=>{
                                  navigate('/log')
                                }}  class="btn btn-success d5">
                                
                                  Edit</button>

                                <button onClick={onDownload} class="btn btn-danger d5"><i class="fa fa-minus-circle icon"></i>Download</button>	
                            </div> 
                         
         
          <div class="col-auto">
                                <button onClick={()=>{
                               
                               
                                 window.departement = "computer";
                                 setUsers(details1)

                              } }class="btn btn-warning d5"><i class="fa fa-plus-circle icon"></i> Computer</button>
                               
                            </div>
                            <div class="col-auto">
                                <button onClick={()=>{
                         
                          window.departement = "communication";
                       
                          setUsers(details1)
                    
                          } } class="btn btn-warning d5"><i class="fa fa-plus-circle icon"></i> Communication</button>
                               
                            </div>
                            <div class="col-auto">
                                <button onClick={()=>{
                                  window.departement = "electrical";
                        
                          setUsers(details1)
                        
                             } } class="btn btn-warning d5"><i class="fa fa-plus-circle icon"></i> Electrical</button>
                               
                            </div>
          </div>
                          
    <Paper>          
      <TableContainer class="cont">
        <Table class="table table-striped table-hover" ref={tableRef}>
          <TableHead>
            <TableRow class="bg border border-3">
              <TableCell></TableCell>
              <TableCell></TableCell>
              {grades.map((grade) => (
                <React.Fragment key={grade} >
                  <TableCell  class="bg1" colSpan={3}>{grade}</TableCell>
                </React.Fragment>
              ))}
            </TableRow>
            <TableRow class=" border border-3 rounded">
              <TableCell></TableCell>
              <TableCell></TableCell>
              {grades.map((grade) => (
                <React.Fragment key={`${grade}-header`}>
                  <TableCell class="cell1">Lecture</TableCell>
                  <TableCell  class="cell1">Room</TableCell>
                  <TableCell  class="cell1">Professor</TableCell>
                </React.Fragment>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {daysOfWeek.map((day) => (
              <React.Fragment key={day}>
                {periods.map((period, index) => (
                  <TableRow key={`${day}-${period}` } class=" border border-3"> 
                    {index === 0 && <TableCell class="cell1" rowSpan={periods.length}>{day}</TableCell>}
                    <TableCell class="cell1">{period}</TableCell>
                    {grades.map((grade) => (
                      <React.Fragment key={`${grade}-${day}-${period}`}>
                      <TableCell class="border border-3 cell" style={{ backgroundColor: getBackgroundColor(idMapping[`${grade}-${day}-${period}`]?.lecture || 'None') }}
>
                          {idMapping[`${grade}-${day}-${period}`]?.lecture || ' '}
                        </TableCell >
                        <TableCell class="border border-3 cell" style={{ backgroundColor: getBackgroundColor(idMapping[`${grade}-${day}-${period}`]?.lecture || 'None') }}
>
                          {idMapping[`${grade}-${day}-${period}`]?.room || ' '}
                        </TableCell>
                        <TableCell class="border border-3 cell" style={{ backgroundColor: getBackgroundColor(idMapping[`${grade}-${day}-${period}`]?.lecture || 'None') }}
>
                          {idMapping[`${grade}-${day}-${period}`]?.professor || ' '}
                        </TableCell>
                      </React.Fragment>
                    ))}
                  </TableRow>
                ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
 
    </div>
   
  
  );
};

export default MyTable;
