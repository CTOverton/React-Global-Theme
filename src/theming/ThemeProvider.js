import React from 'react';
import ThemeContext from "./ThemeContext";
import defaultTheme from "./defaultTheme";

export default ({theme: localTheme, children}) => <ThemeContext.Provider value={{...defaultTheme, ...localTheme}}>{children}</ThemeContext.Provider>