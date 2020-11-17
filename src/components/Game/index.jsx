import React, { Component } from "react";
import { connect } from "react-redux";
import Peer from "peerjs";

import { initialSetup } from "../../store/actions/appActions";
import { userPlayed, setWinner } from "../../store/actions/appActions";
import Play from "./play";
import { checkSuccess, getGrid } from "./util";
export class Game extends Component {
  constructor() {
    super();
    this.state = {
      size: 3,
      streak: 3,
      peerId: "",
      err: "",
      setupDone: false,
      waiting: false,
    };
  }

  onSizeChangeHandler = (e) => {
    this.setState({
      size: e.target.value,
      err: "",
    });
  };

  onStreakChangeHandler = (e) => {
    this.setState({
      streak: e.target.value,
      err: "",
    });
  };

  onPeerIdChangeHandler = (e) => {
    this.setState({
      peerId: e.target.value,
    });
  };

  initialize = () => {
    let peer = new Peer({
      host: "127.0.0.1",
      port: "9000",
      path: "/myapp",
    });

    peer.on("open", (id) => {
      this.setState({ newPeerId: id });
    });

    return peer;
  };
  onDataHandler = (data, conn, initialize) => {
    console.log(data);
    if (initialize) {
      this.props.initialSetup(
        data.turn,
        data.size,
        data.streak,
        getGrid(data.size),
        conn
      );
      this.setState({ waiting: false, setupDone: true });
    } else {
      this.props.userPlayed(data.rowIndex, data.colIndex, true);
      checkSuccess(
        data.rowIndex,
        data.colIndex,
        "O",
        this.props.grid,
        this.props
      );
    }
  };
  onCloseHandler = () => {
    console.log("Opponent ass tore down");
    console.log(this.props.winner);
    if (!this.props.winner) this.props.setWinner("X");
  };
  onNewGameSubmitHandler = (e) => {
    e.preventDefault();
    const { size, streak } = this.state;
    if (
      size === "" ||
      streak === "" ||
      parseInt(streak) <= 0 ||
      parseInt(size) <= 0
    ) {
      this.setState({ err: "Size and Streak cannot be empty" });
    } else if (parseInt(streak) > parseInt(size)) {
      this.setState({ err: "Streak cannot be greater than size" });
    } else {
      this.setState({ setupDone: true, waiting: true });
      let peer = this.initialize();

      peer.on("connection", (conn) => {
        conn.on("data", (data) => {
          // console.log("Connection", conn);
          this.onDataHandler(data, conn, data.initialization);
        });
        conn.on("open", () => {
          conn.send({
            size: this.state.size,
            streak: this.state.streak,
            turn: true,
            initialization: true,
          });
        });

        conn.on("close", () => {
          console.log("Connection Closed");
          this.onCloseHandler();
        });

        this.props.initialSetup(false, size, streak, getGrid(size), conn);
        this.setState({ waiting: false });
      });

      peer.on("disconnected", () => {
        peer.reconnect();
      });
    }
  };

  onJoinGameSubmitHandler = (e) => {
    e.preventDefault();
    let peer = this.initialize();

    peer.on("open", () => {
      const conn = peer.connect(this.state.peerId, {
        reliable: true,
      });

      conn.on("open", () => {
        conn.on("data", (data) => {
          this.onDataHandler(data, conn, data.initialization);
        });
      });

      conn.on("close", () => {
        console.log("Connection Closed");
        this.onCloseHandler();
      });

      conn.on("error", (err) => {
        console.log(err);
      });
    });
  };

  render() {
    if (this.state.waiting) {
      return (
        <div>
          <h3>Waiting for opponenent ...</h3>
          <br />
          <h4>Peer Id is {this.state.newPeerId}</h4>
        </div>
      );
    }
    if (this.state.setupDone) {
      return <Play />;
    }
    return (
      <div className="container">
        <div className="row">
          <h3>Host a new Game</h3>
        </div>
        <br />
        <div className="row">
          <form onSubmit={this.onNewGameSubmitHandler}>
            <div className="form-group">
              <label>Size of the grid</label>
              <input
                type="number"
                className="form-control"
                id="size"
                value={this.state.size}
                onChange={this.onSizeChangeHandler}
                placeholder="Enter Size"
              />
            </div>
            <div className="form-group">
              <label>Streak length</label>
              <input
                type="number"
                className="form-control"
                id="streak"
                value={this.state.streak}
                onChange={this.onStreakChangeHandler}
                placeholder="Length of the Streak"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Start a New Game
            </button>
            <small className="form-text text-danger">{this.state.err}</small>
          </form>
        </div>
        <hr />
        <div className="row">
          <h3>Join a Game</h3>
        </div>
        <br />
        <div className="row">
          <form onSubmit={this.onJoinGameSubmitHandler}>
            <div className="form-group">
              <label>Peer Id</label>
              <input
                type="text"
                className="form-control"
                id="peerId"
                value={this.state.peerId}
                onChange={this.onPeerIdChangeHandler}
                placeholder="Enter Peer Id"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Play a friend
            </button>
            <small className="form-text text-danger">{this.state.err}</small>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  grid: state.app.grid,
  size: state.app.size,
  streak: state.app.streak,
  winner: state.app.winner,
});

export default connect(mapStateToProps, {
  initialSetup,
  userPlayed,
  setWinner,
})(Game);
