import { Card, CardContent, CardHeader } from "@/components/ui/card";

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
      <CardHeader className="p-0">
        <img src={img} height={200} width={340} />
      </CardHeader>
      <CardContent>
        <p>{name}</p>
      </CardContent>
    </Card>
  );
};

export default TemplateCard;
