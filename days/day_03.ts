type Grid = string[][];

function solve_03(_input: string): [string, string] {
    const grid: Grid = _input
        .split('\n')
        .map(line => line.split(''))
        .filter(row => row.length > 0);

    let sum_parts = 0;
    const gears: Map<string, number[]> = new Map();

    for (let y = 0; y < grid.length; y++) {
        const row = grid[y];
        let number: string[] = [];
        let symbol_found = false;
        let gear_loc: string | null = null;

        for (let x = 0; x < row.length; x++) {
            const value = row[x];

            if (value.match(/\d/)) {
                number.push(value);

                // Check neighbours
                const neighbours = get_neighbours(grid, x, y);
                for (const [neighbour, new_x, new_y] of neighbours) {
                    if (neighbour?.match(/[^\.\d]/)) {
                        symbol_found = true;
                    }
                    if (neighbour === '*') {
                        gear_loc = `${new_x},${new_y}`;
                    }
                }
            }

            if (!value.match(/\d/) || x >= (row.length - 1)) {
                if (number.length > 0 && symbol_found) {
                    const part_num = parseInt(number.join(''));
                    sum_parts += part_num;

                    if (gear_loc !== null) {
                        gears.set(gear_loc, (gears.get(gear_loc) || []).concat(part_num));
                    }
                }
                number = [];
                symbol_found = false;
                gear_loc = null;
            }
        }
    }

    const sum_gear_ratios: number = Array.from(gears.values())
        .filter(s => s.length === 2)
        .map(s => s[0] * s[1])
        .reduce((acc, val) => acc + val, 0);

    console.log(Array.from(gears.entries()))

    return [sum_parts.toString(), sum_gear_ratios.toString()];
}

function get_neighbours(grid: Grid, x: number, y: number): [string, number, number][] {
    const neighbours: [string, number, number][] = [];

    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            // Skip the center point
            if (i === 0 && j === 0) {
                continue;
            }

            const [new_x, new_y] = [x + i, y + j];

            if (new_x >= 0 && new_y >= 0) {
                // Check if the new indices are within bounds
                const row = grid[new_y];
                if (row !== undefined) {
                    const neighbour = row[new_x];
                    if (neighbour !== undefined)
                        neighbours.push([neighbour, new_x, new_y]);
                }
            }
        }
    }
    return neighbours;
}

// Read from stdin
// cat ./aoc\ rust/input/2023_day_3_input.txt | bun ./aoc-2023-ts/days/day_03.ts
process.stdin.setEncoding('utf-8');
process.stdin.on('data', (input: string) => {
    console.log(solve_03(input));
});
