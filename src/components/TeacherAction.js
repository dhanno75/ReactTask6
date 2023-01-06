import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Typography } from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";

let intialFormValues = {
  name: "",
  email: "",
  specialization: "",
  image: "",
};

// const ariaLabel = { "aria-label": "description" };

export default function StudentAction() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();
  const [formValues, setFormValues] = useState(intialFormValues);

  const handleChange = (e) => {
    e.preventDefault();
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    // if id exists then update or else create
    if (id) {
      try {
        await axios.put(
          `https://6375bd527e93bcb006b86ba6.mockapi.io/teacher/${id}`,
          formValues
        );
        // To make the input fields empty after submitting the form
        setFormValues(intialFormValues);
        toast.success("Teacher details updated sucessfully!");
        navigate(-1);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await axios.post(
          `https://6375bd527e93bcb006b86ba6.mockapi.io/teacher`,
          formValues
        );
        // To make the input fields empty after submitting the form
        setFormValues(intialFormValues);
        toast.success("Teacher details added sucessfully!");
        navigate(-1);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const updateField = async (id) => {
    try {
      const data = await fetch(
        `https://6375bd527e93bcb006b86ba6.mockapi.io/teacher/${id}`
      );
      const user = await data.json();
      setFormValues(user);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    updateField(id);
  }, [id]);

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "30rem" },
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div>
        <Typography
          variant="h2"
          component="h2"
          className="center"
          color="GrayText"
        >
          Teacher Form
        </Typography>
        <div>
          <TextField
            id="outlined"
            label="Teacher name"
            color="secondary"
            type="text"
            placeholder="Teacher name"
            disabled={state.isView === true ? true : false}
            name="name"
            onChange={handleChange}
            value={formValues.name}
          />
        </div>
        <div>
          <TextField
            id="outlined"
            label="Email"
            type="email"
            color="secondary"
            placeholder="Email"
            disabled={state.isView === true ? true : false}
            name="email"
            value={formValues.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <TextField
            id="outlined"
            label="Specialization"
            color="secondary"
            value={formValues.specialization}
            placeholder="Specialization"
            disabled={state.isView === true ? true : false}
            name="specialization"
            onChange={handleChange}
          />
        </div>
        <div>
          <TextField
            id="outlined"
            label="ImageUrl"
            type="text"
            color="secondary"
            placeholder="Your image url"
            disabled={state.isView === true ? true : false}
            name="image"
            value={formValues.image}
            onChange={handleChange}
          />
        </div>
        <div className="center">
          <ButtonGroup
            variant="contained"
            aria-label="outlined primary button group"
          >
            <Button onClick={() => navigate(-1)}>Back</Button>
          </ButtonGroup>
          &nbsp;&nbsp;&nbsp;
          <ButtonGroup
            variant="contained"
            aria-label="outlined primary button group"
            color="secondary"
          >
            <Button
              onClick={handleSubmit}
              disabled={state.isView === true ? true : false}
            >
              Submit
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </Box>
  );
}
