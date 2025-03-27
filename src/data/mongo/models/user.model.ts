
import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]    
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    isValidated:{
        type: Boolean,
        default: false
    },
    
    password: {
        type: String,
        required: [true, 'Password is required'],

    },
    avatar:{
        type:String
    },
    role: {
        type: [String],
        default: ['USER_ROLE'],
        enum: ['USER_ROLE', 'ADMIN_ROLE']
    }
    
});

userSchema.set('toJSON',{
    virtuals: true,
    versionKey: false,
    transform: function( doc, ret, options ){
        delete ret.password;
        delete ret._id;
    }
})


export const UserModel = mongoose.model('User', userSchema);