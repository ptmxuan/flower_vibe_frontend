import "./App.css";
import Layout from "./layouts/Layout";
import { CartProvider, CombineDataProvider, UserProvider } from "@/store";
function App() {
  return (
    <div className="App">
      <UserProvider>
        <CombineDataProvider>
          <CartProvider>
            <Layout />
          </CartProvider>
        </CombineDataProvider>
      </UserProvider>
    </div>
  );
}

export default App;
