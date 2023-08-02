import { all_deps, course_tags } from './assets';

/* 
  File containing all the common types we use throughout the app.
*/

// Course restriction type. Has the restriction name as well as the description of the restriction.
export type Restriction = {
  RestrictionName: string;
  Description: string;
};

// For inspected SIS courses
export type Course = {
  title: string;
  number: string;
  areas: string;
  term: string;
  school: string;
  department: string;
  credits: string;
  wi: boolean;
  bio: string;
  tags: string[];
  preReq: string[];
  postReq: any[];
  restrictions: Restriction[];
  version?: string;
  level: string;
};

export type Version = {
  areas: string;
  term: string;
  school: string;
  department: string;
  credits: string;
  wi: boolean;
  bio: string;
  level: string;
  tags: string[];
  preReq: string[];
  postReq: PostReq[];
  coReq: string[];
  restrictions: any[];
};

export type SISRetrievedCourse = {
  _id: string;
  title: string;
  number: string;
  terms: string[];
  versions: Version[];
};

// For course Evals
export type CourseEvals = {
  number: string;
  prof: string;
  rating: string;
  summary: string;
  term: string;
};

export type PostReq = {
  courseId: string;
  number: string;
  title: string;
  credits: string;
  preReqs: string;
}

// For User courses, which have extra ids with user-specific info and a single term/area that the user chose.
export type UserCourse = {
  _id: string;
  title: string;
  term: SemesterType;
  number: string;
  department: string;
  tags: string[];
  area: string;
  credits: number;
  wi: boolean;
  taken: boolean;
  ratings: number[];
  distribution_ids: string[];
  plan_id: string;
  user_id: string;
  year_id: string;
  preReq: string[];
  isPlaceholder: boolean;
  version: string;
  level: string;
  postReq: PostReq[];
};

export type Year = {
  _id: string;
  name: string;
  courses: UserCourse[];
  plan_id: string;
  user_id: string;
  year: number;
};

export type Plan = {
  _id: string;
  name: string;
  majors: string[];
  distribution_ids: string[];
  user_id: string;
  numYears: number;
  years: Year[];
  reviewers: any[];
  updatedAt: Date;
};

type Affiliation = 'STUDENT' | 'FACULTY' | 'STAFF';
type Grade =
  | 'AE UG Freshman'
  | 'AE UG Sophomore'
  | 'AE UG Junior'
  | 'AE UG Senior'
  | 'Research Program Coordinator'
  | 'LECTURER'
  | 'Student Success Advisor';

export type User = {
  _id: string; //JHED ID
  name: string;
  email: string;
  affiliation: Affiliation; //STUDENT, FACULTY or STAFF
  school: string;
  grade: Grade;
  plan_ids: string[];
  whitelisted_plan_ids: string[];
};

export type UserId = {
  _id: string;
  name: string;
};

export type Filter = {
  area?: string;
  tags?: TagType[];
  department?: string;
  title?: string;
  number?: string | string[];
  wi?: boolean;
  exception?: Filter;
};

export type SearchExtras = {
  page: number | null;
  query: string;
  credits: string | null;
  areas: string | null;
  tags: TagType | null;
  term: SemesterType | 'All';
  year: number | 'All';
  department: DepartmentType | null;
  wi: boolean | null;
  levels: string | null;
};

// Info for distribution bar.
export type Distribution = {
  _id: string;
  name: string;
  required_credits: number;
  min_credits_per_course: number;
  description: string;
  criteria: string;
  fine_requirements?: FineReq[];
  user_select?: boolean;
  exception?: string;
  planned_credits: number;
  courses: string[];
  user_id: string;
  plan_id: string;
};

export type SemesterType =
  | 'Fall'
  | 'Spring'
  | 'Summer'
  | 'Intersession'
  | 'All';

// https://stackoverflow.com/questions/52085454/typescript-define-a-union-type-from-an-array-of-strings
export type DepartmentType = (typeof all_deps)[number];
export type TagType = (typeof course_tags)[number];

export type FilterType =
  | 'credits'
  | 'distribution'
  | 'tags'
  | 'term'
  | 'year'
  | 'department'
  | 'wi'
  | 'levels';

export type AreaType = 'N' | 'S' | 'H' | 'W' | 'E' | 'Q';

export type FineReq = {
  required_credits: number;
  description: string;
  criteria: string;
  double_count?: string[];
};

export type DistributionObj = {
  name: string;
  required_credits: number;
  min_credits_per_course: number;
  description: string;
  criteria: string;
  fine_requirements?: FineReq[];
  user_select?: boolean;
  double_count?: string[];
  exception?: string;
  pathing?: number;
};

export type Major = {
  degree_name: string;
  abbrev: string;
  department: string;
  total_degree_credit: number;
  wi_credit: number;
  url: string;
  distributions: DistributionObj[];
};

export type Minor = {
  degree_name: string;
  abbrev: string;
  department: string;
  total_degree_credit: number;
  wi_credit: number;
  url: string;
  distributions: DistributionObj[];
};

export type DroppableType = {
  year: string;
  semester: SemesterType;
  courses: UserCourse[];
};

export enum DashboardMode {
  Reviewer = 'Reviewer',
  Planning = 'Planning',
}

export interface StatusPlan extends Plan {
  status: ReviewRequestStatus;
  review_id: string;
}

export interface RevieweePlans {
  reviewee: User;
  plans: StatusPlan[];
}

export enum ReviewRequestStatus {
  Pending = 'PENDING',
  Rejected = 'REJECTED',
  UnderReview = 'UNDERREVIEW',
  Approved = 'APPROVED',
}

export enum ReviewMode {
  View = 'view',
  Edit = 'edit',
  None = '',
}

export interface ThreadType {
  plan_id: string;
  resolved: boolean;
  location_type: string;
  location_id: string;
  comments: CommentType[];
  _id: string;
}

export type CommentType = {
  commenter_id: { name: string; _id: string };
  visible_user_id: string[];
  thread_id: string;
  message: string;
  date: string;
  _id: string;
};
