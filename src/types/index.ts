


export interface Userprops {
    id: string;
    username: string;
    email: string;
    password?: string;
    avatarUrl?: string;
    provider: string;
    createdAt: Date;
    updatedAt?: Date;
  }