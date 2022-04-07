export interface PlaceVisualizationsConfig {
	indexPage: boolean;
	maxFiles: number | -1;
}

export const DEFAULT_CONFIG: PlaceVisualizationsConfig = {
	indexPage: true,
	maxFiles: -1,
};
