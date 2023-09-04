import { BoredAPIActivityType } from "./default-activities";

interface CommonActivityProperties {
    name: string;
    type: BoredAPIActivityType;
    participants: number;
    price: number;
    description: string;
    listOfLinks?: string[];
    accessibility: number;
  }
  
  export interface ICustomActivity extends CommonActivityProperties {
    imageURL: string;
    userUID: string;
    userPictureURL: string;
  }
  