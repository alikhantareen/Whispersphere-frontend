import { Typography } from "@material-tailwind/react";

function BlogCard({ title, read_time, views }) {
  return (
    <div className="shadow-sm rounded-md shadow-[#6c9d98]">
      <div className="card-body">
        <Typography variant="h2" className="text-[#6c9d98]">
          {title}
        </Typography>
        <div className="text-content2 flex gap-4 items-center">
          <Typography variant="paragraph">Read time: {read_time}</Typography>
          <Typography variant="paragraph">Total views: {views}</Typography>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
