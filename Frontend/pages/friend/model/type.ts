export type FriendListResponse = {
  friends: friendItem[];
  message: string;
  success: true;
};

export type friendItem = {
  id: number;
  login: string;
  UID: string;
  avatarUrl: string;
};
