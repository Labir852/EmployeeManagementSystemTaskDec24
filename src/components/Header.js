import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import qteclogo from '../assets/QtecLogo.svg'

const Header = () => {
  return (
    <AppBar position="sticky">
      <Toolbar style={{ background: '#9ABDDC',padding:"10px", textAlign:"center",justifyItems:"center" }}>
        <img src={qteclogo} alt="qtec" style={{marginRight:"10px"}}/>
        <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
          Employee Management System
        </Typography>
        
      </Toolbar>
    </AppBar>
  );
};

export default Header;
