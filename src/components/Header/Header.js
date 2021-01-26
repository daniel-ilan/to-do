import React from "react";
import AppBar from "@material-ui/core/AppBar";

import CameraIcon from "@material-ui/icons/PhotoCamera";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
}));

function Header() {
  const classes = useStyles();
  return (
    <AppBar position="relative">
      <Toolbar>
        <CameraIcon />
        <Typography
          variant="h6"
          color="inherit"
          noWrap
          className={classes.icon}
        >
          Album layout
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
export default Header;
