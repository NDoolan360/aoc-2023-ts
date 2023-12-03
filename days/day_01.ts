function solve_01(input: string): [string, string] {
    const solution1: number = input
        .split('\n')
        .map(firstLastDigitConcat)
        .reduce((acc, curr) => acc + curr, 0);

    const solution2: number = input
        .replace(/zero/g, 'zero0zero')
        .replace(/one/g, 'one1one')
        .replace(/two/g, 'two2two')
        .replace(/three/g, 'three3three')
        .replace(/four/g, 'four4four')
        .replace(/five/g, 'five5five')
        .replace(/six/g, 'six6six')
        .replace(/seven/g, 'seven7seven')
        .replace(/eight/g, 'eight8eight')
        .replace(/nine/g, 'nine9nine')
        .split('\n')
        .map(firstLastDigitConcat)
        .reduce((acc, curr) => acc + curr, 0);

    return [solution1.toString(), solution2.toString()];
}

function firstLastDigitConcat(inString: string): number {
    if (inString === '') return 0;

    const digits: number[] = Array.from(inString)
        .map((char) => parseInt(char))
        .filter((digit) => !isNaN(digit));

    return digits[0] * 10 + digits[digits.length - 1];
}

// Read from stdin
// cat input/2023_day_1_input.txt | bun ./src/years/year_2023/day_01.ts
process.stdin.setEncoding('utf-8');
process.stdin.on('data', (input: string) => {
    console.log(solve_01(input));
});
