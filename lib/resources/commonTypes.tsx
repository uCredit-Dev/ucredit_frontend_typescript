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
  areas?: string;
  term?: string;
  school: string;
  department: string;
  credits: string;
  wi: boolean;
  bio: string;
  tags: string[];
  preReq: string[];
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
  coReq: string[];
  restrictions: any[];
};

export type SISRetrievedCourse = {
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

// For User courses, which have extra ids with user-specific info and a single term/area that the user chose.
export type UserCourse = {
  _id: string;
  title: string;
  term: SemesterType;
  termOffered?: string;
  year: string;
  version?: string;
  number: string;
  department?: string;
  tags?: string[];
  areas?: string;
  credits: number;
  wi: boolean;
  taken: boolean;
  preReq?: string[];
  isPlaceholder: boolean;
  isTransfer: boolean;
  ratings?: number[];
  distribution_ids?: string[];
  fineReq_ids?: string[];
  plan_id: string;
  user_id: string;
  year_id?: string;
  forceSatisfied?: string;
  level: string;
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
  major_ids: string[];
  user_id: string;
  numYears: number;
  years: Year[];
  reviewers: any[];
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
export type UserDistribution = {
  _id: string;
  name: string;
  required_credits: number;
  description: string;
  criteria: string;
  min_credits_per_course: number;
  user_id: string;
  plan_id: string;
  major_id: string;
  fineReq_ids?: string[];
  planned: number;
  current: number;
  satisfied: boolean;
  user_select: boolean;
  double_count?: string[];
  pathing?: number;
};

export type SemesterType =
  | 'Fall'
  | 'Spring'
  | 'Summer'
  | 'Intersession'
  | 'All';

// https://stackoverflow.com/questions/52085454/typescript-define-a-union-type-from-an-array-of-strings
export type DepartmentType = typeof all_deps[number];
export type TagType = typeof course_tags[number];

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

export type UserFineReq = {
  satisfied: boolean;
  required_credits: number;
  description: string;
  criteria: string;
  plan_id: string;
  major_id: string;
  distribution_id: string;
  planned: number;
  current: number;
  double_count?: string[];
};

export type FineReq = {
  required_credits: number;
  description: string;
  criteria: string;
  double_count?: string[];
};

export type Distribution = {
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
  distributions: Distribution[];
};

export type Minor = {
  degree_name: string;
  abbrev: string;
  department: string;
  total_degree_credit: number;
  wi_credit: number;
  url: string;
  distributions: Distribution[];
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
  RoadMap = 'roadmap',
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
