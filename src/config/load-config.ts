import { DEFAULT_CONFIG, PlaceVisualizationsConfig } from "./config";

import { configLog } from "../util/debug";
import { cosmiconfig } from "cosmiconfig";
import mergeDeep from "merge-deep";

export async function loadConfig(): Promise<PlaceVisualizationsConfig> {
	const explorer = cosmiconfig("placevisualizations", {
		searchPlaces: [
			"package.json",
			"config.json",
			".placevisualizationsrc",
			".placevisualizationsrc.json",
			".placevisualizationsrc.yaml",
			".placevisualizationsrc.yml",
			".placevisualizationsrc.js",
			".placevisualizationsrc.cjs",
			"placevisualizations.config.js",
			"placevisualizations.config.cjs",
		],
	});

	const result = await explorer.search();
	if (result === null) {
		configLog("using default configuration: %O", DEFAULT_CONFIG);
		return DEFAULT_CONFIG;
	}

	const config = mergeDeep(DEFAULT_CONFIG, result.config);

	configLog("loaded configuration from '%s'", result.filepath);
	configLog("loaded configuration: %O", config);

	return config;
}
