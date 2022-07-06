import "./App.css";
import Login from "./routes/login";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Login />
      </div>
    );
  }
}
