import { formatPhoneNumber } from '../common/utils/phone.util.js';
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
  const existUser = await userService.findByEmail(req.body.email);
  if (existUser) {
    return res.unprocessableEntity([
      {
        field: 'email',
        message: 'Email is taken',
      },
    ]);
  }
  delete req.body.repassword;

  if (req.body.phoneNumber) {
    req.body.phoneNumber = formatPhoneNumber(req.body.phoneNumber);
  }

  try {
    const user = await userService.store(req.body);
    delete user.password;
    return res.success({
      user,
      accessToken: user.generateToken(),
    });
  } catch (error) {
    return res.internal();
  }
};

export const getProfile = async (req, res) => {
  return res.success(req.user);
};
