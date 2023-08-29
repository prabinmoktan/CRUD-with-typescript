import React, { useState } from "react";
import TableCell from "@mui/material/TableCell";
// import TableRow from "@mui/material/TableRow";
// import { tableInterface } from '../interface/global.interface';
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled, Theme } from "@mui/system";
import { Box } from "@mui/material";
import clsx from "clsx";
import { Modal } from "@mui/base/Modal";
import { Formik } from "formik";
import { useFormik } from "formik";
import axios from "axios";

import { TextField } from "@mui/material";


const List = ({ user, deleteId, setDeleteId }: any) => {
  const [appear, setAppear] = useState<boolean>(false);
  const [updName, setUpdName] = useState<string>("");
  const [updPhoneNumber, setUpdPhoneNumber] = useState<string>("");



  const Formik = useFormik({})


  const handleAppear = () => setAppear(true);
  const handleDisappear = () => setAppear(false);

  const deleteHandler =async() =>{
    const response = await axios.delete(`http://localhost:3000/user/${deleteId}`)
    console.log(response)
  }
  
  
  return (
    <>
   
    
      
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
            onClick={deleteHandler}
          >
            Delete
          </Button>
        </span>
      </TableCell>
      
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
            <Box sx={{marginTop:"10px", display:"flex", justifyContent:"space-around"}}>
              
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
};

export default List;

const Backdrop = React.forwardRef<
  HTMLDivElement,
  { open?: boolean; className: string }
>((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx({ "MuiBackdrop-open": open }, className)}
      ref={ref}
      {...other}
    />
  );
});

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
  width: 400,
  borderRadius: "12px",
  padding: "16px 32px 24px 32px",
  backgroundColor: theme.palette.mode === "dark" ? "#0A1929" : "white",
  boxShadow: `0px 2px 24px ${
    theme.palette.mode === "dark" ? "#000" : "#383838"
  }`,
});
