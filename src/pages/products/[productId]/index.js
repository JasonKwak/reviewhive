import { useState, useEffect } from "react";
import axios from "axios";
import { prisma } from "../../../../server/db/client";
import { useRouter } from "next/router";
import styled from "styled-components";
import { Button } from "@/pages/addProduct";
import Head from "next/head";
import { Wrapper, Row, Column, Price } from "../../index";
import Navigation from "../../../../components/navigation";
import { Image } from "../../../../components/navigation";
import { UserProfile } from "../../index";
import { ProductBig, GraySmall} from '../index'
import { SmallButton } from "@/pages/profile";
import { ArrowLeftIcon, TrashIcon, PencilIcon } from '@heroicons/react/24/solid'

const Modal = styled.div`
position:fixed;
top:50%;
width:400px;
height:150px;
padding:1.5rem 2rem;
border-radius:1rem;
background-color:var(--white-color);
color:var(--black-color);
box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
display:flex;
justify-content:space-evenly;
align-items:center;
flex-direction:column;
z-index:6;
`

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
const IconCont2 = styled.div`
width:20px;
`

const Label = styled.label`
font-size:0.75rem;
color:var(--gray-color);
font-family:'Heebo';
`

const UserProfileCont = styled.div`
padding:0.8rem 1.5rem;
position:fixed;
background-color:var(--black-color);
color:var(--black-color);
display:flex;
box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
align-items:flex-start;
flex-direction:column;
border-radius:1.5rem 0 0 1.5rem;
gap:0.25rem;
bottom:0;
right:0;
margin-bottom:3rem;
`

const ButtonCont = styled.div`
display:flex;
flex-direction:row;
gap:1rem;
align-items:flex-end;
justify-content:flex-start;
width:100%;
`

const Input = styled.input`
padding: 0.5rem;
border: 1px solid #666;
width:70%;
margin-bottom:0.5rem;
outline:1px solid var(--black-color);
border:none;
border-radius:1rem;
margin: 0.25rem 0;
&:focus {
  outline:1px dashed var(--yellow-color);
  transition:0.3s ease;
}
`

const ProductSmall = styled.div`
text-align:left;
font-size:1rem;
font-family: 'Quicksand', sans-serif;
color: var(--gray-color);
margin: 0.5rem 0;
`

const Form = styled.form`
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: flex-start;
width:100%;
`

const ProductImageCont = styled.div`
  width: 600px;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color:white;
  margin-bottom: 0.5rem;
  padding:2rem;
  z-index:3;
`;

const ProductImage2 = styled.img`
width: 100%;
height: auto;
object-fit: cover;
border-radius:5px;
background-color:white;
&:hover {
  transform: scale(1.1);

  transition:0.5s;
}
`

const ProductDetailCont = styled.div`
display: flex;  
flex-direction: row;
width:100%;
height:500px;
justify-content: space-between;
align-items: flex-start;
gap:3rem;
margin-bottom:10rem;
`

const ProductDetails = styled.div`
display:flex;
flex-direction:column;
justify-content:space-between;
width:70%;
height:100%;
`

const ProductTitles = styled.div`
color:var(--gray-color);
font-size:0.75rem;
font-family:'Heebo';
`

const ProductLargeGray = styled.div`
font-family:'Quicksand';
font-size:1.5rem;
color:var(--gray-color);
`

export const Header = styled.h1`
font-family:'Open Sans';
font-size:1.5rem;
color:var(--black-color);
margin-bottom:1.25rem;
`

const ReviewSection = styled.div`
display:flex;
flex-direction:column;
align-items:flex-start;
justify-content:flex-start;
color:var(--black-color);
width:100%;
border-radius: 7rem 7rem 0 0;
`

export const Message = styled.div`
position:fixed;
top:2rem;
border-radius:1rem;
width:50%;
padding: 1rem 1.5rem;
background-color:var(--black-color);
color:var(--yellow-color);
display:flex;
justify-content:center;
z-index:5;
`

export default function Product({
    productId,
    products,
    reviews,
    id,
}){
    const [response, setResponse] = useState(null);

    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);

    const [editedComment, setEditedComment] = useState("");
    const [editedRating, setEditedRating] = useState(0);

    const [product, setProduct] = useState(`${products.product}`)
    const [price, setPrice] = useState(`${products.price}`)
    const [color, setColor] = useState(`${products.color}`)
    const [brand, setBrand] = useState(`${products.brand}`)
    const [description, setDescription] = useState( `${products.description}`);
    const [material, setMaterial] = useState(`${products.material}`);
    const [image, setImage] = useState( `${products.image}`);

    const [openModal, setOpenModal] = useState(false);

    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false)
    const [errorMessage, setErrorMessage] = useState('Please enter valid information')
    const [successMessage, setSuccessMessage] = useState('Product Edited Successfully')

    const router = useRouter();

    // function refreshPage() {
    //   setTimeout(function() {
    //     window.location.reload();
    //   }, 1200);
    // }
  const handleModal = () => {
    setOpenModal(!openModal);
  };

    const handleReview = async (e) => {
      if (
        comment.length <= 0
      ) {
        setErrorMessage("Please enter valid information");
        setError(true);
        setSuccess(false);
        setResponse(null);
        return; // stop the function from proceeding
      }
      else if ( comment.length > 0)  {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/reviews', {
                comment,
                rating: parseInt(rating),
                productId: parseInt(router.query.productId),
                });
                setResponse(data);
                setRating('');
                setComment('');
                setSuccessMessage('Review Added Successfully')
                setSuccess(true);
            }
        catch (error) {
            console.error(error);
        }
      }
    };

    const deleteReview = async (reviewId) => {
      try {
          const { data } = await axios.delete(`/api/reviews/${reviewId}`, {
              id: reviewId
            });
          setSuccessMessage('Review Deleted Successfully')
          setSuccess(true);
          setResponse(data);
      }
      catch (error) {
          console.error(error);
      }
  };

    const editReview = async (reviewId) => {
      try {
          const { data } = await axios.put(`/api/reviews/${reviewId}`, {
              id: reviewId,
              comment,
              rating,
              });
          setSuccessMessage('Review Edited Successfully')
          setSuccess(true);
          setResponse(data);
          setComment('sdfds');
          setRating(5);
      }
      catch (error) {
          console.error(error);
      }
  };

    const deleteProduct = async () => {
      const productId = router.query.productId;
        try {
            const { data } = await axios.delete(`/api/products/${productId}`, {
                id: parseInt(productId)
              });
            setSuccessMessage('Product Deleted Successfully')
            setSuccess(true);
            setTimeout(() => {
                router.push('/products');
              }, 1200);
        }
        catch (error) {
            console.error(error);
        }
    };

    const handleKeyPress = event => {
      // Allow a dot only if the input value does not already contain a dot
      const inputValue = event.target.value;
      if (event.key === '.' && inputValue.includes('.')) {
        event.preventDefault();
      }
    };

    const handlePrice = event => {
      const inputValue = event.target.value;
      // Prevent non-numeric characters from being entered
      if (/^\d*\.?\d*$/.test(inputValue)) {
        setPrice(parseFloat(inputValue));
      }
    };

    const [openForm, setOpenForm] = useState(false);

    const handleOpenForm = () => {
      setOpenForm(!openForm)
    }


    const [openReviewForm, setOpenReviewForm] = useState(new Array(products.length).fill(false));

  // function to handle opening/closing of review form for a specific item
  const handleOpenReviewForm = (index) => {
    // create a copy of the array and update the value at the given index
    const updatedForm = [...openReviewForm];
    updatedForm[index] = !updatedForm[index];
    setOpenReviewForm(updatedForm);
  };


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (
          product.length <= 0 ||
          price.length <= 0 ||
          color.length <= 0 ||
          brand.length <= 0 ||
          description.length <= 0 ||
          material.length <= 0 ||
          image.length <= 0
        ) {
          setErrorMessage("Please enter valid information");
          setError(true);
          setSuccess(false);
          return; // stop the function from proceeding
        }
        
        try {
          const parsedprice = Math.floor(parseFloat(price) * 100)
          const { data } = await axios.put(`/api/products/[productId]`, {
            id: parseInt(router.query.productId),
            product,
            price: parsedprice,
            color,
            brand,
            description,
            material,
            image
          });
          setResponse(data);
          setError(null);
          setSuccess(true);
          setProduct('');
          setPrice('');
          setColor('');
          setBrand('');
          setDescription('');
          setMaterial('');
          setImage(null);
        }
        catch (error) {
          setResponse(error.response.data);
          setError(true);
          if (error.response.status === 401) {
            setErrorMessage('Not Authenticated')
          } else {}
          console.log(error.response.data)
          setResponse(null);
          setSuccess(false);
        }
      };
    
      // useEffect(() => {
      //   if (response != null) {
      //     setTimeout(() => {
      //     window.location.reload();
      //     }, 1200);
    
      //   }
      // }, [response]);   

      
      
      function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    return (
        <div>
            <Head>
                <title>{products.product}</title>
                <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700&family=Quicksand:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <Wrapper style={{flexDirection:'column', alignItems:'center', minHeight:'100vh', height:'100%'}}>

            <Navigation/>

            {error ? <Message>{errorMessage}</Message> : ''}
            {success ? <Message>{successMessage}</Message> : ''}


            {products && (
            <ProductDetailCont key={products.id}>
              <ProductImageCont>
                <ProductImage2 src={products.image} alt={products.image}/>
              </ProductImageCont>

                { openForm ? 
                  <div style={{width:'70%',height:'100%', display:'flex', justifyContent:'space-between', flexDirection:'column'}}>
                    <Form onSubmit={handleSubmit}>
                        <Label for='product'>PRODUCT</Label>
                        <Input type="text" value={product} onChange={(e) => setProduct(e.target.value)} placeholder='...apple headphones' />
                        <Label for='product'>PRICE</Label>
                        <Input type="number" value={price} onChange={handlePrice} onKeyPress={handleKeyPress} placeholder='...$249.99'  />
                        <Label for='product'>COLOR</Label>
                        <Input type="text" value={color} onChange={(e) => setColor(e.target.value)} placeholder='...white' />
                        <Label for='product'>BRAND</Label>
                        <Input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} placeholder='...Apple' />
                        <Label for='product'>DESCRIPTION</Label>
                        <Input maxlength="1000" type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder='...Apple AirPods are wireless Bluetooth earbuds designed specifically to work with your iPhone and iPad.'  />
                        <Label for='product'>MATERIAL</Label>
                        <Input type="text" value={material} onChange={(e) => setMaterial(e.target.value)} placeholder='...plastic' />
                        <Label for='product'>IMAGE</Label>
                        <Input type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder='...https://www.apple.com/v/airpods/og/images/og__d9z2xq2q2y2a.png?202010211712' />
                    </Form>   
                    <Row style={{alignItems:'flex-end', justifyContent:'space-between', width:'100%'}}>
                          <SmallButton type="submit" onClick={handleSubmit}>Edit Product</SmallButton>
                          <IconCont2 onClick={handleOpenForm}>
                            <ArrowLeftIcon/>
                          </IconCont2>
                        </Row>
                  </div> 
                 : <ProductDetails>
                 <div style={{display:'flex', flexDirection:'column', gap:'1rem'}}>
                  <ProductSmall>Product ID:{products.id}</ProductSmall>
                    <Row>
                    <ProductBig style={{fontSize:'1.5rem',width:'100%', lineHeight:'1.5rem', marginRight:'1rem'}}>{capitalizeFirstLetter(products.product)}</ProductBig>
                    <ProductBig style={{fontSize:'1.5rem'}}>${products.price / 100}</ProductBig>
                    </Row>
                  <ProductSmall style={{color:'var(--black-color)', fontFamily:'Heebo'}}>{capitalizeFirstLetter(products.description)}</ProductSmall>
                  <ProductSmall>Brand: {capitalizeFirstLetter(products.brand)}</ProductSmall>
                  <ProductSmall>Color: {capitalizeFirstLetter(products.color)}</ProductSmall>
                  <ProductSmall>Material: {capitalizeFirstLetter(products.material)}</ProductSmall>
                 </div>

                 <div>
                  <Row style={{alignItems:'flex-end'}}>
                    <ButtonCont>
                      <SmallButton onClick={handleModal}>Delete Product</SmallButton>
                      {openModal ? <Modal>
                        <ProductBig>u sure lil bro?</ProductBig>
                        <Row style={{gap:'1rem'}}>
                          <SmallButton onClick={deleteProduct}>Delete</SmallButton>
                          <SmallButton onClick={handleModal}>No</SmallButton>
                        </Row>
                        </Modal> : null }
                      <SmallButton onClick={handleOpenForm}> Edit Product </SmallButton>
                    </ButtonCont>
                    <GraySmall style={{textAlign:'right', width:'100%'}}>Created: {products.createdAt.substring(0, 10)}</GraySmall>
                 </Row>
                 </div>

               </ProductDetails>
                }
                
            </ProductDetailCont>
            )}

          <UserProfileCont>
              <GraySmall style={{color:'var(--white-color)'}}>POSTED BY:</GraySmall>
              <Row style={{alignItems:'center', gap:'1rem'}}>
                <Image src={products.user.image}/>
                <div style={{color:'var(--white-color)'}}>{products.user.name}</div>
              </Row>
          </UserProfileCont>

          <ReviewSection>
            <Header>Reviews</Header>
            
            {reviews && reviews.map((review, index) => (
            <ReviewCont key={review.id}>

              <Row style={{alignItems:'center', justifyContent:'space-between', width:'100%'}}>
                <Row style={{alignItems:'center'}}>
                <Image src={products.user.image} style={{backgroundColor:'transparent',marginRight:'0.5rem', border:'none'}}/>
                <ProductSmall style={{color:'var(--black-color)'}}>{review.user.name}</ProductSmall>
                </Row>
                <ProductBig style={{fontWeight:'500', fontSize:'1rem', color:'var(--black-color)'}}>Rating: {review.rating}/5</ProductBig>
              </Row>
              
              <Row style={{justifyContent:'space-between', width:'100%', padding:'0 0 0 4rem'}}>
                <Column style={{width:'100%', alignItems:'flex-start', justifyContent:'flex-start'}}>

                  {openReviewForm[index] ?
                  <Form onSubmit={editReview} style={{flexDirection:'row',width:'100%', alignItems:'center', margin:'0'}}>
                    <Row style={{alignItems:'flex-start', gap:'1rem', width:'80%'}}>
                    <Input style={{width:'10%', padding:'0.15rem 0.5rem', borderRadius:'5px'}} type="number" min="0" max="5" placeholder="Enter rating" value={editedRating} onChange={(e) => setEditedRating(e.target.value)}/>
                    <Input style={{ padding:'0.15rem 0.5rem', borderRadius:'5px', width:'80%'}} type="text" placeholder="Enter review" value={editedComment} onChange={(e) => setEditedComment(e.target.value)}/>
                    </Row>
                    
                    <SmallButton type="submit" onClick={editReview} style={{margin:'0', padding:'5px 10px', width:'5rem'}}>Edit</SmallButton>
                  </Form>
                  :
                  <>
                  <ProductBig style={{fontWeight:'500', color:'var(--black-color)', marginTop:'0.5rem'}}>{review.comment}</ProductBig>
                  </>
                  }

                </Column>
                <Row style={{gap:'1rem'}}>
                  <IconCont2 onClick={()=> deleteReview(review.id)}>
                    <TrashIcon/>
                  </IconCont2>
                  <IconCont2>
                    <PencilIcon onClick={() => handleOpenReviewForm(index)}/>
                  </IconCont2>
                </Row>
              </Row>

            </ReviewCont>
            ))}

            <Form onSubmit={handleReview} style={{flexDirection:'row', width:'100%', alignItems:'center', gap:'0.5rem', justifyContent:'space-between', marginTop:'2rem'}}>
              <Row style={{ width:'100%', gap:'1rem'}}>
                <Input style={{marginBottom:'0rem', width:'10%'}} type="number" min="0" max="5" placeholder="Enter review" value={rating} onChange={(e) => setRating(e.target.value)}/>
                <Input style={{marginBottom:'0rem', width:'85%'}} type="text" placeholder="Enter review" value={comment} onChange={(e) => setComment(e.target.value)}/>
              </Row>
                <SmallButton type="submit">Send</SmallButton>
            </Form>

          </ReviewSection>
          </Wrapper>

          </div>
    )
}

export async function getServerSideProps(context) {

    const { productId } = context.query;
    const products = await prisma.product.findUnique({
      where: { id: Number(productId) },
      include: { user: true },
    });

    const reviews = await prisma.review.findMany({
        where: { productId: Number(productId) },
        include:{ user: true},
    });


    return {
        props: {
            products: JSON.parse(JSON.stringify(products)),
            reviews: JSON.parse(JSON.stringify(reviews)),
        }
    }
}