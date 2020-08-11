import React from 'react'
import styles from './styles.module.css'

export const ExampleComponent = ({ text }) => {
  return <div className={styles.test}>Example Component: {text}</div>
}
/**
 * Global theme
 */

export {default as createTheme} from './theming/createTheme'
export {default as ThemeProvider} from './theming/ThemeProvider'
export {default as ThemeContext} from './theming/ThemeContext'
export {default as useTheme} from './theming/useTheme'

/**
 * Utilities
 */

export {default as deepMerge} from './util/deepMerge'
export {default as usePrevious} from './util/usePrevious'
