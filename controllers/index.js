const healthcheck = async (req, res) => {
  return res.status(200).send({
    message: `The Server is running in ${process.env.NODE_ENV} environment`,
  });
};

module.exports = { healthcheck };
