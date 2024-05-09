import { faker } from "@faker-js/faker";
import { Task } from "./columns";

const STATUS_ON_DECK = { id: 1, name: "On Deck" };
const STATUS_IN_PROGRESS = {
  id: 2,
  name: "In Progress",
};
const STATUS_TESTING = { id: 3, name: "Testing" };
const STATUS_DEPLOYED = { id: 4, name: "Deployed" };

export const STATUSES = [
  STATUS_ON_DECK,
  STATUS_IN_PROGRESS,
  STATUS_TESTING,
  STATUS_DEPLOYED,
];

const existingNotes = [
  "This is a note",
  "Use Jest",
  "Remove old data",
  "Add JS Docs to all endpoints",
  "Upgrade React & Chakra UI",
];

const generateRandomData = () => {
  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      task: faker.hacker.verb() + " " + faker.hacker.noun(),
      status: faker.helpers.shuffle(STATUSES)[0]!,
      due: faker.datatype.boolean() ? faker.date.soon(90) : null,
      notes: existingNotes[i % existingNotes.length],
    });
  }
  return data;
};

const DATA = generateRandomData();

export default DATA;

export type TaskSub = {
  task: string;
  status?: { id: number; name: string };
  due?: Date | null;
  notes: string;
  age: number;
  subRows?: TaskSub[];
};

const newTask = (): TaskSub => {
  return {
    task: faker.hacker.verb() + " " + faker.hacker.noun(),
    status: faker.helpers.arrayElement(STATUSES),
    due: faker.datatype.boolean() ? faker.date.soon(90) : null,
    notes: existingNotes[1],
    age: faker.number.int({ min: 10, max: 1000 }),
  };
};

const range = (len: number) => {
  const arr: number[] = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

export function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): TaskSub[] => {
    const len = lens[depth]!;
    return range(len).map((d): TaskSub => {
      return {
        ...newTask(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return makeDataLevel();
}
