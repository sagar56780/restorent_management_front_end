import React, { useEffect, useState } from "react";
import FoodItem from "./FoodItem";
import { IoSearchSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { getAllMenuItem } from "../feature/getMenuItemSlice";

const Menu = () => {
  const dispatch = useDispatch();
  const { loading, error, data } = useSelector((state) => state);
  const [foodItemData, setFoodItemData] = useState(data?.data?.data);
  const foodCategory = new Set(foodItemData?.map((val) => val.category));
  

  useEffect(() => {
    const fetchData = async () => {
      const res = await dispatch(getAllMenuItem());
      setFoodItemData(res?.payload?.data?.data);
    };
    fetchData();
  }, [dispatch]);
  return (
    <div className="mx-20 flex h-full">
      <section className="w-96 pt-10 ">
        <h1 className="font-bold text-3xl text-center">TFC MENU</h1>
        <ul>{Array.from(foodCategory).map((val,ind)=>{
          return <li className="list-none py-4 text-center" key={ind}>{val}</li>
        })}</ul>
      </section>
      <div className="w-full overflow-auto scrollbar-hide rounded-xl">
        <div className="h-11 rounded-3xl w-48 placeholder:font-bold m-5 flex justify-center items-center focus-within:border-orange-300 mt-20 border-solid">
          <IoSearchSharp />
          <input
            type="search"
            placeholder="search our menu "
            className="border-none placeholder:text-black outline-none pl-2"
          />
        </div>
        <div className="w-full h-[1.5px] bg-black"></div>
        <h1 className="pt-4 pl-4">ZINGER: BUY 1 GET 1</h1>

        <section className="w-full flex flex-wrap">
          <FoodItem />
          <FoodItem />
          <FoodItem />
          <FoodItem />
        </section>
      </div>
    </div>
  );
};

export default Menu;
