class Visualization {
	/**
	 * @param {import("canvas").CanvasRenderingContext2D} context the context to draw the placed tile to
	 * @param {number} x the X coordinate of the placed tile
	 * @param {number} y the Y coordinate of the placed tile
	 * @param {string} color the color definition of the placed tile
	 */
	draw(context, x, y, color) {
		context.fillStyle = color;
		context.fillRect(x, y, 1, 1);
	}
}
module.exports = Visualization;
