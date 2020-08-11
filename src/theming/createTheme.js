import createPalette from "./createPalette";

export default (options = {}) => {
    const {
        palette: paletteInput = {},
      ...other
    } = options;

    return {
      palette: createPalette(paletteInput),
      ...other
    }
}
