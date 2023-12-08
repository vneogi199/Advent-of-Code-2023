import { readData } from '../../shared.ts';
import chalk from 'chalk';

const maxPossible = {
  red: 12,
  green: 13,
  blue: 14,
};
export async function day2a(dataPath?: string) {
  const data = await readData(dataPath);

  const results = data
    .map((row) => {
      if (!row.length) {
        return 0;
      }
      const [gameStr, game] = row.split(': ');
      const gameNum = gameStr.split(' ')[1];
      const cubes = game.split('; ');
      const isPossible = cubes.every((cube) => {
        const colorCubes = cube.split(', ');
        return colorCubes.every((c) => {
          const [count, color] = c.split(' ');
          return Number(count) <= maxPossible[color];
        });
      });
      return isPossible ? Number(gameNum) : 0;
    })
    .reduce((acc, curr) => acc + curr, 0);
  return results;
}

const answer = await day2a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
