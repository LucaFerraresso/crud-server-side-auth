import { NextApiRequest, NextApiResponse } from 'next';
    import { loginUser } from '../../../lib/db';

    export default async function handler(req: NextApiRequest, res: NextApiResponse) {
      if (req.method === 'POST') {
        const { username, password } = req.body;
        const loggedIn = await loginUser(username, password);

        if (loggedIn) {
          res.setHeader('Set-Cookie', 'authenticated=true; Path=/; HttpOnly'); // Imposta il cookie di autenticazione
          res.status(200).json({ message: 'Login effettuato con successo' });
        } else {
          res.status(401).json({ message: 'Credenziali non valide' });
        }
      } else {
        res.status(405).end(); // Method Not Allowed
      }
    }
