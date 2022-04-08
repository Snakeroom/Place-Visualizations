import { HEIGHT, WIDTH } from "../util/constants";

import { Visualization } from "./visualization";
import { VisualizationBinding } from "../util/canvas";

type Offset = [number, number];

export class MultiBrushVisualization extends Visualization {
	private readonly parent: Visualization;
	private readonly offsets: Offset[];

	constructor(name: string, parent: Visualization, offsets: Offset[]) {
		super(name);

		this.parent = parent;
		this.offsets = offsets;
	}

	override draw(binding: VisualizationBinding, originX: number, originY: number, color: string): void {
		for (const offset of this.offsets) {
			const x = originX + offset[0];
			if (x < 0) continue;
			if (x >= WIDTH) continue;

			const y = originY + offset[1];
			if (y < 0) continue;
			if (y >= HEIGHT) continue;

			this.parent.draw(binding, x, y, color);
		}
	}
}
