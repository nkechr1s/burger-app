import { BurgerBuilder } from "../../components";
import { BurgerBuilderProvider } from "../../context";

const Home = () => {
  return (
    <BurgerBuilderProvider>
      <BurgerBuilder />
    </BurgerBuilderProvider>
  );
};

export default Home;
