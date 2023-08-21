export interface Comment {
    _id: string;
    userUid: string;
    text: string;
    activityId: string;
    userPfp: string;
    userName: string;
    createdAt: string;
    isContentModified: boolean;
    userRating: number;
    __v: number;
  }