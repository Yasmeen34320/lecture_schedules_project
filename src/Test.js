import axios from "axios";
import { useEffect, useState } from "react";
import data from './final.json'
function Test() {
  const [_id, setId] = useState("");
  const [name, setName] = useState("");
  const [course_name, setCourse_Name] = useState("");
  const [room, setRoom] = useState("");
  const [time, setTime] = useState([]);
  const [details, setUsers] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');

  // Event handler for changing the selected value
  const handleSelectChange = (event) => {
    setName(event.target.value);
   
  };
  useEffect(() => {
    (async () => {
      try {
        await Load();
      } catch (error) {
        console.error("Error loading data:", error);
      }
    })();
  }, []);

  async function Load() {
    try {
      const result = await axios.get("http://localhost:8000/user/getAll");
      setUsers(result.data.data);
      console.log(result.data);
    } catch (err) {
      console.error("Error loading data:", err);
      throw err; // Re-throw the error to propagate it to the outer try/catch block
    }
  }

  async function save(event) {
    event.preventDefault();
    try {
      await axios.post("http://localhost:8000/user/create" , {
        name: name,
        course_name: "sdsd",
        room: "301", 
        time:"15",
      });
      alert("Employee Registation Successfully");
      setId("");
      setName("");
      setCourse_Name("");
      setRoom("");
      setTime("");
      Load();
    } catch (err) {
      alert("User Registation Failed");
    }
  }
  async function editEmployee(details) {
    setName(details.name);
    setCourse_Name(details.course_name);
    setRoom(details.room);
    setTime(details.time);
    setId(details._id);
  }

  async function DeleteEmployee(_id) {
    await axios.delete("http://localhost:8000/user/delete/" + _id);
    alert("Employee deleted Successfully");
    Load();
  }

  async function update(event) {
    event.preventDefault();
    try {
      await axios.patch(
        "http://localhost:8000/user/update/" +
          details.find((u) => u._id === _id)._id || _id,
        {
          _id: _id,
          name: name,
          course_name: course_name,
          room: room, 
          time:time,
        }
      );
      alert("Registation Updateddddd");
      setId("");
      setCourse_Name("");
      setRoom("");
      setTime("");
      Load();
    } catch (err) {
      alert(err);
    }
  }

  return (
    <div>
      <h1>Employee Details</h1>
      <div class="container mt-4">
        <form>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              id="_id"
              hidden
              value={_id}
              onChange={(event) => {
                setId(event.target.value);
              }}
            />
            <label>Employee Name</label>
            <select
        className="form-control"
        value={name}
        onChange={handleSelectChange}
      >
        <option value="">Select a course</option>
        {data.DRname.map((option, index) => (
          <option key={index} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
            {/* <select id="mySelect" value={name} onChange={handleSelectChange}>
        <option value="mySelect">Select an option</option>
        {data.DRname.map((professor) => (
                <option value={name}>
                  {professor.name}
                </option>
              ))} 
      </select> */}
            {/* <input
              type="text"
              class="form-control"
              id="name"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            /> */}
          </div>
          {/* <div class="form-group">
            <label>Employee Address</label>
            <input
              type="text"
              class="form-control"
              id="address"
              value={ course_name}
              onChange={(event) => {
                setCourse_Name(event.target.value);
              }}
            />
          </div>

          <div class="form-group">
            <label>Mobile</label>
            <input
              type="text"
              class="form-control"
              id="phone"
              value={room}
              onChange={(event) => {
                setRoom(event.target.value);
              }}
            />
          </div>
          <div class="form-group">
            <label>Mobile</label>
            <input
              type="text"
              class="form-control"
              id="phone"
              value={time}
              onChange={(event) => {
                setTime(event.target.value);
              }}
            />
          </div> */}
          <div>
            <button class="btn btn-primary mt-4" onClick={save}>
              Register
            </button>
            <button class="btn btn-warning mt-4" onClick={update}>
              Update
            </button>
          </div>
        </form>
      </div>

      <table class="table table-dark" align="center">
        <thead>
          <tr>
            <th scope="col">Employee Id</th>
            <th scope="col">Employee Name</th>
            <th scope="col">Employee Address</th>
            <th scope="col">Employee Mobile</th>

            <th scope="col">Option</th>
          </tr>
        </thead>
        {details.map(function fn(employee) {
          return (
            <tbody>
              <tr>
                <th scope="row">{employee._id} </th>
                <td>{employee.name}</td>
                <td>{employee.course_name}</td>
                <td>{employee.room}</td>
                <td>{employee.time}</td>
                <td>
                  <button
                    type="button"
                    class="btn btn-warning"
                    onClick={() => editEmployee(employee)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger"
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
    </div>
  );
}

export default Test;