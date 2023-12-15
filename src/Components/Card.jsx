import { Card, CardBody, Typography } from "@material-tailwind/react";

function BlogCard({ title, read_time, views }) {
  return (
    <Card className="w-full overflow-hidden bg-[#161616]">
      <CardBody>
        <Typography variant="h2" className="text-[#6c9d98] text-2xl md:text-4xl">
          {title}
        </Typography>
        <Typography variant="small" color="white" className="mt-3 flex gap-4">
          <span>Read time: {read_time}</span>
          <span>Total views: {views}</span>
        </Typography>
      </CardBody>
    </Card>
  );
}

export default BlogCard;
