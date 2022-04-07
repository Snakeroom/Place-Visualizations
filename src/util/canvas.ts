import { HEIGHT, PALETTE, WIDTH } from "./constants";

import { Canvas } from "canvas";
import { CanvasRenderingContext2D } from "canvas";
import { Visualization } from "../visualization/visualization";
import fs from "fs-extra";
import { log } from "./debug";

const generated = "./generated";

class VisualizationBinding {
	private readonly key: string;
	private readonly visualization: Visualization;

	private readonly canvas: Canvas;
	private readonly context: CanvasRenderingContext2D;

	constructor(key: string, visualization: Visualization) {
		this.key = key;
		this.visualization = visualization;

		this.canvas = new Canvas(WIDTH, HEIGHT);
		this.context = this.canvas.getContext("2d");

		this.context.fillStyle = PALETTE.white;
		this.context.fillRect(0, 0, WIDTH, HEIGHT);
	}

	/**
	 * @param x the X coordinate of the placed tile
	 * @param y the Y coordinate of the placed tile
	 * @param color the color definition of the placed tile
	 */
	draw(x: number, y: number, color: string): void {
		this.visualization.draw(this.context, x, y, color);
	}

	getPath(): string {
		return `${generated}/${this.key}.png`;
	}

	write(): Promise<void> {
		return new Promise((resolve, reject) => {
			const stream = this.canvas
				.createPNGStream()
				.pipe(fs.createWriteStream(this.getPath()));

			stream.on("finish", () => {
				log("finished writing '%s' visualization binding", this.key);
				resolve();
			});
			stream.on("error", error => {
				reject(error);
			});
		});
	}
}

export class VisualizationBindingList {
	private readonly bindings: VisualizationBinding[];

	constructor(visualizations: Record<string, Visualization>) {
		this.bindings = Object.entries(visualizations).map(([key, visualization]) => {
			return new VisualizationBinding(key, visualization);
		});
	}

	getSize(): number {
		return this.bindings.length;
	}

	/**
	 * @param x the X coordinate of the placed tile
	 * @param y the Y coordinate of the placed tile
	 * @param color the color definition of the placed tile
	 */
	drawAll(x: number, y: number, color: string): void {
		for (const binding of this.bindings) {
			binding.draw(x, y, color);
		}
	}

	async writeAll(): Promise<void> {
		log("writing %d visualization bindings", this.getSize());

		await fs.ensureDir(generated);
		for (const binding of this.bindings) {
			await binding.write();
		}

		log("wrote %d visualization bindings", this.getSize());
	}
}
