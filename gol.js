var __ = require('underscore');

var uniqueProperties = function uniqueProperties(list) {
	return __.reduce(list, function(newList, elem) {
		var found = __.find(newList, function(cell) {
			return cell.x == elem.x && cell.y == elem.y;
		}) != undefined;
		if(!found) 
			newList.push(elem);
		return newList;
	}, []);
}


var Board = function Board() {
	var _board = this;
	this.aliveCellsList = [];

	this.cellAt = function cellAt(px, py) {
		var x = px.x || px;
		var y = px.y || py;
		return this.findCell(x, y) == undefined ? this.deadCell(x, y) : this.aliveCell(x,y);
	};

	this.deadCell = function deadCell(x, y) {
		return new Cell(this, x, y, false);
	};

	this.aliveCell = function aliveCell(x, y) {
		return new Cell(this, x, y, true);
	}

	this.findCell = function findCell(x, y) {
		return __.find(this.aliveCellsList, this.comparator(x, y));
	}

	this.comparator = function comparator(x, y) {
		return function(cell) {
			return cell.x == x && cell.y == y;
		};
	};

	this.aliveCells = function aliveCells() {
		return __.map(this.aliveCellsList, function(position) {
			return _board.cellAt(position);
		})
	}	

	this.iterate = function iterate() {
		this.aliveCellsList = __.union(this.survivingCells(), this.resurrectedCells());
	};

	this.resurrectedCells = function resurrectedCells() {
		return __.map(__.filter(this.deadCells(), function(cell) {
			return cell.aliveNeighbours().length == 2;
		}), cellToPosition);
	}

	this.survivingCells = function survivingCells() {
		return __.filter(this.aliveCells(), function(cell) {
			return __.contains([2,3], cell.aliveNeighbours().length);
		});
	};

	this.deadCells = function deadCells() {
		return uniqueProperties(__.flatten(__.invoke(this.aliveCells(), 'deadNeighbours')));
	}

	var cellToPosition = function cellToPosition(cell) {
		return { x: cell.x, y : cell.y};
	}
};

var Cell = function Cell(board, x, y, alive) {
	var neighbourDeltas = [{x: -1 , y: -1}, {x: -1, y:  0}, {x: -1, y:  1}, {x: 0 , y: -1}, {x: 0, y:  1}, {x: 1 , y: -1}, {x: 1, y:  0}, {x: 1, y:  1}];

	this.x = x;
	this.y = y;
	this.alive = alive;

	this.isAlive = function isAlive() {
		return alive;
	};

	this.setAlive = function setAlive() {
		board.aliveCellsList.push({x: x, y: y})
	};

	this.setDead = function setDead() {
		board.aliveCellsList = __.reject(board.aliveCellsList, board.comparator(x, y));	
	}

	this.neighbours = function neighbours() {
		return __.map(neighbourDeltas, function(delta) {
			return board.cellAt(x+delta.x, y+delta.y);
		});
	}

	this.aliveNeighbours = function aliveNeighbours() {
		return __.filter(this.neighbours(), function(cell) {
			return cell.isAlive();
		});
	}

	this.deadNeighbours = function deadNeighbours() {
		return __.filter(this.neighbours(), function(cell) {
			return !cell.isAlive();
		});
	}
}


exports.Board = Board;
exports.Cell = Cell;