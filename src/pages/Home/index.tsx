import { useNavigate } from "react-router-dom";

import fullLogo from "@/assets/images/simpliAnimate-full.png";

import TemplateCard from "./templateCard";
import {
  otherAnimation,
  // imageBasedAnimation,
  textBasedAnimation,
} from "@/data/animationTemplates";
import { Button } from "@/components/ui/button";

const Home = () => {
  const navigate = useNavigate();

  const handleNavigate = (url: string) => navigate(url);

  return (
    <div style={{ maxWidth: 1280, margin: "0 auto" }}>
      <div className="py-2 flex items-center justify-between">
        <img src={fullLogo} width={250} />
        <Button variant="ghost">
          <a href="https://forms.gle/pg7hSkQexpLTpMXv8" target="_black">
            Request Template
          </a>
        </Button>
      </div>
      <div className="flex items-center justify-center">
        <div className="my-5 mx-5">
          <h4 className="mb-5 text-lg font-medium">Text Based</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
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
      <div className="flex items-center justify-center">
        <div className="my-5 mx-5">
          <h4 className="mb-5 text-lg font-medium">Others</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {otherAnimation.map((template) => (
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
      </div>
    </div>
  );
};

export default Home;
