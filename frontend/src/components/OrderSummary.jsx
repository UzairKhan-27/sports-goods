import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import ShoppingCartCheckoutOutlinedIcon from "@mui/icons-material/ShoppingCartCheckoutOutlined";
import { Link as RouterLink, useNavigate } from "react-router-dom";

function OrderSummary({ userID, cartProducts }) {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        if (userID) {
            navigate(`/checkout/${userID}`);
        } else {
            navigate("/login");
        }
    };

    const marginFields = 2;
    const shipping = 300;
    const totalSum = cartProducts.reduce((sum, product) => {
        const price = product.sale ? product.new_price : product.regular_price;
        return sum + price * product.quantity;
    }, 0);
    const tax = Math.round(0.05 * totalSum);
    const finalSum = tax + totalSum;

    console.log("cartProducts");
    console.log(cartProducts);
    return (
        <Box width={"50%"} border={"solid 3px black"}>
            <Stack>
                <Typography
                    borderBottom={"solid 3px black"}
                    textAlign={"center"}
                    fontWeight={600}
                    variant="h4"
                    padding={2}
                >
                    ORDER SUMMARY
                </Typography>
                <Stack margin={marginFields} direction={"row"}>
                    <Typography flex={0.95} variant="h6">
                        SUB TOTAL
                    </Typography>
                    <Typography margin={"auto"}>{"RS." + totalSum}</Typography>
                </Stack>
                <Stack margin={marginFields} direction={"row"}>
                    <Typography flex={0.95} variant="h6">
                        Tax(5%)
                    </Typography>
                    <Typography margin={"auto"}>{"RS." + tax}</Typography>
                </Stack>
                <Stack
                    borderBottom={"solid 3px black"}
                    borderTop={"solid 3px black"}
                    direction={"row"}
                >
                    <Typography
                        fontWeight={"bold"}
                        margin={marginFields}
                        flex={0.95}
                        variant="h6"
                    >
                        TOTAL
                    </Typography>
                    <Typography fontWeight={"bold"} margin={"auto 10px"}>
                        {"RS." + finalSum}
                    </Typography>
                </Stack>
                <Box textAlign="center" fontWeight={"bold"}>
                    <Button
                        variant="contained"
                        fullWidth
                        size="large"
                        // component={RouterLink}
                        // to={`/checkout/${userID ? userID : "guest"}`}
                        onClick={handleButtonClick}
                        startIcon={<ShoppingCartCheckoutOutlinedIcon />}
                        sx={{
                            borderRadius: "0",
                            fontWeight: "bold",
                            backgroundColor: "black",
                        }}
                    >
                        Checkout
                    </Button>
                </Box>
            </Stack>
        </Box>
    );
}
export default OrderSummary;
