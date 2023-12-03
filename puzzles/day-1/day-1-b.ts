import { readData } from '../../shared.ts';
import chalk from 'chalk';

const numberMappings = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};
const numberTexts = Object.keys(numberMappings);
export async function day1b(dataPath?: string) {
  const data = (await readData(dataPath)) as string[];
  let result = 0;
  data.forEach((row) => {
    let firstNum = 0;
    let lastNum = 0;

    const allNumMatch = [...row.matchAll(/\d/g)];

    const firstNumMatch = allNumMatch?.[0];
    const firstNumMatchIndex = firstNumMatch?.index;
    const firstNumMatchValue = firstNumMatch?.[0];

    const lastNumMatch = allNumMatch?.[allNumMatch.length - 1];
    const lastNumMatchIndex = lastNumMatch?.index;
    const lastNumMatchValue = lastNumMatch?.[0];

    let firstTextMatchValue = undefined;
    let firstTextMatchIndex = undefined;
    for (let i = 0; i < row.length; i++) {
      const element = row.slice(i);
      const matchText = numberTexts.find((txt) => element.startsWith(txt));
      if (matchText) {
        firstTextMatchIndex = i;
        firstTextMatchValue = matchText;
        break;
      }
    }

    let lastTextMatchValue = undefined;
    let lastTextMatchIndex = undefined;
    for (let i = row.length - 1; i >= 0; i--) {
      const element = row.slice(i);
      const matchText = numberTexts.find((txt) => element.startsWith(txt));
      if (matchText) {
        lastTextMatchIndex = i;
        lastTextMatchValue = matchText;
        break;
      }
    }

    if (firstTextMatchIndex === undefined || firstTextMatchIndex === null) {
      firstNum = coerceNanToZero(+firstNumMatchValue);
    } else if (
      firstNumMatchIndex === undefined ||
      firstNumMatchIndex === null
    ) {
      firstNum = coerceNanToZero(numberMappings[firstTextMatchValue]);
    } else if (firstNumMatchIndex < firstTextMatchIndex) {
      firstNum = coerceNanToZero(+firstNumMatchValue);
    } else {
      firstNum = coerceNanToZero(numberMappings[firstTextMatchValue]);
    }

    if (lastTextMatchIndex === undefined || lastTextMatchIndex === null) {
      lastNum = coerceNanToZero(+lastNumMatchValue);
    } else if (lastNumMatchIndex === undefined || lastNumMatchIndex === null) {
      lastNum = coerceNanToZero(numberMappings[lastTextMatchValue]);
    } else if (lastNumMatchIndex > lastTextMatchIndex) {
      lastNum = coerceNanToZero(+lastNumMatchValue);
    } else {
      lastNum = coerceNanToZero(numberMappings[lastTextMatchValue]);
    }

    const joinedNum = +`${firstNum}${lastNum}`;
    result += joinedNum;
  });
  return result;
}

function coerceNanToZero(num: number) {
  return isNaN(num) ? 0 : num;
}

const answer = await day1b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
