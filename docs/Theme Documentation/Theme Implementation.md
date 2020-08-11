# Global Theme Implementation Guide
This guide is meant to get you using the global theme logic in your project as fast as possible, as well as explaining some of the more advanced details and best practices.

## Quick start

### Install

> Todo: Add as npm package for quick and easy install

To install the library to your project copy the contents of the src directory into your own project

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
So if you setup your project with the quick start you should be good to go with the basic use of the theme. Now let's talk about what is what and how we can use this in our entire project.

### Theme Provider
In order to use the theme to begin with we have to provide it to our components.

We do this by wrapping the root of our application with the `ThemeProvider` component.

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
Theme provider uses React's Context and hooks to pass the theme object to any component it wraps without having to pass properties down from child to child.

To access the theme object we use the provided `useTheme()` hook.

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
The current default theme is an object, and this object can be overridden to change any of the default values.

We can also add any additional values we want to use throughout our application.

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

> A good way to find out what the default theme has to offer is to `console.log(useTheme())` to see the full theme object and all predefined values

### Nested Themes
We can nest themes to give different parts of our applications different looks while maintaining consistency throughout all our components.

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
