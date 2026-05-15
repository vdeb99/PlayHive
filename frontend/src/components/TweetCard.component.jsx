import React from "react";
import { useNavigate } from "react-router-dom";
import { getAllTweets } from "../services/index.service";
import { useEffect } from "react";
const TweetCard=()=>{
    const navigate=useNavigate()
    const [tweets,setTweets]=useState([])
    useEffect(() => {
        getAllTweets().then(res=>{
            setTweets(res.data)
        }).catch(err=>{
            console.log(err)
        })
    }, [])
    return(
        <div>
            
            {tweets.map((tweet)=>{
                return( 
                    <Link to={`tweets/${tweet._id}`}>
                    <div key={tweet._id}>
                        <h1>{tweet.owner.username}</h1>
                        <p>{tweet.content}</p>
                        <p>{tweet.createdAt}</p>
                        <p>{tweet.likesCount}</p>
                        <p>{tweet.isLikedByCurrentUser}</p>
                        <p>{tweet.isRetweetedByCurrentUser}</p>
                        <p>{tweet.isBookmarkedByCurrentUser}</p>
                    </div>
                    </Link>
                )
            })}
                    
        </div>
    )
}

export default TweetCard