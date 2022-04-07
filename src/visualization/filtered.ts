import { CanvasRenderingContext2D } from "canvas";
import { Visualization } from "./visualization";

export type TilePredicate = (x: number, y: number, color: string) => boolean;

export class FilteredVisualization extends Visualization {
	private readonly parent: Visualization;
	private readonly predicate: TilePredicate;

	constructor(name: string, parent: Visualization, predicate: TilePredicate) {
		super(name);

		this.parent = parent;
		this.predicate = predicate;
	}

	override draw(context: CanvasRenderingContext2D, x: number, y: number, color: string): void {
		if (this.predicate(x, y, color)) {
			this.parent.draw(context, x, y, color);
		}
	}
}
