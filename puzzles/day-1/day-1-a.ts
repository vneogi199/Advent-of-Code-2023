import { isNumber } from 'util';
import { readData } from '../../shared.ts';
import chalk from 'chalk';
import { join } from 'path';

export async function day1a(dataPath?: string) {
  const data = (await readData(dataPath)) as string[];
  let result = 0;
  data.forEach((row) => {
    let firstNum = 0;
    let lastNum = 0;
    for (let i = 0; i < row.length; i++) {
      const character = row[i];
      const toNumber = parseInt(character);
      if (!isNaN(toNumber)) {
        firstNum = toNumber;
        break;
      }
    }
    for (let i = row.length - 1; i >= 0; i--) {
      const character = row[i];
      const toNumber = parseInt(character);
      if (!isNaN(toNumber)) {
        lastNum = toNumber;
        break;
      }
    }
    const joinedNum = +`${firstNum}${lastNum}`;
    result += joinedNum;
  });
  return result;
}

const answer = await day1a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
