import Link from 'next/link'
import { FC, memo } from 'react'
import path from '../path'
import styled from 'styled-components'
import { A } from './Typography'

const NavList = styled.ul`
  display: flex;
  list-style: none;
`

const NavItem = styled.li`
  margin-inline: 6px;
`

const Navigation: FC = (props) => {
  return (
    <nav>
      <NavList>
        <NavItem>
          <Link href={path.page.home}>
            <A as="a" transform="uppercase">
              Home
            </A>
          </Link>
        </NavItem>
        <NavItem>
          <Link href={path.page.posts}>
            <A as="a" transform="uppercase">
              Posts
            </A>
          </Link>
        </NavItem>
        <NavItem>
          <Link href={path.page.createPost}>
            <A as="a" transform="uppercase">
              New post
            </A>
          </Link>
        </NavItem>
      </NavList>
    </nav>
  )
}

export default memo(Navigation)
