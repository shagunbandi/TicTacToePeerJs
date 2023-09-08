# Tic-Tac-Toe

Multiplayer Super Tic Tac Toe game. All the communications are browser to browser, no server in between. Complete 3 tic tac toes to win.

## Setup

### Clone the project

```
git clone https://github.com/shagunbandi/TicTacToePeerJs
```

### Install Dependencies

```
cd TicTacToePeerJs
npm i
```

### Make a PeerJS Broker

We'll use [PeerServer](https://github.com/peers/peerjs-server) for this. It helps establishing connections between PeerJS clients. Data is not proxied through the server.

Install the package globally and run the server:

```
$ npm install peer -g
$ peerjs --port 9000 --key peerjs --path /myapp
Started PeerServer on ::, port: 9000, path: /myapp (v. 0.3.2)
```

Check it: http://127.0.0.1:9000/myapp It should returns JSON with name, description and website fields.

### Run your code

open two instances of the application

```
npm start
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
