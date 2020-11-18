import React, { Component } from 'react';
import { connect } from 'react-redux';

import { userPlayed, setWinner } from '../../store/actions/appActions';
import { initialSetup, resetToHome } from '../../store/actions/appActions';
import { checkSuccess, getGrid } from './util';
export class Play extends Component {
	onResetHandler = () => {
		if (!this.props.conn.open) {
			this.props.resetToHome();
			return;
		}
		this.props.initialSetup(
			false,
			this.props.size,
			this.props.streak,
			getGrid(this.props.size),
			this.props.conn
		);
		this.props.conn.send({
			size: this.props.size,
			streak: this.props.streak,
			turn: true,
			initialization: true,
		});
	};

	boxClicked = (rowIndex, colIndex) => {
		let grid = this.props.grid;
		if (
			this.props.winner === '' &&
			grid[rowIndex][colIndex] === '' &&
			this.props.turn
		) {
			const turn = this.props.turn;
			grid[rowIndex][colIndex] = turn ? 'X' : 'O';
			let conn = this.props.conn;
			conn.send({ rowIndex, colIndex, turn: true });
			this.props.userPlayed(rowIndex, colIndex, false);
			checkSuccess(rowIndex, colIndex, 'X', grid, this.props);
		}
	};

	render() {
		let grid = this.props.grid.map((row, rowIndex) => {
			return (
				<div className='row'>
					{row.map((value, colIndex) => {
						return (
							<div
								className={`box text-center align-middle ${
									this.props.turn && value === ''
										? 'cursor-pointer box-hover'
										: 'cursor-disabled'
								}`}
								onClick={() => this.boxClicked(rowIndex, colIndex)}>
								{value}
							</div>
						);
					})}
				</div>
			);
		});

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
	size: state.app.size,
	streak: state.app.streak,
	grid: state.app.grid,
	turn: state.app.turn,
	winner: state.app.winner,
	cnt: state.app.cnt,
	conn: state.app.conn,
	subtext: state.app.subtext,
});

export default connect(mapStateToProps, {
	userPlayed,
	setWinner,
	initialSetup,
	resetToHome,
})(Play);
