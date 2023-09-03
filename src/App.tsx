import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import { Box, Button, TableBody, TableRow, Typography } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import { useState, useEffect } from "react";
import { tableInterface } from "./interface/global.interface";
import axios from "axios";
import { TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import * as React from "react";
import { styled, Theme } from "@mui/system";
import { Modal } from "@mui/base/Modal";
import Fade from "@mui/material/Fade";
import { Form, Formik } from "formik";
import { validationSchema } from "./schemas/ValidationSchemas";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function App() {
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<tableInterface[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [savedData, setSavedData] = useState<number | null>(null);
  const [editName, setEditName] = useState<string>("");
  const [editPhoneNumber, setEditPhoneNumber] = useState<string>("");
  

  const openHandle = async (id: any) => {
    setIsEditing(true);
    setSavedData(id);
    setOpen(true);
    const response = await axios.get(`http://localhost:3000/user/${id}`);
    setEditName(response?.data?.name);
    setEditPhoneNumber(response?.data?.phoneNumber);
  };

  const handleOpen = () => {
    setIsEditing(false);
    setOpen(true);
  };

  const handleClose = () => {
    setIsEditing(false);
    setOpen(false);
  };

  useEffect(() => {
    axios.get("http://localhost:3000/user").then((response) => {
      setData(response.data);
    });
  }, [data]);



  const initialState: tableInterface = {
    name: isEditing ? editName : "",
    phoneNumber: isEditing ? editPhoneNumber : "",
  };

  

  const deleteHandler = (id: any) => {
    event?.preventDefault();
    axios
      .delete(`http://localhost:3000/user/${id}`)
      // .then((res) => {
      //   console.log(res.data);
      // })
      // .catch((err) => {
      //   console.log(err);
      // });
      
  };

  type ResetFormTypes = () => void;

  const onSubmit = async (
    values: tableInterface,
    { resetForm }: { resetForm: ResetFormTypes }
  ) => {
    if (isEditing) {
      const response = await axios.patch(
        `http://localhost:3000/user/${savedData}`,
        values
      );
      setOpen(false);
      console.log(response)
    
      
    } else {
      const response = await axios.post("http://localhost:3000/user", values);
      resetForm();
      setOpen(false);
      console.log(response)
    
    }
  };

  return (
    <>
      <Box sx={{ textAlign: "center" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "80%",
            margin: "auto",
          }}
        >
          <h1>Name Lister</h1>
        </Box>

        <TableContainer sx={{ width: "80%", marginLeft: "8%" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.map((user, index) => (
                  <TableRow key={user.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.phoneNumber}</TableCell>
                    <TableCell>
                      <span>
                        <Button
                          variant="contained"
                          endIcon={<EditIcon />}
                          onClick={() => openHandle(user.id)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          style={{ backgroundColor: "#EC3C5F" }}
                          sx={{ marginLeft: "5%" }}
                          endIcon={<DeleteIcon />}
                          onClick={() => deleteHandler(user.id)}
                        >
                          Delete
                        </Button>
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Button
          variant="contained"
          endIcon={<AddIcon />}
          sx={{ marginTop: "5em" }}
          onClick={handleOpen}
        >
          ADD NAME
        </Button>
      </Box>

      <Formik
        initialValues={initialState}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({values,errors, handleChange }) => {
          return (
            <StyledModal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={open}
              onClose={handleClose}
              closeAfterTransition
              slots={{ backdrop: StyledBackdrop }}
            >
              <Fade in={open}>
                <Box sx={style}>
                  <h2 id="transition-modal-title"> {isEditing ? "Edit Details" : "fill up the form"}</h2>
                  <span
                    id="transition-modal-description"
                    style={{ marginTop: 16 }}
                  >
                    <Form>
                      <TextField
                        label="Name"
                        size="small"
                        sx={{ width: "100%", color: "blue" }}
                        name="name"
                        id="name"
                        autoComplete="off"
                        value={values.name}
                        onChange={handleChange}
                      />
                      {errors.name ? (
                        <Typography sx={{ color: "red" }}>
                          {errors.name}
                        </Typography>
                      ) : null}
                      <TextField
                        label="Phone Number"
                        size="small"
                        type="number"
                        autoComplete="off"
                        sx={{ marginTop: "10px" }}
                        name="phoneNumber"
                        id="phoneNumber"
                        value={values.phoneNumber}
                        onChange={handleChange}
                      />
                      {errors.phoneNumber ? (
                        <Typography sx={{ color: "red" }}>
                          {errors.phoneNumber}
                        </Typography>
                      ) : null}
                      <Box sx={{ margin: "auto", marginTop: "2em" }}>
                        <span>
                          <Button variant="contained" onClick={handleClose}>
                            Cancel
                          </Button>
                          <Button
                            variant="contained"
                            color="success"
                            sx={{ marginLeft: "10px" }}
                            type="submit"
                            // onClick={handleClose}
                          >
                            Save
                          </Button>
                        </span>
                      </Box>
                    </Form>
                  </span>
                </Box>
              </Fade>
            </StyledModal>
          );
        }}
      </Formik>
     
    </>
  );
}

export default App;

const Backdrop = React.forwardRef<HTMLDivElement, { open?: boolean }>(
  (props, ref) => {
    const { open, ...other } = props;
    return (
      <Fade in={open}>
        <div ref={ref} {...other} />
      </Fade>
    );
  }
);




const StyledModal = styled(Modal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = (theme: Theme) => ({
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  borderRadius: "12px",
  padding: "16px 32px 24px 32px",
  backgroundColor: theme.palette.mode === "dark" ? "#0A1929" : "white",
  boxShadow: `0px 2px 24px ${
    theme.palette.mode === "dark" ? "#000" : "#383838"
  }`,
});
