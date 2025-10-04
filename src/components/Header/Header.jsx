import React from 'react'
import { Logo, Container, LogoutBtn } from '../index.js'
import { Links, useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { Link } from 'react-router'

const Header = () => {
  const authStatus = useSelector(store => store.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: true
    },
    {
      name: 'Login',
      slug: '/login',
      active: !authStatus
    },
    {
      name: 'Signup',
      slug: '/signup',
      active: !authStatus
    },
    {
      name: 'All Posts',
      slug: '/all-posts',
      active: authStatus
    },
    {
      name: 'Add Post',
      slug: '/add-post',
      active: authStatus
    },
  ]

  return (
    <header>
      <Container>
        <nav className='flex items-center'>
          <div className='mr-4'>
            <Link to='./'>
              <Logo width='70px' />
            </Link>
          </div>
          <ul className='flex'>
            {navItems.map(item =>
              item.active ? (
                <li key={item.name}
                  onClick={() => navigate(item.slug)}
                  className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full cursor-pointer' >{item.name}</li>
              ) : null
            )}
            {authStatus && (
              <li> <LogoutBtn /> </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header
