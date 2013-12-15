var should = require('should');
var assert = require('assert');

var gol = require('../gol.js');

describe('the board of game of live', function() {
	it('should have a list of alive cells that is empty on default', function() {
		var board = new gol.Board();
		board.aliveCells().should.have.property('length', 0);
	});

	it('should let me set cells that are alive', function() {
		var board = new gol.Board();
		board.cellAt(1, 1).setAlive();
		board.cellAt(1, 1).isAlive().should.be.true;
	});

	it('should let me get a Cell by json', function() {
		var board = new gol.Board();
		board.cellAt(1, 2).setAlive();
		board.cellAt({x: 1, y: 2}).isAlive().should.be.true;
	});

	it('should let me kill cells that are alive', function() {
		var board = new gol.Board();
		board.cellAt(1, 1).setAlive();
		board.cellAt(1, 1).isAlive().should.be.true;
		board.cellAt(1, 1).setDead();
		board.cellAt(1, 1).isAlive().should.be.false;
	});

	it('should let alive cells with less than 2 neighbours die', function() {
		var board = new gol.Board();
		board.cellAt(1, 1).setAlive();
		board.cellAt(1, 2).setAlive();
		board.iterate();
		board.cellAt(1, 1).isAlive().should.be.false;
	});

	it('should let alive cells with two neighbours survive', function() {
		var board = new gol.Board();
		board.cellAt(1, 1).setAlive();
		board.cellAt(1, 2).setAlive();
		board.cellAt(1, 3).setAlive();
		board.iterate();
		board.cellAt(1, 2).isAlive().should.be.true;
	});

	it('should let alive cells with three neighbours survive', function() {
		var board = new gol.Board();
		board.cellAt(1, 1).setAlive();
		board.cellAt(1, 2).setAlive();
		board.cellAt(2, 2).setAlive();
		board.cellAt(1, 3).setAlive();
		board.iterate();
		board.cellAt(1, 2).isAlive().should.be.true;
	});

	it('should give a list of unique dead cells', function() {
		var board = new gol.Board();
		board.cellAt(1, 1).setAlive();
		board.cellAt(1, 2).setAlive();
		board.deadCells().should.have.property('length', 10);
	});

	it('should resurrect a dead cell with exactly two alive neighbours', function() {
		var board = new gol.Board();
		board.cellAt(1, 1).setAlive();
		board.cellAt(1, 3).setAlive();
		board.iterate();
		board.cellAt(1, 2).isAlive().should.be.true;
	});
});

describe('a cell of the game of live', function() {
	it('should have a list of neighbours', function() {
		var board = new gol.Board();
		board.cellAt(1,1).neighbours().should.have.property('length', 8);
	});

	it('should have a list of alive neighbours', function() {
		var board = new gol.Board();
		board.cellAt(1,1).aliveNeighbours().should.have.property('length', 0);
	});

	it('should have a list of dead neighbours', function() {
		var board = new gol.Board();
		board.cellAt(1, 1).deadNeighbours().should.have.property('length', 8);
	})
});
