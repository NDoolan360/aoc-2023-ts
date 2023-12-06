const solve_06 = (input: string): [string, string] => {
    const rawLines = parseLines(input);
    const [timeOne, distanceOne] = rawLines.map((l) => l.map(parseInt));
    const [timeTwo, distanceTwo] = rawLines.map((l) => parseInt(l.join('')));

    return [
        raceWinOptions(timeOne, distanceOne).toString(),
        raceWinOptions([timeTwo], [distanceTwo]).toString()
    ];
};

const parseLines = (input: string): string[][] => {
    return input
        .split('\n')
        .filter((l) => l.length > 0)
        .map((l) => l.split(':').slice(1).map((x) => x.trim().split(/\s+/)))
        .map((l) => l.flat());
};

const raceWinOptions = (times: number[], distances: number[]): number => {
    return times
        .map((time, i) => [time, distances[i]])
        .map(([t_max, max_dist]) =>
            Array.from(Array(t_max - 1).keys()).reduce((acc, t_charge) => {
                let dist = t_charge * (t_max - t_charge);
                if (dist > max_dist) {
                    return acc + 1
                }
                return acc
            }, 0)
        )
        .reduce((acc, values) => acc * values, 1);
};

// Read from stdin
// cat ./input/2023_day_6_input.txt | bun ./days/day_06.ts
process.stdin.setEncoding('utf-8');
process.stdin.on('data', (input: string) => {
    console.log(solve_06(input));
});
