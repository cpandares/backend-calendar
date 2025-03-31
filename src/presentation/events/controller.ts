import { Response, Request } from "express"
import { EventModel } from "../../data/mongo/models/event.model";
import { CreateEventDto, UpdateEventDto } from "../../domain";
import { EventServices } from "../services/events/EventServices";
import { AuthServices } from "../services/auth/AuthServices";
import { jwtVerify } from "../../config/jwt.adapter";




export class EventController {
    constructor(
        private readonly eventService: EventServices,
        private readonly authService: AuthServices
    ) { }

    create = async (req: Request, res: Response) => {

        /* validate token */
        const token = req.header('x-token');

        const email = await this.authService.getUserFromToken(token!);
        if (email instanceof Error) return res.status(400).json({ message: email.message });


        const [error, createEventDto] = CreateEventDto.create(req.body);
        if (error) return res.status(400).json({ meesage: error });

        try {
            this.eventService.createEvent(createEventDto!, email!)
                .then(response => {
                    if (response instanceof Error) return res.status(400).json({ 'message': response.message });
                    res.status(201).json({ 'ok': true, 'event': response })
                }).catch(error => {
                    res.status(500).json({ message: 'Internal Server Error' });
                });
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'Internal Server Error, please contact adminitrator' });
        }


    }

    getEvents = async (req: Request, res: Response) => {

        const events = await this.eventService.getEvents();

        return res.json({ 'ok': true, events });

    }

    updateEvent = async (req: Request, res: Response) => {
        const token = req.header('x-token');
        const [error, updateEventDto] = UpdateEventDto.update(req.body);
        if (error) return res.status(400).json({ message: error });

        const { id } = req.params;
        if (!id) return res.status(400).json({ message: 'Id is required' });

        const email = await this.authService.getUserFromToken(token!);
        if (email instanceof Error) return res.status(400).json({ message: email.message });

        if (!updateEventDto) return res.status(400).json({ message: 'Event is required' });
       

        const event = await this.eventService.updateEvent(id, updateEventDto!, email!);
        if (event instanceof Error) return res.status(400).json({ message: event.message });
        res.json({ 'ok': true, event });

    }

    deleteEvent = (req: Request, res: Response) => {

        const { id } = req.params;
        if (!id) return res.status(400).json({ message: 'Id is required' });
        this.eventService.deleteEvent(id)
            .then(response => {
                if (response instanceof Error) return res.status(400).json({ message: response.message });
                res.json({ 'ok': true, message: 'Event deleted' });
            }).catch(error => {
                res.status(500).json({ message: 'Internal Server Error' });
            });


    }

}