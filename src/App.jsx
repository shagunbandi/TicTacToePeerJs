import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Game from "./components/Game";

function App() {
  return (
    <div className='m-5'>
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
