import { UserModel } from "../../../data";
import { RegisterUserDto } from "../../../domain";





export class AuthServices {




    public async  registerUser( dto:RegisterUserDto ){

        const existUser = await UserModel.findOne({ email:dto.email });

        if(existUser) return new Error('User already exists');

        try {   
            const user = new UserModel(dto);
            
            /* encriptar passoword */
            //user.password = bcryptAdapter.hash(dto.password);
             
            await user.save();            
           
            
            

            return { 
                user
                
             };
            
        } catch (error) {
            return new Error('Internal Server Error');
        }

    }

}