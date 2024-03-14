import React from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CatalogList from "../../CatalogList/CatalogList";
import { useMode } from "../../../theme";
import { useMediaQuery } from "@mui/material";

const style = {
  position: 'absolute',
  top: '64px',
  left: '50%',
  transform: 'translate(-50%)',
  width: "100%",
  height: "auto",
  bgcolor: 'background.paper',
  boxShadow: 24,
//   p: 1,
  zIndex: 9999,
};

const CatalogMenuModal = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
        
    const [theme] = useMode();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("leftBar"));

    return (

        <Box sx={{padding: "15px"}}>
            <Button onClick={open ? handleClose : handleOpen} variant="contained" sx={{color: "text.black"}}>Catalog</Button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box sx={{bgcolor: "primary.main", padding: "5px", display: "flex", flexDirection: isSmallScreen ? "column" : "row"}}>

                        <Box sx={{width: isSmallScreen ? "100%" : "240px"}}>
                            <CatalogList />
                        </Box>

                        <Box sx={{width: "100%", heigth: "100%", bgcolor: 'red'}}>
                            
                        </Box>
                    </Box>
                    
                    {/* <Typography id="modal-modal-title" variant="h6" component="h2">
                        Text in a modal
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography> */}
                </Box>
            </Modal>
        </Box>
      );
};

export default CatalogMenuModal;