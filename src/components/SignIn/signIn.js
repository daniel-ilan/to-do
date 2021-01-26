import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { auth, signInWithGoogle } from "../../firebase";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    justifyContent: "space-evenly",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexWrap: "wrap",
    height: "100%",
  },
  avatar: {
    margin: theme.spacing(),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    minWidth: "75%;",
    maxWidth: "75%",
    justifyContent: "center", // Fix IE 11 issue.
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    width: "50%",
    alignSelf: "center",
  },
  smallText: {
    width: "100%",
  },
  h100: {
    height: "100%",
  },
}));

export default function SignIn(props) {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signInWithEmailAndPasswordHandler = (event, email, password) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email, password).catch((error) => {
      console.error("Error signing in with password and email", error);
    });
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    }
  };

  const handleChange = (e) => {
    props.onSelectRegister(e, 1);
  };

  return (
    <div className={classes.h100}>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h4">
          התחברות
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="dense"
            required
            fullWidth
            id="userEmail"
            label="כתובת מייל"
            name="userEmail"
            value={email}
            onChange={(event) => onChangeHandler(event)}
          />
          <TextField
            variant="outlined"
            margin="dense"
            required
            fullWidth
            name="userPassword"
            value={password}
            label="ססמא"
            type="password"
            id="userPassword"
            onChange={(event) => onChangeHandler(event)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(event) => {
              signInWithEmailAndPasswordHandler(event, email, password);
            }}
          >
            התחברות
          </Button>
          <Button
            type="submit"
            variant="contained"
            mt={4}
            color="secondary"
            className={classes.submit}
            onClick={(event) => {
              signInWithGoogle();
            }}
          >
            התחברות עם גוגל
          </Button>
          <Grid container>
            <Typography
              variant="body2"
              align="center"
              className={classes.smallText}
            >
              אין לך חשבון?
              <Link href="#" variant="body2" onClick={handleChange}>
                {" צור לי משתמש חדש  "}
              </Link>
            </Typography>
          </Grid>
        </form>
      </div>
    </div>
  );
}
