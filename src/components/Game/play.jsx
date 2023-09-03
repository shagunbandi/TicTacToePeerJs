import React, { Component } from 'react';
import { connect } from 'react-redux';

import { userPlayed, setWinner } from '../../store/actions/appActions';
import { initialSetup, resetToHome } from '../../store/actions/appActions';
import { checkSuccess, getGridPro } from './util';

export class Play extends Component {
	onResetHandler = () => {
		if (!this.props.conn.open) {
			this.props.resetToHome();
			return;
		}
		this.props.initialSetup(
			false,
			getGridPro(),
			this.props.conn
		);
		this.props.conn.send({
			turn: true,
			initialization: true,
		});
	};

	boxClicked = (midBoxIndex, smallBoxIndex) => {
		let grid = this.props.grid;
		if (
			this.props.winner === '' &&
			grid[midBoxIndex][smallBoxIndex] === '' &&
			this.props.turn
		) {
			const turn = this.props.turn;
			grid[midBoxIndex][smallBoxIndex] = turn ? 'X' : 'O';
			let conn = this.props.conn;
			conn.send({ midBoxIndex, smallBoxIndex, turn: true });
			this.props.userPlayed(midBoxIndex, smallBoxIndex, false);
			checkSuccess(midBoxIndex, smallBoxIndex, 'X', grid, this.props);
		}
	};

	render() {
		let getSmallBox = (midBoxIndex, smallBoxIndex, value) =>
			<div className='small-box-container box'>
				<div
				className={`small-box text-center align-middle ${
					this.props.turn && value === ''
						? 'cursor-pointer box-hover'
						: 'cursor-disabled'
				}`}
				onClick={() => this.boxClicked(midBoxIndex, smallBoxIndex)}>
					{value}
				</div>
			</div>
		
		let midGrid = this.props.grid.map((midBox, midBoxIndex) => {
			return (
				<div className={`mid-box-container ${
						!this.props.turn 
						|| (this.props.turn
						&& this.props.lastClickedBoxIndex === midBoxIndex)
						? 'clickable-box'
						: 'unclickable-box'
				}`}>
					<div className={`mid-box ${
						!this.props.turn 
						|| (this.props.turn
						&& this.props.lastClickedBoxIndex === midBoxIndex)
						? 'clickable-box'
						: 'unclickable-box'
					}`}>
					{midBox.map((value, smallBoxIndex) => getSmallBox(midBoxIndex, smallBoxIndex, value))}
					</div>
				</div>
			);
		});

		let grid = <div className='main-grid-container'>
			<div className='main-grid'>
				{midGrid}
			</div>
		</div>

		let message;
		if (this.props.winner === 'draw') {
			message = 'Game Draw';
		} else if (this.props.winner === '') {
			message = (this.props.turn ? 'Your' : `Peer's`) + ' turn to play';
		} else {
			message = (this.props.winner === 'X' ? 'You' : 'Peer') + ' won the game';
		}

		return (
			<>
				{grid}
				<div className='row'>
					<h1>{message}</h1>
				</div>
				<div className='row'>
					<h1 className='text-danger'>{this.props.subtext}</h1>
				</div>

				{this.props.winner ? (
					<button className='btn btn-primary' onClick={this.onResetHandler}>
						Reset
					</button>
				) : (
					''
				)}
			</>
		);
	}
}

const mapStateToProps = (state) => ({
	grid: state.app.grid,
	turn: state.app.turn,
	winner: state.app.winner,
	cnt: state.app.cnt,
	conn: state.app.conn,
	subtext: state.app.subtext,
	lastClickedBoxIndex: state.app.lastClickedBoxIndex
});

export default connect(mapStateToProps, {
	userPlayed,
	setWinner,
	initialSetup,
	resetToHome,
})(Play);
