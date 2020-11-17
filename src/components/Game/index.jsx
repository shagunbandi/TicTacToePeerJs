import React, { Component } from "react";
import { connect } from "react-redux";

import { initialSetup } from "../../store/actions/appActions";

import Play from "./play";

export class Game extends Component {
  constructor() {
    super();
    this.state = {
      size: 3,
      streak: 3,
      err: "",
      setupDone: false,
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

  onSubmitHandler = (e) => {
    e.preventDefault();
    const { size, streak } = this.state;
    if (size === "" || streak === "") {
      this.setState({ err: "Size and Streak cannot be empty" });
    } else if (parseInt(streak) > parseInt(size)) {
      this.setState({ err: "Streak cannot be greater than size" });
    } else {
      console.log("Success with values", size, streak);
      this.props.initialSetup(size, streak, this.getGrid(size));
      this.setState({ setupDone: true });
    }
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
    if (this.state.setupDone) {
      return <Play />;
    }
    return (
      <div className='row align-items-center'>
        <form onSubmit={(e) => this.onSubmitHandler(e)}>
          <div class='form-group'>
            <label for='exampleInputEmail1'>Size of the grid</label>
            <input
              type='number'
              class='form-control'
              id='size'
              value={this.state.size}
              onChange={this.onSizeChangeHandler}
              placeholder='Enter Size'
            />
          </div>
          <div class='form-group'>
            <label for='exampleInputPassword1'>Streak length</label>
            <input
              type='number'
              class='form-control'
              id='streak'
              value={this.state.streak}
              onChange={this.onStreakChangeHandler}
              placeholder='Length of the Streak'
            />
          </div>
          <button type='submit' class='btn btn-primary'>
            Submit
          </button>
          <small class='form-text text-danger'>{this.state.err}</small>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { initialSetup })(Game);
