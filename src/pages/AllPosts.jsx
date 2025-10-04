import React, { useEffect, useState } from 'react'
import { Container, PostCard } from '../components'
import service from '../appwrite/config'
import Postcard from '../components/PostCard'

const AllPosts = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        service.getPosts()
        .then(posts => {
            if (posts) setPosts(posts.rows)
        })
    }, [])

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <Postcard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPosts
