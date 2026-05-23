import { useOutletContext } from "react-router-dom";
import style from "./HomeFilter.module.css";

// followed single responsibility principle
function HomeFilterSidebar() {
  const { maxPrice, setMaxPrice, selectedCategories, setSelectedCategories } =
    useOutletContext();

  function handleFilterPrice(e) {
    setMaxPrice(Number(e.target.value));
  }

  function handleCategoryChange(e) {
    const { value, checked } = e.target;

    let updatedCategories;

    if (checked) {
      updatedCategories = [...selectedCategories, value];
    } else {
      updatedCategories = selectedCategories.filter(
        (category) => category !== value
      );
    }

    setSelectedCategories(updatedCategories);
  }

  return (
    <>
      <div className={style.container}>
        <div className={style.filterContainer}>
          <h2 className={style.filterHeading}>Filter</h2>
          <div className={style.price}>Price: {maxPrice}</div>
          <div className={style.priceSlider}>
            <input
              type="range"
              name=""
              id=""
              min="100"
              max="99999"
              value={maxPrice}
              onChange={handleFilterPrice}
            />
          </div>
        </div>

        <div className={style.categoryContainer}>
          <h2 className={style.categoryHeading}>Category</h2>
          <div className={style.categoryItems}>
            <div>
              <input
                type="checkbox"
                value="men"
                checked={selectedCategories.includes("men")}
                onChange={handleCategoryChange}
              />{" "}
              <span> Men's Clothing</span>
            </div>
            <div>
              <input
                type="checkbox"
                value="women"
                checked={selectedCategories.includes("women")}
                onChange={handleCategoryChange}
              />
              <span> Women's Clothing</span>
            </div>
            <div>
              <input
                type="checkbox"
                value="jewelery"
                checked={selectedCategories.includes("jewelery")}
                onChange={handleCategoryChange}
              />
              <span> Jewellery</span>
            </div>
            <div>
              <input
                type="checkbox"
                value="electronics"
                checked={selectedCategories.includes("electronics")}
                onChange={handleCategoryChange}
              />
              <span> Electronics </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default HomeFilterSidebar;
