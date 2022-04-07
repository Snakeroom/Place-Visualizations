const { palette } = require("../util/constants.js");
const FilteredVisualization = require("./filtered.js");
const Visualization = require("./visualization.js");

const base = new Visualization();
const visualizations = {
	base,
};

for (const [ key, filterColor ] of Object.entries(palette)) {
	visualizations[key] = new FilteredVisualization(base, (x, y, color) => {
		return color === filterColor;
	});
}

module.exports.visualizations = visualizations;
