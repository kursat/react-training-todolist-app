import { fakerTR as faker } from '@faker-js/faker';
import * as fs from 'fs';

const createUser = () => {
  const sex = faker.person.sex();
  const firstName = faker.person.firstName(sex);
  const lastName = faker.person.lastName(sex);
  const fullName = faker.person.fullName({
    firstName,
    lastName,
    sex
  });
  const email = faker.internet.email({
    firstName,
    lastName,
    provider: 'goc.gov.tr'
  }).toLowerCase()

  return {
    id: faker.database.mongodbObjectId(),
    sex,
    firstName,
    lastName,
    fullName,
    email
  }
}

const users = Array.from({length: 10}).map(() => createUser());

const data = {
  users,
  todos: [
    {
      id: 1,
      text: 'Todo 1 from json-server',
      checked: false,
    },
    {
      id: 2,
      text: 'Todo 2 from json-server',
      checked: false,
    },
    {
      id: 3,
      text: 'Todo 3 from json-server',
      checked: false,
    },
  ]
}

fs.writeFileSync(
    './tools/data.json',
    JSON.stringify(data, null, 2),
    {
        encoding: 'utf-8',
    }
);
