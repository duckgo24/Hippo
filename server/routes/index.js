
const AccountRoute = require('./account.route');
const AuthRoute = require('./auth.route');
const PostRoute = require('./post.route');
const LikeRoute = require('./like.route');
const commentRoute = require('./comment.route');
const ReplyCommentRoute = require('./reply-comment.route');
const friendRoute = require('./friend.route');
const requestFriendRoute = require('./request-friend.route');
const roomRoute = require('./room.route');
const RoomMessageRoute = require('./room-message.route');

function Routes(app) {
    app.use('/api/v1/accounts', AccountRoute)
    app.use('/api/v1/auth', AuthRoute)
    app.use('/api/v1/posts', PostRoute)
    app.use('/api/v1', LikeRoute)
    app.use('/api/v1', commentRoute)
    app.use('/api/v1',  ReplyCommentRoute)
    app.use('/api/v1/friend', friendRoute)
    app.use('/api/v1/request-friends', requestFriendRoute) 
    app.use('/api/v1/rooms', roomRoute)
    app.use('/api/v1/messages', RoomMessageRoute)
}

module.exports = Routes;