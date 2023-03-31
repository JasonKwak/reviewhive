import styled from "styled-components";
import { useState } from "react";
import Link from "next/link";
import {GrayCont, ProductBig, ProductSmall} from "../src/pages/products/index"
import {prisma} from '../server/db/client'
import { unstable_getServerSession } from "next-auth/next"
import {authOptions} from '../src/pages/api/auth/[...nextauth]'
import { useRouter } from "next/router";

const ProductImageContainer = styled.div`
  width: 300px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color:white;
  margin-bottom: 0.5rem;
`;

const ProductImage2 = styled.img`
width: 100%;
height: auto;
object-fit: cover;
border-radius:5px;
background-color:white;

&:hover { 
  opacity:0.4;
  transition:0.5s ease;
}
`

const ProductOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity:0;
`;

const Link2 = styled(Link)`
text-decoration:none;
`

const List = styled.div`
display: grid;
grid-template-columns: repeat(3, 1fr);
grid-column-gap: 20px;
grid-row-gap: 15px;
justify-items: center;
padding:0;
`

const ProductBox = styled.div`
padding: 2rem 3rem;
border-radius:2rem;
`

const Column = styled.div`
display:flex;
flex-direction:column;
gap:0.25rem;
margin-top:0.5rem;
`

const Row = styled.div`
display:flex;
flex-direction:row;
justify-content:space-between;
`

export default function Products({ products, productId}) {


  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
  const router =  useRouter()

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
        <List>

        {products.map((product) => {
        return (
            <ProductBox key={product.id}>

                <ImageCont>
                <Link2 href={`/products/${product.id}`}>
                <ProductImageContainer>
                    <ProductImage2 src={product.image} alt={product.image} width="300" height="300"/>
                    <ProductOverlay onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{opacity: isHovered ? '1' : '0'}}/>
                </ProductImageContainer>
                </Link2>
                <GraySmall style={{position:'absolute', top:'0', right:'0', margin:'0.5rem 0.75rem'}}>PRODUCT ID #{product.id} </GraySmall>
                </ImageCont>

                
                <ProductInfos>

                <Row style={{alignItems:'flex-start'}}>
                <Link2 href={`/products/${product.id}`}>
                    <ProductBig style={{width:'100%', lineHeight:'1.5rem'}}>{capitalizeFirstLetter(product.product)}</ProductBig>
                </Link2>
                <Price>
                <div style={{fontFamily:"'Heebo'"}}>$</div>
                <ProductBig>{product.price / 100}</ProductBig>
                </Price>
                </Row>

                <Column>
                    <ProductSmall>{capitalizeFirstLetter(product.description)}</ProductSmall>
                    <ProductSmall>{capitalizeFirstLetter(product.brand)}</ProductSmall>
                    <ProductSmall>{capitalizeFirstLetter(product.color)}</ProductSmall>
                </Column>

                <GrayCont>
                    <GraySmall>posted by: {product.user.name}</GraySmall>
                    <GraySmall>created: {product.createdAt.substring(0, 10)} </GraySmall>
                </GrayCont>

                </ProductInfos>

            </ProductBox>
        )
        })}

        </List>
  );
}

export async function getServerSideProps() {
    const products = await prisma.product.findMany({
      include: {
        user: true,
    }} );
  
    return {
      props: {
        products: JSON.parse(JSON.stringify(products)),
      },
    }
  
    const session = await unstable_getServerSession(context.req, context.res, authOptions)
  
    if (!session) {
        return {
            redirect: {
                destination: "/api/auth/signin",
                permanent: false,
            },
        }
    }
    
    return {
        props: { session },
    }
  }
  