export interface ErrorWithStatus {
  [key: string]: string
}

export class ErrorStatus {
  message: string
  status:number 
  constructor({message, status}:{message:string, status:number}) {
    this.message = message;
    this.status=status;
  }
}

export class ErrorWithStatus422 {
  message?: string;
  data: ErrorWithStatus
 
  constructor({message, data}:{message?:string , data:ErrorWithStatus}) {
    this.message = message,
      this.data = data
  }
}