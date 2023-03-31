import { prisma } from '../../../../../server/db/client';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]';


export default async function deleteReviews(req,res){
    const {productId, reviewId, id} = req.query;
    const {rating, comment} = req.body;

    const session = await unstable_getServerSession(req,res, authOptions)
    if (!session) {
      return res.status(401).json({error: 'Not authenticated'})
    }
  
    const prismaUser = await prisma.user.findUnique({
      where: {email: session.user.email}
    })
    
    if (!prismaUser){
      return res.status(401).json({error: 'Not authenticated'})
    }
  
    switch (req.method){

      case "GET":
        const reviews = await prisma.review.findMany({
          where: {
            productId: parseInt(productId)
          },
        });
        res.status(200).json(reviews);
        break;

      case "DELETE":
        const deleteReview = await prisma.review.delete({
          where: {
            id:parseInt(reviewId)
          }
        })
        res.status(200).json(deleteReview);
        break;
        default:
          res.status(405).end(); // Method Not Allowed
          break;

        case "PUT":
          const updateReview = await prisma.review.update({
            where: {
              id:parseInt(reviewId)
            },
            data: {
              rating,
              comment
          }})

          res.status(200).json(updateReview);

          break;

  }
  }