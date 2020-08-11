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
