var __ = require('underscore');

var Cell = require('./Cell');

function uniquePropHelper (newList, elem) {
  function findComp (cell) {
    return cell.x == elem.x && cell.y == elem.y;
  }
  var found = __.find(newList, findComp) !== undefined;
  if (!found)
    newList.push(elem);
  return newList;
}
function uniqueProperties(list) {
  return list.reduce(uniquePropHelper, []);
}

function cellToPosition (cell) {
  return { x: cell.x, y : cell.y};
}

function Board () {
  var _board = this;
  this.aliveCellsList = [];

  function getAlives (position) { return _board.cellAt(position); }
  function getSurvivings (cell) { return __.contains([2,3], cell.aliveNeighbours().length); }
  function getTwoAlive (cell) { return cell.aliveNeighbours().length === 2; }

  this.cellAt = function (px, py) {
    var x = px.x || px;
    var y = px.y || py;
    return this.findCell(x, y) === undefined ? this.deadCell(x, y) : this.aliveCell(x,y);
  };

  this.deadCell = function (x, y) {
    return new Cell(this, x, y, false);
  };

  this.aliveCell = function (x, y) {
    return new Cell(this, x, y, true);
  };

  this.findCell = function (x, y) {
    return __.find(this.aliveCellsList, this.comparator(x, y));
  };

  this.comparator = function (x, y) {
    return function(cell) {
      return cell.x === x && cell.y === y;
    };
  };

  this.aliveCells = function () {
    return this.aliveCellsList.map(getAlives);
  };

  this.iterate = function () {
    this.aliveCellsList = __.union(this.survivingCells(), this.resurrectedCells());
  };

  this.resurrectedCells = function () {
    return (this.deadCells().filter(getTwoAlive).map(cellToPosition));
  };

  this.survivingCells = function () {
    return this.aliveCells().filter(getSurvivings);
  };

  this.deadCells = function () {
    return uniqueProperties(__.flatten(__.invoke(this.aliveCells(), 'deadNeighbours')));
  };
}

module.exports = Board;