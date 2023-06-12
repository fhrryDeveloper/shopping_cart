import { BrowserRouter, Routes, Route } from "react-router-dom"
import App from "./App"
import Home from "./Home"
import Products from "./Products"
import Contacts from "./Contacts"

function RouteSwitch() {
  return (
    <BrowserRouter basename="shopping-cart">
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="contacts" element={<Contacts />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default RouteSwitch
