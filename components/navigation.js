import { useRouter } from 'next/router'
import styled from 'styled-components'
import {Row, Column} from '../src/pages/index'
import { useSession, signIn, signOut } from "next-auth/react"

const Nav = styled.nav`
background-color: var(--black-color);
width:100%;
padding: 1rem 3rem;
margin-bottom:4rem;
display:flex;
flex-direction:row;
justify-content:space-between;
align-items:center;
border-radius:1rem;
box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`

const Ul = styled.ul`
display:flex;
list-style:none;
font-size:0.75rem;
text-decoration:none;
`

const Li = styled.li`
text-decoration:none;
display:flex;
flex-direction:row;
justify-content:space-around;
align-items:center;
border-radius:0.5rem;
`


const Link = styled.a`
text-decoration:none;
color:var(--white-color);
font-family:'Quicksand', sans-serif;
font-weight:700;
margin:0 1.5rem;

&:hover {
    color: var(--yellow-color);
    transition:0.5s ease;
  }
`

const LogoLink = styled.a`
text-decoration:none;
color:var(--white-color);
font-size:1.5rem;
font-family:'Quicksand', sans-serif;
font-weight:500;
`

export const Image = styled.img`
width: 40px;
height:40px;
border-radius:50%;
background-color:var(--yellow-color);
padding:0.25rem;
`


export default function Navigation(){

    const router = useRouter()

    const { data: session } = useSession()

    return (
        <Nav>
            <LogoLink href='/products/'> <img style={{height:'35px'}} src='/hive.png'/></LogoLink>
            <Ul>
                <Li style={{backgroundColor:'var(--darkgray-color)'}}>
                    <Link href="/products">PRODUCTS</Link>
                </Li>
                <Li style={{marginLeft:'4rem'}}>
                    { session ? 
                    <Link href="/profile">
                    <Image src={session.user.image}/>
                    </Link>
                    : <Link href="/profile">
                        <Image src='incognito.png'/>
                    </Link>
                    }
                </Li>
{/* 
                <Li>
                    { session ? 
                    <></>:
                    <Link href="/api/auth/signin">Sign In</Link>

                    }
                </Li> */}
            </Ul>

        </Nav>

    )
}