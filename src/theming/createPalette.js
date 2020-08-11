import deepMerge from "../util/deepMerge";

import {common} from "./Colors/common";
import {red} from "./Colors/red";
import {green} from "./Colors/green";
import {blue} from "./Colors/blue";
import {yellow} from "./Colors/yellow";

export default (palette) => {
    const {
        // The colors used to represent primary interface elements for a user.
        primary = {
            light: blue[1],
            main: blue[1],
            dark: blue[1],
        },
        // The colors used to represent secondary interface elements for a user.
        secondary = {
            light: yellow[1],
            main: yellow[1],
            dark: yellow[1],
        },
        // The colors used to represent interface elements that the user should be made aware of.
        error = {
            light: red[1],
            main: red[1],
            dark: red[1],
        },
        // The colors used to represent potentially dangerous actions or important messages.
        warning = {
            light: yellow[1],
            main: yellow[1],
            dark: yellow[1],
        },
        // The colors used to present information to the user that is neutral and not necessarily important.
        info = {
            light: blue[1],
            main: blue[1],
            dark: blue[1],
        },
        // The colors used to indicate the successful completion of an action that user triggered.
        success = {
            light: green[1],
            main: green[1],
            dark: green[1],
        },
        // The palette type, can be light or dark.
        type = 'light',
        ...other
    } = palette;

    // Todo: automate light and dark mode based off main

    return deepMerge({
        common,
        primary,
        secondary,
        error,
        warning,
        info,
        success,
        type,
        },
        other,
    )
}
