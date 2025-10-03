import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

const AuthLayout = ({ children, authentication = true }) => {
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(store => store.auth.status)
    const navigate = useNavigate()

    useEffect(() => {

        if (authentication && authStatus !== authentication) {
            navigate('/login')
        } else if (authentication && authStatus) {
            navigate('/')
        }

        setLoader(false)

    }, [authentication, authStatus, navigate])

    return loader ? <h1>Loading...</h1> : <> {children} </> 
}

export default AuthLayout
