import express from 'express';
const router = express.Router();

import userRoute from './user.route';

/**
 * Function contains Application routes
 *
 * @returns router
 */
const routes = () => {
  router.get('/', (req, res) => {
    // Get the name from the request or use a default name
    const name = req.query.name || 'Rohit';

    // Instead of sending JSON, send an HTML page
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome</title>
      </head>
      <body>
        <h1>Welcome Mr. ${name}</h1>
        <p>Your project is working fine.</p>
      </body>
      </html>
    `);
  });

  router.use('/users', userRoute);

  return router;
};

export default routes;
