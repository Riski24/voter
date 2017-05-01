var db = require('./config.js');

db.sync();

exports.Bracket = db.models.brackets;
exports.Competitor = db.models.competitors;
