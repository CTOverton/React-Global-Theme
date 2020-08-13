# Theme Development Guide
Set up your custom theme logic from the ground up.

>To use pre-existing code in your own project, follow the Theme Implementation guide instead.

## First things first
Before developing this method yourself understand how it works. Check out the Implementation guide to understand what each component you make will be used for.

## Creating the context
The method behind this implementation of global theming madness is that the theme is nothing more than an `object`. Nifty, right? It can be accessed from any component in your application.

Use [React Context](https://reactjs.org/docs/context.html) to achieve this.

Specify your theme as a context to reference it throughout the app with React Hooks.

Here, a context is made out of the default theme object.

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
Context is a lot like scopes in programming, and maybe even more like context in spoken language. The ideas is that when you reference something there is context, or a backdrop, to provide relevant meaning.

![Context Meme](https://i.pinimg.com/originals/3a/29/ca/3a29ca58edc699ba4482a1c9645c7887.jpg)

This is where the context provider comes into play.  So, consider the application as the conversation, then you provide it with the context of your theme.

#### ThemeProvider
```jsx
import React from 'react';
import ThemeContext from "./ThemeContext";
import defaultTheme from "./defaultTheme";

export default ({children}) => <ThemeContext.Provider value={{...defaultTheme}}>{children}</ThemeContext.Provider>
```

#### Implementation
By wrapping the root of the application with the provider, you give context of the theme to any components within it, and any components down the tree.
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
Now that the context for the theme is established and the conversation is started, create access to it from any component within the scope of that context.  Do this by creating a hook into the context.

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

### What else?

Now that you can use context to access a theme object anywhere in your application, here are other features this specific library provides relevant to the theming process.

#### Overriding the default theme
The reason the default theme is provided with this library is so that a structure exsists to build off of.  Use it right off the bat without a the concern of customization. It is very useful to have the same library implemented on multiple projects, and not reimplemented the same logic on a project by painstaking project basis. 

> See the Implementation guide for details.

#### Nested themes
Along with overriding the default theme, just like in conversations, you can create multiple contexts.  Here you can nest themes to give different parts of our applications different looks while maintaining consistency throughout all your components.

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

#### Deep merge
Override themes and apply custom values to not only merge objects at the shallow first set of children, but also across two object trees.  Merge them at every level. 

#### Colors
Though not currently implemented, there is plan to the project structure as to how elementes are provided in the default theme. The goal is to use the main color provided for colors to generate a relavant light and dark version. This way creating a dark or light mode app is very simple.
