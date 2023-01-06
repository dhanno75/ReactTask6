import { BrowserRouter, Routes, Route } from "react-router-dom";
import ManagementAppBar from "./components/ManagementAppBar";
import Home from "./components/Home";
import StudentAction from "./components/StudentAction";
import TeacherAction from "./components/TeacherAction";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <ManagementAppBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/studentAction" element={<StudentAction />} />
          <Route path="/studentAction/:id" element={<StudentAction />} />
          <Route path="/teacherAction" element={<TeacherAction />} />
          <Route path="/teacherAction/:id" element={<TeacherAction />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
