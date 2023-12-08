import { readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day2b(dataPath?: string) {
  const data = await readData(dataPath);

  const results = data
    .map((row) => {
      if (!row.length) {
        return 0;
      }
      const game = row.split(': ')[1];
      const minCountMap = {
        red: 0,
        green: 0,
        blue: 0,
      };
      const cubes = game.split('; ');
      cubes.forEach((cube) => {
        const colorCubes = cube.split(', ');
        colorCubes.forEach((c) => {
          const [count, color] = c.split(' ');
          const countNum = Number(count);
          if (countNum > minCountMap[color]) {
            minCountMap[color] = countNum;
          }
        });
      });
      return Object.values(minCountMap).reduce((acc, curr) => acc * curr, 1);
    })
    .reduce((acc, curr) => acc + curr, 0);
  return results;
}

const answer = await day2b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
