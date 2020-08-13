# Global Theme Implementation Guide
Use the global theme logic in your project as fast as possible. And get familiar with more advanced details and best practices.

## Quick start

### Install

> Note: Add as an npm package for quick and easy install.

1. Install the library to your project. Copy the contents of the **src directory** into your own project.

```
|-- Project Root
|   |-- components
|   |-- lib
|   |   |-- react-global-theme // Copy contents of src to here
|   |-- index.js
```

### Usage

```jsx
import React from 'react'

import { createTheme, ThemeProvider, useTheme } from 'react-global-theme'

const globalTheme = createTheme({
  // Override the default theme with custom values
  palette: {
    primary: {
      main: '#738',
    }
  },

  // Add additional custom data
  customPadding: {
    small: 10,
    large: 20,
  }
})

const App = () => {
  return (
    <ThemeProvider theme={globalTheme}>
      <ThemedComponent />
    </ThemeProvider>
)
}

const ThemedComponent = () => {
  // Use hook to get theme to any component
  const theme = useTheme();

  // Pass theme to style object for scoped styles
  const styles = useStyles(theme);

  return (
    <div style={styles.example}>
      Example Themed Component
    </div>
  )
}

const useStyles = theme => ({
  example: {
    // -------- Access global theme ------------
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    padding: theme.customPadding.large,
    // -----------------------------------------

    margin: '20%',
    borderRadius: 100,
    textAlign: 'center',
  }
})

export default App

```

## Specifics
Use the quick start steps and you are good to go with the basic use of the theme. Now let's talk about what is what and how we can use this in your entire project.

### Theme Provider
In order to use the theme provide it to the components.

1. Wrap the root of your application with the `ThemeProvider` component.

```jsx
import React from 'react'

import { ThemeProvider } from 'react-global-theme'

const App = () => {
  return (
    <ThemeProvider>
      <RootScreen />
    </ThemeProvider>
  )
}

export default App

```

### Using the default theme
Theme provider uses the React Context and hooks to pass the theme object to any component.  It wraps without having to pass properties down.

1. To access the theme object, use the`useTheme()` hook.

```jsx
import React from 'react'

import { useTheme } from 'react-global-theme'

const ChildComponent = () => {
  const theme = useTheme();

  return (
    <div>The default primary theme color is {theme.palette.primary.main}</div>
  )
}

export default ChildComponent

```

### Customizing the theme
The current default theme is an object. Override this object to change any of the default values.

Also,  add any additional values for use throughout your application.

```jsx
import React from 'react'

import { createTheme, ThemeProvider, useTheme } from 'react-global-theme'

// --------------------------------------------------
const globalTheme = createTheme({
  // Override the default theme with custom values
  palette: {
    primary: {
      main: '#738',
    }
  },

  // Add additional custom data
  customPadding: {
    small: 10,
    large: 20,
  }
})
// --------------------------------------------------

const App = () => {
  return (
    <ThemeProvider theme={globalTheme}>
      <RootScreen />
    </ThemeProvider>
)
}

export default App

```

> A good way to find out what the default theme has to offer is to use `console.log(useTheme())` and view the full theme object and all predefined values.

### Nested Themes
Nest themes to give different parts of the applications a different look while maintaining consistency throughout all components.

```jsx
import React from 'react'

import { createTheme, ThemeProvider, useTheme } from 'react-global-theme'

const globalTheme = createTheme({
  palette: {
    primary: {
      main: '#738',
    }
  },
})

const nestedTheme = createTheme({
  palette: {
    primary: {
      main: '#444',
    }
  },
})


const App = () => {
  return (
    <ThemeProvider theme={globalTheme}>
      <ThemedComponent /> {/* Notice these are the same */}
      <ThemeProvider theme={nestedTheme}>
        <ThemedComponent /> {/* Notice these are the same */}
      </ThemeProvider>
    </ThemeProvider>
)
}

const ThemedComponent = () => {
  // Notice this hook will access the most relevant theme context
  const theme = useTheme();

  return (
    <div>My primary color is {theme.palette.primary.main}</div>
  )
}

export default App

```
