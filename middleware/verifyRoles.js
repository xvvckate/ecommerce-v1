const errors = require("http-errors")
const verifyRoles = (...allowedRoles)=>{
    return (req, res, next)=>{
        if(!req?.roles) throw errors.Unauthorized()
        const rolesArray = [ ...allowedRoles ]

        const result = req.roles.map(role=> rolesArray.includes(role)).find(value=> value == true)
        if(!result) throw errors.Unauthorized()
        next()
    }
}

module.exports = verifyRoles
