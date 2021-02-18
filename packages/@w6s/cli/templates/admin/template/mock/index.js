module.exports = {
  'POST /user/login': function (req, res) {
    return res.json({
      code: 20000,
      data: { token: 'admin-token' },
    });
  },
};
