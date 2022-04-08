import { PALETTE_BY_COLOR_DEFINITION } from "../util/palette";
import { Visualization } from "./visualization";
import { VisualizationBinding } from "../util/canvas";

export class SimpleVisualization extends Visualization {
	override draw(binding: VisualizationBinding, x: number, y: number, color: string): void {
		binding.putPixel(x, y, PALETTE_BY_COLOR_DEFINITION[color]);
	}
}
