import { DATA_PATH, GENERATED_PATH, dataOrder } from "./util/constants";

import { PlaceVisualizationsConfig } from "./config/config";
import { VISUALIZATIONS } from "./visualization";
import { VisualizationBindingList } from "./util/canvas";
import { createGunzip } from "node:zlib";
import csvParser from "csv-parser";
import fs from "fs-extra";
import { generateIndexPage } from "./page/generator";
import { loadConfig } from "./config/load-config";
import { log } from "./util/debug";

function generate(path: string, bindings: VisualizationBindingList): Promise<void> {
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

async function generateAll(config: PlaceVisualizationsConfig) {
	const bindings = new VisualizationBindingList(VISUALIZATIONS);
	log("created %d visualization bindings", bindings.getSize());

	let index = 0;
	for (const number of dataOrder) {
		const dataKey = number.toString().padStart(12, "0");
		const path = `${DATA_PATH}/2022_place_canvas_history-${dataKey}.csv.gzip`;

		const percent = (number / dataOrder.length * 100).toFixed(2);
		try {
			await generate(path, bindings);
			log("finished generating from '%s' (%d of %d, %d%%)", path, index + 1, dataOrder.length, percent);
		} catch {
			log("failed to generate from '%s' (%d of %d, %d%%)", path, index + 1, dataOrder.length, percent);
		}

		index += 1;
		if (config.maxFiles !== -1 && index >= config.maxFiles) {
			log("stopping early to respect max files configuration");
			break;
		}
	}

	await fs.ensureDir(GENERATED_PATH);
	await bindings.writeAll();

	if (config.indexPage) {
		await generateIndexPage(bindings);
	}
}

async function run() {
	const config = await loadConfig();
	await generateAll(config);
}

/* eslint-disable-next-line unicorn/prefer-top-level-await */
run();
