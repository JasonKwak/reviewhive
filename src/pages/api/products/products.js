import axios from 'axios'
import { unstable_getServerSession } from 'next-auth'
import { prisma } from '../../../../server/db/client'
import { authOptions } from '../auth/[...nextauth]'


export default async function handler(req,res) {
  const {method} = req;

  const session = await unstable_getServerSession(req,res, authOptions)
  if (!session) {
    return res.status(401).json({error: 'Not authenticated'})
  }

  console.log(session.user)
 
  const prismaUser = await prisma.user.findUnique({
    where: {email: session.user.email}
  })
  
  if (!prismaUser){
    return res.status(401).json({error: 'Not authenticated'})
  }


  switch (method){
    case 'POST':
      const { product, price, color, brand, description, material, image,reviews } = req.body;
      const newProduct = await prisma.product.create({
        data: {
          product,
          price,
          color,
          brand,
          description,
          material, 
          image: image,
          userId: prismaUser.id,
          reviews: reviews
            ? {
                create: reviews.map((review) => ({
                  rating: review.rating,
                  comment: review.comment,
                })),
              }
            : undefined,
        },
        include: {
          reviews: true,
        },
      });

      res.status(201).json(newProduct)
      break
    default:
      res.status(405).end(`Method ${method} Not Allowed`)

      case 'DELETE':

        const deleteProduct = await prisma.product.delete({
          where: { id: parseInt(id) },
        });
        res.status(204).end();
        break;
    }
}
