export class PaletteEntry {
	readonly key: string;
	readonly name: string;

	readonly colorDefinition: string;
	readonly rgb: Uint8ClampedArray;

	constructor(key: string, name: string, color: number) {
		this.key = key;
		this.name = name;

		this.colorDefinition = "#" + color
			.toString(16)
			.toUpperCase()
			.padStart(6, "0");
		this.rgb = Uint8ClampedArray.of(color >> 16 & 0xFF, color >> 8 & 0xFF, color & 0xFF);
	}
}

export const BEIGE = new PaletteEntry("beige", "Beige", 0xFFB470);
export const BLACK = new PaletteEntry("black", "Black", 0x000000);
export const BLUE = new PaletteEntry("blue", "Blue", 0x3690EA);
export const BROWN = new PaletteEntry("brown", "Brown", 0x9C6926);
export const BURGUNDY = new PaletteEntry("burgundy", "Burgundy", 0x6D001A);
export const DARK_BLUE = new PaletteEntry("dark_blue", "Dark Blue", 0x2450A4);
export const DARK_BROWN = new PaletteEntry("dark_brown", "Dark Brown", 0x6D482F);
export const DARK_GRAY = new PaletteEntry("dark_gray", "Dark Gray", 0x515252);
export const DARK_GREEN = new PaletteEntry("dark_green", "Dark Green", 0x00A368);
export const DARK_PURPLE = new PaletteEntry("dark_purple", "Dark Purple", 0x811E9F);
export const DARK_RED = new PaletteEntry("dark_red", "Dark Red", 0xBE0039);
export const DARK_TEAL = new PaletteEntry("dark_teal", "Dark Teal", 0x00756F);
export const GRAY = new PaletteEntry("gray", "Gray", 0x898D90);
export const GREEN = new PaletteEntry("green", "Green", 0x00CC78);
export const INDIGO = new PaletteEntry("indigo", "Indigo", 0x493AC1);
export const LAVENDER = new PaletteEntry("lavender", "Lavender", 0x94B3FF);
export const LIGHT_BLUE = new PaletteEntry("light_blue", "Light Blue", 0x51E9F4);
export const LIGHT_GRAY = new PaletteEntry("light_gray", "Light Gray", 0xD4D7D9);
export const LIGHT_GREEN = new PaletteEntry("light_green", "Light Green", 0x7EED56);
export const LIGHT_PINK = new PaletteEntry("light_pink", "Light Pink", 0xFF99AA);
export const LIGHT_TEAL = new PaletteEntry("light_teal", "Light Teal", 0x00CCC0);
export const MAGENTA = new PaletteEntry("magenta", "Magenta", 0xDE107F);
export const ORANGE = new PaletteEntry("orange", "Orange", 0xFFA800);
export const PALE_PURPLE = new PaletteEntry("pale_purple", "Pale Purple", 0xE4ABFF);
export const PALE_YELLOW = new PaletteEntry("pale_yellow", "Pale Yellow", 0xFFF8B8);
export const PERIWINKLE = new PaletteEntry("periwinkle", "Periwinkle", 0x6A5CFF);
export const PINK = new PaletteEntry("pink", "Pink", 0xFF3881);
export const PURPLE = new PaletteEntry("purple", "Purple", 0xB44AC0);
export const RED = new PaletteEntry("red", "Red", 0xFF4500);
export const TEAL = new PaletteEntry("teal", "Teal", 0x009EAA);
export const WHITE = new PaletteEntry("white", "White", 0xFFFFFF);
export const YELLOW = new PaletteEntry("yellow", "Yellow", 0xFFD635);

export const PALETTE = [
	BEIGE,
	BLACK,
	BLUE,
	BROWN,
	BURGUNDY,
	DARK_BLUE,
	DARK_BROWN,
	DARK_GRAY,
	DARK_GREEN,
	DARK_PURPLE,
	DARK_RED,
	DARK_TEAL,
	GRAY,
	GREEN,
	INDIGO,
	LAVENDER,
	LIGHT_BLUE,
	LIGHT_GRAY,
	LIGHT_GREEN,
	LIGHT_PINK,
	LIGHT_TEAL,
	MAGENTA,
	ORANGE,
	PALE_PURPLE,
	PALE_YELLOW,
	PERIWINKLE,
	PINK,
	PURPLE,
	RED,
	TEAL,
	WHITE,
	YELLOW,
];

export const PALETTE_BY_COLOR_DEFINITION = Object.fromEntries(PALETTE.map(entry => {
	return [
		entry.colorDefinition,
		entry,
	];
}));
