
import { Box, Grid } from "@mui/material";
import Navigation from "../navigation";



function DefaultLayout({ children }) {
    return (
        <Box sx={{
            flex: 1,
            display: 'flex',
            height: '100vh',
        }}>
            <Navigation />
            <Box flex={1}>
                {children}
            </Box>
        </Box>
    );
}

export default DefaultLayout;