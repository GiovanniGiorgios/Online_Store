import React from "react";
import { Box, Button, Typography, Divider } from "@mui/material";

const BlockWelcome = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
            <Typography sx={{ textAlign: 'center', fontFamily: 'Arial', fontSize: '20px', fontWeight: 'bold' }}>
                Welcome!
            </Typography>
            <Typography sx={{ textAlign: 'center', fontFamily: 'Arial', fontSize: '16px' }}>
                Log in to receive recommendations, personal bonuses and discounts.
            </Typography>
            <Button variant="contained" color="primary" sx={{fontSize: "10px",  backgroundColor: '#00B0FF', '&:hover': { backgroundColor: '#0081CB' } }}>
                Enter your personal account
            </Button>

            <Divider sx={{width: '100%', marginTop: "20px"}} />
        </Box>
    );
};

export default BlockWelcome;