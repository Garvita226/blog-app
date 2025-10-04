import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import service from '../appwrite/config'
import {Container, Button} from '../components'
import { Link } from 'react-router'
import parse from 'html-react-parser'

const Post = () => {
    const [post, setPost] = useState(null)
    const navigate = useNavigate()
    const slug = useParams()

    const userData = useSelector(store => store.auth.userData)

    const isAuthor = post && userData ? post.userId === userData.userId : false

    useEffect(() => {
        service.getPost(slug)
        .then(post => {
            if (post) setPost(post)
            else navigate('/')
        })
    }, [slug, navigate])

    const deletePost = async () => {
        const status = service.deletePost(slug)

        if (status) {
            service.deleteFile(post.featuredImage)
            navigate('/')
        }
    }

  return post ? (
    <div className='py-8'>
        <Container>
            <div className='w-full flex justify-center mb-4 relative border rounded-xl p-2'>
                <img src={service.getFilePreview(post.featuredImage)} 
                alt={post.title}
                className='rounded-xl' />

                { isAuthor && (
                    <div className='absolute right-6 top-6'>
                        <Link to={`/edit-post/${post.$id}`}>
                            <Button bgColor='bg-green-500' className='mr-3'>
                                Edit
                            </Button>
                        </Link>

                        <Button bgColor='bg-red-500' onClick={deletePost}>
                            Delete
                        </Button>
                    </div>
                ) }
            </div>

            <div className='w-full mb-6'>
                <h1 className='text-2xl font-bold'>{post.title}</h1>
            </div>
            <div className='browser-css'>
                {parse(post.content)}
            </div>
        </Container>
    </div>
  ) : null
}

export default Post
