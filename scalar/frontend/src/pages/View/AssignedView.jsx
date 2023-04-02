import React, { useEffect, useState } from "react";
import $ from "jquery";
import { useNavigate } from "react-router-dom";
import {
  PDFDownloadLink,
  Page,
  Text,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import { Button } from "react-bootstrap";

const AssignedView = () => {
  const Navigate = useNavigate();
  const mentorId = localStorage.getItem("Mentor");
  const [students, setStudents] = useState([]);
  const [mentor, setMentor] = useState({});
  useEffect(() => {
    $.post("http://localhost:3001/getAuth", { id: mentorId })
      .done((res) => {
        setMentor(res.data);
      })
      .fail((e) => {
        console.log(e);
      });
    $.post("http://localhost:3001/assignedStudents", {
      mentorId: mentorId,
    }).done((res) => {
      if (res.res === 1) setStudents(res.data);
    });
  }, []);
  const renderStudents = (std, id) => {
    const handleDelete = () => {
      $.post("http://localhost:3001/deleteStudent", {
        studentId: std._id,
        mentorId: mentorId,
      }).done((res) => {
        if (res.res === 11)
          alert("You cannot have less then 3 students in your list");
        else setStudents(res.data);
      });
    };
    const assignMarksPage = () => {
      return Navigate("/assignMarks", { state: { studentId: std._id } });
    };
    const handleSubmit = (event) => {
      event.preventDefault();
      $.post("http://localhost:3001/submitEvaluation", {
        studentId: std._id,
        mentorId: mentorId,
      })
        .done((res) => {
          setStudents(res.data);
        })
        .fail((e) => {
          console.log(e);
        });
    };
    const PDFFile = () => {
      const styles = StyleSheet.create({
        body: {
          paddingTop: 35,
          paddingBottom: 65,
          paddingHorizontal: 35,
        },
        title: {
          fontSize: 24,
          textAlign: "center",
        },
        text: {
          margin: 12,
          fontSize: 14,
          textAlign: "justify",
          fontFamily: "Times-Roman",
        },
        image: {
          marginVertical: 15,
          marginHorizontal: 100,
        },
        header: {
          fontSize: 12,
          marginBottom: 20,
          textAlign: "center",
          color: "grey",
        },
        pageNumber: {
          position: "absolute",
          fontSize: 12,
          bottom: 30,
          left: 0,
          right: 0,
          textAlign: "center",
          color: "grey",
        },
      });
      return (
        <Document>
          <Page style={styles.body}>
            <Text style={styles.title}>Name: {std.name}</Text>
            <Text style={styles.title}>UID: {std.uid}</Text>
            <Text style={styles.title}>Email: {std.email}</Text>
            <Text style={styles.title}>Phone Number: {std.phone}</Text>
            <Text style={styles.title}>Mentor: {mentor.name}</Text>
            <Text style={styles.text}>Ideation: {std.evaluation.ideation}</Text>
            <Text style={styles.text}>
              Execution: {std.evaluation.execution}
            </Text>
            <Text style={styles.text}>
              Presentation: {std.evaluation.presentation}
            </Text>
            <Text style={styles.text}>Viva: {std.evaluation.viva}</Text>
          </Page>
        </Document>
      );
    };
    return (
      <div
        key={id}
        style={{
          width: "250px",
          height: "250px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          margin: "20px",
          border: "1px solid black",
          borderRadius: "20px",
          padding: "10px",
        }}>
        <div style={{ fontSize: "30px" }}>{std.name}</div>
        {!std.evalSubmit && (
          <div>
            <Button
              style={{ margin: "5px" }}
              onClick={handleDelete}
              variant="outline-danger">
              Delete
            </Button>
            <Button
              style={{ margin: "5px" }}
              onClick={assignMarksPage}
              variant="outline-success">
              Assign Marks
            </Button>
            {std && std.evaluation && (
              <Button
                style={{ margin: "5px" }}
                onClick={handleSubmit}
                variant="outline-primary">
                Submit
              </Button>
            )}
          </div>
        )}
        {std.evalSubmit && (
          <PDFDownloadLink filename="Student Report" document={<PDFFile />}>
            <Button variant="outline-secondary">Download Report</Button>
          </PDFDownloadLink>
        )}
      </div>
    );
  };
  return (
    <div>
      <div style={{ fontSize: "30px" }}>Your Students</div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        {students.map(renderStudents)}
      </div>
    </div>
  );
};

export default AssignedView;
