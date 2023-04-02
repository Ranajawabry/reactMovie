
import { Outlet } from 'react-router-dom'
import Footer from '../component/Footer/Footer'
import Loader from '../component/Loader/Loader'
import Navbar from '../component/Navbar/Navbar'
import { ToastContainer} from 'react-toastify'

export default function Layout(props) {
    
    return (
    <>
        <Navbar userdata={props.userdata} logOut={props.logOut}/>
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
             />
        <Outlet/>
        <Footer/>
    </>
  )
}
