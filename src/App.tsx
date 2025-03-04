import { useEffect } from "react";
import "./App.css";
import { validateTypeDefinitions } from "./validation";

function App() {
  const typeDefs = `
    type Movie
      title: String!
      year: Int!
    }
  `;

  useEffect(() => {
    const validate = async () => {
      const result = await validateTypeDefinitions(false, typeDefs);
      console.log(result);
    };
    validate();
  }, [typeDefs]);

  return (
    <>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
