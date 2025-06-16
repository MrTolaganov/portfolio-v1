import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { IProject } from "@/types";
import Link from "next/link";

interface Props {
  project: IProject;
}

export default function FeaturedProjectCard({ project }: Props) {
  return (
    <Link href={project.demoUrl}>
      <Card className={"shadow-lg"}>
        <CardContent>
          <div className={"h-48 w-full relative"}>
            <Image
              src={project.imageUrl}
              alt={project.name}
              fill
              className={"object-cover"}
            />
          </div>

          <div className={"p-1"}>
            <div className={"flex justify-between items-center m-1"}>
              <CardTitle className={"text-lg font-bold"}>
                {project.name}
              </CardTitle>
              <p className={"text-xs text-muted-foreground"}>
                {format(project.createdAt, "dd/MM/yyyy")}
              </p>
            </div>
            
            <CardDescription>
              {project.techs.split(", ").map((tech) => (
                <Badge key={tech} className={"bg-secondary text-primary m-1"}>
                  {tech}
                </Badge>
              ))}
            </CardDescription>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
