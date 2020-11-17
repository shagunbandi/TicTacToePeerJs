import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Game from "./components/Game";
import Filesharer from "./components/FileSharing";

function App() {
  var options = {
    peerjs_key: "your peerjs key",
  };

  return (
    <div className='m-5'>
      {/* <div class='mui-appbar mui--appbar-line-height'>
        <div class='mui-container'>
          <span class='mui--text-headline'>React FileSharer</span>
        </div>
      </div>
      <br />
      <div class='mui-container'>
        <div id='main' class='mui-panel'>
          <Filesharer opts={options} />
        </div>
      </div> */}

      <Game />
      {/* <Router>
        <Switch>
          <Route path='/' component={Game} />
        </Switch>
      </Router> */}
    </div>
  );
}

export default App;
