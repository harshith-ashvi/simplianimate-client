import { useNavigate } from "react-router-dom";

import TemplateCard from "./templateCard";
import { textBasedAnimation } from "@/data/animationTemplates";

const Home = () => {
  const navigate = useNavigate();

  const handleNavigate = (url: string) => navigate(url);

  return (
    <div style={{ maxWidth: 1280, margin: "0 auto" }}>
      <div className="py-2">
        <h1 className="text-3xl">Simplianimate</h1>
      </div>
      <div className="my-10">
        <h4 className="mb-5">Text Based</h4>
        {textBasedAnimation.map((template) => (
          <TemplateCard
            name={template.name}
            url={template.url}
            img={template.img}
            handleNavigate={handleNavigate}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
