import React from 'react'
import Posts from '../Posts/Posts'
import PostShare from '../PostShare/PostShare'
// import ProfileCard from '../ProfileCard.jsx/ProfileCard'
import './PostSide.css'
const PostSide = () => {
  return (
   <div className="PostSide">
       {/* <ProfileCard/> */}
       <PostShare/>
        <Posts/>
   </div>
  )
}

export default PostSide