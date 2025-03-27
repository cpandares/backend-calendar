

import { Router } from 'express';
import { AuthController } from './controller';
import { AuthServices } from '../services/auth/AuthServices';







export class AuthRoutes {


  static get routes(): Router {

    const router = Router();
   const authServices = new AuthServices();
    const authController = new AuthController(authServices);

    // Definir las rutas
     router.post('/register', authController.register );
     router.post('/login', authController.login );
     

     



    return router;
  }


}

