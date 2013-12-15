var tap = require("tap"),
		test = tap.test;

var gol = require('../gol.js');

test('the board of game of live', function (t) {
	t.test('should have a list of alive cells that is empty on default', function (t) {
		var board = new gol.Board();
		t.equal(board.aliveCells().length, 0);
		t.end();
	});

	t.test('should let me set cells that are alive', function (t) {
		var board = new gol.Board();
		board.cellAt(1, 1).setAlive();
		t.ok(board.cellAt(1, 1).isAlive());
		t.end();
	});

	t.test('should let me get a Cell by json', function (t) {
		var board = new gol.Board();
		board.cellAt(1, 2).setAlive();
		t.ok(board.cellAt({x: 1, y: 2}).isAlive());
		t.end();
	});

	t.test('should let me kill cells that are alive', function (t) {
		var board = new gol.Board();
		board.cellAt(1, 1).setAlive();
		t.ok(board.cellAt(1, 1).isAlive());
		board.cellAt(1, 1).setDead();
		t.equal(board.cellAt(1, 1).isAlive(), false);
		t.end();
	});

	t.test('should let alive cells with less than 2 neighbours die', function (t) {
		var board = new gol.Board();
		board.cellAt(1, 1).setAlive();
		board.cellAt(1, 2).setAlive();
		board.iterate();
		t.equal(board.cellAt(1, 1).isAlive(), false);
		t.end();
	});

	t.test('should let alive cells with two neighbours survive', function (t) {
		var board = new gol.Board();
		board.cellAt(1, 1).setAlive();
		board.cellAt(1, 2).setAlive();
		board.cellAt(1, 3).setAlive();
		board.iterate();
		t.ok(board.cellAt(1, 2));
		t.end();
	});

	t.test('should let alive cells with three neighbours survive', function (t) {
		var board = new gol.Board();
		board.cellAt(1, 1).setAlive();
		board.cellAt(1, 2).setAlive();
		board.cellAt(2, 2).setAlive();
		board.cellAt(1, 3).setAlive();
		board.iterate();
		t.ok(board.cellAt(1, 2).isAlive());
		t.end();
	});

	t.test('should give a list of unique dead cells', function (t) {
		var board = new gol.Board();
		board.cellAt(1, 1).setAlive();
		board.cellAt(1, 2).setAlive();
		t.equal(board.deadCells().length, 10);
		t.end();
	});

	t.test('should resurrect a dead cell with exactly two alive neighbours', function (t) {
		var board = new gol.Board();
		board.cellAt(1, 1).setAlive();
		board.cellAt(1, 3).setAlive();
		board.iterate();
		t.ok(board.cellAt(1, 2).isAlive());
		t.end();
	});
});

test('a cell of the game of live', function (t) {
	t.test('should have a list of neighbours', function (t) {
		var board = new gol.Board();
		t.equal(board.cellAt(1,1).neighbours().length, 8);
		t.end();
	});

	t.test('should have a list of alive neighbours', function (t) {
		var board = new gol.Board();
		t.equal(board.cellAt(1,1).aliveNeighbours().length, 0);
		t.end();
	});

	t.test('should have a list of dead neighbours', function (t) {
		var board = new gol.Board();
		t.equal(board.cellAt(1, 1).deadNeighbours().length, 8);
		t.end();
	});
});
