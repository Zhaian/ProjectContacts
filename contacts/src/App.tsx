import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./components/Layout/Layout.tsx";
import Contact from "./container/Contact/Contact.tsx";
import NewContact from "./container/NewContact/NewContact.tsx";
import EditComponent from "./container/EditData/EditData.tsx";

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<Layout/>}>
            <Route index element={<Contact/>}/>
              <Route path={'/add'} element={<NewContact/>}/>
              <Route path={'/:edit'} element={<EditComponent/>}/>
            </Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
