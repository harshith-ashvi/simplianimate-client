import { useNavigate } from "react-router-dom";

import TemplateCard from "./templateCard";
import {
  // imageBasedAnimation,
  textBasedAnimation,
} from "@/data/animationTemplates";

const Home = () => {
  const navigate = useNavigate();

  const handleNavigate = (url: string) => navigate(url);

  return (
    <div style={{ maxWidth: 1280, margin: "0 auto" }}>
      <div className="py-2 flex items-center justify-between">
        <h1 className="text-3xl">SimpliAnimate</h1>
        <a href="https://forms.gle/pg7hSkQexpLTpMXv8" target="_black" >Request Template</a>
      </div>
      <div className="my-10">
        <h4 className="mb-5">Text Based</h4>
        <div className="flex flex-row flex-wrap gap-x-8">
          {textBasedAnimation.map((template) => (
            <TemplateCard
              key={template.url}
              name={template.name}
              url={template.url}
              img={template.img}
              handleNavigate={handleNavigate}
            />
          ))}
        </div>
      </div>
      {/* <div className="my-10">
        <h4 className="mb-5">Image Based</h4>
        <div className="flex flex-row flex-wrap gap-x-8">
          {imageBasedAnimation.map((template) => (
            <TemplateCard
              key={template.url}
              name={template.name}
              url={template.url}
              img={template.img}
              handleNavigate={handleNavigate}
            />
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default Home;
