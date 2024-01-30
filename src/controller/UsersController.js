class UsersController {
  new(req, res, next) {
    res.render("users-new");
  }
}

module.exports = UsersController;
