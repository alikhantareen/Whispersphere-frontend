import {
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";

function BlogCard() {
  return (
    <Card className="w-full overflow-hidden bg-[#161616]">
      <CardBody>
        <Typography variant="h2" color="white">
          Title here
        </Typography>
        <Typography variant="small" color="white" className="mt-3">
          Description here
        </Typography>
      </CardBody>
    </Card>
  );
}

export default BlogCard;
