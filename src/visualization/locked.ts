import { HEIGHT, WIDTH } from "../util/constants";

import { Visualization } from "./visualization";
import { VisualizationBinding } from "../util/canvas";

export class LockedVisualization extends Visualization {
	private readonly parent: Visualization;
	private readonly maxPlacements: number;

	private readonly locked = new Uint32Array(WIDTH * HEIGHT);

	constructor(name: string, parent: Visualization, maxPlacements: number) {
		super(name);

		this.parent = parent;
		this.maxPlacements = maxPlacements;
	}

	override draw(binding: VisualizationBinding, x: number, y: number, color: string): void {
		const index = y * WIDTH + x;
		if (this.locked[index] < this.maxPlacements) {
			this.locked[index] += 1;
			this.parent.draw(binding, x, y, color);
		}
	}
}
