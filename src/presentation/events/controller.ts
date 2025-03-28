import { Response, Request } from "express"
import { EventModel } from "../../data/mongo/models/event.model";
import { CreateEventDto } from "../../domain";
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
        if (!token) return res.status(400).json({ message: 'Token is required' });

        /* validate token */
        const tokenValid = await this.authService.renewToken(token);
        if (tokenValid instanceof Error) return res.status(400).json({ message: tokenValid.message });

        /* get user from token */
        const email = await this.authService.getUserFromToken(token);
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

        const events = await EventModel.find();

        return res.json({ 'ok': true, events });

    }

    updateEvent = (req: Request, res: Response) => {

        return res.json({ 'ok': true, message: 'Update Events' });

    }

    deleteEvent = (req: Request, res: Response) => {

        return res.json({ 'ok': true, message: 'Update Events' });

    }

}