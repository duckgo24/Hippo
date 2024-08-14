
const AccountRoute = require('./account.route');
const AuthRoute = require('./auth.route');
const PostRoute = require('./post.route');
const LikeRoute = require('./like.route');

function Routes(app) {
    app.use('/api/v1/accounts', AccountRoute)
    app.use('/api/v1/auth', AuthRoute)
    app.use('/api/v1/posts', PostRoute)
    app.use('/api/v1/', LikeRoute)
}

module.exports = Routes;