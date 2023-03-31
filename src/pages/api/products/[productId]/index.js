import { prisma } from '../../../../../server/db/client'

  export default async function handler(req, res) {
    const { method } = req;
    const { id, product, price, color, description, brand, material, image } = req.body;
    switch (req.method) {
      case "PUT":
        const updatedProduct = await prisma.product.update({
          where: { id },
          data: {
            product,
            price,
            description,
            color,
            brand,
            material,
            image
          }
        });
        if (!updatedProduct) {
          res.status(404).json({ message: "Product not found" });
          break;
        }
        res.status(200).json(updatedProduct);
        break;

      case "DELETE":
        const deleteProduct = await prisma.product.delete({
          where: { 
            id: parseInt(req.query.productId)
          }
        });
        res.status(200).json(deleteProduct);
        break;
    }
  }
