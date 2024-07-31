import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import CityList from "./components/CityList";
import City from "./components/City";
import CountryList from "./components/CountryList";
import Form from "./components/Form";
import {CitiesProvider} from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/fakeAuthContent";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  return (
<AuthProvider>
  <CitiesProvider>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="app" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
              <Route
               index
                element={
                  <CityList/>
                }
              />
              <Route
                path="cities"
                element={
                  <CityList/>
                }
              /> 
              <Route path="cities/:id" element={<City />} />
              <Route
                path="Countries"
                element={
                  <CountryList/>
                }
              />
            <Route path="form" element={<Form/>} />
          </Route>
          <Route path="product" element={<Product />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </CitiesProvider>
  </AuthProvider>
  );
}

export default App;
