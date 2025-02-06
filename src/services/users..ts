import axios from "axios";

type User = {
  id: string;
  fullName: string;
  email: string;
  avatar: string;
};

export const searchUsers = async () => {
  const response = await axios.get(`http://localhost:8000/users`);
  const { data: users } = response.data;
  return users as User[];
};
