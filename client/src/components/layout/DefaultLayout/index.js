
import { Box } from "@mui/material";
import Navigation from "../navigation";
import Footer from "../footer";




function DefaultLayout({ children }) {
    return (
        <Box sx={{
            flex: 1,
            display: 'flex',
            height: '100%',
            backgroundColor: '#f9f9f9'
        }}>
            <Box
                minWidth={250}
                height="100vh"
            >
                <Navigation />
            </Box>
            <Box
                display="flex"
                flexDirection="column"
                justifyItems="center"
                flex={1}
            >
                {children}
                <Footer />
            </Box>
           
        </Box>
    );
}

export default DefaultLayout;