import mongoose, { Schema } from 'mongoose';



const eventShema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    note: {
        type: String,
        required: false
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
    
});



export const EventModel = mongoose.model('Event', eventShema);