import { UserService } from '../user/user.service.js';
import { hash } from 'bcrypt';

const userService = new UserService();

export const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userService.findByEmail(email);

    if (user && (await user.validatePassword(password))) {
      res
        .json({
          accessToken: user.generateToken(),
        })
        .status(200);
    } else {
      res.json({ message: 'Unauthorized', statusCode: 401 }).status(401);
    }
  } catch (error) {
    res.json({ message: 'Internal error', statusCode: 500 }).status(500);
  }
};

export const handleRegister = async (req, res) => {
  const userData = {
    ...req.body,
    password: await hash(req.body.password, 10),
  };

  delete userData.repassword;

  const user = await userService.store(userData);

  if (user) return res.json(user).status(200);
  return res.json({ message: 'Error' }).status(400);
};

export const getProfile = async (req, res) => {
  return res.json(req.user);
};
