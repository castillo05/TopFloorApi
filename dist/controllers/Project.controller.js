'use strict';

var _Project = _interopRequireDefault(require("../modelsNoSql/Project.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let projectStore = (req, res) => {
  let P = new _Project.default();
  P.nameProject = req.body.nameProject;
  P.description = req.body.description;
  P.save((err, project) => {
    if (err) return res.status(500).send({
      message: err
    });
    res.status(201).send({
      project: project
    });
  });
};

let getProjects = (req, res) => {
  _Project.default.find((err, projects) => {
    if (err) return res.status(500).send({
      message: err
    });
    res.status(301).send({
      projects: projects
    });
  });
};

let getProject = (req, res) => {
  let id = req.params.id;

  _Project.default.findById(id, (err, project) => {
    if (err) return res.status(500).send({
      message: err
    });
    res.status(301).send({
      project: project
    });
  });
};

let updateProject = (req, res) => {
  let id = req.params.id;
  let data = req.body;
  if (!data) return res.status(204).send({
    message: 'No hay datos que actualizar'
  });

  _Project.default.findByIdAndUpdate(id, data, (err, project) => {
    if (err) return res.status(500).send({
      message: err
    });
    res.status(200).send({
      project: project,
      message: 'Projecto actualizado con exito!'
    });
  });
};

let deleteProject = (req, res) => {
  let id = req.params.id;

  _Project.default.findByIdAndRemove(id, (err, project) => {
    if (err) return res.status(500).send({
      message: err
    });

    if (!project) {
      res.status(200).send({
        message: 'Projecto no encontrado'
      });
    } else {
      res.status(200).send({
        project: project,
        message: 'Projecto eliminado con exito!'
      });
    }
  });
};

module.exports = {
  projectStore,
  getProjects,
  getProject,
  updateProject,
  deleteProject
};