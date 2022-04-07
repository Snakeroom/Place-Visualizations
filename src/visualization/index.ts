import { FilteredVisualization } from "./filtered";
import { PALETTE } from "../util/constants";
import { SimpleVisualization } from "./simple";
import { Visualization } from "./visualization";

function createVisualizations(): Record<string, Visualization> {
	const base = new SimpleVisualization();
	const visualizations: Record<string, Visualization> = {
		base,
	};

	for (const [key, filterColor] of Object.entries(PALETTE)) {
		visualizations[key] = new FilteredVisualization(base, (x: number, y: number, color: string) => {
			return color === filterColor;
		});
	}

	return visualizations;
}

export const VISUALIZATIONS = createVisualizations();
