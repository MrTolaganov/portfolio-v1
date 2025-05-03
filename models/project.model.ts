import { model, models, Schema } from "mongoose";

const projectSchema = new Schema(
  {
    name: { type: String, required: true },
    techs: { type: String, required: true },
    imageUrl: { type: String, required: true },
    imageKey: { type: String, required: true },
    demoUrl: { type: String, required: true },
    githubUrl: { type: String, required: true },
    stars: [{ type: Schema.Types.ObjectId, ref: "User" }],
    views: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true },
);

const ProjectModel = models.Project || model("Project", projectSchema);
export default ProjectModel;
