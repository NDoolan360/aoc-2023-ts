const solve_05 = (_input: string): [string, string] => {
    

    return ["".toString(), "".toString()];
}

// Read from stdin
// cat ./input/2023_day_4_input.txt | bun ./aoc-2023-ts/days/day_04.ts
process.stdin.setEncoding('utf-8');
process.stdin.on('data', (input: string) => {
    console.log(solve_04(input));
});
