import "./App.css";
import Login from "./routes/login";
import "bootstrap/dist/css/bootstrap.min.css";

export default class App {
  render() {
    return (
      <div className="App">
        <Login />
      </div>
    );
  }
}
