
const AccountRoute = require('./account.route')

function Routes(app) {
    app.use('/api/v1/account', AccountRoute)
}

module.exports = Routes;