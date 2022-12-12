const Donut = require("../models/donut");
const jwt = require("jsonwebtoken");

const create = async (req, res) => {
  let donut = new Donut();
  donut.name = req.body.name;
  donut.company = req.body.company;
  donut.companyLogo = req.body.companyLogo;
  donut.email = req.body.email;
  donut.snapshot = req.body.snapshot;
  donut.quantity = req.body.quantity;
  donut.comment = req.body.comment;
  donut.dough = req.body.dough;
  donut.glaze = req.body.glaze;
  donut.topping = req.body.topping;
  donut.toppingColor = req.body.toppingColor;
  donut.save((err, doc) => {
    if (!err) {
      res.json({
        status: "success",
        data: {
          donut: doc,
        },
      });
    }
  });
};

const deleteDonutById = async (req, res) => {
  const id = req.params.id;
  Donut.findByIdAndRemove(id, (err, doc) => {
    if (!err) {
      res.json({
        status: "success",
        data: {
          donut: doc,
        },
      });
    }
  });
};

const updateDonutById = async (req, res) => {
  const id = req.params.id;
  Donut.findByIdAndUpdate(id, req.body, { new: true }, (err, doc) => {
    if (!err) {
      res.json({
        status: "success",
        data: {
          donut: doc,
        },
      });
    }
  });
};

const getDonutById = async (req, res) => {
  const id = req.params.id;
  Donut.findById(id, (err, doc) => {
    if (!err) {
      res.json({
        status: "success",
        data: {
          donut: doc,
        },
      });
    }
  });
};

const getAllDonuts = async (req, res) => {
  Donut.find((err, docs) => {
    if (!err) {
      res.json({
        status: "success",
        data: {
          donuts: docs,
        },
      });
    }
  });
};

module.exports = {
  create,
  deleteDonutById,
  updateDonutById,
  getDonutById,
  getAllDonuts,
};
