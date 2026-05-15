import React from "react"
import { Link } from "react-router-dom"
import { getAllVideos } from "../services/index.service"
const VideoCard=()=>{
    useEffect(() => {
        getAllVideos().then(res=>{
            console.log(res)
        }).catch(err=>{
            console.log(err)
        })
    }, [])
    return(
        <div>
           {videos.map((video)=>{
            return(
                <div >
                    <Link to={`/videos/${video._id}`}>
                        <img src={video.thumbnail} alt={video.title} />
                        <div>
                            <img src={video.owner.avatar} alt={video.owner.username} />
                            <h1>{video.title}</h1>
                            <p>{video.owner.username}</p>
                            <p>{video.views} views</p>
                            <p>{video.duration}</p>
                        </div>
                        
                    </Link>
                    
                </div>
            )
           })}
        </div>
    )
}

export default VideoCard