import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import {Signup} from './pages/Signup';
import {Signin} from './pages/Signin';
import {Blog} from './pages/Blog';
import {Blogs} from "./pages/Blogs";
import { Publish } from "./pages/Publish";
import { ProtectedRoute } from "./components/protectedRoute";
import { Appbar } from "./components/Appbar";

function App(){

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element = {<Navigate to ="/signin" />} />

          <Route path="/signup" element={<><Appbar /><Signup /></>} />
          <Route path="/signin" element={<><Appbar /><Signin /></>} />


          <Route path="/blog/:id" element={
            <ProtectedRoute>
              <>
                <Appbar />
                <Blog />
              </>
            </ProtectedRoute>} />
          <Route path="/blogs" element={<ProtectedRoute><><Appbar /><Blogs /></></ProtectedRoute>} />
          <Route path="/publish" element={<ProtectedRoute><><Appbar /><Publish /></></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App