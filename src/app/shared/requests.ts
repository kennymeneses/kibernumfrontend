export interface LoginRequest{
  email: string;
  password: string;
}

export interface RegisterRequest{
  name: string;
  lastname: string;
  email: string;
  password: string;
}

export interface CreateContactRequest{
  userId : string,
  name: string,
  phoneNumber: string
}

export interface GetContactsListRequest{
  userId : string
}

export interface UpdateContactRequest{
  contactId : string,
  name : string,
  phoneNumber : string,
}
