// promptTemplateSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const promptTemplateSlice = createSlice({
  name: "promptTemplate",
  initialState: {
    template: `Generate a fully responsive HTML and CSS code for a web page based on the following parameters:
    {page description}
    
    Requirements:
    - Use CSS Grid or Flexbox for the layout to ensure responsiveness across desktop, tablet, and mobile devices.
    - Style the page with modern CSS to achieve a contemporary look.
    - Each card should include an image and text, and clicking on a card should redirect to the corresponding link.
    - Apply the specified theme to the overall design of the page.
    
    Only provide the HTML and CSS code without any explanations or additional text.
    
    CSS and style need to be included in the HTML code.
    `,
    parameters: {},
  },
  reducers: {
    setTemplate: (state, action) => {
      state.template = action.payload;
    },
    setParameters: (state, action) => {
      state.parameters = action.payload;
    },
  },
});

export const { setTemplate, setParameters } = promptTemplateSlice.actions;
export default promptTemplateSlice.reducer;
