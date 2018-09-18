var config={}

var userRoles = config.userRoles = {
    employee: 1,
    admin: 2
};

config.accessLevels = {
    employee: userRoles.employee | userRoles.admin,    
    admin: userRoles.admin                                    
};



config.allowOnly = function(accessLevel, callback) {
    function checkUserRole(req, res,next) {
        
        var role
        if(req.user.roles=="employee")
            role= config.userRoles.employee
        else if(req.user.roles=="admin")
            role= config.userRoles.admin
        if(!(accessLevel & role)) {
            console.log(accessLevel+" "+role)
            res.sendStatus(403);
            return;
        }

        callback(req, res,next);
    }

    return checkUserRole;
};

config.EmployeeController = {
    index: function(req, res,next) {
        //  if(req.user.status== 403){
        //     console.log("Not Allowed")
        //  }
        console.log(res.statusCode)
         // res.status(200).send();
        next();
    }
};

config.AdminController = {
    index: function(req, res,next) {
        // res.status(200).send();
        console.log(req.statusCode)
        next();
    }
};

// config.parseJwt = function(token) {
//     var base64Url = token.split('.')[1];
//     var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//     return JSON.parse(window.atob(base64));
// };

module.exports= config