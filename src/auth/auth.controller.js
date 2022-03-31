import { UserService } from '../user/user.service.js';

const userService = new UserService();

export const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userService.findByEmail(email);

    if (user && (await user.validatePassword(password))) {
      return res.success({ accessToken: user.generateToken() });
    } else {
      return res.error({ message: 'Email or password is incorrect' });
    }
  } catch (error) {
    return res.internal();
  }
};

export const handleRegister = async (req, res) => {
  delete req.body.repassword;

  const user = await userService.store(req.body);

  if (user) return res.json(user).status(200);
  return res.json({ message: 'Error' }).status(400);
};

export const getProfile = async (req, res) => {
  return res.json(req.user);
};
