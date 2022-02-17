import classicTeeImg from "../assets/templates/classic-tee.png";
import longSleeveImg from "../assets/templates/long.png";
import posterImg from "../assets/templates/poster.png";
import hoodieImg from "../assets/templates/hoodie.png";
import ClassicTee from "../assets/templates/classic-tee";
import LongSleeve from "../assets/templates/longSleeve";
import Poster from "../assets/templates/Poster";
import Hoodie from "../assets/templates/Hoodie";

const types = [
  {
    id: 1,
    name: "Classic Tee",
    template: classicTeeImg,
    svg: <ClassicTee />,
  },
  {
    id: 2,
    name: "Long Sleeve",
    template: longSleeveImg,
    svg: <LongSleeve />,
  },
  {
    id: 3,
    name: "Framed Poster",
    template: posterImg,
    svg: <Poster />,
  },
  {
    id: 4,
    name: "Hoodie",
    template: hoodieImg,
    svg: <Hoodie />,
  },
];

export default types;
