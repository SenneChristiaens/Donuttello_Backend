const Donut = require("../models/donut");

const create = (req, res) => {
  let donut = new Donut();
  donut.name = req.body.name;
  donut.email = req.body.email;
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

const deleteDonutById = (req, res) => {
  const id = req.params.id;
  res.json({
    status: "success",
    message: `Delete donut with = ${id}`,
    data: {
      id: id,
    },
  });
};

const updateDonutById = (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  res.json({
    status: "success",
    message: `Update donut with = ${id}`,
    data: {
      id: id,
      name: name,
    },
  });
};

const getDonutById = (req, res) => {
  const id = req.params.id;
  res.json({
    status: "success",
    message: `Get donut with = ${id}`,
    data: {
      id: id,
      name: "Chocolate",
    },
  });
};

const getAllDonuts = (req, res) => {
  res.json({
    status: "success",
    message: "Get all donuts",
    data: {
      donuts: [
        {
          id: 1,
          name: "Chocolate",
        },
        {
          id: 2,
          name: "Vanilla",
        },
      ],
    },
  });
};

module.exports = {
  create,
  deleteDonutById,
  updateDonutById,
  getDonutById,
  getAllDonuts,
};
