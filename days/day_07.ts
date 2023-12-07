const solve_07 = (_input: string): [string, string] => {
    // Passed, did it just in rust

    return ["".toString(), "".toString()];
}

// Read from stdin
// cat ./input/2023_day_7_input.txt | bun ./days/day_07.ts
process.stdin.setEncoding('utf-8');
process.stdin.on('data', (input: string) => {
    console.log(solve_07(input));
});
