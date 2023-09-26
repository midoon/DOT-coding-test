const healthController = (req, res) => {
  return res.status(200).send({
    status: true,
    status_code: 200,
    Message: "Hello Server",
  });
};

module.exports = healthController;
