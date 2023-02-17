import BarChart from "../contents/BarChart";
import HomeList from "./HomeList";
import MyProfile from "./MyProfile";

const Home = () => {
  return (
    <div className="w-full">
      <HomeList />
      <MyProfile />
      <div className="px-8 mt-4">
        <BarChart
          data={[
            { name: "positive", count: 53 },
            { name: "negative", count: 25 },
            { name: "neutral", count: 12 },
            { name: "ambiguous", count: 10 },
          ]}
        />
      </div>
    </div>
  );
};

export default Home;
