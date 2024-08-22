export interface LoginResult{
  token : string;
  userId : string;
}

export interface UserResponse{
  uuid: string;
  name: string;
  lastname: string;
  email: string;
}

export interface ContactResponse{
  name: string;
  phoneNumber: string;
}

export interface ContactsResponse{
  results : ContactResponse[];
  pageNumber : number;
  pageSize : number;
  totalItems : number;
  hasNextPage : boolean;
  hasPreviousPage : boolean;
}
