
import { Box } from "@mui/material";
import Navigation from "../navigation";
import Footer from "../footer";




function DefaultLayout({ children }) {
    return (
        <div className="flex flex-row bg-slate-100 overflow-hidden h-screen">
            <div className="max-w-56">
                <Navigation />
            </div>

            <div className="overflow-y-auto flex-1">
                {children}
            </div>
        </div>
    );
}

export default DefaultLayout;