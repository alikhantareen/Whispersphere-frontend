import { Card, CardBody, Typography } from "@material-tailwind/react";

function BlogCard({ title, description }) {
  return (
    <Card className="w-full overflow-hidden bg-[#161616]">
      <CardBody>
        <Typography variant="h2" className="text-[#6c9d98]">
          {title}
        </Typography>
        <Typography variant="small" color="white" className="mt-3">
          {description.substring(0, 300)}<span className="link">...Read more</span>
        </Typography>
      </CardBody>
    </Card>
  );
}

export default BlogCard;
