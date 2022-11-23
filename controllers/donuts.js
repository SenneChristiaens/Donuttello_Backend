const create = (req, res) => {
  const id = req.body.id;
  const email = req.body.email;
  const name = req.body.name;
  res.json({
    status: "success",
    message: `Create donut with = ${id}`,
    data: {
      id: id,
      email: email,
      name: name,
    },
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
