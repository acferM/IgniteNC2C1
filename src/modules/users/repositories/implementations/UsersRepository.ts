import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const user = new User();

    Object.assign(user, {
      name,
      email,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.users.push(user);

    return user;
  }

  findById(id: string): User | undefined {
    const find = this.users.find((user) => user.id === id);

    return find;
  }

  findByEmail(email: string): User | undefined {
    const find = this.users.find((user) => user.email === email);

    return find;
  }

  turnAdmin(receivedUser: User): User {
    const findIndex = this.users.findIndex(
      (user) => user.id === receivedUser.id
    );

    this.users[findIndex] = { ...this.users[findIndex], admin: true };

    return this.users[findIndex];
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
