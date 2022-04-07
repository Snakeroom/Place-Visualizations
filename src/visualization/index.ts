import { FilteredVisualization } from "./filtered";
import { PALETTE } from "../util/palette";
import { SimpleVisualization } from "./simple";
import { Visualization } from "./visualization";

function createVisualizations(): Record<string, Visualization> {
	const base = new SimpleVisualization("Base");
	const visualizations: Record<string, Visualization> = {
		base,
	};

	for (const entry of PALETTE) {
		visualizations[entry.key] = new FilteredVisualization(entry.name + " Only", base, (x: number, y: number, color: string) => {
			return color === entry.colorDefinition;
		});
	}

	return visualizations;
}

export const VISUALIZATIONS = createVisualizations();
