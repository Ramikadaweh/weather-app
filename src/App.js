import "./App.css";
import Login from "./pages/login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WeatherNow from "./pages/weatherNow";
import WeatherExtended from "./pages/weatherExtended";
import ProtectedRoute from "./components/ProtectedRoute";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((user) => user);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />}></Route>
          <Route element={<ProtectedRoute email={user?.email} />}>
            <Route exact path="/weatherNow" element={<WeatherNow />} />
            <Route
              exact
              path="/weatherExtended"
              element={<WeatherExtended />}
            />
            <Route
              exact
              path="/weatherExtended/:id"
              element={<WeatherExtended />}
            />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
