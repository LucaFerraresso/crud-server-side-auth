import { NextApiRequest, NextApiResponse } from 'next';
    import { registerUser } from '../../../lib/db';

    export default async function handler(req: NextApiRequest, res: NextApiResponse) {
      if (req.method === 'POST') {
        const { username, password } = req.body;
        const registered = await registerUser(username, password);

        if (registered) {
          res.status(201).json({ message: 'Utente registrato con successo' });
        } else {
          res.status(500).json({ message: 'Errore durante la registrazione' });
        }
      } else {
        res.status(405).end(); // Method Not Allowed
      }
    }
