import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Paper,
} from "@mui/material";
import useFetchAdminOrders from "../hooks/useFetchAdminOrders";

function ManageOrders() {
    const { orders, loading, error } = useFetchAdminOrders();

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography>Error loading orders.</Typography>;

    return (
        <section>
            <Typography
                mb={3}
                variant="h4"
                fontWeight={"bold"}
                textAlign={"center"}
            >
                My Orders
            </Typography>
            <TableContainer
                component={Paper}
                style={{
                    maxWidth: "80%",
                    margin: "0 auto",
                    backgroundColor: "whitesmoke",
                }}
            >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <b>Order ID</b>
                            </TableCell>
                            <TableCell>
                                <b>Total Amount (RS)</b>
                            </TableCell>
                            <TableCell>
                                <b>Created At</b>
                            </TableCell>
                            <TableCell>
                                <b>Status</b>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.order_id}>
                                <TableCell>{order.order_id}</TableCell>
                                <TableCell>
                                    {"RS." + order.total_amount}
                                </TableCell>
                                <TableCell>
                                    {new Date(
                                        order.created_at
                                    ).toLocaleString()}
                                </TableCell>
                                <TableCell
                                    style={{
                                        color:
                                            order.status === "shipped"
                                                ? "green"
                                                : "#D9512C",
                                        fontWeight: "bold",
                                    }}
                                >
                                    <Typography textTransform={"capitalize"}>
                                        {order.status}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </section>
    );
}

export default ManageOrders;
