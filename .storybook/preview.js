import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ThemeProvider as Emotion10ThemeProvider } from 'emotion-theming';
import { withPerformance } from 'storybook-addon-performance';
import { setConsoleOptions } from '@storybook/addon-console';
import { withConsole } from '@storybook/addon-console';
import { Typography } from '@mui/material';
import { useDarkMode } from 'storybook-dark-mode';

setConsoleOptions({
  panelExclude: [],
});

export const parameters = {
  actions: { argTypesRegex: '^on.*' },
  controls: { expanded: true, sort: 'requiredFirst' },
};

const withThemeProvider = (Story, context) => {
  const defaultTheme = createTheme({
    palette: { mode: useDarkMode() ? 'dark' : 'light' },
  });

  return (
    <Emotion10ThemeProvider theme={defaultTheme}>
      <ThemeProvider theme={defaultTheme}>
        <Typography
          variant="subtitle2"
          style={{
            paddingBottom: '2rem',
            color: useDarkMode() ? '#aaa' : '#666',
          }}
        >
          Toggle Dark and Light Mode in the toolbar buttons above
        </Typography>
        <Story {...context} />
        <Typography
          variant="subtitle2"
          style={{ paddingTop: '2rem', color: useDarkMode() ? '#aaa' : '#666' }}
        >
          View Source Code Below in the Story Tab on Canvas or the Show Code
          Button in Docs
        </Typography>
      </ThemeProvider>
    </Emotion10ThemeProvider>
  );
};

const console = (storyFn, context) => withConsole()(storyFn)(context);

export const decorators = [withThemeProvider, withPerformance, console];
