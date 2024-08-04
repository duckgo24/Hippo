import Footer from "../footer";
import Header from "../header";



function DefaultLayout({children}) {
    return ( 
        <div>
            <Header></Header>
            {children}
            <Footer></Footer>
        </div>
     );
}

export default DefaultLayout;