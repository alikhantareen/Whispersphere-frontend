import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";

function BlogCard() {
  return (
    <Card className="w-full md:max-w-[24rem] overflow-hidden  bg-blue-gray-900">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 rounded-none"
      >
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
          alt="ui/ux review check"
          loading="lazy"
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h4" color="white">
          Title here
        </Typography>
        <Typography variant="lead" color="white" className="mt-3 font-normal">
          Description here
        </Typography>
      </CardBody>
      <CardFooter className="flex items-center justify-between">
        <Typography color="white" className="font-normal">January 10</Typography>
      </CardFooter>
    </Card>
  );
}

export default BlogCard;
