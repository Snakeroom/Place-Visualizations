import { GENERATED_PATH } from "../util/constants";
import { INDEX_TEMPLATE } from "./template";
import { STYLES } from "./template/styles";
import { VisualizationBindingList } from "../util/canvas";
import { pageLog } from "../util/debug";
import { render } from "ejs";
import { writeFile } from "fs-extra";

export async function generateIndexPage(bindings: VisualizationBindingList): Promise<void> {
	pageLog("generating index page");

	const rendered = await render(INDEX_TEMPLATE, {
		bindings,
	}, {
		rmWhitespace: true,
	});
	pageLog("rendered index page");

	await writeFile(GENERATED_PATH + "/index.css", STYLES);
	await writeFile(GENERATED_PATH + "/index.html", rendered);
	pageLog("wrote index page");
}
