import { FilteredVisualization } from "./filtered";
import { LockedVisualization } from "./locked";
import { MultiBrushVisualization } from "./multi-brush";
import { PALETTE } from "../util/palette";
import { SimpleVisualization } from "./simple";
import { Visualization } from "./visualization";

function createVisualizations(): Record<string, Visualization> {
	const base = new SimpleVisualization("Base");
	const visualizations: Record<string, Visualization> = {
		/* eslint-disable camelcase */
		base,
		diamond_brush: new MultiBrushVisualization("Diamond Brush", base, [
			[0, 0],
			[-1, 0],
			[1, 0],
			[0, -1],
			[0, 1],
		]),
		locked_after_first_placement: new LockedVisualization("Locked After First Placement", base, 1),
		locked_after_hundredth_placement: new LockedVisualization("Locked After Hundredth Placement", base, 100),
		locked_after_tenth_placement: new LockedVisualization("Locked After Tenth Placement", base, 10),
		/* eslint-enable camelcase */
	};

	for (const entry of PALETTE) {
		visualizations[entry.key] = new FilteredVisualization(entry.name + " Only", base, (x: number, y: number, color: string) => {
			return color === entry.colorDefinition;
		});
	}

	return visualizations;
}

export const VISUALIZATIONS = createVisualizations();
