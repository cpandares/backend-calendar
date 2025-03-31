import { UserModel } from "../../../data";
import { EventModel } from "../../../data/mongo/models/event.model";
import { CreateEventDto, UpdateEventDto } from "../../../domain";



export class EventServices {


    public async getEvents() {
        try {
            const events = await EventModel.find();
            return events;
        }
        catch (error) {
            console.log(error)
            return new Error('Error getting events');
        }
    }

   

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

    public async updateEvent(id:string, dto: UpdateEventDto, userEmail:string) {
        try {
            const event = await EventModel.findById(id).populate('user');
            if (!event) return new Error('Event not found');
            const user = await UserModel.findOne({ email: userEmail });
            event.title = dto.title;
            event.start = new Date(dto.start);
            event.end = new Date(dto.end);
            event.note = dto.note;
            event.user = user!._id;
          
            await event.save();
            return event;
        } catch (error) {
            console.log(error)
            return new Error('Error updating event');
        }
    }
    public async deleteEvent(id:string) {
        try {
            const event = await EventModel.findByIdAndDelete(id);
            if (!event) return new Error('Event not found');
            return true;
        } catch (error) {
            console.log(error)
            return new Error('Error deleting event');
        }
    }


}