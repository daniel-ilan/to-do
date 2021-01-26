import React, { Component } from "react";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import Main from "./Main/main";
import Form from "./SignIn/form";
import { ThemeProvider } from "@material-ui/core/styles";
import { create } from "jss";
import rtl from "jss-rtl";
import { StylesProvider, jssPreset } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import theme from "../theme";
import "../App.css";

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

function Application() {
  return (
    <StylesProvider jss={jss}>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Header />
          <Switch>
            <Route exact path="/">
              <Form />
            </Route>
            <Route path="/app">
              <Main />
            </Route>
          </Switch>
          <Footer />
        </div>
      </ThemeProvider>
    </StylesProvider>
  );
}

export default Application;
