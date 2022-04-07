const fs = require("fs-extra");
const { Canvas } = require("canvas");
const { width, height, palette } = require("./constants");
const log = require("./debug");

const generated = "./generated";

class VisualizationBinding {
	constructor(key, visualization) {
		this.key = key;
		this.visualization = visualization;

		this.canvas = new Canvas(width, height);
		this.context = this.canvas.getContext("2d");

		this.context.fillStyle = palette.white;
		this.context.fillRect(0, 0, width, height);
	}

	/**
	 * @param {number} x the X coordinate of the placed tile
	 * @param {number} y the Y coordinate of the placed tile
	 * @param {string} color the color definition of the placed tile
	 */
	draw(x, y, color) {
		this.visualization.draw(this.context, x, y, color);
	}

	getPath() {
		return `${generated}/${this.key}.png`;
	}

	write() {
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

class VisualizationBindingList {
	constructor(visualizations) {
		this.bindings = Object.entries(visualizations).map(([key, visualization]) => {
			return new VisualizationBinding(key, visualization);
		});
	}

	getSize() {
		return this.bindings.length;
	}

	/**
	 * @param {number} x the X coordinate of the placed tile
	 * @param {number} y the Y coordinate of the placed tile
	 * @param {string} color the color definition of the placed tile
	 */
	drawAll(x, y, color) {
		for (const binding of this.bindings) {
			binding.draw(x, y, color);
		}
	}

	async writeAll() {
		log("writing %d visualization bindings", this.getSize());

		await fs.ensureDir(generated);
		for (const binding of this.bindings) {
			await binding.write();
		}

		log("wrote %d visualization bindings", this.getSize());
	}
}
module.exports = VisualizationBindingList;
