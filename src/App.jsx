import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Itinerary from "./pages/Itinerary";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/itinerary" component={Itinerary} />
      </Switch>
    </div>
    
  );
}

export default App;
