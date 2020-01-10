'use strict';

var _models = _interopRequireDefault(require("../models"));

var _Agent = _interopRequireDefault(require("../modelsNoSql/Agent.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let getAgents = (req, res) => {
  _models.default.agents.findAll({}).then(agents => {
    res.status(200).send({
      agents: agents
    });
    agents.forEach(element => {
      console.log(element.AGENT_CODE);

      _Agent.default.findOne({
        agentCode: element.AGENT_CODE
      }, (err, resul) => {
        if (err) return res.status(500).send({
          message: err
        });

        if (!resul) {
          console.log({
            mesagge: 'Insertando datos'
          });
          let A = new _Agent.default();
          A.agentCode = element.AGENT_CODE;
          A.agentName = element.AGENT_NAME;
          A.agentCommission = element.COMMISSION;
          A.save((err, result) => {
            if (err) return res.status(500).send({
              message: err
            });
            console.log(result);
          });
        } else {
          return console.log({
            mesagge: 'No hay nuevos datos'
          });
        }
      });
    });
  }).catch(err => {
    res.status(500).send({
      message: err
    });
  });
};

let getInformationOfAgents = (req, res) => {
  _Agent.default.find((err, agents) => {
    if (err) {
      res.status(500).send({
        message: err
      });
    } else {
      res.status(200).send({
        agents: agents
      });
    }
  });
};

module.exports = {
  getAgents,
  getInformationOfAgents
};