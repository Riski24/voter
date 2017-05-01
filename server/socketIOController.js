module.exports = function(io) {
	io.on('connection', function(socket) {
		console.log('connection');

		socket.on('competitorListChange', function() {
			io.emit('competitorListChange')
		});

		socket.on('disconnect', function() {
			console.log('disconnection');
		});
	});
};
