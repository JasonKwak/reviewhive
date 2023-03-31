import { prisma } from '../../../../server/db/client';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function createReviews(req,res){
  const {productId} = req.query;


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
    case 'POST':
      const {rating, comment, productId} = req.body;
      const newReview = await prisma.review.create({
        data: {
          productId,
          rating,
          comment,
          userId: prismaUser.id,
        }
      })
      res.status(201).json(newReview)
      break;
    case 'GET':
      const reviews = await prisma.review.findMany({
        where: {
          productId: parseInt(productId)
        },
      });
      res.status(200).json(reviews);
      break;
}
}