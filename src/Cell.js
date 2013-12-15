var __ = require('underscore');

var Cell = function Cell (board, x, y, alive) {
  var neighbourDeltas = [{x: -1 , y: -1}, {x: -1, y:  0}, {x: -1, y:  1}, {x: 0 , y: -1}, {x: 0, y:  1}, {x: 1 , y: -1}, {x: 1, y:  0}, {x: 1, y:  1}];

  this.x = x;
  this.y = y;
  this.alive = alive;

  this.isAlive = function () {
    return alive;
  };

  this.setAlive = function () {
    board.aliveCellsList.push({x: x, y: y});
  };

  this.setDead = function () {
    board.aliveCellsList = __.reject(board.aliveCellsList, board.comparator(x, y));
  };

  this.neighbours = function () {
    return neighbourDeltas.map(function (delta) {
      return board.cellAt(x+delta.x, y+delta.y);
    });
  };

  this.aliveNeighbours = function () {
    return this.neighbours().filter(function (cell) {
      return cell.isAlive();
    });
  };

  this.deadNeighbours = function () {
    return this.neighbours().filter(function (cell) {
      return !cell.isAlive();
    });
  };
};

module.exports = Cell;