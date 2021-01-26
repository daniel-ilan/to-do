import React from "react";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import SignIn from "./signIn";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import SignUp from "./singup";
import Box from "@material-ui/core/Box";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  tab: {
    flexGrow: 1,
    maxWidth: "100%",
  },
  h100: {
    height: "100%",
  },
  h90: {
    height: "90%",
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  const { classes } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      className={classes.h90}
    >
      {value === index && <Box className={classes.h100}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = { value: 0, chosenTab: false };
  }

  handleChange(event, newValue) {
    console.log(event, newValue);
    this.setState({ value: newValue, chosenTab: !this.state.chosenTab });
  }

  render() {
    const { classes } = this.props;
    const value = this.state.value;

    return (
      <Grid container className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6}>
          <Tabs
            aria-label="simple tabs example"
            textColor="primary"
            indicatorColor="primary"
            onChange={this.handleChange}
            value={value}
          >
            <Tab
              label="התחברות"
              id="0"
              aria-controls="0"
              className={classes.tab}
            />
            <Tab
              label="הרשמה"
              id="1"
              aria-controls="1"
              className={classes.tab}
            />
          </Tabs>

          <TabPanel
            index={1}
            value={value}
            className={classes.h90}
            classes={classes}
          >
            <SignUp
              index={0}
              value={value}
              onSelectSignUp={this.handleChange}
              className={classes.h100}
            />
          </TabPanel>

          <TabPanel
            index={0}
            value={value}
            className={classes.h90}
            classes={classes}
          >
            <SignIn
              index={0}
              value={value}
              onSelectRegister={this.handleChange}
              className={classes.h100}
            />
          </TabPanel>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Form);
