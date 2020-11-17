import React, { Component } from "react";
import { connect } from "react-redux";
import Peer from "peerjs";

import { initialSetup } from "../../store/actions/appActions";

import Play from "./play";

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

  sendData = (conn) => {
    if (conn == null) {
      console.log("Null");
    }
    conn.send("Hi");
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
      this.props.initialSetup(size, streak, this.getGrid(size));

      this.setState({ setupDone: true, waiting: true });
      let peer = this.initialize();

      peer.on("connection", (c) => {
        console.log("Connected to: " + c.peer);
        c.on("data", (data) => {
          console.log("Data recieved", data);
        });
        // this.setState({ waiting: false });
      });
    }
  };

  onJoinGameSubmitHandler = (e) => {
    e.preventDefault();
    let conn = null;

    let peer = this.initialize();
    conn = peer.connect(this.state.peerId, {
      host: "127.0.0.1",
      port: "9000",
      path: "/myapp",
      reliable: true,
    });

    conn.on("open", () => {
      conn.on("data", (data) => {
        console.log("Data recieved", data);
      });
    });
  };

  getGrid = (size) => {
    let grid = [];
    for (let index = 0; index < size; index++) {
      grid.push([]);
      for (let index2 = 0; index2 < size; index2++) {
        grid[index].push("");
      }
    }
    return grid;
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
      <div className='container'>
        <div className='row'>
          <h3>Host a new Game</h3>
        </div>
        <br />
        <div className='row'>
          <form onSubmit={(e) => this.onNewGameSubmitHandler(e)}>
            <div className='form-group'>
              <label>Size of the grid</label>
              <input
                type='number'
                className='form-control'
                id='size'
                value={this.state.size}
                onChange={this.onSizeChangeHandler}
                placeholder='Enter Size'
              />
            </div>
            <div className='form-group'>
              <label>Streak length</label>
              <input
                type='number'
                className='form-control'
                id='streak'
                value={this.state.streak}
                onChange={this.onStreakChangeHandler}
                placeholder='Length of the Streak'
              />
            </div>
            <button type='submit' className='btn btn-primary'>
              Start a New Game
            </button>
            <small className='form-text text-danger'>{this.state.err}</small>
          </form>
        </div>
        <hr />
        <div className='row'>
          <h3>Join a Game</h3>
        </div>
        <br />
        <div className='row'>
          <form onSubmit={this.onJoinGameSubmitHandler}>
            <div className='form-group'>
              <label>Peer Id</label>
              <input
                type='text'
                className='form-control'
                id='peerId'
                value={this.state.peerId}
                onChange={this.onPeerIdChangeHandler}
                placeholder='Enter Peer Id'
              />
            </div>
            <button type='submit' className='btn btn-primary'>
              Play a friend
            </button>
            <small className='form-text text-danger'>{this.state.err}</small>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { initialSetup })(Game);
