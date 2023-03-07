const express = require('express');
const { sequelize, User, Post } = require('./models');

const app = express();
app.use(express.json());

app.post('/users', async (req, res) => {
  const { name, email, role } = req.body;

  try {
    const user = await User.create({ name, email, role });
    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    return res.json(users);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving users' });
  }
});

app.delete('/users/:uuid', async (req, res) => {
  const uuid = req.params.uuid;

  try {
    const user = await User.findOne({ where: { uuid } });
    await user.destroy();
    return res.json({ message: 'User deleted' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Delete user error' });
  }
});

app.put('/users/:uuid', async (req, res) => {
  const uuid = req.params.uuid;
  const { name, email, role } = req.body;

  try {
    const user = await User.findOne({ where: { uuid } });

    user.name = name;
    user.email = email;
    user.role = role;

    await user.save();
    return res.json(user);
  } catch (err) {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Update user error' });
    }
  }
});

app.get('/users/:uuid', async (req, res) => {
  const uuid = req.params.uuid;

  try {
    const user = await User.findOne({
      where: { uuid },
      include: 'posts',
    });
    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'something went wrong' });
  }
});

app.post('/posts', async (req, res) => {
  const { userUuid, body } = req.body;

  try {
    const user = await User.findOne({ where: { uuid: userUuid } });

    const post = await Post.create({ body, userId: user.id });
    return res.json(post);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// response will now include the details of the "User" when you pass an option to include that Model
app.get('/posts', async (req, res) => {
  try {
    const posts = await Post.findAll({
      // can pass in multiple models if needed but needs to be included in the post association file
      include: ['user'],
    });

    return res.json(posts);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

app.listen({ port: 5000 }, async () => {
  console.log('Server up on port 5000');
  await sequelize.authenticate();
  console.log('Database Connected!');
});
