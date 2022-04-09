import { HEIGHT, WIDTH } from "../util/constants";

import { PALETTE, RED } from "../util/palette";
import { Visualization } from "./visualization";
import { VisualizationBinding } from "../util/canvas";

const FULL_BITFIELD = 0b1111111111111111;

export class EveryColorVisualization extends Visualization {
	private readonly leastColors = new Uint32Array(WIDTH * HEIGHT);
	private readonly mostColors = new Uint32Array(WIDTH * HEIGHT);

	override draw(binding: VisualizationBinding, x: number, y: number, color: string): void {
		const index = PALETTE.findIndex(entry => {
			return color === entry.colorDefinition;
		});

		if (index >= 16) {
			const mask = 1 << (index - 16);
			this.mostColors[y * WIDTH + x] |= mask;
		} else if (index >= 0) {
			const mask = 1 << index;
			this.leastColors[y * WIDTH + x] |= mask;
		}
	}

	override finalize(binding: VisualizationBinding): void {
		let index = 0;
		for (let x = 0; x < WIDTH; x += 1) {
			for (let y = 0; y < HEIGHT; y += 1) {
				if (this.leastColors[index] === FULL_BITFIELD && this.mostColors[index] === FULL_BITFIELD) {
					binding.putPixel(x, y, RED);
				}
				index += 1;
			}
		}
	}
}
