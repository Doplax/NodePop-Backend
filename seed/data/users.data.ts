export interface UserData {
  email: string;
  password: string; // Sin hashear - el script lo hasheará
}

const usersList: UserData[] = [
  {
    email: "admin@example.com",
    password: "1234",
  },
  {
    email: "user@example.com",
    password: "1234",
  },
  {
    email: "john.doe@example.com",
    password: "password123",
  },
  {
    email: "maria.garcia@example.com",
    password: "securePass456",
  },
  {
    email: "test.user@example.com",
    password: "test1234",
  },
  {
    email: "pedro@gmail.com",
    password: "1234",
  },
];

export { usersList };
