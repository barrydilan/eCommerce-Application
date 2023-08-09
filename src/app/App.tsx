import { BrowserRouter, Route, Routes } from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<p>Main page</p>} />
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
