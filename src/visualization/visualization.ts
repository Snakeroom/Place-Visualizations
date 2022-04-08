import { VisualizationBinding } from "../util/canvas";

export abstract class Visualization {
	private readonly name: string;

	constructor(name: string) {
		this.name = name;
	}

	getName(): string {
		return this.name;
	}

	/**
	 * @param binding the binding to draw the placed tile to
	 * @param x the X coordinate of the placed tile
	 * @param y the Y coordinate of the placed tile
	 * @param color the color definition of the placed tile
	 */
	abstract draw(binding: VisualizationBinding, x: number, y: number, color: string): void;

	/**
	 * @param binding the binding to finalize
	 */
	/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
	finalize(binding: VisualizationBinding): void {
		return;
	}
}
