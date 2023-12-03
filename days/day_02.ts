function solve_02(input: string): [string, string] {
    // Parse data
    const games = input
        .split('\n')
        .filter((line) => line.length)
        .map((line) =>
            line.split(": ")[1].split("; ").map((reveal) => {
                const values = { red: 0, green: 0, blue: 0 }
                reveal.split(", ").forEach((item) => {
                    const split = item.split(' ');
                    values[split[1]] = split[0];
                })
                return values;
            })
        );

    const solution_1: number = games
        .map((game, index) => {
            const badReveal = game.some(({ red, green, blue }) =>
                red > 12 || green > 13 || blue > 14
            );
            if (badReveal) return 0;
            return index + 1;
        })
        .reduce((sum, value) => sum + value, 0);

    const solution_2: number = games
        .map((game) => {
            const maxs = game.reduce((acc, { red, green, blue }) => {
                return {
                    red: Math.max(acc.red, red),
                    green: Math.max(acc.green, green),
                    blue: Math.max(acc.blue, blue)
                }
            }, { red: 0, green: 0, blue: 0 });
            return maxs.red * maxs.green * maxs.blue;
        })
        .reduce((sum, value) => sum + value, 0);

    return [String(solution_1), String(solution_2)];
}

// Read from stdin
// cat ./aoc\ rust/input/2023_day_2_input.txt | bun ./aoc-2023-ts/days/day_02.ts
process.stdin.setEncoding('utf-8');
process.stdin.on('data', (input: string) => {
    console.log(solve_02(input));
});
