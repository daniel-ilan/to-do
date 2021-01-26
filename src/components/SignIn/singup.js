import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { auth, generateUserDocument, signInWithGoogle } from "../../firebase";

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
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    minWidth: "75%;",
    maxWidth: "75%",
    justifyContent: "center", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
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

export default function SignUp(props) {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const createUserWithEmailAndPasswordHandler = async (
    event,
    email,
    password
  ) => {
    event.preventDefault();
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      generateUserDocument(user, { displayName, email, password });
    } catch (error) {
      console.log(error);
    }
    setEmail("");
    setPassword("");
    setDisplayName("");
  };
  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;
    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    } else if (name === "displayName") {
      setDisplayName(value);
    }
  };

  const handleChange = (e) => {
    props.onSelectSignUp(e, 0);
  };

  return (
    <div className={classes.h100}>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h4">
          הרשמה
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="dense"
            required
            fullWidth
            id="displayName"
            label="לדוגמא: ישראל ישראלי"
            name="displayName"
            value={displayName}
            onChange={(event) => onChangeHandler(event)}
          />
          <TextField
            variant="outlined"
            margin="dense"
            required
            fullWidth
            id="userEmail"
            value={email}
            label="כתובת מייל"
            name="userEmail"
            onChange={(event) => onChangeHandler(event)}
          />
          <TextField
            variant="outlined"
            margin="dense"
            required
            fullWidth
            name="userPassword"
            label="ססמא"
            type="password"
            id="userPassword"
            autoComplete="current-password"
            value={password}
            onChange={(event) => onChangeHandler(event)}
          />
          <TextField
            variant="outlined"
            margin="dense"
            required
            fullWidth
            name="authPassword"
            label="אישור סיסמה"
            type="password"
            id="authPassword"
            autoComplete="current-password"
            onChange={(event) => onChangeHandler(event)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(event) => {
              createUserWithEmailAndPasswordHandler(event, email, password);
            }}
          >
            הרשמה
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
              כבר נרשמת?
              <Link href="#" variant="body2" onClick={handleChange}>
                {" עבור להתחברות  "}
              </Link>
            </Typography>
          </Grid>
        </form>
      </div>
    </div>
  );
}
