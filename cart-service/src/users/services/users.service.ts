import { Inject, Injectable } from '@nestjs/common';
import { User } from '../models';
import { NEST_PGPROMISE_CONNECTION } from 'nestjs-pgpromise';
import { IDatabase } from 'pg-promise';


@Injectable()
export class UsersService {
  constructor(@Inject(NEST_PGPROMISE_CONNECTION) private readonly pg: IDatabase<any>) {}

  async findOne(userId: string): Promise<User> {
    console.log("FIND_ONE")
    const sqlQuery = `
      select * from public.users where name = $1;
    `
    console.log("sqlQuery", sqlQuery)
    const [user] = await this.pg.any(sqlQuery, [userId])
    console.log("findOne", user)
    return user
  }

  async createOne({ name, password }: User): Promise<User> {
    const sqlQuery = `
      INSERT INTO public.users (name, password) VALUES ($1, $2) returning *;
    `

    const [user] = await this.pg.any(sqlQuery, [name, password]);

    return user;
  }

  async getUsers(): Promise<User[]> {
    const sqlQuery = `
      SELECT name FROM public.users;
    `

    return await this.pg.any(sqlQuery);
  }
}
