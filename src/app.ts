import path from 'path';
import express from 'express';

/* Define local constants */
const PORT = process.env.PORT || 8080;
const DIRNAME = process.env.PWD || '';

/* Create Express application */
const app = express();

/* Set up middleware */
app.use(express.json());

/* Serve static files */
app.use(express.static(path.join(DIRNAME, 'client', 'dist')));
app.get('*', (req, res) => {
    res.sendFile(path.join(DIRNAME, 'client', 'dist', 'index.html'));
});

/* Start the application */
app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
