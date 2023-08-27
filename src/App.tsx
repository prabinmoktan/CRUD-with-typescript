import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import { Box, Button, TableBody, TableRow, Typography } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import { useState, useEffect } from "react";
// import { tableInterface } from "./interface/global.interface";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import { TextField } from "@mui/material";
import List from "./components/List";
import AddIcon from "@mui/icons-material/Add";
import * as React from "react";
import { styled, Theme } from "@mui/system";
import { Modal } from "@mui/base/Modal";
import Fade from "@mui/material/Fade";
import * as Yup from "yup"
import { Formik, FormikHelpers, FormikValues, useFormik } from "formik";
import axiosConfig from 'axios'

interface tableInterface {
  phoneNumber: number;
  name: string;
}
const validationSchema = Yup.object({
  name: Yup
    .string("enter your name")
   .min(2, "at least 2 words")
    .required("name is required"),
  phoneNumber: Yup
    .number("enter your phone number")
    .min(10, "phone number should be of 10 digits")
    .required("Phone NUmber is required"),
});

function App() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<tableInterface[]>([]);

  useEffect(() => {
    axios.get("http://localhost:3000/user").then((response) => {
      console.log(response.data);
      setData(response.data);
    });
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const initialValues: tableInterface = { name: "", phoneNumber: "" };

  const Formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values: tableInterface) => {
      console.log(values);
      
     axios({
      method:"POST",
      url:("http://localhost:3000/user"),
      data: data,
      
     })
     .then((res)=>{
      console.log(res)
     })
     

   
    },
  });
  

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

          <Box sx={{ marginTop: "12px" }}>
            <TextField
              label="Search..."
              variant="outlined"
              placeholder="Search..."
              size="small"
            />
            <SearchIcon fontSize="large" />
          </Box>
        </Box>

        <TableContainer sx={{ width: "80%", marginLeft: "8%" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>id</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                {data &&
                  data.map((user: any, index: number) => {
                    return <List user={user} key={index} />;
                  })}
              </TableRow>
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
                  value={Formik.values.name}
                  onChange={Formik.handleChange}
                />
                {Formik.errors.name? <Typography sx={{color:"red"}}>{Formik.errors.name}</Typography>: null}
                <TextField
                  label="Phone Number"
                  size="small"
                  type="number"
                  sx={{ marginTop: "10px" }}
                  name="phoneNumber"
                  id="phoneNumber"
                  value={Formik.values.phoneNumber}
                  onChange={Formik.handleChange}
                />
                {Formik.errors.phoneNumber? <Typography sx={{color:"red"}}>{Formik.errors.phoneNumber}</Typography>: null}
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
                    >
                      Save
                    </Button>
                  </span>
                </Box>
              </form>
              {/* {Formik.errors.name? <p>{Formik.errors.name}</p>: null} */}
            </span>
          </Box>
        </Fade>
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
