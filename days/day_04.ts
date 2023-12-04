const solve_04 = (_input: string): [string, string] => {
    const cards = _input
        .split('\n')
        .filter((l) => l.length)
        .map(line => {
            const [winning, mine] = line.split(/:/)[1].split(/\|/);
            return [winning.trim().split(/\s+/), mine.trim().split(/\s+/)];
        })

    let pointAcc = 0;
    let cardScores = Array(cards.length).fill(1);

    cards.forEach(([winning, mine], i) => {
        let matches = mine.filter((v) => winning.includes(v)).length;
        if (!matches) return;
        pointAcc += Math.pow(2, matches - 1);
        while (matches) {
            cardScores[i + matches] += cardScores[i];
            matches -= 1;
        }
    })

    return [pointAcc.toString(), cardScores.reduce((a, b) => a + b).toString()];
}

// Read from stdin
// cat ./input/2023_day_4_input.txt | bun ./aoc-2023-ts/days/day_04.ts
process.stdin.setEncoding('utf-8');
process.stdin.on('data', (input: string) => {
    console.log(solve_04(input));
});
