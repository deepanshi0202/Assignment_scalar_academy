import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import $ from "jquery";
import { Button } from "react-bootstrap";

const AssignMarks = () => {
  const Navigate = useNavigate();
  const [name, setName] = useState("");
  const [disable, setDisable] = useState(false);
  const location = useLocation();
  const [evaluation, setEvaluation] = useState({
    ideation: "",
    execution: "",
    presentation: "",
    viva: "",
  });
  const setRes = (res) => {
    setEvaluation({
      ideation: res.data.evaluation.ideation,
      execution: res.data.evaluation.execution,
      presentation: res.data.evaluation.presentation,
      viva: res.data.evaluation.viva,
    });
  };
  useEffect(() => {
    $.post("http://localhost:3001/getStudentData", {
      studentID: location.state.studentId,
    })
      .done((res) => {
        setDisable(res.data.evalSubmit);
        setName(res.data.name);
        if (res.data.evaluation) {
          setRes(res);
        }
      })
      .fail((e) => {
        console.log(e);
      });
  }, []);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setEvaluation((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    $.post("http://localhost:3001/evaluate", {
      evaluation: evaluation,
      studentId: location.state.studentId,
    })
      .done((res) => {
        setRes(res);
        $.post("http://localhost:3001/getStudentData", {
          studentID: location.state.studentId,
        })
          .done((res) => {
            if (res.data.evaluation) {
              setRes(res);
            }
          })
          .fail((e) => {
            console.log(e);
          });
      })
      .fail((e) => {
        console.log(e);
      });
    return Navigate("/assignedStudents");
  };
  const ip = {
    width: "300px",
    margin: "10px",
    padding: "10px",
  };
  return (
    <div>
      <div style={{ fontSize: "30px" }}>Assign Marks to {name}</div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="ideation">
          Ideation :
          <input
            id="ideation"
            style={ip}
            type="number"
            max={10}
            name="ideation"
            placeholder="Ideation"
            value={evaluation.ideation}
            disabled={disable}
            onChange={handleChange}
          />{" "}
        </label>
        <br />
        <label htmlFor="execution">
          Execution :
          <input
            id="execution"
            style={ip}
            type="number"
            max={10}
            name="execution"
            placeholder="Execution"
            value={evaluation.execution}
            disabled={disable}
            onChange={handleChange}
          />{" "}
        </label>
        <br />
        <label htmlFor="presentation">
          Presentation :
          <input
            id="presentation"
            style={ip}
            type="number"
            max={10}
            name="presentation"
            placeholder="Presentation"
            value={evaluation.presentation}
            disabled={disable}
            onChange={handleChange}
          />{" "}
        </label>
        <br />
        <label htmlFor="viva">
          Viva :
          <input
            id="viva"
            style={ip}
            type="number"
            max={10}
            name="viva"
            placeholder="Viva"
            value={evaluation.viva}
            disabled={disable}
            onChange={handleChange}
          />{" "}
        </label>
        <br />
        <Button type="submit" variant="success">
          Save
        </Button>
      </form>
    </div>
  );
};

export default AssignMarks;
