import React, { useEffect, useState } from "react";
import $ from "jquery";
// import Card from "../../components/Card";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const View = () => {
  const Navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const id = localStorage.getItem("Mentor");
  useEffect(() => {
    $.post("http://localhost:3001/getAuth", { id: id })
      .done((res) => {
        console.log(res);
        setUser({
          name: res.data.name,
          email: res.data.email,
          phone: res.data.phone,
        });
      })
      .fail((e) => {
        console.log(e);
      });
    $.get("http://localhost:3001/getStudents")
      .done((res) => {
        setStudents(res.data);
      })
      .fail((e) => {
        console.log(e);
      });
  }, []);
  const filterStudents = () => {
    const sorted = students.filter((st) => st.mentorAssigned);
    const sorted2 = students.filter((st) => !st.mentorAssigned);
    setStudents([...sorted, ...sorted2]);
  };
  const studentsRender = (std, key) => {
    const assignMentor = () => {
      console.log(std);
      if (std.mentorAssigned)
        return alert("Mentor Already Assigned to this student");
      $.post("http://localhost:3001/assignMentor", {
        studentId: std._id,
        mentorId: id,
      })
        .done((res) => {
          if (res.res === 1) setStudents(res.data);
          else if (res.res === 11)
            alert("Assigned students are full...Cant add anymore");
        })
        .fail((e) => {
          console.log(e);
        });
    };
    return (
      <tr key={key} onClick={assignMentor} style={{ cursor: "pointer" }}>
        <td>{std.uid}</td>
        <td>{std.name}</td>
        <td>{std.email}</td>
        <td>
          {std.mentor ? (
            <div style={{ color: "green" }}>{std.mentorName}</div>
          ) : (
            <div style={{ color: "red" }}>Unassigned</div>
          )}
        </td>
      </tr>
    );
  };
  return (
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}>
      <div style={{ fontSize: "50px" }}>All Students</div> <br />
      <Button
        style={{ margin: "10px" }}
        variant="secondary"
        onClick={() => {
          return Navigate("/assignedStudents");
        }}>
        Your Students
      </Button>
      <Button
        style={{ marginBottom: "80px !important" }}
        variant="outline-info"
        onClick={filterStudents}>
        Filter
      </Button>
      <br />
      <Table
        style={{ textAlign: "left", width: "80vw" }}
        striped
        bordered
        hover>
        <thead>
          <tr>
            <th>UID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mentor</th>
          </tr>
        </thead>
        <tbody>{students.map(studentsRender)}</tbody>
      </Table>
    </div>
  );
};

export default View;
