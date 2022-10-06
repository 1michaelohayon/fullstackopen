interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}
interface BaseWithDescription extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends BaseWithDescription{
  type: "normal";
}

interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends BaseWithDescription {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends BaseWithDescription {
  type: "special"
  requirements: string[]
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;
