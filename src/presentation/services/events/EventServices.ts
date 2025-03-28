import { UserModel } from "../../../data";
import { EventModel } from "../../../data/mongo/models/event.model";
import { CreateEventDto } from "../../../domain";



export class EventServices {

   

    public async createEvent(dto: CreateEventDto, userEmail:string) {

        const newEvent = new EventModel(dto);
        const user = await UserModel.findOne({ email: userEmail });
        if (!user) return new Error('User not found');
           
        
        newEvent.user = user._id;
        try {
            await newEvent.save();

            return newEvent
        } catch (error) {
            console.log(error)
            return new Error('Error creating event');
        }

    }


}