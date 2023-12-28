import axios from "axios";
import { useEffect, useState } from "react";
import data from './final.json'
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet } from 'react-helmet';


import {useNavigate} from 'react-router-dom'

import _ from 'lodash'

function EmployeeCrud() { 
  var errortime = 0 ;
  var errorroom = 0 ;
  var errorprofessor = 0 ;


  const navigate=useNavigate();
  const periods = ['computer', 'electrical', 'communication'];
  const [_id, setId] = useState("");
  const [name, setName] = useState("");
  const [course_name, setCourse_Name] = useState("");
  const [room, setRoom] = useState("");
  const [time, setTime] = useState("");
  const [departement, setDepartement] = useState("");
  const [day, setDay] = useState("");
  const [grade, setGrade] = useState("");
  const [period, setPeriod] = useState("");
  const [details, setUsers] = useState([]);
  const [detailsall, setUserall] = useState([]);


  const [f4, setF4] = useState(1);

  const [paginated , setPaginated]=useState([]);
  const [currentPage , setCurrent]=useState(1);
  const[current,setCur]=useState(0);

  // pagination
  const pagesize=5;
  var  pageCount= details? Math.ceil(details.length/pagesize) : 0
 if(pageCount===1)pageCount=-1;
 const pages=_.range(1,pageCount+1)

  const handle = (event)=>{
  
    setName(event.target.value)
    }
    const handle1 = (event) => {
       
        setCourse_Name(event.target.value)
      }
    
      const handle2 = (event) => {
       
        setRoom(event.target.value)
      }
    
      const handle3 = (event) => {
       

    const partsArray = event.target.value.split("-");
setDay(partsArray[1])
setGrade(partsArray[0])
setPeriod(partsArray[2])
    setTime(event.target.value)
    }
    const handle4 = (event) => {
    
      setDepartement(event.target.value)
    }


  useEffect(() => {
   
    const fetchData = async () => {
     
      const result = await axios.get(`http://localhost:8000/user/getAll?departement=${window.departement}`
      );
      const result1 = await axios.get(`http://localhost:8000/user/getAll/`
      );
      setUsers(result.data.data);
      setUserall(result1.data.data);
      setPaginated(_(details).slice(current).take(pagesize).value())
    };

   
      fetchData();
    

    
  }, [details,window.departement]);
    
  
  async function save(event) {

    
    event.preventDefault();
    try {
     
    
      if(name===""||course_name===""||room===""||time===""||departement===""){
     alert('the cell is empty ')
console.log(detailsall);
      }
 else {
  detailsall.forEach((course) => {
    console.log(course)
    if(course.time===time){
    errortime=1;
    }else if (course.room===room&&course.period===period&&course.day===day)
    {
      errorroom=1;
    }else if (course.name===name&&course.period===period&&course.day===day)
    {
      errorprofessor=1;
    }
  });
  if(errortime===1)
  {
    alert('the time is chosen ')

  }else if (errorroom===1)
  {
    alert('the room is chosen ')

  }else if (errorprofessor===1)
  {
    alert('the professor is busy ')

  }
 }
      await axios.post("http://localhost:8000/user/create", {
        name: name,
        
        course_name: course_name,
        room: room, 
        time:time,
        day:day, 
        grade:grade,
        period:period,
      
        departement:departement
      });
     
      console.log("i am inside the try")
      alert("Lecture Registation Successfully");
  
      setId("");
      setName("");
      setDepartement("");
      setCourse_Name("");
      setRoom("");
      setTime("");
      setDay("");
      setGrade("");
      setPeriod("");
     
    } catch (err) { 
      
      console.log("i am inside the catch")
   
     alert("User Registation Failed due to "+err);
    } 

  }
  async function editEmployee(details) {
   
    await axios.delete("http://localhost:8000/user/delete/" + details._id);
   
    setName(details.name);
    setCourse_Name(details.course_name);
    setRoom(details.room);
    setTime(details.time);
    setId(details._id);
    setDay(details.day);
    setGrade(details.grade);
    setPeriod(details.period);
    setDepartement(details.departement);
    
  }

  async function DeleteEmployee(_id) {
   
    await axios.delete("http://localhost:8000/user/delete/" + _id);
    alert("Employee deleted Successfully");

  
  }

  


const pagination =(pageNo)=>{
  setCurrent(pageNo); 
  const start = (pageNo-1)*pagesize;
  setCur(start)
  const paginate = _(details).slice(start).take(pagesize).value();
  setPaginated(paginate); 
  
}
  return ( 
    <div>
      <Helmet>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto|Varela+Round"/>

      <link href="fontawesome/css/all.css" rel="stylesheet"/> 
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossorigin="anonymous"/>

        <link rel="stylesheet" href="./MyTble.css"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto|Varela+Round"/>
          </Helmet>
      <h1 class="name">Lecture Details</h1> 
      
      <div className="container mt-12">
     
          <div className="form-group row g-4 ">
           <div class = "col-sm-2">
            <label class="c">Professor Name</label>
            </div>
            <div class = "col-sm-2">
            <select
        className="form-control border-bottom col-auto"
        value={name}
        onChange={handle}
      >
        <option value="">Select a Name</option>
        {data.DRname.map((option, index) => (
          <option key={ index+'DRname'} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
      </div>
           
         <div class = "col-sm-2">
            <label class="c">Course_name</label>
            </div>
           
            <div class = "col-sm-2">
            <select
        className="form-control"
        value={course_name}
        onChange={handle1}
      >
        <option value="">Select a course</option>
        {data['computer'].one.firstSemester.courses.map((option, index) => (
          <option key={index+'courses'} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
      </div>
      </div>
      <div className="form-group row g-3  align-items-center">
          
         
            <div class="col-sm-2">
            <label class="c" >Room</label>
            </div>
            
            <div class="col-sm-2">
            <select
        className="form-control"
        value={room}
        onChange={handle2}
      >
        <option value="">Select a Room</option>
        {data.places.map((option, index) => (
          <option key={index+'places'} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
      </div>
        
         <div class="col-sm-2">
            <label class="c">Time</label> 
            </div> 
            
            <div class = "col-sm-4">
            <select
        className="form-control"
        value={time}
        onChange={handle3}
      >
        <option value="">Select a time</option>
        {data.schedules.map((option, index) => (
          <option key={index+'schedules'} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
      </div>
           
           
          </div> 
          <div class="form-group row g-3  align-items-center">
          <div class = "col-sm-2">
            <label class="c">Departement</label>
            </div>
          
            <div class = "col-sm-2">
            <select
        className="form-control"
        value={departement}
        onChange={handle4}
      >
        <option value="">Select a Departement</option>
        {periods.map((option, index) => (
          <option key={index+'deprt'} value={option}>
            {option}
          </option>
        ))}
      </select>
      </div>
      </div>
          <div class="cv">
          <div className="c1">
            <button className="btn btn-primary c2 " onClick={save}>
              Register
            </button>
            <button className="btn btn-warning c2 " onClick={()=>{
                                  navigate('/table')
                                }} >
              Table
            </button>
          
          </div>
          <div class ="row cc1"> 
        
          <div class="col-4">
                                <button onClick={()=>{
                            
                                 window.departement = "computer";
                                 setCur(0);
                                 setCurrent(1);
                           
                              } }class="btn btn-success d5"><i class="fa fa-plus-circle icon"></i> Computer</button>
                               
                            </div>
                            <div class="col-4">
                                <button onClick={()=>{ 
                          
                          window.departement = "communication";
                          setCur(0);
                          setCurrent(1);
                       
                          } } class="btn btn-success d5"><i class="fa fa-plus-circle icon"></i> Communication</button>
                               
                            </div>
                            <div class="col-4">
                                <button onClick={()=>{
                                  window.departement = "electrical";
                                  setCur(0);
                                  setCurrent(1);
                          
                             } } class="btn btn-success d5"><i class="fa fa-plus-circle icon"></i> Electrical</button>
                               
                            </div>
          </div>
          </div>
  
      </div>
                              
      <table className="table" align="center">
        <thead class="bbb1 table-dark">
          <tr class="l1">
          <th  class="l1"> Departement</th>
          <th  class="l1">Time</th>
            <th  class="l1">Professor Name</th>
            <th  class="l1"> Course_name</th>
            <th  class="l1"> Room</th>
           
            <th scope="col">Option</th>
          </tr>
        </thead>
        {paginated.map(function fn(employee) {
          return (
            <tbody key={employee._id} class="table-group-divider bbb" >
              <tr>
              <td >{employee.departement}</td>
              <td class="l2">{employee.time}</td>
                <td class="l2">{employee.name}</td>
                <td class="l2">{employee.course_name}</td>
                <td class="l2">{employee.room}</td>
              
               
                <td>
                  <button
                    type="button"
                    className="btn btn-warning c2"
                    onClick={() => editEmployee(employee)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger c2"
                    onClick={() => DeleteEmployee(employee._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })} 
      </table>
      <nav className="d-flex justify-content-center">
        <ul className="pagination">
         {
        pages.map((page)=>(<li className={
          page===currentPage ? "page-item active" : "page-item"
         }> <p className="page-link" onClick={()=>{
          pagination(page)
         }}>{page}</p></li>))
         }
        </ul>
      </nav>
    </div>
    
  );
}

export default EmployeeCrud;

