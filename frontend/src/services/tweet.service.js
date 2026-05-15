import app from "./index.service.js"

const createTweet=async(tweetData)=>{
    return await app.post("/tweets",tweetData)
}

const updateTweet=async(tweetId,tweetData)=>{
    return await app.patch(`/tweets/${tweetId}`,tweetData)
}

const deleteTweet=async(tweetId)=>{
    return await app.delete(`/tweets/${tweetId}`)
}

const getUserTweets=async(userId)=>{
    return await app.get(`/tweets/user/${userId}`)
}

const getAllTweets=async()=>{
    return await app.get("/tweets")
}

export {
    updateTweet,
    createTweet,
    deleteTweet,
    getUserTweets,
    getAllTweets
}