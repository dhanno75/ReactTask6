import axios from "axios";
import { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  ListGroup,
  Button,
  ButtonGroup,
} from "react-bootstrap";
import { FaPen, FaEye, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AllUsers = () => {
  // const { students, teachers, dispatch } = useContext(TSContext);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  const getStudents = async () => {
    try {
      const students = await axios.get(
        "https://6375bd527e93bcb006b86ba6.mockapi.io/student"
      );
      setStudents(students.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getTeachers = async () => {
    try {
      const teachers = await axios.get(
        "https://6375bd527e93bcb006b86ba6.mockapi.io/teacher"
      );
      setTeachers(teachers.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getStudents();
    getTeachers();
  }, []);

  const deleteStudent = async (id) => {
    try {
      const data = await fetch(
        `https://6375bd527e93bcb006b86ba6.mockapi.io/student/${id}`,
        {
          method: "DELETE",
        }
      );
      await data.json();
      getStudents();
      toast.warn("Student deleted!");
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTeacher = async (id) => {
    try {
      await axios.delete(
        `https://6375bd527e93bcb006b86ba6.mockapi.io/teacher/${id}`
      );
      getTeachers();
      toast.warn("Teacher deleted!");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {/* Student Data */}
      <Row>
        <h2 className="text-center mt-4 mb-4">Student Data</h2>
        {students.map((student) => {
          return (
            <Col sm={3} key={student.id} className="mt-4 mb-4">
              <Card>
                <Card.Img variant="top" src={student.image} className="img" />
                <Card.Body>
                  <Card.Title className="titleColor">{student.name}</Card.Title>
                </Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item>School - {student.school}</ListGroup.Item>
                  <ListGroup.Item>
                    Total Marks - {student.totalMarks}
                  </ListGroup.Item>
                  <ListGroup.Item>Roll no. - {student.rollNo}</ListGroup.Item>
                </ListGroup>
                <ButtonGroup>
                  <Button
                    variant="warning"
                    onClick={() =>
                      navigate(`/studentAction/${student.id}`, {
                        state: { isView: false },
                      })
                    }
                  >
                    <FaPen size={14} /> Edit
                  </Button>
                  <Button
                    variant="info"
                    onClick={() =>
                      navigate(`/studentAction/${student.id}`, {
                        state: { isView: true },
                      })
                    }
                  >
                    <FaEye size={14} /> View
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => deleteStudent(student.id)}
                  >
                    <FaTrash size={14} /> Delete
                  </Button>
                </ButtonGroup>
              </Card>
            </Col>
          );
        })}
      </Row>
      <hr className="mt-5"></hr>
      {/* Teacher data */}
      <Row>
        <h2 className="text-center mt-4">Teacher Data</h2>
        {teachers.map((teacher) => {
          return (
            <Col sm={3} key={teacher.id} className="mt-4">
              <Card>
                <Card.Img variant="top" src={teacher.image} className="img" />
                <Card.Body>
                  <Card.Title className="titleColor">{teacher.name}</Card.Title>
                </Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    Specialization: {teacher.specialization}
                  </ListGroup.Item>
                  <ListGroup.Item>Email: {teacher.email}</ListGroup.Item>
                </ListGroup>
                <ButtonGroup>
                  <Button
                    variant="warning"
                    onClick={() =>
                      navigate(`/teacherAction/${teacher.id}`, {
                        state: { isView: false },
                      })
                    }
                  >
                    <FaPen size={14} /> Edit
                  </Button>
                  <Button
                    variant="info"
                    onClick={() =>
                      navigate(`/teacherAction/${teacher.id}`, {
                        state: { isView: true },
                      })
                    }
                  >
                    <FaEye size={14} /> View
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => deleteTeacher(teacher.id)}
                  >
                    <FaTrash size={14} /> Delete
                  </Button>
                </ButtonGroup>
              </Card>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default AllUsers;
