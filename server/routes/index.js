
const AccountRoute = require('./account.route');
const AuthRoute = require('./auth.route');
const PostRoute = require('./post.route');
const videoRoute = require('./video.route');
const likeRoute = require('./like.route');
const notifyRoute = require('./notify.route');
const blockPostRoute = require('./block-post.route');
const commentRoute = require('./comment.route');
const ReplyCommentRoute = require('./reply-comment.route');
const friendRoute = require('./friend.route');
const requestFriendRoute = require('./request-friend.route');
const roomRoute = require('./room.route');
const messageRoute = require('./message.route');
const cloudinaryRoute = require('./cloudinary.route');
const statisticalRoute = require('./statistical.route');
const vnpayRoute = require('./vnpay.route');

function Routes(app) {
    app.use('/api/v1/accounts', AccountRoute)
    app.use('/api/v1/auth', AuthRoute)
    app.use('/api/v1/posts', PostRoute)
    app.use('/api/v1/videos', videoRoute)
    app.use('/api/v1', likeRoute)
    app.use('/api/v1', blockPostRoute)
    app.use('/api/v1', commentRoute)
    app.use('/api/v1',  ReplyCommentRoute)
    app.use('/api/v1/friend', friendRoute)
    app.use('/api/v1/request-friends', requestFriendRoute) 
    app.use('/api/v1/rooms', roomRoute)
    app.use('/api/v1/messages', messageRoute)
    app.use('/api/v1/upload', cloudinaryRoute)
    app.use('/api/v1/', vnpayRoute)
    app.use('/api/v1/notify', notifyRoute)
    app.use('/api/v1/statistical', statisticalRoute)
}

module.exports = Routes;