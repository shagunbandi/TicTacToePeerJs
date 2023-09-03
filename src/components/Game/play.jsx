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

			// First one to complete the puzzle 
			grid[9][midBoxIndex] === '' && checkSuccess(midBoxIndex, smallBoxIndex, 'X', grid, this.props);
		}
	};
	

	render() {
		let isClickable = (midBoxIndex) => !this.props.turn 
			|| this.props.lastClickedSmallBoxIndex === -1
			|| (this.props.turn
			&& this.props.lastClickedSmallBoxIndex === midBoxIndex)
		
		
		let getSmallBox = (midBoxIndex, smallBoxIndex, value) =>
			<div className='small-box-container box'>
				<div
					className={`small-box text-center align-middle 
					${isClickable(midBoxIndex) && this.props.turn && value === ''
						? ' cursor-pointer box-hover'
						: ' cursor-disabled'
					}
					${this.props.turn
					&& this.props.lastClickedSmallBoxIndex === smallBoxIndex
					&& this.props.lastClickedMidBoxIndex === midBoxIndex
					? ' last-clicked' : ''}`}
					onClick={() => this.boxClicked(midBoxIndex, smallBoxIndex)}>
					{value}
				</div>
			</div>
		
		let midGrid = this.props.grid.slice(0, -1).map((midBox, midBoxIndex) => {
			return (
				<div className={`mid-box-container ${
					isClickable(midBoxIndex)
						? 'clickable-box'
						: 'unclickable-box'
				}`}>
					<div className='mid-box'>
					{midBox.map((value, smallBoxIndex) => getSmallBox(midBoxIndex, smallBoxIndex, value))}
					</div>
					<div className='mid-box-success'>
						{this.props.grid[9][midBoxIndex]}
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
				smallIdx: {this.props.lastClickedSmallBoxIndex}
				midIdx: {this.props.lastClickedMidBoxIndex}
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
	lastClickedSmallBoxIndex: state.app.lastClickedSmallBoxIndex,
	lastClickedMidBoxIndex: state.app.lastClickedMidBoxIndex
});

export default connect(mapStateToProps, {
	userPlayed,
	setWinner,
	initialSetup,
	resetToHome,
})(Play);
