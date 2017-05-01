var db = require('./database/db.js');
var utils = require('./lib/utils.js');

module.exports = {
  Bracket: {
    createBracket: function(req, res) {
      var adminUrl = utils.generateAdminUrl();
      var userUrl = utils.generateUserUrl();
      db.Bracket.create({
        name: req.body.name,
        adminUrl: utils.generateAdminUrl(),
        userUrl: utils.generateUserUrl()
      })
      .then(function(newBracket) {
        res.status(201).send(newBracket);
      })
      .catch(function(err) {
        console.error(err);
        res.status(500).send();
      });
    },
    findAdminBracket: function(req, res) {
      db.Bracket.findOne({where: {adminUrl: req.query.url}})
      .then(function(bracket) {
        res.status(200).send(bracket);
      })
      .catch(function(err) {
        console.error(err);
        res.status(500).send();
      });
    },
    findUserBracket: function(req, res) {
      db.Bracket.findOne({where: {userUrl: req.query.url}})
      .then(function(bracket) {
        res.status(200).send(bracket);
      })
      .catch(function(err) {
        console.error(err);
        res.status(500).send();
      });
    }
  },
  Competitor: {
    createCompetitor: function(req, res) {
      db.Competitor.create({
        bracketId: req.body.bracketId,
        name: req.body.name
      })
      .then(function(newCompetitor) {
        res.status(201).send(newCompetitor);
      })
      .catch(function(err) {
        console.error(err);
        res.status(500).send();
      });
    },
    assignPairs: function(req, res) {
      var competitors = req.body.competitors;
      for (var i = 0; i < competitors.length; i + 2) {
        db.Competitor.findOne({where: {id: competitors[i]}})
        .then(function(competitor) {
          competitor.update({opponent: competitors[i+1]});
        })
        .then(function() {
          return db.Competitor.findOne({where: {id: competitors[i+1]}})
        })
        .then(function(competitor) {
          competitor.update({opponent: competitor[i]})
        })
        .then(function() {
          competitors[i] = false;
          competitors[i+1] = false;
          if (competitors.every(function(item){item === false})) {
            res.status(200).send();
          }
        })
        .catch(function(err) {
          console.error(err);
          res.status(500).send();
        });
      }
    },
    findCompetitor: function(req, res) {
      db.Competitor.findOne({where: {id: req.query.id}})
      .then(function(competitor) {
        res.status(200).send(competitor);
      })
      .catch(function(err) {
        console.error(err);
        res.status(500).send();
      });
    },
    findBracketCompetitors: function(req, res) {
      db.Competitor.findAll({where: {bracketId: req.query.bracketId}})
      .then(function(competitors) {
        res.status(200).send(competitors);
      })
      .catch(function(err) {
        console.error(err);
        res.status(500).send();
      });
    },
    deleteCompetitor: function(req, res) {
      db.Competitor.destroy({where: {id: req.query.id}})
      .then(function(rowAffected) {
        res.status(200).send();
      })
      .catch(function(err) {
        console.error(err);
        res.status(500).send();
      });
    }
  }
};
