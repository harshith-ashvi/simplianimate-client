import { Card, CardContent, CardFooter } from "@/components/ui/card";

const TemplateCard = ({
  name,
  url,
  img,
  handleNavigate,
}: {
  name: string;
  url: string;
  img: string;
  handleNavigate: (url: string) => void;
}) => {
  return (
    <Card onClick={() => handleNavigate(url)} className="w-fit cursor-pointer">
      <CardContent className="items-center p-0">
        <img src={img} height={200} width={340} />
      </CardContent>
      <CardFooter className="p-4">
        <p className="text-slate-950">{name}</p>
      </CardFooter>
    </Card>
  );
};

export default TemplateCard;
