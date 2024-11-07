// Implementazione fittizia di NextAuth, da sostituire con la vera implementazione
    import { NextApiRequest, NextApiResponse } from 'next'

    const handler = (req: NextApiRequest, res: NextApiResponse) => {
      res.status(200).json({ message: 'Authentication API route' })
    }

    export default handler;
