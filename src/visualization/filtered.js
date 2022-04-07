class FilteredVisualization {
	constructor(parent, predicate) {
		this.parent = parent;
		this.predicate = predicate;
	}

	draw(context, x, y, color) {
		if (this.predicate(x, y, color)) {
			this.parent.draw(context, x, y, color);
		}
	}
}
module.exports = FilteredVisualization;
