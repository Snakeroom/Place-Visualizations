import { HEIGHT, WIDTH } from "../util/constants";

import { RED } from "../util/palette";
import { Visualization } from "./visualization";
import { VisualizationBinding } from "../util/canvas";

const TOUCHED = 1;

export class UntouchedVisualization extends Visualization {
	private readonly touched = new Uint8Array(WIDTH * HEIGHT);

	override draw(binding: VisualizationBinding, x: number, y: number): void {
		this.touched[y * WIDTH + x] = TOUCHED;
	}

	override finalize(binding: VisualizationBinding): void {
		let index = 0;
		for (let x = 0; x < WIDTH; x += 1) {
			for (let y = 0; y < HEIGHT; y += 1) {
				if (this.touched[index] !== TOUCHED) {
					binding.putPixel(x, y, RED);
				}
				index += 1;
			}
		}
	}
}
