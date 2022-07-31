// create a component that uses the dark mode hook
import styled, {ThemeProvider} from "styled-components";
import {main} from "#src/theme";
import {Fonts} from "#src/fonts";

function ThemeWrapper(props) {
    // render your custom theme provider
    return <ThemeProvider theme={main}>{props.children}</ThemeProvider>;
}

export const parameters = {
    actions: {argTypesRegex: "^on[A-Z].*"},
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
}

const StoryContainer = styled.div`
  padding: 3em;
  background-color: ${(props) => props.theme.color.schemaBG};
`;

export const decorators = [
    (renderStory) => (
        <ThemeWrapper>
            <StoryContainer>{renderStory()}</StoryContainer>
        </ThemeWrapper>
    ),
    (Story) => (
        <>
            <Fonts/>
            <Story/>
        </>
    ),
];