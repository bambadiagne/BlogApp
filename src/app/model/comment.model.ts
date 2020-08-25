export class Comment{
    public constructor(
        public idComment:number,
        public idUser:string,
        public username:string,
        public comment:string,
        public userRating:number,
        public commentDate:string,
        
    ){}
}