import api from "./api.service.js"
import {registerUser,loginUser,logoutUser,refreshAccessToken,changeUserPassword,getCurrentUser,updateUserAccountDetails,getChannelProfile,watchHistory} from "./user.service.js"
import {addComment,getVideoComments,updateComment,deleteComment} from "./comment.service.js"
import {createTweet,deleteTweet,getUserTweets,updateTweet} from "./tweet.service.js"
import {addVideoToPlaylist,createPlaylist,deletePlaylist,getPlaylistById,getUserPlaylists,removeVideoFromPlaylist} from "./playlist.service.js"
import {toggleCommentLike,toggleVideoLike,getUserLikedVideos} from "./like.service.js"
import {getSubscribedChannels,getUserSubscriptions,toggleSubscription} from "./subscription.service.js"
import {createVideo,deleteVideo,getAllVideos,getVideoById,getUserVideos,updateVideo} from "./video.service.js"

export {
    api,
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeUserPassword,
    getCurrentUser,
    updateUserAccountDetails,
    getChannelProfile,
    watchHistory,
    getVideoComments,
    addComment,
    updateComment,
    deleteComment,
    createTweet,
    deleteTweet,
    getUserTweets,
    updateTweet,
    createVideo,
    deleteVideo,
    getUserVideos,
    getVideoById,
    updateVideo,
    getAllVideos,
    createPlaylist,
    deletePlaylist,
    getUserPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    toggleVideoLike,
    toggleCommentLike,
    getUserLikedVideos,
    toggleSubscription,
    getUserSubscriptions,
    getSubscribedChannels
}
