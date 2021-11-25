const AccessControl = require("accesscontrol");
const ac = new AccessControl();

const roles = (function() {
    ac.grant("user")
     .readOwn("account")
     .updateOwn("account")
     
    ac.grant("admin")
     .extend("user")
     .createOwn("account")
     .readAny("account")
     .updateAny("account")
     .deleteAny("account")
     
    return ac;
    })();

// Exports
module.exports = roles;