import React, { useState } from "react";
import TableCell from "@mui/material/TableCell";
// import { tableInterface } from '../interface/global.interface';
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
// import { Box } from "@mui/material";
// import { styled, Theme } from "@mui/system";
// import { Modal } from "@mui/base/Modal";
// import Fade from "@mui/material/Fade";
// import { TextField } from "@mui/material";

const List = ({ user }: any) => {
  const [appear, setAppear] = useState(false);
  // const openHandle = () => setAppear(true);
  // const handleClose = () => setAppear(false);
  return (
    <>
      <TableCell>{user.index}</TableCell>
      <TableCell>{user.name}</TableCell>
      <TableCell>{user.phoneNumber}</TableCell>
      <TableCell>
        <span>
          <Button
            variant="contained"
            endIcon={<EditIcon />}
            // onClick={openHandle}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            style={{ backgroundColor: "#EC3C5F" }}
            sx={{ marginLeft: "5%" }}
            endIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </span>
      </TableCell>
      
    </>
  );
};

export default List;

