import ImageCarousel from "../components/ImageCarousel";
import DrawerAppBar from "../components/Navbar";
import Section from "../components/Section";
import CategoryList from "../components/CategoryLists";

function Header() {
    return (
        <>
            <DrawerAppBar />
            <ImageCarousel />
            <Section sectionHeading={"New Arrival"} />
            <Section sectionHeading={"Trending"} />
            <CategoryList />
        </>
    );
}

export default Header;