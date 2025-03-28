
import { Router } from 'express';
import { EventController } from './controller';
import { AuthServices } from '../services/auth/AuthServices';
import { EventServices } from '../services/events/EventServices';

export class EventsRoutes {


    static get routes(): Router {

        const router = Router();
        const eventServices = new EventServices();
        const authServices = new AuthServices();
        const eventController = new EventController(eventServices,authServices);

        // Definir las rutas
        router.get('/', eventController.getEvents);
        router.post('/create', eventController.create);
        router.put('/update/:id', eventController.updateEvent);
        router.delete('/:id', eventController.deleteEvent);






        return router;
    }


}

