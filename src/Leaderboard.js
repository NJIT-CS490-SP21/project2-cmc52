import React from 'react';
// import { ListItem } from './ListItem.js'
import { useState } from 'react';
import { Username } from './Username';
import { socket } from './App';
// import io from 'socket.io-client';

export function Leaderboard() {
  const [leaderboard, setLeader] = useState([]);
  const [leaderboardDisplay, setDisplay] = useState(<div />);
  const [boardOn, setOn] = useState('off');
  const [loggedUser, setUser] = useState();

  function showLeaderboard() {
    if (boardOn === 'off') {
      setOn((prevOn) => prevOn = 'on');
      setDisplay((prevDisplay) => prevDisplay = (
        <table className="table table-bordered table-dark table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Username</th>
              <th scope="col">Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((player, index) => <Username username={player.username} score={player.score} userLogged={loggedUser.username} index={index + 1} />)}
          </tbody>
        </table>
      ));
    } else if (boardOn === 'on') {
      setOn((prevOn) => prevOn = 'off');
      setDisplay((prevDisplay) => prevDisplay = <div />);
    }
    console.log('here');
  }
  socket.on('player_joined', (data) => { // { sid: socket.id, username : username, num_players: num_players, two_players: [], players: [{sid: sid, user: user}], display_lst : display_lst, leaderboard : [{username: username, score: score}]}
    // console.log(data);
    // console.log(player_lst.length);
    if (data !== undefined) {
      setLeader((prevLeader) => prevLeader = data.leaderboard); // leaderboard
      if (socket.id === data.sid) {
        setUser((prevUser) => prevUser = { sid: socket.id, username: data.username });
      }
      if (boardOn === 'on') { // updates board if showing on screen
        setDisplay((prevDisplay) => prevDisplay = (
          <table className="table table-hover table-dark table-bordered">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Username</th>
                <th scope="col">Score</th>
              </tr>
            </thead>
            <tbody>
              {data.leaderboard.map((player, index) => <Username username={player.username} score={player.score} userLogged={loggedUser.username} index={index + 1} />)}
            </tbody>
          </table>
        ));
      }
    }
  });

  socket.on('game_over', (data) => {
    if (data !== undefined) {
      setLeader((prevLeader) => prevLeader = data.leaderboard); // leaderboard
      if (boardOn === 'on') { // updates board if showing on screen
        setDisplay((prevDisplay) => prevDisplay = (
          <table className="table table-hover table-dark table-bordered">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Username</th>
                <th scope="col">Score</th>
              </tr>
            </thead>
            <tbody>
              {data.leaderboard.map((player, index) => <Username username={player.username} score={player.score} userLogged={loggedUser.username} index={index + 1} />)}
            </tbody>
          </table>
        ));
      }
    }
  });
  return (
    <div className="card mx-auto border-0">
      <button className="btn mb-4" onClick={showLeaderboard}>Show Leaderboard</button>
      { leaderboardDisplay }

    </div>
  );
}
