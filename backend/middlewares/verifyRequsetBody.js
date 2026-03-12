export const verifyRequsetBody = (req, res, next) => {
  const { title, description, priority } = req.body;
  console.log('req.body: ', req.body);
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }
  if (!description) {
    return res.status(400).json({ error: 'Description is required' });
  }
  if (priority !== 'high' && priority !== 'medium' && priority !== 'low') {
    return res.status(400).json({
      error: 'Invalid priority. Please choose from high, medium, or low.',
    });
  }

  next(); // Pass control to the next handler
};
