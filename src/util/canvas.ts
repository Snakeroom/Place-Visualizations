import { GENERATED_PATH, HEIGHT, WIDTH } from "./constants";

import { Canvas } from "canvas";
import { CanvasRenderingContext2D } from "canvas";
import { PaletteEntry } from "./palette";
import { Visualization } from "../visualization/visualization";
import fs from "fs-extra";
import { log } from "./debug";

export class VisualizationBinding {
	private readonly key: string;
	private readonly visualization: Visualization;

	private readonly canvas: Canvas;
	private readonly context: CanvasRenderingContext2D;

	private readonly imageData: ImageData;

	constructor(key: string, visualization: Visualization) {
		this.key = key;
		this.visualization = visualization;

		this.canvas = new Canvas(WIDTH, HEIGHT);
		this.context = this.canvas.getContext("2d");

		this.imageData = this.context.getImageData(0, 0, WIDTH, HEIGHT);
		this.imageData.data.fill(0xFF);
	}

	putPixel(x: number, y: number, color: PaletteEntry) {
		const offset = (y * WIDTH + x) * 4;
		this.imageData.data.set(color.rgb, offset);
	}

	/**
	 * @param x the X coordinate of the placed tile
	 * @param y the Y coordinate of the placed tile
	 * @param color the color definition of the placed tile
	 */
	draw(x: number, y: number, color: string): void {
		this.visualization.draw(this, x, y, color);
	}

	getFileName(): string {
		return `${this.key}.png`;
	}

	getPath(): string {
		return `${GENERATED_PATH}/${this.getFileName()}`;
	}

	getRelativePath(): string {
		return "./" + this.getFileName();
	}

	getKey(): string {
		return this.key;
	}

	getName(): string {
		return this.visualization.getName();
	}

	write(): Promise<void> {
		return new Promise((resolve, reject) => {
			this.visualization.finalize(this);
			this.context.putImageData(this.imageData, 0, 0);
			log("finalized '%s' visualization binding", this.key);

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

type VisualizationBindingForEach = (value: VisualizationBinding) => void;

export class VisualizationBindingList {
	private readonly bindings: VisualizationBinding[];

	constructor(visualizations: Record<string, Visualization>) {
		this.bindings = Object.entries(visualizations)
			.map(([key, visualization]) => {
				return new VisualizationBinding(key, visualization);
			})
			.sort((a, b) => {
				return a.getName().localeCompare(b.getName());
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

		for (const binding of this.bindings) {
			await binding.write();
		}

		log("wrote %d visualization bindings", this.getSize());
	}

	forEach(callback: VisualizationBindingForEach): void {
		this.bindings.forEach(callback);
	}
}
