# Theme Development Guide
This section is dedicated to setting up your own custom theme logic from the ground up.

> If you want to use the pre-existing code in your own project, just follow the Theme Implementation guide instead.

## First things first
A good place to start before developing this method yourself is to understand how this works and what we are trying to do, I reccomend reviewing the implementation guide to see what each component we will be making will be used for.

## Creating the context
The whole method behind this implementation of global theming is that the theme at it's core is nothing more than an `object` that can be accessed from any component in your application.

The way we can achieve this is by using [React Context](https://reactjs.org/docs/context.html).

By specifying our theme as a context we can reference it throughout our app via React Hooks.

For our purpose we can make a context out of the default theme object.

#### ThemeContext
```jsx
import React from 'react';
const defaultTheme = {
    palette: {
        primary: {
            main: '#777'
        },
        secondary: {
            main: '#aaa'
        }
    }
}

export default React.createContext(defaultTheme);
```

## Using the context
Context is a lot like scopes in programming, and maybe even more like context in spoken language. The purpose is when you reference something you have a context to provide relevant meaning.

![Context Meme](https://i.pinimg.com/originals/3a/29/ca/3a29ca58edc699ba4482a1c9645c7887.jpg)

And this is where our context provider comes into play. So if we think about our application as the conversation, we need to provide it with the context of our theme.

#### ThemeProvider
```jsx
import React from 'react';
import ThemeContext from "./ThemeContext";
import defaultTheme from "./defaultTheme";

export default ({children}) => <ThemeContext.Provider value={{...defaultTheme}}>{children}</ThemeContext.Provider>
```

#### Implementation
By wrapping the root of our application with the provider we are successfully giving context of our theme to any components within it, and any components further and further down the tree.
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

## Accessing the theme
Now that we have the context for the theme and we know what we are talking about, we need a way to access it from any component within the scope of that context. We do this by creating a hook into the context.

#### useTheme
```jsx
import React from 'react';
import ThemeContext from "./ThemeContext";

export default function useTheme() {
    return React.useContext(ThemeContext)
}
```

#### Implementation
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

## What else?

In this process we showed how you can use context to access a theme object anywhere in your application, but there are other features this specific library provides relevant to the theming process.

### Overriding the default theme
This isn't incredibly useful if you are implementing this theme logic on a project per project basis. The reason it is provided with this library however is so that we can have a set theme to start users off with they can use immediately without having to customize anything. This is very useful for the same library being implemented on multiple projects.

> See implementation guide for details

### Nested Themes
Along with overriding the default theme, just like in conversations you can create multiple contexts, and with this we can nest themes to give different parts of our applications different looks while maintaining consistency throughout all our components.

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

### Deep Merge
A very useful utility to not only merge objects at the shallow first set of children, but can traverse two object trees and merge them at every level.

This is very useful when overriding themes and applying custom values.

### Colors
Though not currently implemented, there is a method to the madness in how this project structure is setup for the elementes provided in the default theme. One of which being the colors. One day the goal is to use the main color provided for colors to generate a relavant light and dark version. That way creating a dark mode of light mode app will be very simple.
