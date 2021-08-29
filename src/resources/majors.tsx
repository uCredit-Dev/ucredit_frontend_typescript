import { Major } from "./commonTypes";

// All Major Requirements can be found at the links below
// https://e-catalogue.jhu.edu/arts-sciences/full-time-residential-programs/degree-programs/
// https://e-catalogue.jhu.edu/engineering/full-time-residential-programs/degree-programs/

//TODO:
// BME
// 	 Career Exploration
// 	 Focus Area

// Public Health
// 	 Social Sciences

/* INCOMPLETE */

// // https://engineering.jhu.edu/case/academic-advising/
// const bsCivEng: Major = {
//   degree_name: "B.S. Civil Engineering",
//   department: "EN Civil Engineering",
//   total_degree_credit: 120,
//   wi_credit: 6,
//   distributions: [],
// };

// // https://english.jhu.edu/undergraduate/requirements/
// const baEnglish: Major = {
//   degree_name: "B.A. English",
//   department: "AS English",
//   total_degree_credit: 120,
//   wi_credit: 6,
//   distributions: [],
// };

// // https://krieger.jhu.edu/envs/requirements/majors/
// const bsEnvSci: Major = {
//   degree_name: "B.S. Environmental Science",
//   department: "AS Medicine, Science, & the Humanities",
//   total_degree_credit: 120,
//   wi_credit: 6,
//   distributions: [],
// };

// // https://eps.jhu.edu/undergraduate/eps-major-and-minor/
// const bsEPS: Major = {
//   degree_name: "B.S. Earth & Planetary Sciences",
//   department: "AS Earth & Planetary Sciences",
//   total_degree_credit: 120,
//   wi_credit: 6,
//   distributions: [],
// };

// // https://engineering.jhu.edu/ece/undergraduate-studies/degree-options/
// const bsCompEng: Major = {
//   degree_name: "B.S. Computer Engineering",
//   department: "AS Electrical & Computer Engineering",
//   total_degree_credit: 120,
//   wi_credit: 6,
//   distributions: [],
// };

// // https://arthist.jhu.edu/undergraduate/requirements/
// const baHistArt: Major = {
//   degree_name: "B.A. History of Art",
//   department: "AS History",
//   total_degree_credit: 120,
//   wi_credit: 6,
//   distributions: [],
// };

// // https://krieger.jhu.edu/behavioralbiology/the-major/requirements/
// const bsBBio: Major = {
//   degree_name: "B.S. Behaviorial Biology",
//   department: "AS Behaviorial Biology",
//   total_degree_credit: 120,
//   wi_credit: 6,
//   distributions: [],
// };

// // https://engineering.jhu.edu/materials/undergraduate-studies/bs-requirements/
// const bsMatSci: Major = {
//   degree_name: "B.S. Materials Science & Engineering",
//   department: "EN Materials Science & Engineering",
//   total_degree_credit: 120,
//   wi_credit: 6,
//   distributions: [],
// };

// // https://cogsci.jhu.edu/undergraduate/cognitive-science-major/
// const bsCogSci: Major = {
//   degree_name: "B.S. Cognitive Science",
//   department: "AS Cognitive Science",
//   total_degree_credit: 120,
//   wi_credit: 6,
//   distributions: [],
// };

// // https://me.jhu.edu/undergraduate-studies/academic-advising-undergraduate/
// const bsME: Major = {
//   degree_name: "B.S. Mechanical Engineering",
//   department: "AS Mechanical Engineering",
//   total_degree_credit: 120,
//   wi_credit: 6,
//   distributions: [],
// };

// // https://chemistry.jhu.edu/undergraduate/requirements/
// const bsChem: Major = {
//   degree_name: "B.S. Chemistry",
//   department: "AS Chemistry",
//   total_degree_credit: 120,
//   wi_credit: 6,
//   distributions: [],
// };

// // https://biophysics.jhu.edu/undergraduate/requirements/
// const bsBioPhysics: Major = {
//   degree_name: "B.S. BioPhysics",
//   department: "AS BioPhysics",
//   total_degree_credit: 120,
//   wi_credit: 6,
//   distributions: [],
// };

// // https://krieger.jhu.edu/msh/major-requirements/
// const baMSH: Major = {
//   degree_name: "B.A. Medicine, Science, & the Humanities",
//   department: "AS Medicine, Science, & the Humanities",
//   total_degree_credit: 120,
//   wi_credit: 6,
//   distributions: [],
// };

// // https://physics-astronomy.jhu.edu/undergraduate/major-requirements/
// const bsPhysics: Major = {
//   degree_name: "B.S. Physics",
//   department: "AS Physics",
//   total_degree_credit: 120,
//   wi_credit: 6,
//   distributions: [],
// };

// // https://mathematics.jhu.edu/undergraduate/major-in-mathematics/
// const bsMath: Major = {
//   degree_name: "B.S. Mathematics",
//   department: "AS Mathematics",
//   total_degree_credit: 120,
//   wi_credit: 6,
//   distributions: [],
// };

// // https://writingseminars.jhu.edu/undergraduate/requirements/
// const baWritingSems: Major = {
//   degree_name: "B.A. Writing Seminars",
//   department: "AS Writing Seminars",
//   total_degree_credit: 120,
//   wi_credit: 6,
//   distributions: [],
// };

// // https://ehe.jhu.edu/undergraduate/undergraduate-advising/undergraduate-major-advising/index.html
// const bsEnvEng: Major = {
//   degree_name: "B.S. Environment Engineering",
//   department: "AS Environment Engineering",
//   total_degree_credit: 120,
//   wi_credit: 6,
//   distributions: [],
// };

// // https://engineering.jhu.edu/ece/undergraduate-studies/degree-options/
// const bsElectricEng: Major = {
//   degree_name: "B.S. Electrical Engineering",
//   department: "EN Electrical & Computer Engineering",
//   total_degree_credit: 120,
//   wi_credit: 6,
//   distributions: [],
// };

// // https://soc.jhu.edu/undergraduate/requirements/
// const baSoc: Major = {
//   degree_name: "B.A. Sociology",
//   department: "AS Sociology",
//   total_degree_credit: 120,
//   wi_credit: 6,
//   distributions: [],
// };

// // https://krieger.jhu.edu/neuroscience/bs-program/requirements/
// const baNeuro: Major = {
//   degree_name: "B.A. Neuroscience",
//   department: "AS Neuroscience",
//   total_degree_credit: 120,
//   wi_credit: 6,
//   distributions: [],
// };

// // https://bio.jhu.edu/undergraduate/bs-requirements/
// const baMolCell: Major = {
//   degree_name: "B.A. Molecular & Cellular Biology",
//   department: "AS Biology",
//   total_degree_credit: 120,
//   wi_credit: 6,
//   distributions: [],
// };

// // https://pbs.jhu.edu/undergraduate/requirements/
// const baPsych: Major = {
//   degree_name: "B.S. Psychology",
//   department: "AS Psychology",
//   total_degree_credit: 120,
//   wi_credit: 6,
//   distributions: [],
// };

// // https://econ.jhu.edu/undergraduate/major-requirements/
// const baEcon: Major = {
//   degree_name: "B.A. Economics",
//   department: "AS Economics",
//   total_degree_credit: 120,
//   wi_credit: 6,
//   distributions: [
//     // {
//     //   name: "Economics CORE",
//     //   required_credits: 40,
//     //   min_credits_per_course: 1,
//     //   description:
//     //     "For more information please visit the" +
//     //     "<a href='https://econ.jhu.edu/undergraduate/major-requirements/'>" +
//     //     "major degree requirement</a> section on the department website.",
//     //   criteria: "EN Chemical & Biomedical Engineering[D]^OR^ChemBE[T]",
//     //   fine_requirements: [
//     //     {
//     //       description:
//     //         "Required Courses: \n\t500.113 Gateway Computing/Python\n\t540.101 Chemical Engineering Today\n\t" +
//     //         "540.202 Intro to Chemical and Biological Process Analysis\n\t540.203 Engineering Thermodynamics\n\t" +
//     //         "540.301 Kinetic Processes\n\t",
//     //       required_credits: 3,
//     //       criteria: "EN.500.113[C]",
//     //     },
//     //   ],
//     // },
//     // {
//     //   name: "Math",
//     //   required_credits: 16,
//     //   min_credits_per_course: 3,
//     //   description:
//     //     "All courses in this category must be from one of the two math departments on " +
//     //     "campus: Mathematics or Applied Math and Statistics. However, 553.171 Discrete Mathematics " +
//     //     "may not count towards these math requirements. Other than Calculus I and II, all the " +
//     //     "remaining courses must be 200-level or above. The BS math courses must include coverage " +
//     //     "of both probability and statistics, which can be satisfied in many ways, including " +
//     //     "taking any of the 553.3xx combined Probability & Statistics courses.",
//     //   criteria: "AS Mathematics[D]^OR^EN Applied Math and Statistics[D]",
//     //   exception: "EN.553.171[C]",
//     //   fine_requirements: [
//     //     {
//     //       description:
//     //         "Required Courses:\n\t110.108 Calculus I or AP equivalent\n\t110.109 Calculus II or AP equivalent",
//     //       required_credits: 8,
//     //       criteria: "AS.110.108[C]^OR^AS.110.109[C]",
//     //     },
//     //   ],
//     // },
//     // {
//     //   name: "Science",
//     //   required_credits: 8,
//     //   min_credits_per_course: 1,
//     //   description:
//     //     "Students must take two semesters of core science courses (any combination of Physics, " +
//     //       "Chemistry, Biology), with their associated labs. AP credit is an acceptable substitute " +
//     //       "for these courses and labs.",
//     //   criteria:
//     //     "General Physics[N]^OR^General Biology[N]^OR^Introductory Chemistry[N]",
//     // },
//     // {
//     //   name: "Liberal Arts",
//     //   required_credits: 18,
//     //   min_credits_per_course: 3,
//     //   double_count: true,
//     //   description:
//     //     "These courses must have either an ‘H’ or ‘S’ area designator on them, but can be " +
//     //     "from any department. At most 2 of these courses may be taken S/U (if not counted towards " +
//     //     "the writing requirement). Foreign language courses can be counted as well, even if " +
//     //     "they don’t carry an ‘H’ or ‘S’ designator.",
//     //   criteria:
//     //     "AS Center for Language Education[D]^OR^AS Modern Languages and Literatures[D]^OR^H[A]^OR^S[A]",
//     // },
//     // {
//     //   name: "English Focused Writing Intensive",
//     //   required_credits: 3,
//     //   min_credits_per_course: 3,
//     //   double_count: true,
//     //   description:
//     //     "At least one course with a primary focus on writing in English must be chosen. " +
//     //     "Courses that satisfy this requirement are: EN.661.110, EN.661.111, EN.661.250, EN.661.251, " +
//     //     "EN.661.315, AS.060.100, AS.060.113, AS.220.105, AS.180.248, AS.290.303, AS.360.133.",
//     //   criteria:
//     //     "EN.661.110[C]^OR^EN.661.111[C]^OR^EN.661.250[C]^OR^EN.661.251[C]^OR^EN.661.315[C]" +
//     //     "^OR^AS.060.100[C]^OR^AS.060.113[C]^OR^AS.220.105[C]^OR^AS.180.248[C]^OR^AS.290.303[C]^OR^AS.360.133",
//     // },
//   ],
// };

// /* COMPLETED */

// // https://www.bme.jhu.edu/academics/undergraduate/undergraduate-degree-requirements/
// const bsBME: Major = {
//   degree_name: "B.S. Biomedical Engineering",
//   department: "EN Biomedical Engineering",
//   total_degree_credit: 129,
//   wi_credit: 6,
//   distributions: [
//     {
//       name: "Biomedical Core",
//       required_credits: 33,
//       min_credits_per_course: 1,
//       description:
//         "For more information please visit the " +
//         "<a href='https://e-catalogue.jhu.edu/engineering/full-time-residential-programs/degree-programs/biomedical-engineering/biomedical-engineering-bachelor-science/#requirementstext'>" +
//         "major degree requirement</a> section on the department website.",
//       criteria: "EN Biomedical Engineering[D]",
//       fine_requirements: [
//         {
//           description:
//             "Required Courses: \n\t580.111 Biomedical Engineering and Design\n\tEN.580.151 Structural Biology of Cells\n\t" +
//             "580.153 Structural Biology of Cells Laboratory\n\t580.221 Biochemistry and Molecular Engineering\n\t" +
//             "580.241 Statistical Physics\n\t580.242 Biological Models and Simulations\n\t580.243 Linear Signals and Systems\n\t" +
//             "580.244 Nonlinear Dynamics of Biological Systems\n\t580.246 Systems and Controls\n\t" +
//             "580.248 Systems Biology of the Cell\n\t580.475 Biomedical Data Science\n\t580.477 Biomedical Data Science Laboratory\n\t" +
//             "580.485 Computational Medicine: Cardiology\n\t580.487 Computational Medicine: Cardiology Laboratory\n\t",
//           required_credits: 28,
//           criteria:
//             "EN.580.111[C]^OR^EN.580.151[C]^OR^EN.580.153[C]^OR^EN.580.221[C]^OR^EN.580.241[C]^OR^EN.580.242[C]^OR^EN.580.243[C]" +
//             "EN.580.244[C]^OR^EN.580.246[C]^OR^EN.580.248[C]^OR^EN.580.475[C]^OR^EN.580.477[C]^OR^EN.580.485[C]^OR^EN.580.487[C]",
//         },
//         {
//           description:
//             "Select two of the following core electives (Note: These courses cannot be double-counted toward the 21-credit focus area " +
//             "requirement. Courses taken in excess of the 6 credit core elective requirement can be counted in a relevant focus area):" +
//             "\n\t580.424 Neuroengineering Lab\n\t580.451 Cell and Tissue Engineering Lab\n\t" +
//             "580.452 Cell and Tissue Engineering Lab\n\t580.454 Methods in Nucleic Acid Sequencing Lab\n\t" +
//             "580.494 Build an Imager\n\t580.242 Biological Models and Simulations\n\t580.243 Linear Signals and Systems\n\t" +
//             "580.244 Nonlinear Dynamics of Biological Systems\n\t580.246 Systems and Controls\n\t",
//           required_credits: 6,
//           criteria:
//             "EN.580.424[C]^OR^EN.580.451[C]^OR^EN.580.452[C]^OR^EN.580.454[C]^OR^EN.580.494[C]^OR^EN.580.242[C]^OR^EN.580.243[C]^OR^" +
//             "EN.580.244[C]^OR^EN.580.246[C]^OR^EN.580.248[C]^OR^EN.580.475[C]^OR^EN.580.477[C]^OR^EN.580.485[C]^OR^EN.580.487[C]",
//         },
//         {
//           description:
//             "Career Exploration in BME is a 0-credit self-identified set of career related events (lectures, panels, journal clubs, etc.) " +
//             "beginning in the spring semester of year one and continuing until graduation. Career Exploration is administered through a " +
//             "Community Blackboard site; students will be enrolled by the department.",
//           required_credits: 0,
//           criteria: "EN Career Exploration[D]",
//         },
//       ],
//     },
//     {
//       name: "Design",
//       required_credits: 6,
//       min_credits_per_course: 3,
//       description:
//         "Must complete one of the several design sequences. Each 2-semester sequence must be taken in its entirety.",
//       criteria: "EN Design[D]",
//       exception: "",
//       fine_requirements: [
//         {
//           description:
//             "Select at least one of the following design sequences:\n\t510.433 Senior Design Research AND\n\t510.434 Senior Design/Research II " +
//             "(This option must be approved by the Materials Science & Engineering Department)\n\tOR" +
//             "520.462 Leading Innovation Design Team AND\n\t520.463 Leading Innovation Design Team II\n\tOR " +
//             "\n\t520.498 Senior Design Project AND\n\t520.499 Senior Design Project II\n\tOR" +
//             "540.400 Project in Design: Pharmacokinetics AND\n\t540.421 Project in Design: Pharmacodynamics\n\tOR" +
//             "580.411 BME Design Group AND\n\t580.412 BME Design Group II\n\tOR" +
//             "\n\tE580.437 Neuro Data Design I AND\n\t580.438 Neuro Data Design II" +
//             "580.456 Introduction to Rehabilitation Engineering AND\n\t580.457 Introduction to Rehabilitation Engineering: Design Lab\n\tOR " +
//             "\n\t580.471 Principles of Design of BME Instrumentation\n\tOR 580.480 Precision Care Medicine I " +
//             "AND\n\t580.481 Precision Care Medicine II\n\tOR 580.580 Senior Design Project I AND" +
//             "\n\t580.581 Senior Design Project II\n\tOR 601.455 Computer Integrated Surgery I\n\tAND " +
//             "601.456 Computer Integrated Surgery II",
//           required_credits: 6,
//           criteria:
//             "(EN.510.433[C]^AND^EN.510.434[C])^OR^(EN.520.462[C]^AND^EN.520.463[C])^OR^" +
//             "(EN.520.498[C]^AND^EN.520.499[C])^OR^(EN.540.400[C]^AND^EN.540.421[C])^OR^" +
//             "(EN.580.311[C]^AND^EN.580.312[C])^OR^(EN.580.411[C]^AND^EN.580.412[C])^OR^" +
//             "(EN.580.456[C]^AND^EN.580.457[C])^OR^(EN.580.471[C]^AND^EN.580.571[C])^OR^" +
//             "(EN.580.480[C]^AND^EN.580.481[C])^OR^(EN.580.580[C]^AND^EN.580.581[C])^OR^" +
//             "(EN.601.455[C]^AND^EN.601.456[C])^OR^(EN.580.437[C]^AND^EN.580.438[C])",
//         },
//       ],
//     },
//     {
//       name: "Focus Area",
//       required_credits: 21,
//       min_credits_per_course: 1,
//       description: "Select one of the following: ",
//       criteria: "Focus Area[N]",
//       fine_requirements: [
//         {
//           description: "Biomedical Data Science",
//           required_credits: 0,
//           criteria: "",
//         },
//         {
//           description: "Computational Medicine",
//           required_credits: 0,
//           criteria: "",
//         },
//         {
//           description: "Genomics and Systems Biology",
//           required_credits: 0,
//           criteria: "",
//         },
//         {
//           description: "Imaging and Medical Devices",
//           required_credits: 0,
//           criteria: "",
//         },
//         {
//           description: "Imunoengineering",
//           required_credits: 0,
//           criteria: "",
//         },
//         {
//           description: "Neuroengineering",
//           required_credits: 0,
//           criteria: "",
//         },
//         {
//           description: "Translational Cell and Tissue Engineering",
//           required_credits: 0,
//           criteria: "",
//         },
//       ],
//     },
//     {
//       name: "Computer Programming",
//       required_credits: 3,
//       min_credits_per_course: 3,
//       description:
//         "Must complete at least one of the courses in Computer Science.",
//       criteria: "EN Computer Science[D]",
//       fine_requirements: [
//         {
//           description:
//             "Select one of the following:\n\tEN.500.112 Gateway Computing: JAVA\n\tEN.500.113 Gateway Computing: Python\n\t" +
//             "EN.500.114 Gateway Computing: Matlab",
//           required_credits: 3,
//           criteria: "EN.500.112[C]^OR^EN.500.113[C]^OR^EN.500.114[C]",
//         },
//       ],
//     },
//     {
//       name: "Humanities and Social Sciences",
//       required_credits: 18,
//       min_credits_per_course: 3,
//       description:
//         "Select courses to form a coherent program, relevant to the student’s goals. One course in which ethical and social " +
//         "issues related to technology or medicine is recommended. and at least two semesters of writing-intensive courses.",
//       criteria: "H[S]^OR^S[A]",
//     },
//     {
//       name: "Basic Sciences",
//       required_credits: 18,
//       min_credits_per_course: 1,
//       description:
//         "Students who receive credit for AP Physics I and/or Physics II will receive a waiver for the laboratory course. " +
//         "This will reduce the required number of credits for Basic Sciences by 1 or 2 credits. Students are still required " +
//         "to complete at least 129 total credits for the degree.",
//       criteria:
//         "AS.171.101[C]^OR^AS.171.107[C]^OR^AS.171.102[C]^OR^AS.171.108[C]^OR^AS.171.111[C]^OR^AS.173.112[C]" +
//         "^OR^AS.030.101[C]^OR^AS.030.102[C]^OR^AS.030.105[C]^OR^AS.030.106[C]",
//     },
//     {
//       name: "Mathematics",
//       required_credits: 19,
//       min_credits_per_course: 3,
//       description:
//         "Students who take an approved math course and receive 3 credits will have a total of 19 credits. Students are " +
//         "still required to complete at least 129 total credits for the degree.",
//       criteria: "AS Mathematics[N]",
//       fine_requirements: [
//         {
//           description:
//             "Required Courses:\n\t110.108 Calculus I (Physical Sciences & Engineering)\n\t" +
//             "110.109 Calculus II (Physical Sciences & Engineering)\n\t(110.202 Calculus III\n\tOR 110.211 Honors Multivariable Calculus)" +
//             "\n\t553.291 Linear Algebra and Differential Equations",
//           required_credits: 4,
//           criteria:
//             "AS.110.108[C]^OR^AS.110.109[C]^OR^AS.110.202^OR^AS.110.211^OR^EN.553.291",
//         },
//         {
//           description:
//             "Select one of the following:\n\t553.311 Probability and Statistics for the Biological Sciences and Engineering\n\t" +
//             "553.310 Probability & Statistics for the Physical Sciences & Engineering\n\t553.413 Applied Statistics and Data Analysis\n\t" +
//             "553.430 Introduction to Statistics\n\t553.433 Monte Carlo Methods\n\t560.348 Probability & Statistics in Civil Engineering",
//           required_credits: 3,
//           criteria:
//             "EN.553.311[C]^OR^EN.553.310[C]^OR^EN.553.413[C]^OR^EN.553.430[C]^OR^EN.553.433[C]^OR^EN.560.348[C]",
//         },
//       ],
//     },
//   ],
// };

// // https://history.jhu.edu/undergraduate/requirements/
// const baHistory: Major = {
//   degree_name: "B.A. History",
//   department: "AS History",
//   total_degree_credit: 120,
//   wi_credit: 6,
//   distributions: [
//     {
//       name: "Introductory History Courses",
//       required_credits: 6,
//       min_credits_per_course: 3,
//       description:
//         "Select one of the following: Two introductory history courses (AS.100.1xx) OR \n\t" +
//         "One introductory history course (AS.100.1xx) + one Freshman Seminar (AS.100.130-AS.100.160)",
//       criteria: "(AS History[D]^AND^100[L])^OR^AS.100.130[C]",
//     },
//     {
//       name: "Method Requirement (All Majors)",
//       required_credits: 6,
//       min_credits_per_course: 3,
//       description:
//         "Required Courses: AS.100.293 Undergraduate Seminar in History\n\t100.294 Undergraduate Seminar in History",
//       criteria: "AS.100.293[C]^OR^AS.100.294[C]",
//     },
//     {
//       name: "Elective Courses",
//       required_credits: 24,
//       min_credits_per_course: 3,
//       description: "Required elective courses for History majors.",
//       criteria: "AS History[D]",
//       fine_requirements: [
//         {
//           description: "Required Courses: Two history courses at any level",
//           required_credits: 12,
//           criteria: "AS History[D]",
//         },
//         {
//           description: "Four 300-level or higher history courses",
//           required_credits: 12,
//           criteria: "AS History[D]^AND^Upper Level Undergraduate[L]",
//         },
//       ],
//     },
//     {
//       name: "Additional Upper-Level Courses",
//       required_credits: 6,
//       min_credits_per_course: 3,
//       description:
//         "Required additional upper-level courses for History majors. Note: Students must have a cumulative GPA of 3.25 " +
//         "and a cumulative GPA in history of 3.5 or higher by December of their junior year to be eligible for the senior " +
//         "thesis option to graduate with honors in history.",
//       criteria:
//         "(AS History[D]^AND^Upper Level Undergraduate[L])^OR^AS.100.507[C]^OR^AS.100.508[C]",
//     },
//     {
//       name: "Foreign Language",
//       required_credits: 18,
//       min_credits_per_course: 0,
//       description:
//         "Foreign language proficiency may be demonstrated by coursework or by special examination, but a language " +
//         "requirement waived by exam must be documented on the student's transcript. Up to 18 credits.",
//       criteria:
//         "AS Center for Language Education[D]^OR^AS Modern Languages and Literatures[D]",
//     },
//   ],
// };

// // https://bio.jhu.edu/undergraduate/bs-requirements/
// const baBiology: Major = {
//   degree_name: "B.A. Biology",
//   department: "AS Biology",
//   total_degree_credit: 120,
//   wi_credit: 6,
//   distributions: [
//     {
//       name: "Biology Core",
//       required_credits: 28,
//       min_credits_per_course: 1,
//       description:
//         "For more information please visit the" +
//         "<a href='https://e-catalogue.jhu.edu/arts-sciences/full-time-residential-programs/degree-programs/biology/biology-bachelor-arts/'>" +
//         "major degree requirement</a> section on the department website.",
//       criteria: "AS Biology[D]",
//       fine_requirements: [
//         {
//           description:
//             "Required Courses: \n\t020.151 General Biology I\n\t020.152 General Biology II\n\t" +
//             "020.303 Genetics\n\t020.340 Developmental Genetics Lab\n\t020.304 Molecular Biology" +
//             "020.306 Cell Biology\n\t020.316 Cell Biology Lab\n\t020.305 Biochemistry\n\t" +
//             "020.315 Biochemistry Project Lab\n\t250.253 Protein Engineering and Biochemistry Lab\n\t" +
//             "250.254 Protein Biochemistry and Engineering Laboratory\n\t020.363 Developmental Biology",
//           required_credits: 28,
//           criteria:
//             "AS.020.151[C]^OR^AS.020.152[C]^OR^AS.020.303[C]^OR^AS.020.340[C]^OR^AS.020.304[C]^OR^AS.020.306[C]^OR^AS.020.316[C]^OR^AS.020.305[C]^OR^AS.020.315[C]^OR^AS.250.253[C]^OR^AS.250.254[C]^OR^AS.020.363[C]",
//         },
//       ],
//     },
//     {
//       name: "Chemistry",
//       required_credits: 19,
//       min_credits_per_course: 3,
//       description: "Must complete all the following courses.",
//       criteria: "AS Chemistry[D]",
//       exception: "",
//       fine_requirements: [
//         {
//           description:
//             "Required Courses: \n\t030.101 Introductory Chemistry I\n\t030.105 Introductory Chemistry Laboratory I\n\t" +
//             "(030.102 Introductory Chemistry II AND\n\t030.106 Introductory Chemistry Laboratory II) OR\n\t" +
//             "(030.103 Applied Chemical Equilibrium and Reactivity w/lab)\n\t" +
//             "030.205 Introductory Organic Chemistry I\n\t(030.206 Organic Chemistry II OR\n\t030.212 Honors Organic " +
//             "Chemistry II with Applications in Biochemistry and Medicine)\n\t" +
//             "(030.225 Introductory Organic Chemistry Laboratory OR\n\t030.227 Chemical Chirality: An Introduction in Organic Chem. Lab, Techniques)",
//           required_credits: 6,
//           criteria:
//             "AS.030.101[C]^OR^AS.030.105[C]^OR^AS.030.102[C]^OR^AS.030.106[C]^OR^AS.030.103[C]^OR^" +
//             "AS.030.205[C]^OR^AS.030.206[C]^OR^AS.030.212[C]^OR^AS.030.225[C]^OR^AS.030.227[C]",
//         },
//       ],
//     },
//     {
//       name: "Physics",
//       required_credits: 10,
//       min_credits_per_course: 1,
//       description: "Must complete all Physics courses.",
//       criteria: "AS Physics[D]",
//       fine_requirements: [
//         {
//           description:
//             "Required Courses:\n\t(171.101 General Physics: Physical Science Major I OR\n\t171.103 General Physics I for Biological Science Majors OR" +
//             "\n\t171.107 General Physics for Physical Sciences Majors (AL))\n\t(171.102 General Physics: Physical Science Major II OR" +
//             "\n\t171.104 General Physics/Biology Majors II OR\n\t171.108 General Physics for Physical Science Majors (AL))" +
//             "\n\t173.111 General Physics Laboratory I\n\t173.112 General Physics Laboratory II",
//           required_credits: 10,
//           criteria:
//             "AS.171.101[C]^OR^AS.171.103[C]^OR^AS.171.107[C]^OR^AS.171.102[C]^OR^AS.171.104[C]^OR^AS.171.108[C]" +
//             "^OR^AS.173.111[C]^OR^AS.173.112[C]",
//         },
//       ],
//     },
//     {
//       name: "Mathematics",
//       required_credits: 8,
//       min_credits_per_course: 4,
//       description: "Must complete all Mathematics Course.",
//       criteria: "AS Mathematics[D]",
//       fine_requirements: [
//         {
//           description:
//             "Select one of the following:\n\t110.106 Calculus I (Biology and Social Sciences)\n\t" +
//             "110.108 Calculus I (Physical Sciences & Engineering)",
//           required_credits: 4,
//           criteria: "AS.110.106[C]^OR^AS.110.108[C]",
//         },
//         {
//           description:
//             "Select one of the following:\n\t110.107 Calculus II (For Biological and Social Science)\n\t" +
//             "110.109 Calculus II (For Physical Sciences and Engineering)\n\t110.113 Honors Single Variable Calculus",
//           required_credits: 4,
//           criteria: "AS.110.107[C]^OR^AS.110.109[C]^OR^AS.110.113[C]",
//         },
//       ],
//     },
//     {
//       name: "Electives",
//       required_credits: 8,
//       min_credits_per_course: 2,
//       description:
//         "At least three courses totaling at least seven credits (see POS-Tag BIOL-UL in the Schedule of Classes) from " +
//         "the courses approved by the Director of Undergraduate Studies. At least one course must be taught by the Biology " +
//         "Department (AS.020.xxx) and be a 2 or 3 credit course.",
//       criteria: "AS Electives[N]",
//       fine_requirements: [
//         {
//           description:
//             "At least one course must be taught by the Biology Department (AS.020.xxx) and be a 2 or 3 credit course",
//           required_credits: 2,
//           criteria: "AS Biology[D]",
//         },
//       ],
//     },
//   ],
// };

// // https://krieger.jhu.edu/publichealth/academics/ba-program/
// const baPH: Major = {
//   degree_name: "B.A. Public Health Studies",
//   department: "AS Public Health Studies",
//   total_degree_credit: 120,
//   wi_credit: 12,
//   distributions: [
//     {
//       name: "Public Health Studies Core Courses",
//       required_credits: 40,
//       min_credits_per_course: 1,
//       description:
//         "For more information please visit the" +
//         "<a href='https://e-catalogue.jhu.edu/arts-sciences/full-time-residential-programs/degree-programs/public-health-studies/public-health-studies-bachelor-arts/'>" +
//         "major degree requirement</a> section on the department website.",
//       criteria: "AS Public Health Studies[D]",
//       fine_requirements: [
//         {
//           description:
//             "Required Courses: \n\t280.101 Introduction to Public Health\n\t280.240 Research Methods in Public Health\n\t" +
//             "280.335 The Environment and Your Health\n\t280.340 Fundamentals of Health Policy & Management\n\t" +
//             "280.345 Public Health Biostatistics\n\t280.350	Fundamentals of Epidemiology",
//           required_credits: 21,
//           criteria:
//             "AS.280.101[C]^OR^AS.280.240[C]^OR^AS.280.240[C]^OR^AS.280.335[C]^OR^AS.280.340[C]^OR^AS.280.345[C]^OR^AS.280.350[C]",
//         },
//       ],
//     },
//     {
//       name: "Intermediate Public Health Courses at Homewood",
//       required_credits: 15,
//       min_credits_per_course: 3,
//       description:
//         "One course at the 200-400 level focusing on social and behavioral aspects of public health from the list below." +
//         "Other courses may apply with advisor approval. All courses must be at least 3 credits and only 2 Gordis Teaching " +
//         "Fellowship (GTF) courses may apply (AS.280.4xx courses).",
//       criteria:
//         "AS Intermediate Public Health[D]^AND^(200[L]^OR^300[L]^OR^400[L])",
//       exception: "",
//       fine_requirements: [
//         {
//           description:
//             "Required Courses:\n\t230.341	Sociology of Health and Illness\n\t",
//           required_credits: 3,
//           criteria: "AS.230.341[C]",
//         },
//       ],
//     },
//     {
//       name: "Applied Experience",
//       required_credits: 1,
//       min_credits_per_course: 1,
//       description:
//         "The Applied Experience (AE) is a required experiential learning component of the Public Health Studies" +
//         " curriculum. The purpose of the AE is to provide students with supervised, hands-on experience in a professional" +
//         " public health setting. The Applied Experience gives students an opportunity to explore an area of interest within" +
//         " the field of public health by actively engaging in and directly contributing to a public health project or program." +
//         " The AE must be at least 80 hours and 4 weeks long under the supervision of a public health profession.",
//       criteria: "AS.280.500[C]",
//     },
//     {
//       name: "Courses at Johns Hopkins Bloomberg School of Public Health (JHSPH)",
//       required_credits: 10,
//       min_credits_per_course: 3,
//       description:
//         "Courses are taken at the Johns Hopkins Bloomberg School of Public Health in the student's final year." +
//         " Students take 15 JHSPH credits, which is the equivalent of 10 Homewood credits. Blended courses may" +
//         " count for this requirement, Independent Research and Special Studies will not. Online courses will " +
//         "count toward you total number of credits needed to graduate, but will not count toward the 15 credits " +
//         "needed to fulfill this specific requirement. Within the 15 credits, students must create an 8 credits " +
//         "focus in one particular area, topic, or department.",
//       criteria: "AS Bloomberg School of Public Health[D]",
//     },
//     {
//       name: "Social Science",
//       required_credits: 6,
//       min_credits_per_course: 3,
//       description:
//         "Select two introductory social science courses from Table 1. Other courses may apply with advisor approval. " +
//         "These courses must be from two different departments..",
//       criteria: "AS Social Science[D]",
//     },
//     {
//       name: "Natural Science",
//       required_credits: 7,
//       min_credits_per_course: 1,
//       description: "Must complete the following courses in Natural Science.",
//       criteria: "AS Natural Science[N]",
//       fine_requirements: [
//         {
//           description:
//             "Select two Biology Lecture Courses of the following (Note: Other biology courses may apply with advisor approval):" +
//             "\n\tAS.020.151 General Biology I\n\tAS.020.152 General Biology II\n\tAS.020.303 Genetics\n\tAS.020.305 Biochemistry\n\t" +
//             "\n\tAS.020.306 Cell Biology\n\tAS.020.374 Comparative Animal Physiology\n\tAS.280.161 Applications of Biological Concepts in Public Health",
//           required_credits: 6,
//           criteria:
//             "AS.020.151[C]^OR^AS.020.152[C]^OR^AS.020.303[C]^OR^AS.020.305[C]^OR^AS.020.306[C]^OR^AS.020.374[C]" +
//             "^OR^AS.280.161[C]",
//         },
//         {
//           description:
//             "Select one Biology Lab Course of the following:\n\t" +
//             "AS.020.153 General Biology Laboratory I\n\tAS.020.154 General Biology Lab II\n\tAS.020.315 Biochemistry Project labs\n\t" +
//             "\n\tAS.020.316 Cell Biology Lab\n\tAS.020.340 Developmental Genetics Lab\n\tAS.020.377 Comparative Physiology Lab\n\t" +
//             "AS.250.253 Protein Engineering and Biochemistry Lab\n\tAS.250.254 Protein Biochemistry and Engineering Laboratory",
//           required_credits: 1,
//           criteria:
//             "AS.020.153[C]^OR^AS.020.154[C]^OR^AS.020.315[C]^OR^AS.020.316[C]^OR^AS.020.340[C]^OR^AS.020.377[C]" +
//             "^OR^AS.250.253[C]^OR^AS.250.254[C]",
//         },
//       ],
//     },
//     {
//       name: "Quantitative",
//       required_credits: 4,
//       min_credits_per_course: 4,
//       description: "Must complete the following courses in Quantitative.",
//       criteria: "AS Quantitative[N]",
//       fine_requirements: [
//         {
//           description:
//             "Select one Quantitative Course of the following:\n\t110.106 Calculus I (Biology and Social Sciences)\n\t" +
//             "110.108 Calculus I (Physical Sciences & Engineering)",
//           required_credits: 4,
//           criteria: "AS.110.106[C]^OR^AS.110.108[C]",
//         },
//       ],
//     },
//   ],
// };

// // https://engineering.jhu.edu/chembe/undergraduate-studies/undergraduate-degree-program/
// const bsCBE: Major = {
//   degree_name: "B.S. Chemical & Biomolecular Engineering",
//   department: "EN Chemical & Biomolecular Engineering",
//   total_degree_credit: 128,
//   wi_credit: 6,
//   distributions: [
//     {
//       name: "Core ChemBE",
//       required_credits: 48,
//       min_credits_per_course: 3,
//       description:
//         "For more information please visit the" +
//         "<a href='https://engineering.jhu.edu/chembe/undergraduate-studies/undergraduate-degree-program/'>" +
//         "major degree requirement</a> section on the department website.",
//       criteria: "EN Chemical & Biomedical Engineering[D]^OR^ChemBE[T]",
//       fine_requirements: [
//         {
//           description:
//             "Required Courses: \n\t500.113 Gateway Computing/Python\n\t540.101 Chemical Engineering Today\n\t" +
//             "540.202 Intro to Chemical and Biological Process Analysis\n\t540.203 Engineering Thermodynamics\n\t" +
//             "540.301 Kinetic Processes\n\t540.303 Transport Phenomena I\n\t540.304 Transport Phenomena II\n\t" +
//             "540.306 Chemical and Biological Separations\n\t540.315 Process Design with ASPEN\n\t" +
//             "540.409 Modeling Dynamics and Control for Chemical and Biological Systems\n\t" +
//             "540.490 Chemical and Biomolecular Lab Safety and Ethics",
//           required_credits: 33,
//           criteria:
//             "EN.500.113[C]^AND^EN.540.101[C]^AND^EN.540.202[C]^AND^EN.540.203[C]^AND^EN.540.301[C]^AND^" +
//             "EN.540.304[C]^AND^EN.540.306[C]^AND^EN.540.315[C]^AND^EN.540.409[C]^AND^EN.540.409[C]",
//         },
//         {
//           description:
//             "Take one of the following courses for Senior Lab: 540.311 Projects in Chemical " +
//             "Engineering Unit Operations\n\t540.313 Projects in Chemical and Biomolecular " +
//             "Engineering Unit Operations\n\tChemical Engineering Laboratory at DTU " +
//             "(Technical University of Denmark)",
//           required_credits: 4,
//           criteria: "EN.540.311[C]^OR^EN.540.313[C]",
//         },
//         {
//           description:
//             "Take one of the following course options for Product Design (3 to 6 credits): " +
//             "\n\tOption 1: One-semester design (Spring) - 540.314 ChemBE Product Design\n\t" +
//             "Option 2: Two-semester design (two consecutive semesters) - 540.309 Product Design Part 1\n\t" +
//             "540.310 Product Design Part 2 (Must take both courses to receive credit. 540.309 counts towards " +
//             "core credits; 540.310 counts toward engineering electives)\n\tOption 3: WSE one-semester design - " +
//             "500.308 Multidisciplinary Design",
//           required_credits: 3,
//           criteria:
//             "(EN.540.314[C])^OR^(EN.540.309[C]^OR^EN.540.310[C])^OR^(EN.500.308[C])",
//         },
//       ],
//     },
//     {
//       name: "Math",
//       required_credits: 16,
//       min_credits_per_course: 4,
//       description:
//         "All courses in this category must be from one of the two math departments on " +
//         "campus: Mathematics or Applied Math and Statistics.",
//       criteria: "AS Mathematics[D]^OR^EN Applied Math and Statistics[D]",
//       exception: "",
//       fine_requirements: [
//         {
//           description:
//             "Required Courses:\n\t110.108 Calculus I or AP equivalent\n\t110.109 Calculus II or AP equivalent\n\t" +
//             "110.202 Calculus III or AP equivalent\n\t110.302 Differential Equations with Applications",
//           required_credits: 16,
//           criteria:
//             "AS.110.108[C]^OR^AS.110.109[C]^OR^AS.110.202[C]^OR^AS.110.302[C]",
//         },
//       ],
//     },
//     {
//       name: "Science",
//       required_credits: 14,
//       min_credits_per_course: 1,
//       description:
//         "Students must take two semesters of core science courses (any combination of Physics, " +
//         "Chemistry, Biology), with their associated labs. AP credit is an acceptable substitute " +
//         "for these courses and labs.",
//       criteria:
//         "General Physics[N]^OR^General Biology[N]^OR^Introductory Chemistry[N]",
//     },
//     {
//       name: "Liberal Arts",
//       required_credits: 18,
//       min_credits_per_course: 3,
//       double_count: true,
//       description:
//         "These courses must have either an ‘H’ or ‘S’ area designator on them, but can be " +
//         "from any department. At most 2 of these courses may be taken S/U (if not counted towards " +
//         "the writing requirement). Foreign language courses can be counted as well, even if " +
//         "they don’t carry an ‘H’ or ‘S’ designator. The course below will also count towards 3 of the 6 required Writing Intensive credits",
//       criteria:
//         "AS Center for Language Education[D]^OR^AS Modern Languages and Literatures[D]^OR^H[A]^OR^S[A]",
//       fine_requirements: [
//         {
//           description:
//             "Required Course: 661.315 Culture of the Engineering Profession",
//           required_credits: 3,
//           criteria: "AS.661.315[C]",
//         },
//       ],
//     },
//     // {
//     //   name: "English Focused Writing Intensive",
//     //   required_credits: 3,
//     //   min_credits_per_course: 3,
//     //   double_count: true,
//     //   description:
//     //     "At least one course with a primary focus on writing in English must be chosen. " +
//     //     "Courses that satisfy this requirement are: EN.661.110, EN.661.111, EN.661.250, EN.661.251, " +
//     //     "EN.661.315, AS.060.100, AS.060.113, AS.220.105, AS.180.248, AS.290.303, AS.360.133.",
//     //   criteria:
//     //     "EN.661.110[C]^OR^EN.661.111[C]^OR^EN.661.250[C]^OR^EN.661.251[C]^OR^EN.661.315[C]" +
//     //     "^OR^AS.060.100[C]^OR^AS.060.113[C]^OR^AS.220.105[C]^OR^AS.180.248[C]^OR^AS.290.303[C]^OR^AS.360.133",
//     // },
//   ],
// };

// // https://krieger.jhu.edu/internationalstudies/undergraduate/requirements/
// const baIS: Major = {
//   degree_name: "B.A. International Studies",
//   department: "AS International Studies",
//   total_degree_credit: 120,
//   wi_credit: 12,
//   distributions: [
//     {
//       name: "Political Science",
//       required_credits: 18,
//       min_credits_per_course: 3,
//       description:
//         "International studies students must complete 18 credits in political science, including:\n\t" +
//         "One course in international relations (IR)\n\tTwo courses in comparative politics (CP)\n\tOne " +
//         "course in American politics (AP)\n\tOne course in political theory (PT)\n\tOne gateway course",
//       criteria: "AS Political Science[D]",
//       fine_requirements: [
//         {
//           required_credits: 3,
//           description: "One course in international relations (IR)",
//           criteria: "INST-IR[T]",
//         },
//         {
//           required_credits: 6,
//           description: "Two courses in comparative politics (CP)",
//           criteria: "INST-CP[T]",
//         },
//         {
//           required_credits: 3,
//           description: "One course in American politics (AP)",
//           criteria: "INST-AP[T]",
//         },
//         {
//           required_credits: 3,
//           description: "One course in political theory (PT)",
//           criteria: "INST-PT[T]",
//         },
//         {
//           required_credits: 3,
//           description:
//             "One of the following gateway courses: \n\tConflict and Security in a Global World " +
//             "(070.295)\n\tContemporary International Politics (190.108)\n\tIntroduction to Global " +
//             "Studies (190.111)\n\tIssues in International Development (230.150)*\n\t*Applies to " +
//             "students who entered fall 2019 and earlier only.",
//           criteria:
//             "AS.070.295[C]^OR^AS.190.108[C]^OR^AS.190.111[C]^OR^(AS.230.150[C]^AND^Fall 2019[Y])",
//         },
//       ],
//     },
//     {
//       name: "Economics",
//       required_credits: 12,
//       min_credits_per_course: 3,
//       description:
//         "Note: both Elements of Macroeconomics and Elements of Microeconomics must be " +
//         "completed by the end of the sophomore year.",
//       criteria: "AS Economics[D]",
//       fine_requirements: [
//         {
//           required_credits: 3,
//           description: "Elements of Macroeconomics (180.101)",
//           criteria: "AS.180.101[C]",
//         },
//         {
//           required_credits: 3,
//           description: "Elements of Microeconomics (180.102)",
//           criteria: "AS.180.102[C]",
//         },
//         {
//           required_credits: 3,
//           description:
//             "One approved international economics course designated INST-ECON in " +
//             "the course description; this course may sometimes be fulfilled via study " +
//             "abroad, with permission",
//           criteria: "INST-ECON[T]",
//         },
//         {
//           required_credits: 3,
//           description:
//             "One course (student’s choice) taken in the JHU Department of Economics (e.g., AS.180.xxx).",
//           criteria: "AS Economics[D]",
//         },
//       ],
//     },
//     {
//       name: "Foreign Language",
//       required_credits: 6,
//       min_credits_per_course: 3,
//       description:
//         "International studies majors must demonstrate proficiency in at least one" +
//         "foreign language. Proficiency through the second semester of the advanced/third-year " +
//         "level is required. If students have proficiency above the advanced/third-year level, " +
//         "they must take either: Option (A), two semesters of an upper level literature or culture " +
//         "course offered by the language departments and taught in the language of proficiency, or " +
//         "Option (B), take two semesters of another language.\n\nWaivers indicating advanced " +
//         "level/third-year language proficiency must be documented in the student’s official " +
//         "academic record in order for a student to be eligible to complete Option A or B. " +
//         "To receive these waivers, students must contact the Center for Language Education or " +
//         "the Department of Modern Languages & Literatures to complete a proficiency exam on " +
//         "campus.\n\nNote: Students cannot count their foreign language courses toward the 5 " +
//         "course advanced coursework requirement.",
//       criteria:
//         "AS Center for Language Education[D]^OR^AS Modern Languages and Literatures[D]",
//     },
//     {
//       name: "Focus Area",
//       required_credits: 12,
//       min_credits_per_course: 3,
//       description:
//         "Four courses within a coherent field of interest. For more detail please visit " +
//         "https://krieger.jhu.edu/internationalstudies/undergraduate/requirements/",
//       criteria: "",
//       user_select: true,
//     },
//     {
//       name: "History",
//       required_credits: 15,
//       min_credits_per_course: 3,
//       description:
//         "International Studies students must complete 15 credits in history, including:\n\t" +
//         "One introductory course at the 100-level in the JHU History Department " +
//         "(e.g., AS.100.1xx).\n\tFour courses designated INST-GLOBAL in the course description.",
//       criteria:
//         "(AS History[D]^AND^Lower Level Undergraduate[L])^OR^INST-GLOBAL[T]",
//       fine_requirements: [
//         {
//           required_credits: 3,
//           description:
//             "One introductory course at the 100-level in the JHU History Department (e.g., AS.100.1xx)",
//           criteria: "AS History[D]^AND^Lower Level Undergraduate[L]",
//         },
//         {
//           required_credits: 12,
//           description:
//             "Four courses designated INST-GLOBAL in the course description",
//           criteria: "INST-GLOBAL[T]",
//         },
//       ],
//     },
//   ],
// };

// // https://e-catalogue.jhu.edu/engineering/full-time-residential-programs/degree-programs/applied-mathematics-statistics/applied-mathematics-statistics-bs/#requirementstext
// const bsAMS: Major = {
//   degree_name: "B.S. Applied Mathematics & Statistics",
//   department: "EN Applied Mathematics & Statistics",
//   total_degree_credit: 120,
//   wi_credit: 6,
//   distributions: [
//     {
//       name: "Math",
//       required_credits: 39,
//       min_credits_per_course: 3,
//       description: "",
//       criteria: "AS Mathematics[D]^OR^EN Applied Math and Statistics[D]",
//       fine_requirements: [
//         {
//           description: "Calculus I, II, and III",
//           required_credits: 12,
//           criteria:
//             "AS.110.108[C]^OR^AS.110.109[C]^OR^AS.110.113[C]^OR^AS.110.202[C]^OR^AS.110.211[C]",
//         },
//         {
//           description: "Linear Algebra",
//           required_credits: 4,
//           criteria: "AS.110.201[C]^OR^AS.110.212[C]^OR^EN.553.291[C]",
//         },
//         {
//           description: "Differential Equations",
//           required_credits: 3,
//           criteria: "AS.110.302[C]^OR^EN.553.391[C]^OR^EN.553.473[C]",
//         },
//         {
//           description: "Numerical Linear Algebra",
//           required_credits: 4,
//           criteria: "EN.553.385[C]",
//         },
//         {
//           description: "Discrete Mathematics",
//           required_credits: 4,
//           criteria:
//             "EN.553.171[C]^OR^EN.553.172[C]^OR^EN.553.371[C]^OR^EN.553.471[C]^OR^EN.553.472[C]",
//         },
//         {
//           description: "Probability and Statistics",
//           required_credits: 8,
//           criteria: "EN.553.420[C]^OR^EN.553.430[C]^OR^EN.553.431[C]",
//         },
//         {
//           description: "Optimization",
//           required_credits: 4,
//           criteria: "EN.553.361[C]",
//         },
//       ],
//     },
//     {
//       name: "Computer Languages and Programming",
//       required_credits: 3,
//       min_credits_per_course: 1,
//       description:
//         "Select one of the following: " +
//         "EN.500.112 Gateway Computing: JAVA\n\tEN.500.113 Gateway Computing: Python\n\tEN.500.114Gateway Computing: Matlab\n\t" +
//         "AS.250.205 Introduction to Computing\n\tEN.553.281 Introduction to Mathematical Computing\n\tEN.580.242 & EN.580.244" +
//         "Biological Models and Simulations and Nonlinear Dynamics of Biological Systems\n\tEN.601.220 Intermediate Programming" +
//         ". NOTE: Students are strongly encouraged to fulfill this element of the requirement by taking EN.500.113 Gateway Computing: Python, and to do this in their first semester at Johns Hopkins University.",
//       criteria:
//         "EN.500.112[C]^OR^EN.500.113[C]^OR^EN.500.114[C]^OR^AS.250.205[C]^OR^EN.553.281[C]^OR^EN.580.242[C]^OR^EN.580.244[C]^OR^" +
//         "EN.601.220",
//     },
//     {
//       name: "Area of Focus",
//       required_credits: 12,
//       min_credits_per_course: 3,
//       description:
//         "Two courses within a coherent field of interest. For more detail please visit " +
//         "https://e-catalogue.jhu.edu/engineering/full-time-residential-programs/degree-programs/applied-mathematics-statistics/applied-mathematics-statistics-bs/#requirementstext",
//       criteria: "",
//       user_select: true,
//     },
//     {
//       name: "Natural Sciences",
//       required_credits: 12,
//       min_credits_per_course: 1,
//       description:
//         "Courses coded Natural Sciences. Laboratory courses that accompany Natural Science courses may" +
//         " be used in reaching this total. (Courses used to meet the requirements above may be counted toward this total.)",
//       criteria: "AS Natural Science[N]",
//     },
//     {
//       name: "Quantitative Studies",
//       required_credits: 40,
//       min_credits_per_course: 1,
//       description:
//         "Courses coded Quantitative Studies totaling 40 credits of which at least 18 credits must be in courses " +
//         "numbered 300 or higher. (Courses used to meet the requirements above may be counted toward this total.)",
//       criteria: "AS Natural Science[N]",
//     },
//     {
//       name: "Liberal Arts",
//       required_credits: 18,
//       min_credits_per_course: 3,
//       description:
//         "These courses must have either an ‘H’ or ‘S’ area designator on them, but can be " +
//         "from any department. At most 2 of these courses may be taken S/U (if not counted towards " +
//         "the writing requirement). Foreign language courses can be counted as well, even if " +
//         "they don’t carry an ‘H’ or ‘S’ designator.",
//       criteria:
//         "AS Center for Language Education[D]^OR^AS Modern Languages and Literatures[D]^OR^H[A]^OR^S[A]",
//     },
//     {
//       name: "Writing Intensive",
//       required_credits: 6,
//       min_credits_per_course: 3,
//       double_count: true,
//       description:
//         "Students are required to fulfill the university’s requirement of two writing intensive courses, " +
//         "each at least 3 credits. Students must receive at least a C- grade or better in these writing courses. ",
//       criteria: "",
//       fine_requirements: [
//         {
//           description:
//             "At least one course must be explicitly focused on writing skills in English (eg, courses in professional, " +
//             "fiction or expository writing). These courses may overlap with other requirements.",
//           required_credits: 3,
//           criteria: "N[A]",
//         },
//       ],
//     },
//   ],
// };

// https://www.cs.jhu.edu/undergraduate-studies/academics/ugrad-advising-manual/
const bsCS_Old: Major = {
  degree_name: "B.S. Computer Science (OLD - Pre-2021)",
  department: "EN Computer Science",
  total_degree_credit: 126,
  wi_credit: 6,
  url: "https://www.cs.jhu.edu/undergraduate-studies/academics/ugrad-advising-manual/",
  distributions: [
    {
      name: "Computer Science",
      required_credits: 42,
      min_credits_per_course: 1,
      description:
        "For more information please visit the <a href='https://www.cs.jhu.edu/undergraduate-studies/academics/ugrad-advising-manual/'>" +
        "major degree requirement</a> section on the department website.",
      criteria: "EN Computer Science[D]^OR^CSCI-OTHER[T]",
      fine_requirements: [
        {
          description:
            "<b>Computer Ethics(601.104).</b><p>Practical Ethics for Future Leaders (660.400/406) may be used as a substitute for the computer ethics requirement for the BS program, but does not count towards the CS total credits at all.</p>",
          required_credits: 1,
          criteria: "EN.600.104[C]^OR^EN.601.104[C]^OR^EN.660.400[C]",
        },
        {
          // TODO: show criteria rather than description
          description:
            "<b>Lower Level Undergraduate:</b><p>500.112/113/114 Gateway Computing or AP Comp Sci A or " +
            "equivalent<p>601.220 Intermediate Programming</p><p>601.226 Data Structures</p><p>601.229 " +
            "Computer System Fundamentals</p><p>600.231/271 Automata and Computation Theory</p><p>601.433 Algorithms</p>",
          required_credits: 20,
          criteria:
            "EN.500.112[C]^OR^EN.500.113[C]^OR^EN.500.114[C]^OR^EN.601.220[C]^OR^EN.601.226[C]" +
            "^OR^EN.601.229[C]^OR^EN.600.231[C]^OR^EN.600.271[C]^OR^EN.601.443[C]",
        },
        {
          description:
            "<b>Upper Level Undergraduate: </b><p>13 upper level CS credits in addition to the required Algorithms course</p>",
          required_credits: 13,
          criteria: "EN Computer Science[D]^AND^Upper Level Undergraduate[L]",
        },
        {
          description:
            "<b>2 Upper Level Classifications:</b><p>At least one upper level course in two of these four different classification</p> " +
            "areas: Applications(CSCI-APPL), Systems(CSCI-SYST), Software(CSCI-SOFT) and Reasoning(CSCI-RSNG)",
          required_credits: 6,
          exclusive: true,
          criteria:
            "CSCI-APPL[T]^OR^CSCI-SYST[T]^OR^CSCI-SOFT[T]^OR^CSCI-RSNG[T]",
        },
        {
          description:
            "<b>One Team(CSCI-TEAM) designated course.</b><p> This Team course may overlap other course " +
            "requirements, for example to count as both Team and Software.</p>",
          required_credits: 3,
          criteria: "CSCI-TEAM[T]",
        },
      ],
    },
    {
      name: "Math",
      required_credits: 24,
      min_credits_per_course: 3,
      description:
        "All courses in this category must be from one of the two math departments on " +
        "campus: Mathematics or Applied Math and Statistics. However, 553.171 Discrete Mathematics " +
        "may not count towards these math requirements. Other than Calculus I and II, all the " +
        "remaining courses must be 200-level or above. The BS math courses must include coverage " +
        "of both probability and statistics, which can be satisfied in many ways, including " +
        "taking any of the 553.3xx combined Probability & Statistics courses.",
      criteria: "AS Mathematics[D]^OR^EN Applied Math and Statistics[D]",
      exception: "EN.553.171[C]",
      fine_requirements: [
        {
          description:
            "<b>Required Courses:</b><p>110.108 Calculus I or AP equivalent</p>110.109 Calculus II or AP equivalent</p>" +
            "<p>550.171/553.171 Discrete Mathematics</p>",
          required_credits: 12,
          criteria:
            "AS.110.108[C]^OR^AS.110.109[C]^OR^EN.550.171[C]^OR^EN.553.171[C]",
        },
        {
          description:
            "<b>Probability and Statistics:</b><p>Two paths:</p><p>1. Any of the three courses below:</p><p>EN.553.211</p><p>EN.553.310</p><p>EN.553.311</p><p>2. Both Intro to Probability and Intro to Statistics</p><p>En.553.420</p><p>EN.553.430</p> ",
          required_credits: 4,
          criteria:
            "(EN.553.211^OR^EN.553.310^OR^EN.553.311)^OR^(EN.553.420^AND^EN.553.430)",
        },
      ],
    },
    {
      name: "Science",
      required_credits: 16,
      min_credits_per_course: 1,
      description:
        "At least two semesters of physics or two semesters of chemistry, with the associated laboratories, must be included.",
      criteria: "N[A]",
    },
    {
      name: "Liberal Arts",
      required_credits: 18,
      min_credits_per_course: 3,
      description:
        "These courses must have either an ‘H’ or ‘S’ area designator on them, but can be " +
        "from any department. At most 2 of these courses may be taken S/U (if not counted towards " +
        "the writing requirement). Foreign language courses can be counted as well, even if " +
        "they don’t carry an ‘H’ or ‘S’ designator.",
      criteria:
        "AS Center for Language Education[D]^OR^AS Modern Languages and Literatures[D]^OR^H[A]^OR^S[A]",
    },
    {
      name: "Writing Intensive",
      required_credits: 6,
      min_credits_per_course: 3,
      double_count: true,
      description:
        "Students are required to fulfill the university’s requirement of two writing intensive courses, " +
        "each at least 3 credits. Students must receive at least a C- grade or better in these writing courses. ",
      criteria: "Written Intensive[W]",
      fine_requirements: [
        {
          description:
            "<b>Writing-focused WI</b><p>At least one course must be explicitly focused on writing skills in English (eg, courses in professional, " +
            "fiction or expository writing). These courses may overlap with other requirements.</p><p>Any of the courses below would be satisfactory:</p><p>AS.060.100</p><p>AS.060.113</p><p>AS.060.114</p><p>AS.180.248</p><p>AS.220.105</p><p>AS.220.106</p><p>AS.220.108</p><p>AS.290.303</p><p>AS.360.133</p><p>EN.661.110</p><p>EN.661.111</p><p>EN.661.250</p><p>EN.661.251</p><p>EN.661.315</p>",
          required_credits: 3,
          criteria:
            "AS.060.100[C]^OR^AS.060.113[C]^OR^AS.060.114[C]^OR^AS.180.248[C]^OR^AS.220.105[C]^OR^AS.220.106[C]^OR^AS.220.108[C]^OR^AS.290.303[C]^OR^AS.360.133[C]^OR^EN.661.110[C]^OR^EN.661.111[C]^OR^EN.661.250[C]^OR^EN.661.251[C]^OR^EN.661.315[C]",
        },
      ],
    },
  ],
};

// https://www.cs.jhu.edu/2021undergraduate-advising-manual/
const bsCS_New: Major = {
  degree_name: "B.S. Computer Science (NEW - 2021 & after)",
  department: "EN Computer Science",
  total_degree_credit: 120,
  wi_credit: 6,
  url: "https://www.cs.jhu.edu/2021undergraduate-advising-manual/",
  distributions: [
    {
      name: "Computer Science",
      required_credits: 40,
      min_credits_per_course: 1,
      description:
        "For more information please visit the <a href='https://www.cs.jhu.edu/2021undergraduate-advising-manual/'>" +
        "major degree requirement</a> section on the department website.",
      criteria: "EN Computer Science[D]^OR^CSCI-OTHER[T]",
      fine_requirements: [
        {
          description:
            "<b>Computer Ethics(601.104).</b><p>Practical Ethics for Future Leaders (660.400/406) may be used as a substitute for the computer ethics requirement for the BS program, but does not count towards the CS total credits at all.</p>",
          required_credits: 1,
          criteria: "EN.600.104[C]^OR^EN.601.104[C]^OR^EN.660.400[C]",
        },
        {
          description:
            "<b>Lower Level Undergraduate:</b><p>500.112/113/114 Gateway Computing or AP Comp Sci A or " +
            "equivalent<p>601.220 Intermediate Programming</p><p>601.226 Data Structures</p><p>601.229 " +
            "Computer System Fundamentals</p><p>600.231/271 Automata and Computation Theory</p><p>601.433 Algorithms</p>",
          required_credits: 21,
          criteria:
            "EN.500.112[C]^OR^EN.500.113[C]^OR^EN.500.114[C]^OR^EN.601.220[C]^OR^EN.601.226[C]" +
            "^OR^EN.601.229[C]^OR^EN.601.230[C]^OR^EN.601.443[C]",
        },
        {
          description:
            "<b>Upper Level Undergraduate: </b><p>13 upper level CS credits in addition to the required Algorithms course</p>",

          required_credits: 12,
          criteria:
            "EN Computer Science[D]^AND^Upper Level Undergraduate[L]^NOT^EN.601.433[C]^NOT^EN.601.633[C]",
        },
        {
          description:
            "<b>2 Upper Level Classifications:</b><p>At least one upper level course in two of these four different classification</p> " +
            "areas: Applications(CSCI-APPL), Systems(CSCI-SYST), Software(CSCI-SOFT) and Reasoning(CSCI-RSNG)",
          required_credits: 6,
          exclusive: true,
          criteria:
            "CSCI-APPL[T]^OR^CSCI-SYST[T]^OR^CSCI-SOFT[T]^OR^CSCI-RSNG[T]",
        },
        {
          description:
            "<b>One Team(CSCI-TEAM) designated course.</b><p> This Team course may overlap other course " +
            "requirements, for example to count as both Team and Software.</p>",
          required_credits: 3,
          criteria: "CSCI-TEAM[T]",
        },
      ],
    },
    {
      name: "Math",
      required_credits: 16,
      min_credits_per_course: 3,
      description:
        "All courses in this category must be from one of the two math departments on " +
        "campus: Mathematics or Applied Math and Statistics. However, 553.171 Discrete Mathematics " +
        "may not count towards these math requirements. Other than Calculus I and II, all the " +
        "remaining courses must be 200-level or above. The BS math courses must include coverage " +
        "of both probability and statistics, which can be satisfied in many ways, including " +
        "taking any of the 553.3xx combined Probability & Statistics courses.",
      criteria: "AS Mathematics[D]^OR^EN Applied Math and Statistics[D]",
      exception: "EN.553.171[C]",
      fine_requirements: [
        {
          description:
            "<b>Required Courses:</b><p>110.108 Calculus I or AP equivalent</p>110.109 Calculus II or AP equivalent</p>" +
            "<p>550.171/553.171 Discrete Mathematics</p>",
          required_credits: 8,
          criteria: "AS.110.108[C]^OR^AS.110.109[C]",
        },
        {
          description:
            "<b>Probability and Statistics:</b><p>Two paths:</p><p>1. Any of the three courses below:</p><p>EN.553.211</p><p>EN.553.310</p><p>EN.553.311</p><p>2. Both Intro to Probability and Intro to Statistics</p><p>En.553.420</p><p>EN.553.430</p> ",
          required_credits: 4,
          criteria:
            "EN Applied Mathematics & Statistics[D]^AND^(Probability & Statistics[N]^OR^Probability and Statistics[N])^AND^Upper Level Undergraduate[L]",
        },
      ],
    },
    {
      name: "Science",
      required_credits: 8,
      min_credits_per_course: 1,
      description:
        "Students must take two semesters of core science courses (any combination of Physics, " +
        "Chemistry, Biology), with their associated labs. AP credit is an acceptable substitute for these courses and labs.",
      criteria: "N[A]",
    },
    {
      name: "Liberal Arts",
      required_credits: 18,
      min_credits_per_course: 3,
      description:
        "These courses must have either an ‘H’ or ‘S’ area designator on them, but can be " +
        "from any department. At most 2 of these courses may be taken S/U (if not counted towards " +
        "the writing requirement). Foreign language courses can be counted as well, even if " +
        "they don’t carry an ‘H’ or ‘S’ designator.",
      criteria:
        "AS Center for Language Education[D]^OR^AS Modern Languages and Literatures[D]^OR^H[A]^OR^S[A]",
    },
    {
      name: "Writing Intensive",
      required_credits: 6,
      min_credits_per_course: 3,
      double_count: true,
      description:
        "Students are required to fulfill the university’s requirement of two writing intensive courses, " +
        "each at least 3 credits. Students must receive at least a C- grade or better in these writing courses. ",
      criteria: "Written Intensive[W]",
      fine_requirements: [
        {
          description:
            "<b>Writing-focused WI</b><p>At least one course must be explicitly focused on writing skills in English (eg, courses in professional, " +
            "fiction or expository writing). These courses may overlap with other requirements.</p><p>Any of the courses below would be satisfactory:</p><p>AS.060.100</p><p>AS.060.113</p><p>AS.060.114</p><p>AS.180.248</p><p>AS.220.105</p><p>AS.220.106</p><p>AS.220.108</p><p>AS.290.303</p><p>AS.360.133</p><p>EN.661.110</p><p>EN.661.111</p><p>EN.661.250</p><p>EN.661.251</p><p>EN.661.315</p>",

          required_credits: 3,
          criteria:
            "AS.060.100[C]^OR^AS.060.113[C]^OR^AS.060.114[C]^OR^AS.180.248[C]^OR^AS.220.105[C]^OR^AS.220.106[C]^OR^AS.220.108[C]^OR^AS.290.303[C]^OR^AS.360.133[C]^OR^EN.661.110[C]^OR^EN.661.111[C]^OR^EN.661.250[C]^OR^EN.661.251[C]^OR^EN.661.315[C]",
        },
      ],
    },
  ],
};

export function getMajorFromCommonName(name: string) {
  let out: Major | null = null;
  allMajors.forEach((major) => {
    if (major.degree_name === name) {
      out = major;
    }
  });
  if (out === null) {
    throw Error("Major not found");
  }
  return out;
}

// TODO: Separate code for BA and BS into separate sections
export const allMajors: Major[] = [
  bsCS_Old,
  bsCS_New,
  // bsAMS,
  // baIS,
  // baPH,
  // bsBME,
  // baHistory,
  // baBiology,
  // bsCBE,

  // baEcon,
  // bsAMS,
  // baPsych,
  // baMolCell,
  // baNeuro,
  // baSoc,
  // bsElectricEng,
  // bsEnvEng,
  // baWritingSems,
  // bsMath,
  // bsPhysics,
  // baMSH,
  // bsBioPhysics,
  // bsChem,
  // bsME,
  // bsCogSci,
  // bsMatSci,
  // bsBBio,
  // baHistArt,
  // bsCompEng,
  // bsEPS,
  // bsEnvSci,
  // baEnglish,
  // bsCivEng,
];
