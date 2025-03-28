import { bcryptAdapter } from "../../../config";
import { generateToken, jwtVerify, renewToken } from "../../../config/jwt.adapter";
import { UserModel } from "../../../data";
import { LoginUserDto, RegisterUserDto } from "../../../domain";





export class AuthServices {


    public async  registerUser( dto:RegisterUserDto ){

        const existUser = await UserModel.findOne({ email:dto.email });

        if(existUser) return new Error('User already exists');

        try {   
            const user = new UserModel(dto);
            
            /* encriptar passoword */
            user.password = bcryptAdapter.hash(dto.password);

             await user.save();
            //TODO jwt
            const token = await generateToken( dto.email );
            if(!token){
                return new Error('Internal Server Error');
            }
            return { 
                user,
                token
                
             };
            
        } catch (error) {
            return new Error('Internal Server Error');
        }

    }


    public async loginUser( dto:LoginUserDto ){

        const user = await UserModel.findOne({ email: dto.email });
        if(!user) return new Error('User not found');

        const isPasswordMatch = bcryptAdapter.compare( dto.password, user.password! );
        if(!isPasswordMatch) return new Error('Invalid email or password');

        let { password, ...userWithoutPassword } = user.toObject();
        //TODO jwt
        const token = await generateToken( userWithoutPassword.email );
       
        return { user: userWithoutPassword, token };

    }


    public async renewToken( token:string ){

        const decoded = await renewToken( token );
        if(decoded instanceof Error) return decoded;
        
        return { token: decoded };


    }

    public async getUserFromToken( token:string ){
        const decoded = await jwtVerify<{email:string}>( token );
        if (!decoded || !decoded.email) return new Error('Invalid token');
        const { email } = decoded;  
        if(!email) return new Error('Invalid token');

        return email;
    }

}