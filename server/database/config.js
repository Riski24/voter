var Sequelize = require('sequelize');
var db = null;
if (process.env.DATABASE_URL) {
  db = new Sequelize(process.env.DATABASE_URL);
} else {
  db = new Sequelize('joke_off_local', 'root', '');
}

var Bracket = db.define('brackets', {
	name: Sequelize.STRING,
  adminUrl: {type: Sequelize.STRING, allowNull: false, unique: true},
  userUrl: {type: Sequelize.STRING, allowNull: false, unique: true},
  inProgress: {type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false}
});

var Competitor = db.define('competitors', {
	bracketId: {type: Sequelize.INTEGER, allowNull: false},
  name: {type: Sequelize.STRING, allowNull: false, unique: true},
  wins: {type: Sequelize.INTEGER, allowNull: false, defaultValue: 0},
  opponent: Sequelize.STRING
});

Competitor.belongsTo(Bracket, {foreignKey: 'bracketId'});

module.exports = db;
