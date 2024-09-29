import { useNavigate } from "react-router-dom";

import Navbar from "@/components/navbar";
import TemplateCard from "./templateCard";

import {
  imageBasedAnimation,
  otherAnimation,
  textBasedAnimation,
} from "@/data/animationTemplates";

const Home = () => {
  const navigate = useNavigate();

  const handleNavigate = (url: string) => navigate(url);

  return (
    <>
      <Navbar />
      <div className="max-container mt-16 px-2">
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
        <div className="flex items-center justify-center">
          <div className="my-5 mx-5">
            <h4 className="mb-5 text-lg font-medium">Image Based</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
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
          </div>
        </div>
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
    </>
  );
};

export default Home;
