import React, { Component } from 'react';
import { connect } from 'react-redux';
import Peer from 'peerjs';

import {
	userPlayed,
	initialSetup,
	resetToHome,
	setWinner,
	setSubText,
} from '../../store/actions/appActions';

import Play from './play';
import { checkSuccess, getGridPro } from './util';
export class Game extends Component {
	constructor(props) {
		super();
		props.resetToHome(false, false);
		this.state = {
			peerId: '',
			err: '',
		};
	}

	onPeerIdChangeHandler = (e) => {
		this.setState({
			peerId: e.target.value,
		});
	};

	initialize = () => {
		let peer = new Peer({
			host: '127.0.0.1',
			port: '9000',
			path: '/myapp',
		});

		peer.on('open', (id) => {
			this.setState({ newPeerId: id });
		});
		return peer;
	};

	onDataHandler = (data, conn, initialize) => {
		if (initialize) {
			this.props.initialSetup(
				data.turn,
				getGridPro(),
				conn
			);
			this.props.resetToHome(false, true);
		} else {
			this.props.userPlayed(data.midBoxIndex, data.smallBoxIndex, true);
			checkSuccess(
				data.midBoxIndex,
				data.smallBoxIndex,
				'O',
				this.props.grid,
				this.props
			);
		}
	};

	onCloseHandler = () => {
		this.props.setSubText('Peer Connection Closed');
		if (!this.props.winner) {
			this.props.setWinner('X');
		}
	};

	onNewGameSubmitHandler = (e) => {
		e.preventDefault();
		
		this.props.resetToHome(true, true);
		let peer = this.initialize();

		peer.on('connection', (conn) => {
			conn.on('data', (data) => {
				this.onDataHandler(data, conn, data.initialization);
			});
			conn.on('open', () => {
				conn.send({
					turn: true,
					initialization: true,
				});
			});

			conn.on('close', () => {
				this.onCloseHandler();
			});

			this.props.initialSetup(false, getGridPro(), conn);
			this.props.resetToHome(false, true);
		});

		peer.on('disconnected', () => {
			peer.reconnect();
		});
	};

	onJoinGameSubmitHandler = (e) => {
		e.preventDefault();
		let peer = this.initialize();

		peer.on('open', () => {
			const conn = peer.connect(this.state.peerId, {
				reliable: true,
			});

			conn.on('open', () => {
				conn.on('data', (data) => {
					this.onDataHandler(data, conn, data.initialization);
				});
			});

			conn.on('close', () => {
				this.onCloseHandler();
			});

			conn.on('error', (err) => {
				console.log(err);
			});
		});
	};

	render() {
		if (this.props.waiting) {
			return (
				<div>
					<h3>Waiting for opponenent ...</h3>
					<br />
					<h4>Peer Id is {this.state.newPeerId}</h4>
				</div>
			);
		}
		if (this.props.setupDone) {
			return <Play />;
		}
		return (
			<div className='container'>
				<div className='row'>
					<h3>Host a new Game</h3>
				</div>
				<br />
				<div className='row'>
					<form onSubmit={this.onNewGameSubmitHandler}>
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
					</form>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	grid: state.app.grid,
	winner: state.app.winner,
	waiting: state.app.waiting,
	setupDone: state.app.setupDone,
	cnt: state.app.cnt,
});

export default connect(mapStateToProps, {
	initialSetup,
	userPlayed,
	setWinner,
	resetToHome,
	setSubText,
})(Game);
