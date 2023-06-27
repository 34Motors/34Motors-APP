
export interface iCommentBody {
    description: string;
  }

export interface iCommentResponse extends iCommentBody {
    postDate:string;
    user:{
        id:number;
        name:string;
    }
}
