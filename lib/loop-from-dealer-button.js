
'use strict';

const run = require('./generator-runner');

const getNext = require('./get-nextplayer-index');

const passed = Symbol('passed');
const hasDB = Symbol.for('hasDB');

function* eachFromDB(players, fn){

  let dbIndex = players.findIndex(player => player[hasDB]);
  let i = getNext(dbIndex, players.length);
  let player;

  while (player = players[i], !player[passed]){

    yield fn.call(player, player, i);

    player[passed] = true;
    i = getNext(i, players.length);

  }

  players.forEach(player => delete(player[passed]));

}


exports = module.exports = function(players, fn) {

  return run(eachFromDB, players, fn);

}