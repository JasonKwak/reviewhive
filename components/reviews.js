import React, {useState} from 'react'
import {Row, Column, Image } from '../src/pages/index'
import {ProductBig} from '../src/pages/products/index'
import styled from 'styled-components'


const ReviewCont = styled.div`
display:flex;
flex-direction:column;
padding: 1.5rem 1.25rem;
justify-content:center;
align-items:flex-start;
width:100%;
&:hover {
  background-color: rgba(231,231,231, 0.4);
}
`

const Form = styled.form`
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: flex-start;
width:100%;
`


const ProductSmall = styled.div`
text-align:left;
font-size:1rem;
font-family: 'Quicksand', sans-serif;
color: var(--gray-color);
margin: 0.5rem 0;
`

const ReviewSection = styled.div`
display:flex;
flex-direction:column;
align-items:flex-start;
justify-content:flex-start;
background-color:var(--navy-color);
color:var(--white-color);
width:100%;
padding: 6rem 10rem 4rem 10rem;
border-radius: 7rem 7rem 0 0;
`



export default function Reviews({reviews, productId, products,id}){

    const [openReviewForm, setOpenReviewForm] = useState(false)

    const handleOpenReviewForm = (id) => {
        setOpenReviewForm(!openReviewForm)
    }
    
    return (
      <>
    {reviews && reviews.map((review) => (
        <ReviewCont key={review.id}>

          <Row style={{alignItems:'center', justifyContent:'flex-start'}}>
            <Image src={products.user.image} style={{marginRight:'0.5rem'}}/>
            <ProductSmall style={{color:'var(--white-color)'}}>{review.user.name}</ProductSmall>
          </Row>
          
          <Row style={{justifyContent:'space-between', width:'100%', padding:'0 0 0 5rem'}}>
            <Column style={{alignItems:'flex-start', justifyContent:'flex-start'}}>

              {openReviewForm ?
              <Form onSubmit={handleReview} style={{flexDirection:'row', width:'100%', alignItems:'center', gap:'2rem', marginTop:'2rem'}}>
                <Input style={{marginBottom:'0rem', width:'10%'}} type="number" min="0" max="5" placeholder="Enter review" value={rating} onChange={(e) => setRating(e.target.value)}/>
                <Input style={{marginBottom:'0rem'}} type="text" placeholder="Enter review" value={comment} onChange={(e) => setComment(e.target.value)}/>
                <SmallButton type="submit">Send</SmallButton>
              </Form>
              :
              <>
              <ProductBig style={{fontWeight:'400', color:'var(--white-color)'}}>Rating: {review.rating}/5</ProductBig>
              <ProductBig style={{fontWeight:'400', color:'var(--white-color)', marginTop:'0.5rem'}}>{review.comment}</ProductBig>
              </>
              }

            </Column>
            <Row style={{gap:'2rem'}}>
              <IconCont onClick={deleteReview}>
                <TrashIcon/>
              </IconCont>
              <IconCont>
                <PencilIcon onClick={() => handleOpenReviewForm(review.id)}/>
              </IconCont>
            </Row>
          </Row>

        </ReviewCont>
        
        ))}
      </>
    )
    }

  //   export async function getServerSideProps(context) {

  //     const { productId } = context.query;
  //     // const products = await prisma.product.findUnique({
  //     //   where: { id: Number(productId) },
  //     //   include: { user: true },
  //     // });
  
  //     const reviews = await prisma.review.findMany({
  //         where: { productId: Number(productId) },
  //         include:{ user: true},
  //     });
  
  //     return {
  //         props: {
  //             // products: JSON.parse(JSON.stringify(products)),
  //             reviews: JSON.parse(JSON.stringify(reviews)),
  //         }
  //     }
  // }