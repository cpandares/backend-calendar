
import { Request, Response } from "express";
import { LoginUserDto, RegisterUserDto } from "../../domain";
import { AuthServices } from "../services/auth/AuthServices";

export class AuthController {

   constructor(
      public readonly authService: AuthServices
   ) {}


   register = (req: Request, res: Response) => {
      const [error, registerDto] = RegisterUserDto.create(req.body);
      if (error) return res.status(400).json({ message: error });

      this.authService.registerUser(registerDto!)
      .then(response => {
         if (response instanceof Error) return res.status(400).json({ message: response.message });
         res.status(201).json(response);
      }).catch(error => {        
         res.status(500).json({ message: 'Internal Server Error' });
      });

   }

   login = (req: Request, res: Response) => {
      const [error, loginDto] = LoginUserDto.create(req.body);
      if (error) return res.status(400).json({ message: error });

      this.authService.loginUser(loginDto!).then(response => {
         if (response instanceof Error) return res.status(400).json({ message: response.message });
         res.status(200).json(response);
      }).catch(error => {
         
         res.status(500).json({ message: 'Internal Server Error' });
      });

   }


   renewToken = (req: Request, res: Response) => {
      const token = req.header('x-token');
      if (!token) return res.status(400).json({ message: 'Token is required' });

      this.authService.renewToken(token).then(response => {
         if (response instanceof Error) return res.status(400).json({ message: response.message });
         res.status(200).json(response);
      }).catch(error => {
        
         res.status(500).json({ message: 'Internal Server Error' });
      });

   }


}