import React, { useEffect, useState } from "react";
import "./CategoriesCard.scss";
import { Link, useNavigate } from "react-router-dom";
import { useFunctions } from "../../context/FunctionsSupply";
import { Card } from "antd";

function CategoriesCard() {
  const { getAllCategories } = useFunctions();
  const [loading, setLoading] = useState(false);
  const [allCategories, setAllCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true)
    getAllCategories()
      .then((data) => {
        setAllCategories(data)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setLoading(true)
      })
  }, [getAllCategories]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="categories-wrapper">

      {allCategories && allCategories.map((item) =>
        <Card
          key={item._id}
          className="category-card ant-card-responsive"
          hoverable
          onClick={() => navigate(`/category/${item._id}`)}
        >
          <div className="category-card-img">
            <img src={item.categoryimage} alt={item.categoryname} />
          </div>
          <div className="category-card-text">
            <h3>
              <Link className="links-fix text-black" to={`/category/${item._id}`}>
                {item.categoryname}
              </Link>
            </h3>
          </div>
        </Card>
      )}


    </div>
  );
}

export default CategoriesCard;
