import express from 'express';
import { verifyRequsetBody } from '../middlewares/verifyRequsetBody.js';
const router = express.Router();
let tasks = [
  {
    id: 1,
    title: 'Task 1',
    description: 'Description for Task 1',
    completed: false,
    priority: 'high',
    createdAt: new Date('2026-03-01T09:00:00'),
  },
  {
    id: 2,
    title: 'Task 2',
    description: 'Description for Task 2',
    completed: false,
    priority: 'medium',
    createdAt: new Date('2026-03-04T14:30:00'),
  },
  {
    id: 3,
    title: 'Task 3',
    description: 'Description for Task 3',
    completed: true,
    priority: 'low',
    createdAt: new Date('2026-03-06T11:15:00'),
  },
  {
    id: 4,
    title: 'Task 4',
    description: 'Description for Task 4',
    completed: false,
    priority: 'high',
    createdAt: new Date('2026-03-10T08:45:00'),
  },
  {
    id: 5,
    title: 'Task 5',
    description: 'Description for Task 5',
    completed: true,
    priority: 'medium',
    createdAt: new Date('2026-03-12T16:20:00'),
  },
];
router.get('/', (req, res) => {
  res.json(tasks);
});

router.post('/', verifyRequsetBody, (req, res) => {
  const { title, description, priority } = req.body;
  tasks.push({
    id: parseInt(Date.now().toString().slice(-8)),
    title,
    description,
    completed: false,
    priority,
    createdAt: new Date(),
  });
  res.json({ message: 'Task created successfully' });
});
router.put('/:id', verifyRequsetBody, (req, res) => {
  const { title, description, priority } = req.body;
  const { id } = req.params;
  const task = tasks.find((task) => task.id === parseInt(id));
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  task.title = title;
  task.description = description;
  task.priority = priority;
  res.json({ message: 'Task updated successfully' });
});

router.patch('/:id/toggle', (req, res) => {
  const { id } = req.params;
  const task = tasks.find((task) => task.id === parseInt(id));
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  task.completed = !task.completed;
  res.json({ message: 'Task toggled successfully' });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const task = tasks.find((task) => task.id === parseInt(id));
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  tasks = tasks.filter((task) => task.id !== parseInt(id));
  res.json({ message: 'Task deleted successfully' });
});
export default router;
