import jwt from 'jsonwebtoken';
import { envs } from './';


const secret = envs.JWT_SECRET;



export const jwtVerify =  <T>(token:string): Promise<T | null> =>{
    return new Promise((resolve) => {
        jwt.verify(token, secret, (err, decoded) => {
            if ( err ) return resolve(null);
            
            resolve(decoded as T);
            
        });
    });
}

export const jwtAdapter = (email:string)=>{

    return new Promise( ( resolve, reject ) =>{

        const payload = {  email }

        jwt.sign( payload, secret,{
            expiresIn: '2h'
        },(error,token)=>{

            if(error){
                console.log(error);
                reject('No token generated');
            }


            resolve( token );

        })

    })


}