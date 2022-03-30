import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';

async function authMiddleware(request, response, next) {
  const userService = new UserService();
  if (request.isAuthenticated() && request.user) {
    try {
      const id = request.user.id || 0;
      const user = await userService.findByUserId(id);
      if (user) {
        request.user = user;
        next();
      } else {
        response.redirect('/auth/login');
      }
    } catch (error) {
      response.redirect('/auth/login');
    }
  } else {
    response.redirect('/auth/login');
  }
}

export default authMiddleware;
