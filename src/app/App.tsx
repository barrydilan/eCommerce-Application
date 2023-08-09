import { BrowserRouter, Route, Routes } from 'react-router-dom';

import NavBlock from '../pages/NavBlock/NavBlock';
import Header from '../widgets/Header/Header';

function MainPage() {
  return (
    <main
      className="
        mx-auto 
        grid 
        min-h-screen 
        grid-cols-1
        grid-rows-mobGridRows
        2xl:container
        md:grid-cols-tabGridCols
        md:grid-rows-tabGridRows
        lg:grid-cols-deskGridCols
        "
    >
      <Header />
      <div
        className="
          md:col-start-2
          md:col-end-3
          md:row-start-2
          md:row-end-3
          "
      >
        Main content will be here
      </div>
      <NavBlock />
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<MainPage />} />
        <Route path="registration" element={<p>Registration</p>} />
        <Route path="login" element={<p>Login</p>} />
        <Route path="delivery" element={<p>Delivery</p>} />
        <Route path="payment" element={<p>Payment</p>} />
        <Route path="about" element={<p>About us</p>} />
        <Route path="*" element={<p>Page not found</p>} />
      </Routes>
    </BrowserRouter>
  );
}
