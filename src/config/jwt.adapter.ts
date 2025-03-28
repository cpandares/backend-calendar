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

export const generateToken = <T>(email:string): Promise<T | null>  =>{

    return new Promise( ( resolve, reject ) =>{

        const payload = {  email }
        
        jwt.sign( payload, secret,{
            expiresIn: '2h'
        },(error,token)=>{

            if(error){
                console.log(error);
                reject('No token generated');
            }
            resolve( token as T);

        })

    })


}


export const renewToken = async ( token:string ) =>{
    const decoded = await jwtVerify<{email:string}>( token );
    if (!decoded || !decoded.email) return new Error('Invalid token');
    const { email } = decoded;
    if(!email) return new Error('Invalid token');
    return generateToken( email );
}