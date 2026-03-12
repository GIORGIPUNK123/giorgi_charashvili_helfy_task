import express from 'express';
import cors from 'cors';
const app = express();
const port = 4000;
import taskRoutes from './routes/tasks.js';
app.use(express.json());
app.use(
  cors({
    origin: '*',
  }),
);
app.get('/', (req, res) => {
  res.send('its working');
});
app.use('/api/tasks', taskRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
