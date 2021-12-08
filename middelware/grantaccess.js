
const AccessControl = require("accesscontrol");
const ac = new AccessControl();

const roles = (function () {
  ac.grant("user")
    .readOwn("account")
    .updateOwn("account")
    .createOwn("account")
    .deleteOwn("account")
  ac.grant("admin")
    .extend("user")
    .readAny("account")
    .createAny("account")
    .updateAny("account")
    .deleteAny("account")
    .readAny("users")
    .createAny("users")
    .updateAny("users")
    .deleteAny("users")

  return ac;
})();


const grantAccess = function (action, resource) {
  return async (req, res, next) => {
    try {
      const permission = roles.can(req.user.role)[action](resource);
      if (!permission.granted) {
        return res.status(401).json({
          error: "You don't have enough permission to perform this action"
        });
      }
      next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

// Exports
module.exports = grantAccess;