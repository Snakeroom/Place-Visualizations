const csvParser = require("csv-parser");
const fs = require("fs-extra");
const { createGunzip } = require("zlib");
const { visualizations } = require("./visualization");
const VisualizationBindingList = require("./util/canvas.js");
const log = require("./util/debug.js");
const { dataOrder } = require("./util/constants");

function generate(path, bindings) {
	return new Promise((resolve, reject) => {
		const stream = fs
			.createReadStream(path)
			.pipe(createGunzip())
			.pipe(csvParser());

		stream.on("data", data => {
			const coordinates = data.coordinate.split(",");
			if (coordinates.length === 2) {
				bindings.drawAll(coordinates[0], coordinates[1], data.pixel_color);
			}
		});

		stream.on("end", () => {
			resolve();
		});

		stream.on("error", error => {
			reject(error);
		});
	});
}

async function generateAll() {
	const bindings = new VisualizationBindingList(visualizations);
	log("created %d visualization bindings", bindings.getSize());

	let index = 0;
	for (const number of dataOrder) {
		const dataKey = number.toString().padStart(12, "0");
		const path = "./data/2022_place_canvas_history-" + dataKey + ".csv.gzip";

		const percent = (number / dataOrder.length * 100).toFixed(2);
		try {
			await generate(path, bindings);
			log("finished generating from '%s' (%d of %d, %d%%)", path, index + 1, dataOrder.length, percent);
		} catch {
			log("failed to generate from '%s' (%d of %d, %d%%)", path, index + 1, dataOrder.length, percent);
		}

		if (index > 4) {
			break;
		}
		index += 1;
	}

	await bindings.writeAll();
}
/* eslint-disable-next-line unicorn/prefer-top-level-await */
generateAll();
