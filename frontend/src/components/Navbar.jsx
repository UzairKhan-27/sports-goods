import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Divider } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Badge from "@mui/material/Badge";
import axios from "axios";
import useFetch from "../hooks/useFetch";
import { useState } from "react";
import useFetchCartItems from "../hooks/useFetchCartItems";

const drawerWidth = 240;
function DrawerAppBar(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const { Data, cartID } = useAuth();
    const { cartProductsLength } = useFetchCartItems();
    const {
        products: categories,
        loading,
        error,
    } = useFetch("/api/categories");

    const navItems = [Data?.isUser ? Data?.user_id : "Login"];

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
            <Typography variant="h6" sx={{ my: 2, fontWeight: "bold" }}>
                Categories
            </Typography>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item} disablePadding>
                        <ListItemButton
                            component={RouterLink}
                            to={"/" + item}
                            sx={{ textAlign: "center" }}
                        >
                            <ListItemText primary={item} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const container =
        window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar component="nav" sx={{ backgroundColor: "black" }}>
                <Toolbar>
                    <Box sx={{ display: "flex", flexGrow: { xs: 0, sm: 1 } }}>
                        
                        <Button component={RouterLink} to={"/"} color="inherit">Play Max</Button>
                    </Box>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            display: { xs: "none", sm: "block" },
                        }}
                    >
                        <Box sx={{ display: { xs: "none", sm: "block" } }}>
                            {categories.map((category) => (
                                <Button
                                    component={RouterLink}
                                    to={`/product-listing?category_id=${category.category_id}`} // Use the category_id in the URL
                                    key={category.category_id}
                                    sx={{ color: "#fff" }}
                                >
                                    {category.name}{" "}
                                </Button>
                            ))}
                            {navItems.map((item) => (
                                <Button
                                    component={RouterLink}
                                    to={
                                        item === Data?.user_id
                                            ? `/dashboard/${item}`
                                            : `/${item}`
                                    }
                                    key={item}
                                    sx={{ color: "#fff" }}
                                >
                                    {item}
                                </Button>
                            ))}
                        </Box>
                    </Typography>

                    <IconButton
                        component={RouterLink}
                        to={`/cart/${Data?.user_id ?? "guest"}`}
                        sx={{
                            color: "white",
                            display: "flex",
                            verticalAlign: "text-top",
                            flexGrow: { xs: 1, sm: 0 },
                        }}
                    >
                        <Badge color="error" badgeContent={cartProductsLength}>
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>

                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: "none" } }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <nav>
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    anchor="right"
                    ModalProps={{
                        keepMounted: true, // for mobile.
                    }}
                    sx={{
                        display: { xs: "block", sm: "none" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
            <Box component="main" sx={{ p: 3 }}>
                <Toolbar />
            </Box>
        </Box>
    );
}


export default DrawerAppBar;
