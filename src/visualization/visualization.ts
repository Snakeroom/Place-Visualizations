import { CanvasRenderingContext2D } from "canvas";


export abstract class Visualization {
	/**
	 * @param context the context to draw the placed tile to
	 * @param x the X coordinate of the placed tile
	 * @param y the Y coordinate of the placed tile
	 * @param color the color definition of the placed tile
	 */
	abstract draw(context: CanvasRenderingContext2D, x: number, y: number, color: string): void;
}