import { bcryptAdapter } from "../../../config";
import { jwtAdapter } from "../../../config/jwt.adapter";
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
            return { 
                user
                
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
        const token = await jwtAdapter( userWithoutPassword.email );
       
        return { user: userWithoutPassword, token };

    }

}