import { ChakraProvider } from "@chakra-ui/react";
import Companies from "./components/Companies";
import Resources from "./components/Resources";
import Projects from "./components/Projects";
import "../src/components/component.css";
import "../src/index.css"
import theme from "./theme/config";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <body class="body">
        <div class="header">
          <div>
            <h1 class="headerText">Companies</h1>
            <Companies />
          </div>
          <div class="row">
            <div class="column">
              <h1 class="headerText">Resources</h1>
              <Resources />
            </div>
            <div class="column">
              <h1 class="headerText">Projects</h1>
              <Projects />
            </div>
          </div>
        </div>
      </body>
    </ChakraProvider>
  );
}

export default App;