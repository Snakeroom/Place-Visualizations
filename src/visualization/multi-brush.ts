import { HEIGHT, WIDTH } from "../util/constants";

import { Visualization } from "./visualization";
import { VisualizationBinding } from "../util/canvas";

function clamp(value: number, min: number, max: number) {
	return Math.max(min, Math.min(max, value));
}

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
			const x = clamp(originX + offset[0], 0, WIDTH);
			const y = clamp(originY + offset[1], 0, HEIGHT);

			this.parent.draw(binding, x, y, color);
		}
	}
}
