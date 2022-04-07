import { Visualization } from "./visualization";

export class SimpleVisualization extends Visualization {
	override draw(context: CanvasRenderingContext2D, x: number, y: number, color: string): void {
		context.fillStyle = color;
		context.fillRect(x, y, 1, 1);
	}
}
