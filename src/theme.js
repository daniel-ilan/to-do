import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  direction: "rtl",
  typography: {
    fontFamily: [
      "'Rubik'",
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
  },
  spacing: 2,
});

export default theme;
