


export class UpdateEventDto {
    private constructor(
        public readonly title:string,
        public readonly start:string,
        public readonly end:string,
        public readonly user:string,
        public readonly note:string
    ){};


    static update ( object: { [key:string]:any } ):[string?, UpdateEventDto?]{
        const { title,start,end,note,user } = object;
        const startDate = new Date(start);
        const endDate = new Date(end);

        if(!title) return ['Missing Title'];
        if(!start) return ['Missing start'];        
        if(!end) return ['Missing End Date'];
             
        
        if(isNaN(startDate.getTime())) return ['Invalid start date'];
        if(isNaN(endDate.getTime())) return ['Invalid end date'];
        if (endDate <= startDate) return ['End date must be greater than start date'];

        return [undefined, new UpdateEventDto(title,start,end,note,user)];
    }
}