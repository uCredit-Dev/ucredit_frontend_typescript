import { Major } from "../../../resources/commonTypes";

//https://krieger.jhu.edu/internationalstudies/undergraduate/requirements/
const baIS: Major = {
  degree_name: "B.A. International Studies",
  department: "AS International Studies",
  total_degree_credit: 120,
  wi_credit: 12,
  distributions: [
    {
      name: "Political Science",
      required_credits: 18,
      min_cedits_per_course: 3,
      description:
        "International studies students must complete 18 credits in political science, including:\n\tOne course in international relations (IR)\n\tTwo courses in comparative politics (CP)\n\tOne course in American politics (AP)\n\tOne course in political theory (PT)\n\tOne gateway course",
      criteria: "AS Political Science[D]",
      fine_requirements: [
        {
          required_credits: 3,
          description: "One course in international relations (IR)",
          criteria: "INST-IR[T]",
        },
        {
          required_credits: 6,
          description: "Two courses in comparative politics (CP)",
          criteria: "INST-CP[T]",
        },
        {
          required_credits: 3,
          description: "One course in American politics (AP)",
          criteria: "INST-AP[T]",
        },
        {
          required_credits: 3,
          description: "One course in political theory (PT)",
          criteria: "INST-PT[T]",
        },
        {
          required_credits: 3,
          description:
            "One of the following gateway courses: \n\tConflict and Security in a Global World (070.295)\n\tContemporary International Politics (190.108)\n\tIntroduction to Global Studies (190.111)\n\tIssues in International Development (230.150)*\n\t*Applies to students who entered fall 2019 and earlier only.",
          criteria:
            "AS.070.295[C]^OR^AS.190.108[C]^OR^AS.190.111[C]^OR^(AS.230.150[C]^AND^Fall 2019[Y])",
        },
      ],
    },
    {
      name: "Economics",
      required_credits: 12,
      min_cedits_per_course: 3,
      description:
        "Note: both Elements of Macroeconomics and Elements of Microeconomics must be completed by the end of the sophomore year.",
      criteria: "AS Economics[D]",
      fine_requirements: [
        {
          required_credits: 3,
          description: "Elements of Macroeconomics (180.101)",
          criteria: "AS.180.101[C]",
        },
        {
          required_credits: 3,
          description: "Elements of Microeconomics (180.102)",
          criteria: "AS.180.102[C]",
        },
        {
          required_credits: 3,
          description:
            "One approved international economics course designated INST-ECON in the course description; this course may sometimes be fulfilled via study abroad, with permission",
          criteria: "INST-ECON[T]",
        },
        {
          required_credits: 3,
          description:
            "One course (student’s choice) taken in the JHU Department of Economics (e.g., AS.180.xxx).",
          criteria: "AS Economics[D]",
        },
      ],
    },
    {
      name: "Foreign Language",
      required_credits: 6,
      min_cedits_per_course: 3,
      description:
        "International studies majors must demonstrate proficiency in at least one foreign language. Proficiency through the second semester of the advanced/third-year level is required. If students have proficiency above the advanced/third-year level, they must take either: Option (A), two semesters of an upper level literature or culture course offered by the language departments and taught in the language of proficiency, or Option (B), take two semesters of another language.\n\nWaivers indicating advanced level/third-year language proficiency must be documented in the student’s official academic record in order for a student to be eligible to complete Option A or B. To receive these waivers, students must contact the Center for Language Education or the Department of Modern Languages & Literatures to complete a proficiency exam on campus.\n\nNote: Students cannot count their foreign language courses toward the 5 course advanced coursework requirement.",
      criteria:
        "AS Center for Language Education[D]^OR^AS Modern Languages and Literatures[D]",
    },
    {
      name: "Focus Area",
      required_credits: 12,
      min_cedits_per_course: 3,
      description:
        "Four courses within a coherent field of interest. For more detail please visit https://krieger.jhu.edu/internationalstudies/undergraduate/requirements/",
      criteria: "",
      user_select: true,
    },
    {
      name: "History",
      required_credits: 15,
      min_cedits_per_course: 3,
      description:
        "International Studies students must complete 15 credits in history, including:\n\tOne introductory course at the 100-level in the JHU History Department (e.g., AS.100.1xx).\n\tFour courses designated INST-GLOBAL in the course description.",
      criteria:
        "(AS History[D]^AND^Lower Level Undergraduate[N])^OR^INST-GLOBAL[T]",
      fine_requirements: [
        {
          required_credits: 3,
          description:
            "One introductory course at the 100-level in the JHU History Department (e.g., AS.100.1xx)",
          criteria: "AS History[D]^AND^Lower Level Undergraduate[N]",
        },
        {
          required_credits: 12,
          description:
            "Four courses designated INST-GLOBAL in the course description",
          criteria: "INST-GLOBAL[T]",
        },
      ],
    },
  ],
};

//https://www.cs.jhu.edu/2021undergraduate-advising-manual/
const bsCS: Major = {
  degree_name: "B.S. Computer Science(NEW)",
  department: "EN Computer Science",
  total_degree_credit: 120,
  wi_credit: 6,
  distributions: [
    {
      name: "Computer Science",
      required_credits: 40,
      min_cedits_per_course: 1,
      description:
        "For more information please visit the <a href='https://www.cs.jhu.edu/2021undergraduate-advising-manual/'>major degree requirement</a> section on the department website.",
      criteria: "EN Computer Science[D]^OR^CSCI-OTHER[T]",
      fine_requirements: [
        {
          description:
            "Computer Ethics(601.104). Practical Ethics for Future Leaders (660.400/406) may be used as a substitute for the computer ethics requirement for the BS program, but does not count towards the CS total credits at all.",
          required_credits: 1,
          criteria: "EN.601.104[C]",
        },
        {
          description:
            "Required Courses: \n\t500.112/113/114 Gateway Computing or AP Comp Sci A or equivalent\n\t601.220 Intermediate Programming\n\t601.226 Data Structures\n\t601.229 Computer System Fundamentals\n\t601.230 Mathematical Foundations for Computer Science\n\t601.433 Algorithms",
          required_credits: 21,
          criteria:
            "EN.500.112[C]^OR^EN.500.113[C]^OR^EN.500.114[C]^OR^EN.601.220[C]^OR^EN.601.226[C]^OR^EN.601.229[C]^OR^EN.601.230[C]^OR^EN.601.443[C]",
        },
        {
          description:
            "12 upper level CS credits in addition to the required Algorithms course",
          required_credits: 12,
          criteria: "EN Computer Science[D]^AND^Upper Level Undergraduate[L]",
        },
        {
          description:
            "At least one upper level course in two of these four different classification areas: Applications(CSCI-APPL), Systems(CSCI-SYST), Software(CSCI-SOFT) and Reasoning(CSCI-RSNG)",
          required_credits: 6,
          exclusive: true,
          criteria:
            "CSCI-APPL[T]^OR^CSCI-SYST[T]^OR^CSCI-SOFT[T]^OR^CSCI-RSNG[T]",
        },
        {
          description:
            "One Team(CSCI-TEAM) designated course. This Team course may overlap other course requirements, for example to count as both Team and Software.",
          required_credits: 3,
          criteria: "CSCI-TEAM[T]",
        },
      ],
    },
    {
      name: "Math",
      required_credits: 16,
      min_cedits_per_course: 3,
      description:
        "All courses in this category must be from one of the two math departments on campus: Mathematics or Applied Math and Statistics. However, 553.171 Discrete Mathematics may not count towards these math requirements. Other than Calculus I and II, all the remaining courses must be 200-level or above. The BS math courses must include coverage of both probability and statistics, which can be satisfied in many ways, including taking any of the 553.3xx combined Probability & Statistics courses.",
      criteria: "AS Mathematics[D]^OR^EN Applied Math and Statistics[D]",
      exception: "EN.553.171[C]",
      fine_requirements: [
        {
          description:
            "Required Courses:\n\t110.108 Calculus I or AP equivalent\n\t110.109 Calculus II or AP equivalent",
          required_credits: 8,
          criteria: "AS.110.108[C]^OR^AS.110.109[C]",
        },
        {
          description: "Probability and Statistics",
          required_credits: 4,
          criteria:
            "EN Applied Math and Statistics[D]^AND^Probability and Statistics[N]^AND^Upper Level Undergraduate[L]",
        },
      ],
    },
    {
      name: "Science",
      required_credits: 8,
      min_cedits_per_course: 1,
      description:
        "Students must take two semesters of core science courses (any combination of Physics, Chemistry, Biology), with their associated labs. AP credit is an acceptable substitute for these courses and labs.",
      criteria:
        "General Physics[N]^OR^General Biology[N]^OR^Introductory Chemistry[N]",
    },
    {
      name: "Liberal Arts",
      required_credits: 18,
      min_cedits_per_course: 3,
      double_count: true,
      description:
        "These courses must have either an ‘H’ or ‘S’ area designator on them, but can be from any department. At most 2 of these courses may be taken S/U (if not counted towards the writing requirement). Foreign language courses can be counted as well, even if they don’t carry an ‘H’ or ‘S’ designator.",
      criteria:
        "AS Center for Language Education[D]^OR^AS Modern Languages and Literatures[D]^OR^H[A]^OR^S[A]",
    },
    {
      name: "English Focused Writing Intensive",
      required_credits: 3,
      min_cedits_per_course: 3,
      double_count: true,
      description:
        "At least one course with a primary focus on writing in English must be chosen. Courses that satisfy this requirement are: EN.661.110, EN.661.111, EN.661.250, EN.661.251, EN.661.315, AS.060.100, AS.060.113, AS.220.105, AS.180.248, AS.290.303, AS.360.133.",
      criteria:
        "EN.661.110[C]^OR^EN.661.111[C]^OR^EN.661.250[C]^OR^EN.661.251[C]^OR^EN.661.315[C]^OR^AS.060.100[C]^OR^AS.060.113[C]^OR^AS.220.105[C]^OR^AS.180.248[C]^OR^AS.290.303[C]^OR^AS.360.133",
    },
  ],
};

export const allMajors: Major[] = [baIS, bsCS];
