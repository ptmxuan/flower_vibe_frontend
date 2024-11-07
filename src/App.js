import "./App.css";
import Layout from "./layouts/Layout";
import { CartProvider, CombineDataProvider } from "@/store";
function App() {
  return (
    <div className="App">
      <CombineDataProvider>
        <CartProvider>
          <Layout />
        </CartProvider>
      </CombineDataProvider>
    </div>
  );
}

export default App;
