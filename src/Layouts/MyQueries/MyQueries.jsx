import { useContext, useEffect, useRef, useState } from "react";
import Slide from "../../Components/Slide";
import bannerImg from "../../assets/banner.jpg";
import axios from "axios";
import { AuthContext } from "../../Provider/AuthProvider";
import MyQueryCard from "../../Components/MyQueryCard";
import { Link, useLocation, useNavigate } from "react-router-dom";
const MyQueries = () => {
  const [queries, setQueries] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [gridLayout, setGridLayout] = useState("grid-cols-3");
  const [deleteQuery, setDeleteQuery] = useState(queries);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const myQueries = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/allQuery/${user?.email}`,
          { withCredentials: true }
        );
        console.log(data);
        setDeleteQuery(data);
        setErrorMessage("");
      } catch (error) {
        if (error.response.status === 401) {
          setErrorMessage("No Queries Found");
        } else {
          console.log(error);
        }
      }
    };
    if (user) {
      myQueries();
    }
  }, [user]);

  const handleColumns = (col) => {
    setGridLayout(col);
  };
  return (
    <div className="space-y-2">
      <div>
        <Slide
          image={bannerImg}
          text={"Submit Your Query and let the community Recommend!"}
          button={"Add Queries"}
        ></Slide>
      </div>

      <div>
        {errorMessage ? (
          <div className="py-12 text-center">
            <p
              style={{
                color: "red",
                textAlign: "center",
                padding: "16px",
                paddingTop: "0px",
                fontSize: "32px",
                fontWeight: "bold",
              }}
            >
              {errorMessage}
            </p>
            <Link to="/addQuery">
              <button className="px-4 p-2 bg-[#2B3440] rounded-none text-white font-semibold">
                Add Query
              </button>
            </Link>
          </div>
        ) : (
          <div>
            <div className="w-3/5 text-center mx-auto py-6">
              <h2 className="text-4xl font-semibold">Explore All My Queries</h2>
              <p>
                Don’t hesitate to ask anything! Add your query here and explore
                a world of insights, ideas, and personalized recommendations
                from experts and peers alike."
              </p>
            </div>
            <div className="lg:w-11/12 w-full mx-auto flex lg:justify-end justify-center items-center gap-2">
              <button
                onClick={() => handleColumns("grid-cols-1")}
                className="btn text-lg font-semibold"
              >
                1 columns
              </button>
              <button
                onClick={() => handleColumns("grid-cols-2")}
                className="btn text-lg font-semibold"
              >
                2 columns
              </button>
              <button
                onClick={() => handleColumns("grid-cols-3")}
                className="btn text-lg font-semibold"
              >
                3 columns
              </button>
            </div>
            <div className={`w-11/12 mx-auto grid ${gridLayout} grid-cols-1 py-6 gap-6`}>
              {deleteQuery.map((query) => (
                <MyQueryCard
                  deleteQuery={deleteQuery}
                  setDeleteQuery={setDeleteQuery}
                  query={query}
                  key={query._id}
                ></MyQueryCard>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyQueries;
