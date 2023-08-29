import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import { Box, Button, TableBody, TableRow, Typography } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import { useState, useEffect } from "react";
import { tableInterface } from "./interface/global.interface";
import axios from "axios";
import { Formik } from "formik";
import { TextField } from "@mui/material";
import List from "./components/List";
import AddIcon from "@mui/icons-material/Add";
import * as React from "react";
import { styled, Theme } from "@mui/system";
import { Modal } from "@mui/base/Modal";
import Fade from "@mui/material/Fade";
// import * as Yup from "yup"
import { useFormik } from "formik";
import { validationSchema } from "./schemas/ValidationSchemas";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// interface tableInterface {
//   phoneNumber: number;
//   name: string;
// }
// const validationSchema = Yup.object({
//   name: Yup
//     .string("enter your name")
//    .min(2, "at least 2 words")
//     .required("name is required"),
//   phoneNumber: Yup
//     .number("enter your phone number")
//     .min(10, "phone number should be of 10 digits")
//     .required("Phone NUmber is required"),
// });

function App() {
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<tableInterface[]>([]);
  const [appear, setAppear] = useState<boolean>(false);

  const handleAppear = () => setAppear(true);
  const handleDisappear = () => setAppear(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    axios.get("http://localhost:3000/user").then((response) => {
      setData(response.data);
    });
  }, [data]);

  const initialValues: tableInterface = { name: "", phoneNumber: "" };

  const Formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values: tableInterface) => {
      const response = await axios.post("http://localhost:3000/user", values);
      console.log(response.data);
      setOpen(false);
    },
  });

  const deleteHandler = (id: any) => {
    event?.preventDefault();
    axios
      .delete(`http://localhost:3000/user/${id}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
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
                          onClick={handleAppear}
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
            <h2 id="transition-modal-title"> fill up the form</h2>
            <span id="transition-modal-description" style={{ marginTop: 16 }}>
              <form onSubmit={Formik.handleSubmit}>
                <TextField
                  label="Name"
                  size="small"
                  sx={{ width: "100%", color: "blue" }}
                  name="name"
                  id="name"
                  autoComplete="off"
                  value={Formik.values.name}
                  onChange={Formik.handleChange}
                />
                {Formik.errors.name ? (
                  <Typography sx={{ color: "red" }}>
                    {Formik.errors.name}
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
                  value={Formik.values.phoneNumber}
                  onChange={Formik.handleChange}
                />
                {Formik.errors.phoneNumber ? (
                  <Typography sx={{ color: "red" }}>
                    {Formik.errors.phoneNumber}
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
              </form>
            </span>
          </Box>
        </Fade>
      </StyledModal>
      <StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={appear}
        onClose={handleDisappear}
        slots={{ backdrop: StyledBackdrop }}
      >
        <Box sx={style}>
          <h2 id="unstyled-modal-title">Edit the details</h2>
          <form onSubmit={Formik.handleSubmit}>
            <TextField
              size="small"
              label="Name"
              name="UpdName"
              onChange={Formik.handleChange}
              // value={Formik.values.UpdName}
            />
            <TextField
              sx={{ marginTop: "5px" }}
              size="small"
              label="Phone Number"
              name="UpdName"
              onChange={Formik.handleChange}
              // value={Formik.values.UpdName}
            />
            <Box
              sx={{
                marginTop: "10px",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <Button variant="contained" color="success">
                Save changes
              </Button>
              <Button variant="contained" onClick={handleDisappear}>
                Cancel
              </Button>
            </Box>
          </form>
        </Box>
      </StyledModal>
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

const blue = {
  200: "#99CCF3",
  400: "#3399FF",
  500: "#007FFF",
};

const grey = {
  50: "#f6f8fa",
  100: "#eaeef2",
  200: "#d0d7de",
  300: "#afb8c1",
  400: "#8c959f",
  500: "#6e7781",
  600: "#57606a",
  700: "#424a53",
  800: "#32383f",
  900: "#24292f",
};

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

const TriggerButton = styled(Button)(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  box-sizing: border-box;
  min-height: calc(1.5em + 22px);
  border-radius: 12px;
  padding: 6px 12px;
  line-height: 1.5;
  background: transparent;
  border: 1px solid ${theme.palette.mode === "dark" ? grey[800] : grey[200]};
  color: ${theme.palette.mode === "dark" ? grey[100] : grey[900]};

  &:hover {
    background: ${theme.palette.mode === "dark" ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === "dark" ? grey[600] : grey[300]};
  }

  &:focus-visible {
    border-color: ${blue[400]};
    outline: 3px solid ${theme.palette.mode === "dark" ? blue[500] : blue[200]};
  }
  `
);
