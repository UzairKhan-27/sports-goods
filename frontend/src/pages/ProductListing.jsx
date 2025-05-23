import { useEffect, useState } from "react";
import ListingCard from "../components/ListingCard";
import useFetch from "../hooks/useFetch";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Loading from "../components/Loading";
import Filter from "../components/Filter";
import FilterPrice from "../components/FilterPrice";
import { useSearchParams } from "react-router-dom";

function ProductListing() {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [filterLoading, setFilterLoading] = useState(false);
    const { products, setProducts, loading, error } = useFetch("/api/products");
    const { Data } = useAuth();
    const { cartID, setCartID } = useAuth();
    const [searchParams] = useSearchParams();
    const category_id = searchParams.get("category_id");
    console.log("category_id" + category_id);

    console.log(products);
    console.log("productsNewPrice");


    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                if (Data !== null) {
                    const response = await axios.get("/api/getallwishlist");
                    setWishlistItems(response.data.wishlistItems);
                    console.log(response.data);
                    console.log("we wish");
                    console.log(response.data.wishlistItems);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                console.log("finally");
            }
        };

        fetchWishlist();
    }, []);
    console.log(wishlistItems);

    async function handleAddToCart(
        product_id,
        quantity,
        setQuantity,
        setLoadingAddToCart,
        setToastMessage,
        setToastOpen
    ) {
        setLoadingAddToCart(true);
        console.log("these are add to cart");
        console.log({ product_id, quantity });
        try {
            const response = await axios.post("/api/add", {
                product_id,
                cartId: cartID,
                quantity,
            });
            console.log(response.data);
            setCartID(response.data.cartId);
            setQuantity(1);
            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product.product_id === product_id
                        ? { ...product, stock: product.stock - quantity }
                        : product
                )
            );
            setLoadingAddToCart(false);
            setToastMessage("Added to cart successfully!");
            setToastOpen(true);
        } catch (error) {
            console.error(
                "Error while adding product to cart:",
                error.response?.data || error.message
            );

            setToastMessage("Failed to add to cart! Please try again.");
            setToastOpen(true);
        }
    }

    if (loading) return <Loading />;
    if (error) return <p>error</p>;
    console.log(products);
    console.log("the cart now");
    console.log(cartID);

    return (
        <>
            <Stack direction={"row"}>
                <Stack gap={5} flex={1}>
                    <Filter
                        setFilterLoading={setFilterLoading}
                        products={products}
                        setProducts={setProducts}
                        category_id={category_id}
                    />
                </Stack>
                <Stack
                    direction={"row"}
                    gap={4}
                    flexWrap={"wrap"}
                    justifyContent={"center"}
                    marginBottom={5}
                    flex={5}
                >
                    {!filterLoading ? (
                        products.map((product) => (
                            <div
                                style={{ display: "flex" }}
                                key={product.product_id}
                            >
                                <ListingCard
                                    product_id={product.product_id}
                                    name={product.name}
                                    price={product.price}
                                    stock={product.stock}
                                    image_url={"/images/" + product.image_url}
                                    cartID={cartID}
                                    wishlistItems={wishlistItems}
                                    setWishlistItems={setWishlistItems}
                                    handleAddToCart={handleAddToCart}
                                    newPrice={product.new_price}
                                    average_rating={product.average_rating}
                                />
                            </div>
                        ))
                    ) : (
                        <Loading />
                    )}
                </Stack>
            </Stack>
        </>
    );
}
export default ProductListing;
