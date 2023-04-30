import { Major, Minor } from './commonTypes';

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

// https://e-catalogue.jhu.edu/engineering/full-time-residential-programs/degree-programs/electrical-computer-engineering/electrical-engineering-bachelor-science/#requirementstext
const bsECE: Major = {
  degree_name: 'B.S. Electrical Engineering',
  department: 'EN Electrical & Computer Engineering',
  total_degree_credit: 126,
  wi_credit: 6,
  abbrev: 'ECE',
  url: 'https://e-catalogue.jhu.edu/engineering/full-time-residential-programs/degree-programs/electrical-computer-engineering/electrical-engineering-bachelor-science/#requirementstext',
  distributions: [
    {
      name: 'ECE Core',
      required_credits: 18,
      min_credits_per_course: 2,
      description:
        'For more information please visit the' +
        "<a href='https://e-catalogue.jhu.edu/engineering/full-time-residential-programs/degree-programs/electrical-computer-engineering/electrical-engineering-bachelor-science/#requirementstext'>" +
        'major degree requirement</a> on the academic catalogue.',
      criteria:
        'EN.520.123[C]^OR^EN.520.142[C]^OR^EN.520.214[C]^OR^EN.520.219[C]^OR^EN.520.230[C]^OR^EN.520.231[C]',
      double_count: ['Humanity & Social Sciences', 'Writing Intensive'],
      fine_requirements: [
        {
          description:
            '<b>Computational Modeling for Electrical and Computer Engineering</b> <br /> EN.520.123',
          required_credits: 3,
          criteria: 'EN.520.123[C]',
        },
        {
          description: '<b>Digital Systems Fundamentals</b> <br /> EN.520.142',
          required_credits: 3,
          criteria: 'EN.520.142[C]',
        },
        {
          description: '<b>Signals and Systems</b> <br /> EN.520.214',
          required_credits: 4,
          criteria: 'EN.520.214[C]',
        },
        {
          description:
            '<b>Introduction to Electromagnetics</b> <br /> EN.520.219',
          required_credits: 3,
          criteria: 'EN.520.219[C]',
        },
        {
          description: '<b>Mastering Electronics</b> <br /> EN.520.230',
          required_credits: 3,
          criteria: 'EN.520.230[C]',
        },
        {
          description:
            '<b>Mastering Electronics Laboratory</b> <br /> EN.520.231',
          required_credits: 2,
          criteria: 'EN.520.231[C]',
        },
      ],
    },
    {
      name: 'ECE Electives',
      required_credits: 15,
      min_credits_per_course: 1,
      description:
        'Up to six (6) credits of computer science courses may be used to satisfy this requirement.',
      criteria:
        'EN Computer Science[D]^OR^EN Electrical & Computer Engineering[D]',
      double_count: ['Humanity & Social Sciences', 'Writing Intensive'],
      fine_requirements: [
        {
          description: 'At least 9 credits of ECE electives',
          required_credits: 9,
          criteria: 'EN Electrical & Computer Engineering[D]',
        },
        {
          description:
            '<b>Intermediate Programming</b><br />EN.601.220<br />Can also be satisfied in Other Engineering.',
          required_credits: 4,
          criteria: 'EN.601.220[C]',
        },
      ],
    },
    {
      name: 'ECE Labs',
      required_credits: 12,
      min_credits_per_course: 1,
      description:
        'Students must take a total of 12 credits of advanced laboratory, design intensive, or senior design project courses. A minimum of six (6) credits must come from ECE. The remaining 6 credits of advanced lab can come from any department, as long as the class is listed as an option in this section of the degree audit and degree checksheet.',
      criteria:
        'EN Computer Science[D]^OR^EN Electrical & Computer Engineering[D]',
      double_count: ['Humanity & Social Sciences', 'Writing Intensive'],
      fine_requirements: [
        {
          description: 'Advanced Laboratory Courses in ECE',
          required_credits: 6,
          criteria:
            'EN.520.412[C]^OR^EN.520.424[C]^OR^EN.520.427[C]^OR^EN.520.433[C]^OR^EN.520.440[C]^OR^EN.520.448[C]^OR^EN.520.450[C]^OR^EN.520.452[C]^OR^EN.520.453[C]^OR^EN.520.454[C]^OR^EN.520.462[C]^OR^EN.520.463[C]^OR^EN.520.483[C]^OR^EN.520.491[C]^OR^EN.520.492[C]^OR^EN.495[C]^OR^EN.520.498[C]^OR^EN.520.499[C]',
        },
        {
          description: 'Advanced Lab Credits from Approved List',
          required_credits: 6,
          criteria:
            'EN.510.433[C]^OR^EN.510.434[C]^OR^EN.530.420[C]^OR^EN.530.421[C]^OR^EN.530.474[C]^OR^EN.530.495[C]^OR^EN.540.400[C]^OR^EN.540.421[C]^OR^EN.540.418[C]^OR^EN.540.419[C]^OR^EN.580.437[C]^OR^EN.580.438[C]^OR^EN.580.311[C]^OR^EN.580.312[C]^OR^EN.580.411[C]^OR^EN.580.412[C]^OR^EN.580.457[C]^OR^EN.580.471[C]^OR^EN.580.480[C]^OR^EN.580.481[C]^OR^EN.580.493[C]^OR^EN.601.411[C]^OR^EN.601.315[C]^OR^EN.601.415[C]^OR^EN.601.317[C]^OR^EN.601.417[C]^OR^EN.601.421[C]^OR^EN.601.443[C]^OR^EN.601.447[C]^OR^EN.601.454[C]^OR^EN.601.456[C]^OR^EN.601.461[C]^OR^EN.601.466[C]^OR^EN.601.468[C]^OR^EN.601.476[C]^OR^EN.601.482[C]^OR^EN.601.496[C]',
        },
      ],
    },
    {
      name: 'Other Engineering',
      required_credits: 6,
      min_credits_per_course: 1,
      description:
        'Six (6) credits of "other engineering" courses (with an E designation) from KSAS or School of Engineering departments other than ECE or Applied Mathematics and Statistics or General Engineering (Note: Entrepreneurship and Management courses in the Center for Leadership Education CANNOT be counted as “other engineering courses”).',
      criteria:
        'E[A]^NOT^(EN Electrical & Computer Engineering[D]^OR^EN Applied Mathematics & Statistics[D]^OR^EN General Engineering[D])',
      double_count: ['Humanity & Social Sciences', 'Writing Intensive'],
      fine_requirements: [
        {
          description:
            '<b>Intermediate Programming</b><br />EN.601.220<br />Can also be satisfied in ECE Electives.',
          required_credits: 4,
          criteria: 'EN.601.220[C]',
        },
      ],
    },
    {
      name: 'Math',
      required_credits: 20,
      min_credits_per_course: 4,
      description:
        'Courses in this group may not be taken Satisfactory/Unsatisfactory. Elementary or precalculus courses such as AS.110.105 Precalculus or EN.553.111 Statistical Analysis I - are not acceptable.',
      criteria:
        'AS.110.109[C]^OR^AS.110.202[C]^OR^AS.110.211[C]^OR^AS.110.201[C]^OR^AS.110.212[C]^OR^AS.110.302[C]^OR^EN.553.310[C]^OR^EN.553.311[C]^OR^EN.553.420[C]',
      fine_requirements: [
        {
          description:
            '<b>Calculus II (For Physical Sciences and Engineering)</b><br /> AS.110.109',
          required_credits: 4,
          criteria: 'AS.110.109[C]',
        },
        {
          description:
            '<b>Linear Algebra</b> or <b>Honors Linear Algebra</b><br /> AS.110.201 or AS.110.212',
          required_credits: 4,
          criteria: 'AS.110.202[C]^OR^AS.110.211[C]',
        },
        {
          description:
            '<b>Calculus III</b> or <b>Honors Multivariable Calculus</b><br /> AS.110.201 or AS.110.212',
          required_credits: 4,
          criteria: 'AS.110.201[C]^OR^AS.110.212[C]',
        },
        {
          description:
            '<b>Differential Equations and Applications</b><br /> AS.110.302',
          required_credits: 4,
          criteria: 'AS.110.302[C]',
        },
        {
          description:
            '<b>Probability & Statistics</b> or <b>Introduction to Probability</b><br /> AS.553.310 or AS.553.311 or AS.553.420',
          required_credits: 4,
          criteria: 'EN.553.310[C]^OR^EN.553.311[C]^OR^EN.553.420[C]',
        },
      ],
    },
    {
      name: 'Basic Sciences',
      required_credits: 16,
      min_credits_per_course: 1,
      description:
        'Courses in this group may not be taken Satisfactory/Unsatisfactory. Must include AS.171.101 General Physics: Physical Science Major I-AS.171.102 General Physics: Physical Science Major II, AS.173.111 General Physics Laboratory I-AS.173.112 General Physics Laboratory II.',
      criteria: 'N[A]',
      double_count: ['Humanity & Social Sciences', 'Writing Intensive'],
      fine_requirements: [
        {
          description:
            '<b>General Physics I</b><br /> AS.171.101 or AS.171.107',
          required_credits: 4,
          criteria: 'AS.171.101[C]^OR^AS.171.107[C]',
        },
        {
          description:
            '<b>General Physics II</b><br /> AS.171.102 or AS.171.108',
          required_credits: 4,
          criteria: 'AS.171.102[C]^OR^AS.171.108[C]',
        },
        {
          description: '<b>General Physics Laboratory I</b><br /> AS.173.111',
          required_credits: 1,
          criteria: 'AS.173.111[C]',
        },
        {
          description: '<b>General Physics Laboratory II</b><br /> AS.173.112',
          required_credits: 1,
          criteria: 'AS.173.111[C]',
        },
        {
          description: '<b>Introductory Chemistry</b><br /> AS.030.101',
          required_credits: 4,
          criteria: 'AS.030.101[C]',
        },
        {
          description: '<b>Additional N credits</b>',
          required_credits: 3,
          criteria: 'N[A]',
        },
      ],
    },
    {
      name: 'Ethics',
      required_credits: 3,
      min_credits_per_course: 1,
      description:
        'Two (2) credits in EN.660.400 Practical Ethics for Future Leaders and one (1) credit EN.520.404 Engineering solutions in a global, economic, environmental, and societal context.',
      criteria: 'EN.660.400[C]^OR^EN.520.404[C]',
      double_count: ['Humanity & Social Sciences', 'Writing Intensive'],
    },
    {
      name: 'Humanity & Social Sciences',
      required_credits: 15,
      min_credits_per_course: 3,
      description:
        'At least five (5), three-credit courses in humanities and social sciences.',
      criteria: '(H[A]^OR^S[A])^NOT^(EN.660.400[C]^OR^EN.520.404[C])',
      double_count: ['All'],
    },
    {
      name: 'Writing Intensive',
      required_credits: 6,
      min_credits_per_course: 3,
      description:
        'Two (2) writing-intensive courses (at least 3 credits each) are required. The writing-intensive courses may not be taken Satisfactory/Unsatisfactory and require a C- or better grade.',
      criteria: 'Written Intensive[W]',
      double_count: ['All'],
    },
  ],
};

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

// https://cogsci.jhu.edu/undergraduate/cognitive-science-major/
/**
 * Problem 1: Upper level electives double count with focal area if not marked exclusive, doesnt work at all if marked exclusive.
 * Problem 2: Classes with multiple areas satisfy all distribution requirements whereas they should satisfy only one of them.
 * Solution: Exclusivity should be relative to distributions and individual fine requirements rather than just be a boolean. Also, when a distribution is satisfied, it should no longer be considered in the exclusivity check. This solves Problem 1 and Problem 2
 */
const baCogSci: Major = {
  degree_name: 'B.A. Cognitive Science',
  abbrev: 'B.A. Cog Sci',
  department: 'AS Cognitive Science',
  total_degree_credit: 81,
  wi_credit: 12,
  url: 'https://cogsci.jhu.edu/undergraduate/cognitive-science-major/',
  distributions: [
    {
      name: 'One Course from each Focal Area',
      required_credits: 15,
      min_credits_per_course: 3,
      description:
        'One course is required from each focal area offered by the department: <br />' +
        'Cognitive Psychology/Cognitive Neuropsychology <br />' +
        'Linguistics <br />' +
        'Computational Approaches to Cognition <br />' +
        'Philosophy of Mind <br />' +
        'Neuroscience',
      criteria:
        'COGS-COGPSY[T]^OR^COGS-LING[T]^OR^COGS-COMPCG[T]^OR^COGS-NEURO[T]^OR^COGS-PHLMND[T]',
      double_count: [
        'Two Focal Areas',
        'Math',
        'Humanities (H) Distribution',
        'Social Sciences (S) Distribution',
        'Other (N/E/Q) Distribution',
        'Writing Intensive',
      ],
      fine_requirements: [
        {
          description: '<b>Cognitive Psychology/Cognitive Neuropsychology</b>',
          required_credits: 3,
          criteria: 'COGS-COGPSY[T]',
          double_count: ['All'],
        },
        {
          description: '<b>Linguistics</b>',
          required_credits: 3,
          criteria: 'COGS-LING[T]',
          double_count: ['All'],
        },
        {
          description: '<b>Computational Approaches to Cognition</b>',
          required_credits: 3,
          criteria: 'COGS-COMPCG[T]',
          double_count: ['All'],
        },
        {
          description: '<b>Philosophy of Mind</b>',
          required_credits: 3,
          criteria: 'COGS-PHLMND[T]',
          double_count: ['All'],
        },
        {
          description: '<b>Neuroscience</b>',
          required_credits: 3,
          criteria: 'COGS-NEURO[T]',
          double_count: ['All'],
        },
      ],
    },
    {
      name: 'Two Focal Areas',
      required_credits: 12,
      min_credits_per_course: 3,
      description:
        'Four courses in each of the two chosen focal areas. Research, readings, and practica courses do not qualify.',
      criteria:
        'COGS-COGPSY[T]^OR^COGS-LING[T]^OR^COGS-COMPCG[T]^OR^COGS-NEURO[T]^OR^COGS-PHLMND[T]',
      double_count: [
        'One Course from each Focal Area',
        'Math',
        'Humanities (H) Distribution',
        'Social Sciences (S) Distribution',
        'Other (N/E/Q) Distribution',
        'Writing Intensive',
      ],
      pathing: 2,
      fine_requirements: [
        {
          description:
            '<b>Cognitive Psychology/Cognitive Neuropsychology</b> <br />' +
            'At least 2 courses must be at the 300 level or above.',
          required_credits: 12,
          criteria: 'COGS-COGPSY[T]',
          double_count: ['All'],
        },
        {
          description:
            '<b>Linguistics</b> <br />' +
            'At least 2 courses must be at the 300 level or above.',
          required_credits: 12,
          criteria: 'COGS-LING[T]',
          double_count: ['All'],
        },
        {
          description:
            '<b>Computational Approaches to Cognition</b> <br />' +
            'At least 2 courses must be at the 300 level or above.',
          required_credits: 12,
          criteria: 'COGS-COMPCG[T]',
          double_count: ['All'],
        },
        {
          description:
            '<b>Philosophy of Mind</b> <br />' +
            'At least 2 courses must be at the 300 level or above.',
          required_credits: 12,
          criteria: 'COGS-PHLMND[T]',
          double_count: ['All'],
        },
        {
          description:
            '<b>Neuroscience</b> <br />' +
            'At least 2 courses must be at the 300 level or above.',
          required_credits: 12,
          criteria: 'COGS-NEURO[T]',
          double_count: ['All'],
        },
      ],
    },
    {
      name: 'Upper Level Electives',
      required_credits: 9,
      min_credits_per_course: 1,
      description:
        'Nine credits at the 300-600 level chosen from any of the five areas or other cognitive science courses.' +
        'Up to three credits of cognitive science research, readings, or practica may apply.',
      criteria:
        '(COGS-COGPSY[T]^OR^COGS-LING[T]^OR^COGS-COMPCG[T]^OR^COGS-NEURO[T]^OR^COGS-PHLMND[T])^AND^(Upper Level[L])',
      double_count: [
        'Math',
        'Humanities (H) Distribution',
        'Social Sciences (S) Distribution',
        'Other (N/E/Q) Distribution',
        'Writing Intensive',
      ],
    },
    {
      name: 'Math',
      required_credits: 6,
      min_credits_per_course: 3,
      description:
        'Select Math Option A or B. For students with Cognitive Psychology/Neuropsychology as one of their focal areas, Math Option B is required',
      criteria:
        'AS.110.106[C]^OR^AS.110.108[C]^OR^AS.110.107[C]^OR^AS.110.109[C]^OR^AS.110.113[C]^OR^' +
        'AS.110.201[C]^OR^AS.110.212[C]^OR^EN.553.291[C]^OR^AS.150.118[C]^OR^AS.150.420[C]^OR^AS.050.370[C]^OR^' +
        'AS.050.371[C]^OR^AS.050.372[C]^OR^EN.553.171[C]^OR^AS.200.200[C]^OR^AS.200.201[C]',
      double_count: ['All'],
      pathing: 1,
      fine_requirements: [
        {
          description:
            '<b>Option A</b> <br /> Select two of the following: <br />' +
            'AS.110.106 Calculus I (Biological and Social Sciences) OR AS.110.108 Calculus I (Physical Sciences and Engineering <br />' +
            'AS.110.107 Calculus II (Biological and Social Sciences) OR AS.110.109 Calculus II (Physical Sciences and Engineering OR AS.110.113 Honors Single Variable Calculus<br />' +
            'AS.110.201/212 Linear Algebra OR EN.553.291 Linear Algebra and Differential Equations <br />' +
            'AS.150.118 Introduction to Formal Logic <br />' +
            'AS.150.420 Mathematical Logic I <br />' +
            'AS.050.370 Mathematical Models of Language <br />' +
            'AS.050.371 Bayseian Inference <br />' +
            'AS.050.372 Foundations of Neural Network Theory <br />' +
            'EN.553.171 Discrete Mathematics',
          required_credits: 6,
          criteria:
            'AS.110.106[C]^OR^AS.110.108[C]^OR^AS.110.107[C]^OR^AS.110.109[C]^OR^AS.110.113[C]^OR^' +
            'AS.110.201[C]^OR^AS.110.212[C]^OR^EN.553.291[C]^OR^AS.150.118[C]^OR^AS.150.420[C]^OR^AS.050.370[C]^OR^' +
            'AS.050.371[C]^OR^AS.050.372[C]^OR^EN.553.171[C]',
        },
        {
          description:
            '<b>Option B</b> <br />' +
            'AS.200.200 Research Methods in Psychology <br />' +
            'AS.200.201 Design and Statistical Analysis for Psychology',
          required_credits: 8,
          criteria: 'AS.200.200[C]^OR^AS.200.201[C]',
        },
      ],
    },
    {
      name: 'Humanities (H) Distribution',
      required_credits: 9,
      min_credits_per_course: 3,
      description:
        'The distribution requirement stipulates that students must earn a minimum number of credits in academic areas outside of their primary major. ' +
        'The student must complete at least 9 credits in the Humanities (H) area. ' +
        'These credits fulfilling the distribution requirement may overlap with major or minor requirements and the writing-intensive requirement.',
      criteria: 'H[A]',
      double_count: [
        'One Course from each Focal Area',
        'Two Focal Areas',
        'Upper Level Electives',
        'Math',
        'Writing Intensive',
      ],
    },
    {
      name: 'Social Science (S) Distribution',
      required_credits: 9,
      min_credits_per_course: 3,
      description:
        'The distribution requirement stipulates that students must earn a minimum number of credits in academic areas outside of their primary major. ' +
        'The student must complete at least 9 credits in the Social Science (S) area. ' +
        'These credits fulfilling the distribution requirement may overlap with major or minor requirements and the writing-intensive requirement.',
      criteria: 'S[A]',
      double_count: [
        'One Course from each Focal Area',
        'Two Focal Areas',
        'Upper Level Electives',
        'Math',
        'Writing Intensive',
      ],
    },
    {
      name: 'Other (N/E/Q) Distribution',
      required_credits: 9,
      min_credits_per_course: 3,
      description:
        'The distribution requirement stipulates that students must earn a minimum number of credits in academic areas outside of their primary major. ' +
        'The student must complete at least 9 credits in any of the other areas: Natural Sciences (N), Engineering (E) and/or Quantitative (Q). ' +
        'These credits fulfilling the distribution requirement may overlap with major or minor requirements and the writing-intensive requirement.',
      criteria: 'N[A]^OR^E[A]^OR^Q[A]',
      double_count: [
        'One Course from each Focal Area',
        'Two Focal Areas',
        'Upper Level Electives',
        'Math',
        'Writing Intensive',
      ],
    },
    {
      name: 'Writing Intensive',
      required_credits: 12,
      min_credits_per_course: 3,
      description:
        'To encourage excellence in writing, across disciplines, the university requires all undergraduates to take a number of writing-intensive courses. ' +
        'All students earning a degree from the School of Arts and Sciences must complete at least 12 credits in writing-intensive courses. ' +
        'Writing-intensive courses taken to satisfy major, minor, or distribution requirements may also count toward the writing requirement.',
      criteria: 'Written Intensive[W]',
      double_count: ['All'],
    },
  ],
};

// // https://me.jhu.edu/undergraduate-studies/academic-advising-undergraduate/
// const bsME: Major = {
//   degree_name: "B.S. Mechanical Engineering",
//   department: "AS Mechanical Engineering",
//   total_degree_credit: 120,
//   wi_credit: 6,
//   distributions: [],
// };

// https://chemistry.jhu.edu/undergraduate/requirements/
const baChem: Major = {
  degree_name: 'B.A. Chemistry',
  abbrev: 'baChem',
  department: 'AS Chemistry',
  total_degree_credit: 120,
  wi_credit: 15,
  url: 'https://e-catalogue.jhu.edu/arts-sciences/full-time-residential-programs/degree-programs/chemistry/chemistry-bachelor-arts/',
  distributions: [
    {
      name: 'Chemistry Core',
      required_credits: 40,
      min_credits_per_course: 1,
      description:
        'These are the core chemistry courses required for the major.' +
        '<br>For more information please visit the degree requirements section on the department website.',
      criteria:
        'AS.030.101[C]^OR^AS.030.102[C]^OR^AS.030.103[C]^OR^AS.030.105[C]^OR^AS.030.106[C]^OR^AS.030.205[C]^OR^AS.030.206[C]^OR^AS.030.212[C]^OR^AS.030.225[C]' +
        '^OR^AS.030.227[C]^OR^AS.030.228[C]^OR^AS.030.301[C]^OR^AS.030.302[C]^OR^AS.030.449[C]^OR^AS.030.356[C]^OR^AS.030.245[C]^OR^AS.030.305[C]^OR^AS.030.306[C]',
      double_count: [
        'Humanities (H) Distribution',
        'Social Science (S) Distribution',
        'Other (N/E/Q) Distribution',
        'Writing Intensive',
      ],
      fine_requirements: [
        {
          description:
            '<b>Introductory Chemistry I</b> <br /> AS.030.101 Introductory Chemistry I',
          required_credits: 3,
          criteria: 'AS.030.101[C]',
        },
        {
          description:
            '<b>Introductory Chemistry II</b> <br /> AS.030.102 Introductory Chemistry II <br /><i>OR<i><br /> AS.030.103 Applied Chemical Equilibrium and Reactivity',
          required_credits: 3,
          criteria: 'AS.030.102[C]^OR^AS.030.103[C]',
        },
        {
          description:
            '<b>Introductory Chemistry Laboratory I</b> <br /> AS.030.105 Introductory Chemistry Laboratory I',
          required_credits: 1,
          criteria: 'AS.030.105[C]',
        },
        {
          description:
            '<b>Introductory Chemistry Laboratory II</b> <br /> AS.030.106 Introductory Chemistry Laboratory II',
          required_credits: 1,
          criteria: 'AS.030.106[C]',
        },
        {
          description:
            '<b>Introductory Organic Chemistry I</b> <br /> AS.030.205 Introductory Organic Chemistry I',
          required_credits: 4,
          criteria: 'AS.030.205[C]',
        },
        {
          description:
            '<b>Organic Chemistry II</b> <br /> AS.030.206 Organic Chemistry II <br /> <i>OR</i> <br /> AS.030.212 Honors Organic Chemistry II',
          required_credits: 4,
          criteria: 'AS.030.206[C]^OR^AS.030.212[C]',
        },
        {
          description:
            '<b>Organic Chemistry Lab</b> <br />' +
            'AS.030.225 Introductory Organic Chemistry Laboratory <br /> <i>OR</i> </br>' +
            'AS.030.227 Chemical Chirality: An Introduction in Organic Chem. Lab, Techniques',
          required_credits: 3,
          criteria: 'AS.030.225[C]^OR^AS.030.227[C]',
        },
        {
          description:
            '<b>Intermediate Organic Chemistry Laboratory</b> <br /> AS.030.228 Intermediate Organic Chemistry Laboratory',
          required_credits: 3,
          criteria: 'AS.030.228[C]',
        },
        {
          description:
            '<b>Physical Chemistry I</b> <br /> AS.030.301 Physical Chemistry I',
          required_credits: 3,
          criteria: 'AS.030.301[C]',
        },
        {
          description:
            '<b>Physical Chemistry II</b> <br /> AS.030.302 Physical Chemistry II',
          required_credits: 3,
          criteria: 'AS.030.302[C]',
        },
        {
          description:
            '<b>Chemistry of Inorganic Compounds</b> <br /> AS.030.449 Chemistry of Inorganic Compounds',
          required_credits: 3,
          criteria: 'AS.030.449[C]',
        },
        {
          description:
            '<b>Advanced Inorganic Lab</b> <br /> AS.030.356 Advanced Inorganic Lab',
          required_credits: 3,
          criteria: 'AS.030.356[C]',
        },
        {
          description:
            '<b>Lab Courses</b> <br /> Select two Lab Courses from the following:' +
            '<br /> AS.030.245 Quantitative Analytical Laboratory <br /> AS.030.305	Physical Chemistry Instrumentation Laboratory I <br />' +
            'EN.030.306 Physical Chemistry Instrumentation Laboratory II',
          required_credits: 6,
          criteria: 'AS.030.245[C]^OR^AS.030.305[C]^OR^AS.030.306[C]',
        },
      ],
    },
    {
      name: 'Humanities',
      required_credits: 9,
      min_credits_per_course: 1,
      description:
        'These credits fulfilling the distribution requirement may overlap with major or minor requirements and the writing-intensive requirement.',
      criteria: 'H[A]',
      double_count: ['Writing Intensive', 'Major Requirement'],
    },
    {
      name: 'Social Sciences',
      required_credits: 9,
      min_credits_per_course: 1,
      description:
        'These credits fulfilling the distribution requirement may overlap with major or minor requirements and the writing-intensive requirement.',
      criteria: 'S[A]',
      double_count: ['Writing Intensive', 'Major Requirement'],
    },
    {
      name: 'Natural Sciences/Quantitative/Engineering',
      required_credits: 9,
      min_credits_per_course: 1,
      description:
        'These credits fulfilling the distribution requirement may overlap with major or minor requirements and the writing-intensive requirement.',
      criteria: 'N[A]^OR^Q[A]^OR^E[A]',
      double_count: [
        'Writing Intensive',
        'Major Requirement',
        'Advanced Elective Courses',
      ],
    },
    {
      name: 'Writing Intensive',
      required_credits: 15,
      min_credits_per_course: 3,
      description:
        'Effective Fall 2022, all students earning a degree from the School of Arts and Sciences must complete Reintroduction to Writing in their first year at Hopkins plus an additional 12 credits in writing-intensive courses through their undergraduate experience for a minimum of 15 writing-intensive credits.',
      criteria: 'Written Intensive[W]',
      double_count: ['All'],
      fine_requirements: [
        {
          description: 'Reintroduction to Writing',
          required_credits: 4,
          criteria: 'AS.004.100[C]',
        },
      ],
    },
    {
      name: 'Courses Outside the Department',
      required_credits: 18,
      min_credits_per_course: 1,
      description:
        'Other courses that are not part of the Chemistry Core but are required for the major.',
      criteria:
        'AS.171.105[C]^OR^AS.171.101[C]^OR^AS.171.103[C]^OR^AS.171.107[C]^OR^AS.173.115[C]^OR^AS.173.111[C]^OR^' +
        'AS.171.106[C]^OR^AS.171.102[C]^OR^AS.171.104[C]^OR^AS.171.108[C]^OR^AS.173.116[C]^OR^AS.173.112[C]^OR^' +
        'AS.110.106[C]^OR^AS.110.108[C]^OR^AS.110.107[C]^OR^AS.110.109[C]^OR^AS.110.113[C]',
      double_count: [
        'Humanities (H) Distribution',
        'Social Science (S) Distribution',
        'Other (N/E/Q) Distribution',
        'Writing Intensive',
      ],
      fine_requirements: [
        {
          description:
            '<b>General Physics I / Classical Mechanics I</b> <br /> Select one of the following: <br /> AS.171.105 Classical Mechanics I' +
            '<br /> AS.171.101 General Physics: Physical Science Major I <br />AS.171.103 General Physics I for Biological Science Majors' +
            '<br /> AS.171.107 General Physics for Physical Sciences Majors (AL)',
          required_credits: 4,
          criteria:
            'AS.171.105[C]^OR^AS.171.101[C]^OR^AS.171.103[C]^OR^AS.171.107[C]',
        },
        {
          description:
            '<b>General Physics / Classical Mechanics Laboratory</b> <br /> AS.173.115 Classical Mechanics Laboratory' +
            '<br /> <i>OR</i> <br /> AS.173.111 General Physics Laboratory I',
          required_credits: 1,
          criteria: 'AS.173.115[C]^OR^AS.173.111[C]',
        },
        {
          description:
            '<b>General Physics II / Electricity and Magnetism I</b> <br /> Select one of the following: <br /> AS.171.106 Electricity and Magnetism I' +
            '<br /> AS.171.102 General Physics: Physical Science Major II <br />AS.171.104 General Physics/Biology Majors II' +
            '<br /> AS.171.108 General Physics for Physical Science Majors (AL)',
          required_credits: 4,
          criteria:
            'AS.171.106[C]^OR^AS.171.102[C]^OR^AS.171.104[C]^OR^AS.171.108[C]',
        },
        {
          description:
            '<b>General Physics Laboratory II / Electricity and Magnetism Laboratory</b> <br /> AS.173.116 Electricity and Magnetism Laboratory' +
            '<br /> <i>OR</i> <br /> AS.173.112 General Physics Laboratory II',
          required_credits: 1,
          criteria: 'AS.173.116[C]^OR^AS.173.112[C]',
        },
        {
          description:
            '<b>Calculus I</b> <br />' +
            'AS.110.106 Calculus I (Biology and Social Sciences)' +
            '<br /> <i>OR</i> <br />' +
            'AS.110.108 Calculus I (Physical Sciences and Engineering)',
          required_credits: 4,
          criteria: 'AS.110.106[C]^OR^AS.110.108[C]',
        },
        {
          description:
            '<b>Calculus II</b> <br />' +
            'AS.110.109 Calculus II (For Physical Sciences and Engineering)' +
            '<br /> <i>OR</i> <br />' +
            'AS.110.107 Calculus II (For Biological and Social Science)' +
            '<br /> <i>OR</i> <br />' +
            'AS.110.113 Honors Single Variable Calculus',
          required_credits: 4,
          criteria: 'AS.110.107[C]^OR^AS.110.109[C]^OR^AS.110.113[C]',
        },
      ],
    },
    {
      name: 'Advanced Elective Courses',
      required_credits: 12,
      min_credits_per_course: 1,
      description:
        'Students must take three credits of advanced chemistry courses beyond AS.030.305-AS.030.306. ' +
        'None of the advanced course requirements may be fulfilled with research. ' +
        'Students must also take nine credits of advanced chemistry courses, or science electives at the 300-level or higher ' +
        'approved by a Department of Chemistry advisor, and/or mathematics beyond Calculus II',
      criteria:
        '(AS Chemistry[D]^AND^Upper Level[L])^OR^(AS Mathematics[D]^NOT^AS.110.108[C]^NOT^AS.110.109[C])^NOT^AS.030.305[C]^NOT^AS.030.306[C]',
      fine_requirements: [
        {
          description:
            '<b>Advanced chemistry courses</b> <br /> Three credits of advanced chemistry courses beyond AS.030.305-AS.030.306, ' +
            'cannot be fulfilled with research',
          required_credits: 3,
          criteria:
            '(AS Chemistry[D]^AND^Upper Level[L])^NOT^AS.030.305[C]^NOT^AS.030.306[C]',
        },
        {
          description:
            '<b>Advanced sciences/mathematics</b> <br /> Nine credits of advanced chemistry courses' +
            '<br /> <i>OR</i> <br /> science electives at the 300-level or higher' +
            '<br /> <i>OR</i> <br /> mathematics beyond Calculus II',
          required_credits: 9,
          criteria:
            '(AS Chemistry[D]^AND^(Upper Level[L]))^OR^(N[A]^AND^(Upper Level[L]))^OR^(AS Mathematics[D]^NOT^AS.110.108[C]^NOT^AS.110.109[C])',
        },
      ],
    },
  ],
};

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

// https://physics-astronomy.jhu.edu/undergraduate/major-requirements/
const bsPhysics: Major = {
  degree_name: 'B.S. Physics',
  abbrev: 'B.S. Phys',
  url: 'https://e-catalogue.jhu.edu/arts-sciences/full-time-residential-programs/degree-programs/physics-astronomy/physics-bachelor-science/',
  department: 'AS Physics & Astronomy',
  total_degree_credit: 126,
  wi_credit: 12,
  distributions: [
    {
      name: 'Mathematics',
      required_credits: 20,
      min_credits_per_course: 4,
      description:
        'All Physics majors must take Calculus I, Calculus II, Calculus III, Differential Equations, and Linear Algebra (or equivalent courses).',
      criteria:
        'AS.110.108[C]^OR^AS.110.109[C]^OR^AS.110.113[C]^OR^AS.110.202[C]^OR^AS.110.211[C]^OR^' +
        'AS.110.302[C]^OR^AS.110.201[C]^OR^AS.110.212[C]',
      double_count: [
        'Humanities (H) Distribution',
        'Social Science (S) Distribution',
        'Other (N/E/Q) Distribution',
        'Writing Intensive',
      ],
      fine_requirements: [
        {
          description:
            '<b>Calculus I</b> <br /> AS.110.108 Calculus I (Physical Sciences & Engineering)',
          required_credits: 4,
          criteria: 'AS.110.108[C]',
        },
        {
          description:
            '<b>Calculus II</b> <br /> AS.110.109 Calculus II (Physical Sciences & Engineering)' +
            '<br /> <i>OR</i> <br /> AS.110.113 Honors Single Variable Calculus',
          required_credits: 4,
          criteria: 'AS.110.109[C]^OR^AS.110.113[C]',
        },
        {
          description:
            '<b>Calculus III</b> <br /> AS.110.202 Calculus III<br /> <i>OR</i> ' +
            '<br /> AS.110.211 Honors Multivariable Calculus',
          required_credits: 4,
          criteria: 'AS.110.202[C]^OR^AS.110.211[C]',
        },
        {
          description:
            '<b>Differential Equations</b> <br /> AS.110.302 Differential Equations and Applications',
          required_credits: 4,
          criteria: 'AS.110.302[C]',
        },
        {
          description:
            '<b>Linear Algebra</b> <br /> AS.110.201 Linear Algebra<br /> <i>OR</i> ' +
            '<br /> AS.110.212 Honors Linear Algebra',
          required_credits: 4,
          criteria: 'AS.110.201[C]^OR^AS.110.212[C]',
        },
      ],
    },
    {
      name: 'Physics',
      required_credits: 38,
      min_credits_per_course: 1,
      description:
        'All physics majors must take the following standard physics requirements',
      criteria:
        'AS.171.105[C]^OR^AS.171.101[C]^OR^AS.171.103[C]^OR^AS.171.107[C]^OR^AS.173.115[C]^OR^AS.173.111[C]^OR^' +
        'AS.171.106[C]^OR^AS.171.102[C]^OR^AS.171.104[C]^OR^AS.171.108[C]^OR^AS.173.116[C]^OR^AS.173.112[C]^OR^' +
        'AS.171.201[C]^OR^AS.171.204[C]^OR^AS.171.312[C]^OR^AS.172.203[C]^OR^AS.171.301[C]^OR^AS.171.303[C]^OR^' +
        'AS.171.304[C]^OR^AS.173.308[C]',
      double_count: [
        'Humanities (H) Distribution',
        'Social Science (S) Distribution',
        'Other (N/E/Q) Distribution',
        'Writing Intensive',
      ],
      fine_requirements: [
        {
          description:
            '<b>Classical Mechanics I</b> <br /> Select one of the following: <br /> AS.171.105 Classical Mechanics I' +
            '<br /> AS.171.101 General Physics: Physical Science Major I <br />AS.171.103 General Physics I for Biological Science Majors' +
            '<br /> AS.171.107 General Physics for Physical Sciences Majors (AL)',
          required_credits: 4,
          criteria:
            'AS.171.105[C]^OR^AS.171.101[C]^OR^AS.171.103[C]^OR^AS.171.107[C]',
        },
        {
          description:
            '<b>Classical Mechanics Laboratory</b> <br /> AS.173.115 Classical Mechanics Laboratory' +
            '<br /> <i>OR</i> <br /> AS.173.111 General Physics Laboratory I',
          required_credits: 1,
          criteria: 'AS.173.115[C]^OR^AS.173.111[C]',
        },
        {
          description:
            '<b>Electricity and Magnetism I</b> <br /> Select one of the following: <br /> AS.171.106 Electricity and Magnetism I' +
            '<br /> AS.171.102 General Physics: Physical Science Major II <br />AS.171.104 General Physics/Biology Majors II' +
            '<br /> AS.171.108 General Physics for Physical Science Majors (AL)',
          required_credits: 4,
          criteria:
            'AS.171.106[C]^OR^AS.171.102[C]^OR^AS.171.104[C]^OR^AS.171.108[C]',
        },
        {
          description:
            '<b>Electricity and Magnetism Laboratory</b> <br /> AS.173.116 Electricity and Magnetism Laboratory' +
            '<br /> <i>OR</i> <br /> AS.173.112 General Physics Laboratory II',
          required_credits: 1,
          criteria: 'AS.173.116[C]^OR^AS.173.112[C]',
        },
        {
          description:
            '<b>Special Relativity/Waves</b> <br /> AS.171.201 Special Relativity/Waves',
          required_credits: 4,
          criteria: 'AS.171.201[C]',
        },
        {
          description:
            '<b>Classical Mechanics II</b> <br /> AS.171.204 Classical Mechanics II',
          required_credits: 4,
          criteria: 'AS.171.204[C]',
        },
        {
          description:
            '<b>Statistical Physics/Thermodynamics</b> <br /> AS.171.312 Statistical Physics/Thermodynamics',
          required_credits: 4,
          criteria: 'AS.171.312[C]',
        },
        {
          description:
            '<b>Contemporary Physics Seminar</b> <br /> AS.172.203 Contemporary Physics Seminar',
          required_credits: 1,
          criteria: 'AS.172.203[C]',
        },
        {
          description:
            '<b>Electromagnetic Theory II</b> <br /> AS.171.301 Electromagnetic Theory II',
          required_credits: 4,
          criteria: 'AS.171.301[C]',
        },
        {
          description:
            '<b>Quantum Mechanics I</b> <br /> AS.171.303 Quantum Mechanics I',
          required_credits: 4,
          criteria: 'AS.171.303[C]',
        },
        {
          description:
            '<b>Quantum Mechanics II (or Topics in Modern Physics)</b> <br /> AS.171.304 Quantum Mechanics II',
          required_credits: 4,
          criteria: 'AS.171.304[C]',
        },
        {
          description:
            '<b>Advanced Physics Laboratory</b> <br /> AS.173.308 Advanced Physics Laboratory',
          required_credits: 3,
          criteria: 'AS.173.308[C]',
        },
      ],
    },
    {
      name: 'Electives',
      required_credits: 15,
      min_credits_per_course: 3,
      pathing: 1,
      description:
        'Five elective courses must be taken at the 200-600 level. Four courses must be within a single department or program in KSAS or WSE: ' +
        'Physics and Astronomy, Biology, Biophysics, Chemistry, Cognitive Science, Earth and Planetary Sciences, ' +
        'Mathematics, Neuroscience and/or the School of Engineering (excluding courses listed as 500.xxx, 660.xxx, 551.xxx and 661.xxx). ' +
        'These courses must constitute a coherent and rigorous program of study.',
      criteria:
        '(AS Physics & Astronomy[D]^OR^AS Biology[D]^OR^AS Biophysics[D]^OR^AS Chemistry[D]^OR^AS Cognitive Science[D]^OR^' +
        'AS Earth & Planetary Sciences[D]^OR^AS Mathematics[D]^OR^AS Neuroscience[D]^OR^EN Applied Mathematics & Statistics[D]^OR^' +
        'EN Biomedical Engineering[D]^OR^EN Chemical & Biomolecular Engineering[D]^OR^EN Electrical & Computer Engineering[D]^OR^' +
        'EN Computer Science[D]^OR^EN Environment Health and Engineering[D]^OR^EN Material Science & Engineering[D]^OR^' +
        'EN Mechanical Engineering[D])^AND^(200[L]^OR^Upper Level[L])',
      double_count: [
        'Humanities (H) Distribution',
        'Social Science (S) Distribution',
        'Other (N/E/Q) Distribution',
        'Writing Intensive',
      ],
      fine_requirements: [
        {
          description: '<b>Physics and Astronomy</b>',
          required_credits: 12,
          criteria: 'AS Physics & Astronomy[D]',
          double_count: ['All'],
        },
        {
          description: '<b>Biology</b>',
          required_credits: 12,
          criteria: 'AS Biology[D]',
          double_count: ['All'],
        },
        {
          description: '<b>Biophysics</b>',
          required_credits: 12,
          criteria: 'AS Biophysics[D]',
          double_count: ['All'],
        },
        {
          description: '<b>Chemistry</b>',
          required_credits: 12,
          criteria: 'AS Chemistry[D]',
          double_count: ['All'],
        },
        {
          description: '<b>Cognitive Science</b>',
          required_credits: 12,
          criteria: 'AS Cognitive Science[D]',
          double_count: ['All'],
        },
        {
          description: '<b>Earth and Planetary Sciences</b>',
          required_credits: 12,
          criteria: 'AS Earth & Planetary Sciences[D]',
          double_count: ['All'],
        },
        {
          description: '<b>Mathematics</b>',
          required_credits: 12,
          criteria: 'AS Mathematics[D]',
          double_count: ['All'],
        },
        {
          description: '<b>Neuroscience</b>',
          required_credits: 12,
          criteria: 'AS Neuroscience[D]',
          double_count: ['All'],
        },
        {
          description: '<b>Engineering</b>',
          required_credits: 12,
          criteria:
            'EN Applied Mathematics & Statistics[D]^OR^EN Mechanical Engineering[D]^OR^' +
            'EN Biomedical Engineering[D]^OR^EN Chemical & Biomolecular Engineering[D]^OR^EN Electrical & Computer Engineering[D]^OR^' +
            'EN Computer Science[D]^OR^EN Environment Health and Engineering[D]^OR^EN Material Science & Engineering[D]^OR^' +
            'EN Mechanical Engineering[D]',
          double_count: ['All'],
        },
      ],
    },
    {
      name: 'Humanities (H) Distribution',
      required_credits: 9,
      min_credits_per_course: 3,
      description:
        'The distribution requirement stipulates that students must earn a minimum number of credits in academic areas outside of their primary major. ' +
        'The student must complete at least 9 credits in the Humanities (H) area. ' +
        'These credits fulfilling the distribution requirement may overlap with major or minor requirements and the writing-intensive requirement.',
      criteria: 'H[A]',
      double_count: [
        'Mathematics',
        'Physics',
        'Electives',
        'Writing Intensive',
      ],
    },
    {
      name: 'Social Science (S) Distribution',
      required_credits: 9,
      min_credits_per_course: 3,
      description:
        'The distribution requirement stipulates that students must earn a minimum number of credits in academic areas outside of their primary major. ' +
        'The student must complete at least 9 credits in the Social Science (S) area. ' +
        'These credits fulfilling the distribution requirement may overlap with major or minor requirements and the writing-intensive requirement.',
      criteria: 'S[A]',
      double_count: [
        'Mathematics',
        'Physics',
        'Electives',
        'Writing Intensive',
      ],
    },
    {
      name: 'Other (N/E/Q) Distribution',
      required_credits: 9,
      min_credits_per_course: 3,
      description:
        'The distribution requirement stipulates that students must earn a minimum number of credits in academic areas outside of their primary major. ' +
        'The student must complete at least 9 credits in any of the other areas: Natural Sciences (N), Engineering (E) and/or Quantitative (Q). ' +
        'These credits fulfilling the distribution requirement may overlap with major or minor requirements and the writing-intensive requirement.',
      criteria: 'N[A]^OR^E[A]^OR^Q[A]',
      double_count: [
        'Mathematics',
        'Physics',
        'Electives',
        'Writing Intensive',
      ],
    },
    {
      name: 'Writing Intensive',
      required_credits: 12,
      min_credits_per_course: 3,
      description:
        'To encourage excellence in writing, across disciplines, the university requires all undergraduates to take a number of writing-intensive courses. ' +
        'All students earning a degree from the School of Arts and Sciences must complete at least 12 credits in writing-intensive courses. ' +
        'Writing-intensive courses taken to satisfy major, minor, or distribution requirements may also count toward the writing requirement.',
      criteria: 'Written Intensive[W]',
      double_count: ['All'],
    },
  ],
};

// https://physics-astronomy.jhu.edu/undergraduate/major-requirements/
const baPhysics: Major = {
  degree_name: 'B.A. Physics',
  abbrev: 'B.A. Phys',
  department: 'AS Physics & Astronomy',
  total_degree_credit: 120,
  wi_credit: 12,
  url: 'https://e-catalogue.jhu.edu/arts-sciences/full-time-residential-programs/degree-programs/physics-astronomy/physics-astronomy-bachelor-arts/',
  distributions: [
    {
      name: 'Mathematics',
      required_credits: 20,
      min_credits_per_course: 4,
      description:
        'All Physics majors must take Calculus I, Calculus II, Calculus III, Differential Equations, and Linear Algebra (or equivalent courses).',
      criteria:
        'AS.110.108[C]^OR^AS.110.109[C]^OR^AS.110.113[C]^OR^AS.110.202[C]^OR^AS.110.211[C]^OR^' +
        'AS.110.302[C]^OR^AS.110.201[C]^OR^AS.110.212[C]',
      double_count: [
        'Humanities (H) Distribution',
        'Social Science (S) Distribution',
        'Other (N/E/Q) Distribution',
        'Writing Intensive',
      ],
      fine_requirements: [
        {
          description:
            '<b>Calculus I</b> <br /> AS.110.108 Calculus I (Physical Sciences & Engineering)',
          required_credits: 4,
          criteria: 'AS.110.108[C]',
        },
        {
          description:
            '<b>Calculus II</b> <br /> AS.110.109 Calculus II (Physical Sciences & Engineering)' +
            '<br /> <i>OR</i> <br /> AS.110.113 Honors Single Variable Calculus',
          required_credits: 4,
          criteria: 'AS.110.109[C]^OR^AS.110.113[C]',
        },
        {
          description:
            '<b>Calculus III</b> <br /> AS.110.202 Calculus III<br /> <i>OR</i> ' +
            '<br /> AS.110.211 Honors Multivariable Calculus',
          required_credits: 4,
          criteria: 'AS.110.202[C]^OR^AS.110.211[C]',
        },
        {
          description:
            '<b>Differential Equations</b> <br /> AS.110.302 Differential Equations and Applications',
          required_credits: 4,
          criteria: 'AS.110.302[C]',
        },
        {
          description:
            '<b>Linear Algebra</b> <br /> AS.110.201 Linear Algebra<br /> <i>OR</i> ' +
            '<br /> AS.110.212 Honors Linear Algebra',
          required_credits: 4,
          criteria: 'AS.110.201[C]^OR^AS.110.212[C]',
        },
      ],
    },
    {
      name: 'Physics',
      required_credits: 38,
      min_credits_per_course: 1,
      description:
        'All physics majors must take the following standard physics requirements.',
      criteria:
        'AS.171.105[C]^OR^AS.171.101[C]^OR^AS.171.103[C]^OR^AS.171.107[C]^OR^AS.173.115[C]^OR^AS.173.111[C]^OR^' +
        'AS.171.106[C]^OR^AS.171.102[C]^OR^AS.171.104[C]^OR^AS.171.108[C]^OR^AS.173.116[C]^OR^AS.173.112[C]^OR^' +
        'AS.171.201[C]^OR^AS.171.204[C]^OR^AS.171.312[C]^OR^AS.172.203[C]^OR^AS.171.301[C]^OR^AS.171.303[C]^OR^' +
        'AS.171.304[C]^OR^AS.173.308[C]',
      double_count: [
        'Humanities (H) Distribution',
        'Social Science (S) Distribution',
        'Other (N/E/Q) Distribution',
        'Writing Intensive',
      ],
      fine_requirements: [
        {
          description:
            '<b>Classical Mechanics I</b> <br /> Select one of the following: <br /> AS.171.105 Classical Mechanics I' +
            '<br /> AS.171.101 General Physics: Physical Science Major I <br />AS.171.103 General Physics I for Biological Science Majors' +
            '<br /> AS.171.107 General Physics for Physical Sciences Majors (AL)',
          required_credits: 4,
          criteria:
            'AS.171.105[C]^OR^AS.171.101[C]^OR^AS.171.103[C]^OR^AS.171.107[C]',
        },
        {
          description:
            '<b>Classical Mechanics Laboratory</b> <br /> AS.173.115 Classical Mechanics Laboratory' +
            '<br /> <i>OR</i> <br /> AS.173.111 General Physics Laboratory I',
          required_credits: 1,
          criteria: 'AS.173.115[C]^OR^AS.173.111[C]',
        },
        {
          description:
            '<b>Electricity and Magnetism I</b> <br /> Select one of the following: <br /> AS.171.106 Electricity and Magnetism I' +
            '<br /> AS.171.102 General Physics: Physical Science Major II <br />AS.171.104 General Physics/Biology Majors II' +
            '<br /> AS.171.108 General Physics for Physical Science Majors (AL)',
          required_credits: 4,
          criteria:
            'AS.171.106[C]^OR^AS.171.102[C]^OR^AS.171.104[C]^OR^AS.171.108[C]',
        },
        {
          description:
            '<b>Electricity and Magnetism Laboratory</b> <br /> AS.173.116 Electricity and Magnetism Laboratory' +
            '<br /> <i>OR</i> <br /> AS.173.112 General Physics Laboratory II',
          required_credits: 1,
          criteria: 'AS.173.116[C]^OR^AS.173.112[C]',
        },
        {
          description:
            '<b>Special Relativity/Waves</b> <br /> AS.171.201 Special Relativity/Waves',
          required_credits: 4,
          criteria: 'AS.171.201[C]',
        },
        {
          description:
            '<b>Contemporary Physics Seminar</b> <br /> AS.172.203 Contemporary Physics Seminar',
          required_credits: 1,
          criteria: 'AS.172.203[C]',
        },
        {
          description:
            '<b>Classical Mechanics II</b> <br /> AS.171.204 Classical Mechanics II',
          required_credits: 4,
          criteria: 'AS.171.204[C]',
        },
        {
          description:
            '<b>Statistical Physics/Thermodynamics</b> <br /> AS.171.312 Statistical Physics/Thermodynamics',
          required_credits: 4,
          criteria: 'AS.171.312[C]',
        },
        {
          description:
            '<b>Electromagnetic Theory II</b> <br /> AS.171.301 Electromagnetic Theory II',
          required_credits: 4,
          criteria: 'AS.171.301[C]',
        },
        {
          description:
            '<b>Quantum Mechanics I</b> <br /> AS.171.303 Quantum Mechanics I',
          required_credits: 4,
          criteria: 'AS.171.303[C]',
        },
        {
          description:
            '<b>Quantum Mechanics II (or Topics in Modern Physics)</b> <br /> AS.171.304 Quantum Mechanics II',
          required_credits: 4,
          criteria: 'AS.171.304[C]',
        },
        {
          description:
            '<b>Advanced Physics Laboratory</b> <br /> AS.173.308 Advanced Physics Laboratory',
          required_credits: 3,
          criteria: 'AS.173.308[C]',
        },
      ],
    },
    {
      name: 'Upper Electives',
      required_credits: 6,
      min_credits_per_course: 3,
      description:
        'Students must take two additional courses (at least 3 credits each) at the 300-600 level in the Department of Physics and Astronomy or approved physics-related courses in other departments.',
      criteria: 'AS Physics & Astronomy[D]^AND^Upper Level[L]',
      double_count: [
        'Humanities (H) Distribution',
        'Social Science (S) Distribution',
        'Other (N/E/Q) Distribution',
        'Writing Intensive',
      ],
    },
    {
      name: 'Humanities (H) Distribution',
      required_credits: 9,
      min_credits_per_course: 3,
      description:
        'The distribution requirement stipulates that students must earn a minimum number of credits in academic areas outside of their primary major. ' +
        'The student must complete at least 9 credits in the Humanities (H) area. ' +
        'These credits fulfilling the distribution requirement may overlap with major or minor requirements and the writing-intensive requirement.',
      criteria: 'H[A]',
      double_count: [
        'Mathematics',
        'Physics',
        'Electives',
        'Writing Intensive',
      ],
    },
    {
      name: 'Social Science (S) Distribution',
      required_credits: 9,
      min_credits_per_course: 3,
      description:
        'The distribution requirement stipulates that students must earn a minimum number of credits in academic areas outside of their primary major. ' +
        'The student must complete at least 9 credits in the Social Science (S) area. ' +
        'These credits fulfilling the distribution requirement may overlap with major or minor requirements and the writing-intensive requirement.',
      criteria: 'S[A]',
      double_count: [
        'Mathematics',
        'Physics',
        'Electives',
        'Writing Intensive',
      ],
    },
    {
      name: 'Other (N/E/Q) Distribution',
      required_credits: 9,
      min_credits_per_course: 3,
      description:
        'The distribution requirement stipulates that students must earn a minimum number of credits in academic areas outside of their primary major. ' +
        'The student must complete at least 9 credits in any of the other areas: Natural Sciences (N), Engineering (E) and/or Quantitative (Q). ' +
        'These credits fulfilling the distribution requirement may overlap with major or minor requirements and the writing-intensive requirement.',
      criteria: 'N[A]^OR^E[A]^OR^Q[A]',
      double_count: [
        'Mathematics',
        'Physics',
        'Electives',
        'Writing Intensive',
      ],
    },
    {
      name: 'Writing Intensive',
      required_credits: 12,
      min_credits_per_course: 3,
      description:
        'To encourage excellence in writing, across disciplines, the university requires all undergraduates to take a number of writing-intensive courses. ' +
        'All students earning a degree from the School of Arts and Sciences must complete at least 12 credits in writing-intensive courses. ' +
        'Writing-intensive courses taken to satisfy major, minor, or distribution requirements may also count toward the writing requirement.',
      criteria: 'Written Intensive[W]',
      double_count: ['All'],
    },
  ],
};

// https://e-catalogue.jhu.edu/arts-sciences/full-time-residential-programs/degree-programs/mathematics/mathematics-bachelor-arts/#requirementstext
const baMath: Major = {
  degree_name: 'B.A. Mathematics',
  abbrev: 'B.A. Math',
  department: 'AS Mathematics',
  total_degree_credit: 120,
  url: 'https://e-catalogue.jhu.edu/arts-sciences/full-time-residential-programs/degree-programs/mathematics/mathematics-bachelor-arts/#requirementstext',
  wi_credit: 15,
  distributions: [
    {
      name: 'Major Requirement',
      required_credits: 44,
      min_credits_per_course: 1,
      description:
        'For more information please visit https://e-catalogue.jhu.edu/arts-sciences/full-time-residential-programs/degree-programs/mathematics/mathematics-bachelor-arts/#requirementstext.',
      criteria: 'AS Mathematics[D]',
      double_count: ['All'],
      fine_requirements: [
        {
          description: '<b>Calculus I</b><br />AS.110.106 or AS.110.108',
          required_credits: 4,
          criteria: 'AS.110.106[C]^OR^AS.110.108[C]',
        },
        {
          description:
            '<b>Calculus II</b> or <b>Honors Single Variable Calculus</b><br />AS.110.107 or AS.110.113 or AS.110.109',
          required_credits: 4,
          criteria: 'AS.110.107[C]^OR^AS.110.113[C]^OR^AS.110.109[C]',
        },
        {
          description:
            '<b>Calculus III</b> or <b>Honors Multivariable Calculus</b><br />AS.110.202 or AS.110.211',
          required_credits: 4,
          criteria: 'AS.110.202[C]^OR^AS.110.211[C]',
        },
        {
          description:
            '<b>Introduction to Abstract Algebra</b> or <b>Honors Algebra I</b><br />AS.110.401 or AS.110.411',
          required_credits: 4,
          criteria: 'AS.110.401[C]^OR^AS.110.411[C]',
        },
        {
          description:
            '<b>Elementary Number Theory</b> or <b>Honors Algebra II</b> or <b>Introduction To Topology</b> or <b>Representation Theory</b> or <b>Introduction to Algebraic Geometry</b>',
          required_credits: 4,
          criteria:
            'AS.110.304[C]^OR^AS.110.412[C]^OR^AS.110.413[C]^OR^AS.110.422[C]^OR^AS.110.435[C]',
        },
        {
          description:
            '<b>Real Analysis I</b> or <b>Honors Real Analysis I</b><br />AS.110.405 or AS.110.415',
          required_credits: 4,
          criteria: 'AS.110.405[C]^OR^AS.110.415[C]',
        },
        {
          description:
            '<b>Methods of Complex Analysis</b> or <b>Real Analysis II</b> or <b>Honors Complex Analysis</b> or <b>Introduction To Topology</b> or <b>Honors Analysis II</b> or <b>Partial Differential Equations</b> or <b>Dynamical Systems</b> or <b>Introduction To Differential Geometry</b> or <b>Calculus on Manifolds</b> or <b>Fourier Analysis</b>',
          required_credits: 4,
          criteria:
            'AS.110.311[C]^OR^AS.110.406[C]^OR^AS.110.407[C]^OR^AS.110.413[C]^OR^AS.110.416[C]^OR^AS.110.417[C]^OR^AS.110.421[C]^OR^AS.110.439[C]^OR^AS.110.441[C]^OR^AS.110.443[C]',
        },
        {
          description: 'One 300-level or higher math course',
          required_credits: 4,
          criteria: 'Upper Level[L]',
        },
        {
          description:
            'Two courses in any one of the approved applications of mathematics or other courses approved by the Director of Undergraduate Studies.',
          required_credits: 8,
          criteria:
            'AS.171.204[C]^OR^AS.171.301[C]^OR^AS.171.303[C]^OR^AS.171.304[C]^OR^AS.171.312[C]^OR^AS.030.302[C]^OR^AS.030.453[C]^OR^AS.180.301[C]^OR^AS.180.302[C]^OR^AS.180.334[C]^OR^AS.180.434[C]^OR^EN.601.231[C]^OR^EN.601.433[C]^OR^EN.601.442[C]^OR^EN.601.457[C]^OR^EN.601.461[C]^OR^EN.601.464[C]^OR^EN.601.475[C]^OR^EN.601.476[C]^OR^EN.553.361[C]^OR^EN.553.362[C]^OR^EN.553.391[C]^OR^EN.553.420[C]^OR^EN.553.426[C]^OR^EN.553.430[C]^OR^EN.553.453[C]^OR^EN.553.465[C]^OR^EN.553.471[C]^OR^EN.553.472[C]^OR^EN.553.481[C]^OR^EN.553.492[C]^OR^EN.553.493[C]^OR^AS.150.420[C]^OR^AS.150.421[C]^OR^AS.150.422[C]',
        },
      ],
    },
    {
      name: 'Humanities',
      required_credits: 9,
      min_credits_per_course: 1,
      description:
        'These credits fulfilling the distribution requirement may overlap with major or minor requirements and the writing-intensive requirement.',
      criteria: 'H[A]',
      double_count: ['Writing Intensive', 'Major Requirement'],
    },
    {
      name: 'Social Sciences',
      required_credits: 9,
      min_credits_per_course: 1,
      description:
        'These credits fulfilling the distribution requirement may overlap with major or minor requirements and the writing-intensive requirement.',
      criteria: 'S[A]',
      double_count: ['Writing Intensive', 'Major Requirement'],
    },
    {
      name: 'Natural Sciences/Quantitative/Engineering',
      required_credits: 9,
      min_credits_per_course: 1,
      description:
        'These credits fulfilling the distribution requirement may overlap with major or minor requirements and the writing-intensive requirement.',
      criteria: 'N[A]^OR^Q[A]^OR^E[A]',
      double_count: ['Writing Intensive', 'Major Requirement'],
    },
    {
      name: 'Writing Intensive',
      required_credits: 15,
      min_credits_per_course: 1,
      description:
        'Effective Fall 2022, all students earning a degree from the School of Arts and Sciences must complete Reintroduction to Writing in their first year at Hopkins plus an additional 12 credits in writing-intensive courses through their undergraduate experience for a minimum of 15 writing-intensive credits.',
      criteria: 'Written Intensive[W]',
      double_count: ['All'],
      fine_requirements: [
        {
          description: 'Reintroduction to Writing',
          required_credits: 4,
          criteria: 'AS.004.100[C]',
        },
      ],
    },
  ],
};

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

// // https://pbs.jhu.edu/undergraduate/requirements/
// const baPsych: Major = {
//   degree_name: "B.S. Psychology",
//   department: "AS Psychology",
//   total_degree_credit: 120,
//   wi_credit: 6,
//   distributions: [],
// };

// https://e-catalogue.jhu.edu/arts-sciences/full-time-residential-programs/degree-programs/economics/economics-bachelor-arts/
const baEcon: Major = {
  degree_name: 'B.A. Economics',
  abbrev: 'B.A. Econ',
  department: 'AS Economics',
  total_degree_credit: 120,
  wi_credit: 12,
  url: 'https://e-catalogue.jhu.edu/arts-sciences/full-time-residential-programs/degree-programs/economics/economics-bachelor-arts/',
  distributions: [
    {
      name: 'Economics Core',
      required_credits: 18,
      min_credits_per_course: 1,
      description:
        'For more information please visit the' +
        "<a href='https://econ.jhu.edu/undergraduate/major-requirements/'>" +
        'major degree requirement</a> section on the department website.',
      criteria:
        'AS.180.101[C]^OR^AS.180.102[C]^OR^AS.180.301[C]^OR^AS.108.401[C]^OR^AS.180.302[C]',
      double_count: [
        'Humanities (H) Distribution',
        'Social Science (S) Distribution',
        'Other (N/E/Q) Distribution',
        'Writing Intensive',
      ],
      fine_requirements: [
        {
          description:
            '<b>Elements of Macroeconomics</b> <br /> AS.180.101 Elements of Macroeconomics',
          required_credits: 3,
          criteria: 'AS.180.101[C]',
        },
        {
          description:
            '<b>Elements of Microeconomics</b> <br /> AS.180.102 Elements of Microeconomics',
          required_credits: 3,
          criteria: 'AS.180.102[C]',
        },
        {
          description:
            '<b>Microeconomic Theory</b> <br /> AS.180.301 Microeconomic Theory <br /> <i>OR</i> <br /> AS.108.401 Advanced Microeconomic Theory',
          required_credits: 4.5,
          criteria: 'AS.180.301[C]^OR^AS.108.401[C]',
        },
        {
          description:
            '<b>Macroeconomic Theory</b> <br /> AS.180.302 Macroeconomic Theory',
          required_credits: 4.5,
          criteria: 'AS.180.302[C]',
        },
        {
          description:
            '<b>Econometrics</b> <br /> AS.180.334 Econometrics <br /> <i>OR</i> <br /> AS.108.434 Advanced Econometrics',
          required_credits: 3,
          criteria: 'AS.180.334[C]^OR^AS.108.434[C]',
        },
      ],
    },
    {
      name: 'Economics Electives',
      required_credits: 15,
      min_credits_per_course: 3,
      description:
        'All courses in this category must be offered by the Economics Department. Three courses must be taken at the 200 level, ' +
        'and two must be taken at the 300 level.',
      criteria: 'AS Economics[D]',
      double_count: [
        'Humanities (H) Distribution',
        'Social Science (S) Distribution',
        'Other (N/E/Q) Distribution',
        'Writing Intensive',
      ],
      fine_requirements: [
        {
          description: '<b>Lower Level Classes</b>',
          required_credits: 9,
          criteria: 'Lower Level[L]',
        },
        {
          description: '<b>Upper Level Classes</b>',
          required_credits: 6,
          criteria: 'Upper Level[L]',
        },
      ],
    },
    {
      name: 'Mathematics',
      required_credits: 4,
      min_credits_per_course: 3,
      description:
        'Students must complete the math requirement for the major by taking Calculus I (AS.110.106 OR AS.110.108).',
      criteria: 'AS.110.106[C]^OR^AS.110.108[C]',
      double_count: [
        'Humanities (H) Distribution',
        'Social Science (S) Distribution',
        'Other (N/E/Q) Distribution',
        'Writing Intensive',
      ],
    },
    {
      name: 'Statistics',
      required_credits: 4,
      min_credits_per_course: 3,
      description:
        'Students must complete one course from the approved list of statistics courses: <br /> EN.553.111 Statistical Analysis I <br /> ' +
        'EN.553.112 Statistical Analysis II <br /> EN.553.211 Probability and Statistics for the Life Sciences <br /> EN.553.310 Probability & Statistics for the Physical Sciences & Engineering <br /> ' +
        'EN.553.311 Probability and Statistics for the Biological Sciences and Engineering <br />   Introduction to Probability <br />  EN.553.430 Introduction to Statistics <br /> ' +
        'AS.280.345 Public Health Biostatistics',
      criteria:
        'EN.553.111[C]^OR^EN.553.112[C]^OR^EN.553.211[C]^OR^EN.553.310[C]^OR^EN.553.311[C]^OR^EN.553.420[C]^OR^EN.553.430[C]^OR^AS.280.345[C]',
      double_count: [
        'Humanities (H) Distribution',
        'Social Science (S) Distribution',
        'Other (N/E/Q) Distribution',
        'Writing Intensive',
      ],
    },
    {
      name: 'Humanities (H) Distribution',
      required_credits: 9,
      min_credits_per_course: 3,
      description:
        'The distribution requirement stipulates that students must earn a minimum number of credits in academic areas outside of their primary major. ' +
        'The student must complete at least 9 credits in the Humanities (H) area. ' +
        'These credits fulfilling the distribution requirement may overlap with major or minor requirements and the writing-intensive requirement.',
      criteria: 'H[A]',
      double_count: [
        'Economics Core',
        'Economics Electives',
        'Mathematics',
        'Statistics',
        'Writing Intensive',
      ],
    },
    {
      name: 'Social Science (S) Distribution',
      required_credits: 9,
      min_credits_per_course: 3,
      description:
        'The distribution requirement stipulates that students must earn a minimum number of credits in academic areas outside of their primary major. ' +
        'The student must complete at least 9 credits in the Social Science (S) area. ' +
        'These credits fulfilling the distribution requirement may overlap with major or minor requirements and the writing-intensive requirement.',
      criteria: 'S[A]',
      double_count: [
        'Economics Core',
        'Economics Electives',
        'Mathematics',
        'Statistics',
        'Writing Intensive',
      ],
    },
    {
      name: 'Other (N/E/Q) Distribution',
      required_credits: 9,
      min_credits_per_course: 3,
      description:
        'The distribution requirement stipulates that students must earn a minimum number of credits in academic areas outside of their primary major. ' +
        'The student must complete at least 9 credits in any of the other areas: Natural Sciences (N), Engineering (E) and/or Quantitative (Q). ' +
        'These credits fulfilling the distribution requirement may overlap with major or minor requirements and the writing-intensive requirement.',
      criteria: 'N[A]^OR^E[A]^OR^Q[A]',
      double_count: [
        'Economics Core',
        'Economics Electives',
        'Mathematics',
        'Statistics',
        'Writing Intensive',
      ],
    },
    {
      name: 'Writing Intensive',
      required_credits: 12,
      min_credits_per_course: 3,
      description:
        'To encourage excellence in writing, across disciplines, the university requires all undergraduates to take a number of writing-intensive courses. ' +
        'All students earning a degree from the School of Arts and Sciences must complete at least 12 credits in writing-intensive courses. ' +
        'Writing-intensive courses taken to satisfy major, minor, or distribution requirements may also count toward the writing requirement.',
      criteria: 'Written Intensive[W]',
      double_count: ['All'],
    },
  ],
};

// https://www.bme.jhu.edu/academics/undergraduate/undergraduate-degree-requirements/
const bsBME: Major = {
  degree_name: 'B.S. Biomedical Engineering',
  abbrev: 'B.S. BME',
  department: 'EN Biomedical Engineering',
  total_degree_credit: 129,
  wi_credit: 6,
  url: 'https://www.bme.jhu.edu/academics/undergraduate/undergraduate-degree-requirements/',
  distributions: [
    {
      name: 'Biomedical Core',
      required_credits: 34,
      min_credits_per_course: 1,
      description:
        'Each student must complete a set of core courses which will serve as foundational knowledge in the discipline of Biomedical Engineering. For more information please visit the ' +
        "<a href='https://e-catalogue.jhu.edu/engineering/full-time-residential-programs/degree-programs/biomedical-engineering/biomedical-engineering-bachelor-science/#requirementstext'>" +
        'major degree requirement</a> section on the department website.',
      criteria:
        'EN.580.111[C]^OR^EN.580.151[C]^OR^EN.580.153[C]^OR^EN.580.221[C]^OR^EN.580.241[C]^OR^EN.580.242[C]^OR^EN.580.243[C]^OR^' +
        'EN.580.244[C]^OR^EN.580.246[C]^OR^EN.580.248[C]^OR^EN.580.475[C]^OR^EN.580.477[C]^OR^EN.580.485[C]^OR^EN.580.487[C]^OR^' +
        'EN.580.424[C]^OR^EN.580.427[C]^OR^EN.580.452[C]^OR^EN.580.453[C]^OR^EN.580.454[C]^OR^EN.580.494[C]',
      double_count: [
        'Focus Area',
        'Design',
        'Humanities and Social Sciences',
        'Writing Intensive',
      ],
      fine_requirements: [
        {
          description:
            '<b>Biomedical Engineering and Design</b> <br /> EN.580.111 Biomedical Engineering and Design',
          required_credits: 2,
          criteria: 'EN.580.111[C]',
        },
        {
          description:
            '<b>Structural Biology of Cells</b> <br /> EN.580.151 Structural Biology of Cells',
          required_credits: 3,
          criteria: 'EN.580.151[C]',
        },
        {
          description:
            '<b>Structural Biology of Cells Laboratory</b> <br /> EN.580.153 Structural Biology of Cells Laboratory',
          required_credits: 1,
          criteria: 'EN.580.153[C]',
        },
        {
          description:
            '<b>Biochemistry and Molecular Engineering</b> <br /> EN.580.221 Biochemistry and Molecular Engineering',
          required_credits: 4,
          criteria: 'EN.580.221[C]',
        },
        {
          description:
            '<b>Statistical Physics</b> <br /> EN.580.241 Statistical Physics',
          required_credits: 2,
          criteria: 'EN.580.241[C]',
        },
        {
          description:
            '<b>Biological Models and Simulations</b> <br /> EN.580.242 Biological Models and Simulations',
          required_credits: 2,
          criteria: 'EN.580.242[C]',
        },
        {
          description:
            '<b>Linear Signals and Systems</b> <br /> EN.580.243 Linear Signals and Systems',
          required_credits: 2,
          criteria: 'EN.580.243[C]',
        },
        {
          description:
            '<b>Nonlinear Dynamics of Biological Systems</b> <br /> EN.580.244 Nonlinear Dynamics of Biological Systems',
          required_credits: 2,
          criteria: 'EN.580.244[C]',
        },
        {
          description:
            '<b>Systems and Controls</b> <br /> EN.580.246 Systems and Controls',
          required_credits: 2,
          criteria: 'EN.580.246[C]',
        },
        {
          description:
            '<b>Systems Biology of the Cell</b> <br /> EN.580.248 Systems Biology of the Cell',
          required_credits: 2,
          criteria: 'EN.580.248[C]',
        },
        {
          description:
            '<b>Biomedical Data Science</b> <br /> EN.580.475 Biomedical Data Science',
          required_credits: 2,
          criteria: 'EN.580.475[C]',
        },
        {
          description:
            '<b>Biomedical Data Science Laboratory</b> <br /> EN.580.477 Biomedical Data Science Laboratory',
          required_credits: 1,
          criteria: 'EN.580.477[C]',
        },
        {
          description:
            '<b>Computational Medicine: Cardiology</b> <br /> EN.580.485 Computational Medicine: Cardiology',
          required_credits: 2,
          criteria: 'EN.580.485[C]',
        },
        {
          description:
            '<b>Computational Medicine: Cardiology Laboratory</b> <br /> EN.580.487 Computational Medicine: Cardiology Laboratory',
          required_credits: 1,
          criteria: 'EN.580.487[C]',
        },
        {
          description:
            '<b>Core Electives</b> <br /> Select two of the following core electives (Note: These courses cannot be double-counted toward the 21-credit focus area ' +
            'requirement. Courses taken in excess of the 6 credit core elective requirement can be counted in a relevant focus area):' +
            '<br /> EN.580.424 Neuroengineering and Lab <br /> EN.580.427 Microphysiological Systems and Lab <br />' +
            'EN.580.452 Cell and Tissue Engineering Lab <br /> EN.580.453 Immunoengineering Principles and Applications <br />' +
            'EN.580.454 Methods in Nucleic Acid Sequencing Lab <br /> EN.580.494 Build an Imager',
          required_credits: 6,
          criteria:
            'EN.580.424[C]^OR^EN.580.427[C]^OR^EN.580.452[C]^OR^EN.580.453[C]^OR^EN.580.454[C]^OR^EN.580.494[C]',
        },
        {
          description:
            '<b>Career Exploration</b> <br /> Career Exploration in BME is a 0-credit self-identified set of career related events (lectures, panels, journal clubs, etc.) ' +
            'beginning in the spring semester of year one and continuing until graduation. Career Exploration is administered through a ' +
            'Community Blackboard site; students will be enrolled by the department.',
          required_credits: 0,
          criteria: 'EN Career Exploration[D]',
        },
      ],
    },
    {
      name: 'Basic Sciences',
      required_credits: 18,
      min_credits_per_course: 1,
      description:
        'Students who receive credit for AP Physics I and/or Physics II will receive a waiver for the laboratory course. ' +
        'This will reduce the required number of credits for Basic Sciences by 1 or 2 credits. Students are still required ' +
        'to complete at least 129 total credits for the degree.',
      criteria:
        'AS.171.101[C]^OR^AS.171.107[C]^OR^AS.171.102[C]^OR^AS.171.108[C]^OR^AS.173.111[C]^OR^AS.173.112[C]' +
        '^OR^AS.030.101[C]^OR^AS.030.102[C]^OR^AS.030.105[C]^OR^AS.030.106[C]',
      double_count: ['Humanities and Social Sciences', 'Writing Intensive'],
      fine_requirements: [
        {
          description:
            '<b>General Physics I</b> <br /> AS.171.101 General Physics: Physical Science Majors I <br /> <i>OR</i> <br /> AS.171.107 General Physics for Physical Sciences Majors I (AL)',
          required_credits: 4,
          criteria: 'AS.171.101[C]^OR^AS.171.107[C]',
        },
        {
          description:
            '<b>General Physics II</b> <br /> AS.171.102 General Physics: Physical Science Majors II <br /> <i>OR</i> <br /> AS.171.108 General Physics for Physical Sciences Majors II (AL)',
          required_credits: 4,
          criteria: 'AS.171.102[C]^OR^AS.171.108[C]',
        },
        {
          description:
            '<b>General Physics Laboratory I</b> <br /> AS.173.111 General Physics Laboratory I',
          required_credits: 1,
          criteria: 'AS.173.111[C]',
        },
        {
          description:
            '<b>General Physics Laboratory II</b> <br /> AS.173.112 General Physics Laboratory II',
          required_credits: 1,
          criteria: 'AS.173.112[C]',
        },
        {
          description:
            '<b>Introductory Chemistry I</b> <br /> AS.030.101 Introductory Chemistry I',
          required_credits: 3,
          criteria: 'AS.030.101[C]',
        },
        {
          description:
            '<b>Introductory Chemistry II</b> <br /> AS.030.102 Introductory Chemistry II',
          required_credits: 3,
          criteria: 'AS.030.102[C]',
        },
        {
          description:
            '<b>Introductory Chemistry Laboratory I</b> <br /> AS.030.105 Introductory Chemistry Laboratory I',
          required_credits: 1,
          criteria: 'AS.030.105[C]',
        },
        {
          description:
            '<b>Introductory Chemistry Laboratory II</b> <br /> AS.030.106 Introductory Chemistry Laboratory II',
          required_credits: 1,
          criteria: 'AS.030.106[C]',
        },
      ],
    },
    {
      name: 'Mathematics',
      required_credits: 20,
      min_credits_per_course: 3,
      description:
        'Students who take an approved math course and receive 3 credits will have a total of 19 credits. Students are ' +
        'still required to complete at least 129 total credits for the degree.',
      criteria:
        'AS.110.108[C]^OR^AS.110.109[C]^OR^AS.110.202[C]^OR^AS.110.211[C]^OR^EN.553.291[C]' +
        '^OR^EN.553.310[C]^OR^EN.553.311[C]^OR^EN.553.413[C]^OR^EN.553.430[C]^OR^EN.553.433[C]^OR^EN.560.348[C]',
      double_count: [
        'Focus Area',
        'Humanities and Social Sciences',
        'Writing Intensive',
      ],
      fine_requirements: [
        {
          description:
            '<b>Calculus I</b> <br /> AS.110.108 Calculus I (Physical Sciences & Engineering)',
          required_credits: 4,
          criteria: 'AS.110.108[C]',
        },
        {
          description:
            '<b>Calculus II</b> <br /> AS.110.109 Calculus II (Physical Sciences & Engineering)',
          required_credits: 4,
          criteria: 'AS.110.109[C]',
        },
        {
          description:
            '<b>Calculus III</b> <br /> AS.110.202 Calculus III <br /> <i>OR</i> <br /> AS.110.211 Honors Multivariable Calculus',
          required_credits: 4,
          criteria: 'AS.110.202[C]^OR^AS.110.211[C]',
        },
        {
          description:
            '<b>Linear Algebra and Differential Equations</b> <br /> EN.553.291 Linear Algebra and Differential Equations',
          required_credits: 4,
          criteria: 'EN.553.291[C]',
        },
        {
          description:
            '<b>Probability and Statistics</b> <br /> Select one of the following: <br /> EN.553.310 Probability and Statistics for the Physical Sciences and Engineering <br />' +
            'EN.553.311 Probability and Statistics for the Biological Sciences & Engineering <br /> EN.553.413 Applied Statistics and Data Analysis <br />' +
            'EN.553.430 Introduction to Statistics <br /> EN.553.433 Monte Carlo Methods <br /> EN.560.348 Probability & Statistics in Civil Engineering',
          required_credits: 3,
          criteria:
            'EN.553.310[C]^OR^EN.553.311[C]^OR^EN.553.413[C]^OR^EN.553.430[C]^OR^EN.553.433[C]^OR^EN.560.348[C]',
        },
      ],
    },
    {
      name: 'Computer Programming',
      required_credits: 3,
      min_credits_per_course: 3,
      description:
        'Students are required to take at least one semester of programming from a select set of gateway computing courses.',
      criteria: 'EN.500.112[C]^OR^EN.500.113[C]^OR^EN.500.114[C]',
      fine_requirements: [
        {
          description:
            '<b>Computer Programming</b> <br /> Select one of the following: <br /> EN.500.112 Gateway Computing: JAVA <br /> EN.500.113 Gateway Computing: Python <br />' +
            'EN.500.114 Gateway Computing: MATLAB',
          required_credits: 3,
          criteria: 'EN.500.112[C]^OR^EN.500.113[C]^OR^EN.500.114[C]',
        },
      ],
    },
    {
      name: 'Focus Area',
      required_credits: 21,
      min_credits_per_course: 1,
      pathing: 1,
      description:
        'The student must select at least 21 credits from the approved list of courses for a specific focus area. Coordinate with your advisor to' +
        ' determine the best combination of classes for you:',
      criteria:
        'BMED-BDS[T]^OR^BMED-CM[T]^OR^BMED-GSB[T]^OR^BMED-IMD[T]^OR^BMED-IMMU[T]^OR^BMED-NE[T]^OR^BMED-TCTE[T]',
      double_count: [
        'Biomedical Core',
        'Mathematics',
        'Design',
        'Humanities and Social Sciences',
        'Writing Intensive',
      ],
      fine_requirements: [
        {
          description: '<b>Biomedical Data Science</b>',
          required_credits: 21,
          criteria: 'BMED-BDS[T]',
          double_count: ['All'],
        },
        {
          description: '<b>Computational Medicine</b>',
          required_credits: 21,
          criteria: 'BMED-CM[T]',
          double_count: ['All'],
        },
        {
          description: '<b>Genomics and Systems Biology</b>',
          required_credits: 21,
          criteria: 'BMED-GSB[T]',
          double_count: ['All'],
        },
        {
          description: '<b>Imaging and Medical Devices</b>',
          required_credits: 21,
          criteria: 'BMED-IMD[T]',
          double_count: ['All'],
        },
        {
          description: '<b>Imunoengineering</b>',
          required_credits: 21,
          criteria: 'BMED-IMMU[T]',
          double_count: ['All'],
        },
        {
          description: '<b>Neuroengineering</b>',
          required_credits: 21,
          criteria: 'BMED-NE[T]',
          double_count: ['All'],
        },
        {
          description: '<b>Translational Cell and Tissue Engineering</b>',
          required_credits: 21,
          criteria: 'BMED-TCTE[T]',
          double_count: ['All'],
        },
      ],
    },
    {
      name: 'Design',
      required_credits: 6,
      min_credits_per_course: 3,
      description: 'Select at least one of the following design sequences',
      criteria:
        '(EN.510.433[C]^OR^EN.510.434[C])^OR^(EN.520.462[C]^OR^EN.520.463[C])^OR^' +
        '(EN.520.498[C]^OR^EN.520.499[C])^OR^(EN.540.400[C]^OR^EN.540.421[C])^OR^' +
        '(EN.580.311[C]^OR^EN.580.312[C])^OR^(EN.580.411[C]^OR^EN.580.412[C])^OR^' +
        '(EN.580.456[C]^OR^EN.580.457[C])^OR^(EN.580.471[C]^OR^EN.580.571[C])^OR^' +
        '(EN.580.480[C]^OR^EN.580.481[C])^OR^(EN.580.580[C]^OR^EN.580.581[C])^OR^' +
        '(EN.601.455[C]^OR^EN.601.456[C])^OR^(EN.580.437[C]^OR^EN.580.438[C])',
      double_count: [
        'Focus Area',
        'Humanities and Social Sciences',
        'Writing Intensive',
      ],
      pathing: 1,
      fine_requirements: [
        {
          description:
            '<b>EN.500.308 and EN.500.309</b> <br /> EN.500.308 Multidisciplinary Engineering Design I <br /> EN.500.309 Advanced Multidisciplinary Design',
          required_credits: 6,
          criteria: 'EN.500.308[C]^OR^EN.500.309[C]',
        },
        {
          description:
            '<b>EN.510.433 and EN.510.434</b> <br /> EN.510.433 Senior Design Research <br /> EN.510.434 Senior Design/Research II <br />' +
            '(This option must be approved by the Materials Science & Engineering Department)',
          required_credits: 6,
          criteria: 'EN.510.433[C]^OR^EN.510.434[C]',
        },
        {
          description:
            '<b>EN.520.462 and EN.520.463</b> <br /> EN.520.462 Leading Innovation Design Team <br /> EN.520.463 Leading Innovation Design Team II',
          required_credits: 6,
          criteria: 'EN.520.462[C]^OR^EN.520.463[C]',
        },
        {
          description:
            '<b>EN.520.498 and EN.520.499</b> <br /> EN.520.498 Senior Design Project <br /> EN.520.499 Senior Design Project II',
          required_credits: 6,
          criteria: 'EN.520.498[C]^OR^EN.520.499[C]',
        },
        {
          description:
            '<b>EN.540.400 and EN.540.421</b> <br /> EN.540.400 Project in Design: Pharmacokinetics <br /> EN.540.421 Project in Design: Pharmacodynamics',
          required_credits: 6,
          criteria: 'EN.540.400[C]^OR^EN.540.421[C]',
        },
        {
          description:
            '<b>EN.580.311 and EN.580.312</b> <br /> EN.580.311 Design Team Health Tech Project I <br /> EN.580.312 Design Team Health Tech Project II',
          required_credits: 6,
          criteria: 'EN.580.311[C]^OR^EN.580.312[C]',
        },
        {
          description:
            '<b>EN.580.411 and EN.580.412</b> <br /> EN.580.411 Design Team Health Tech Project I <br /> EN.580.412 Design Team Health Tech Project II',
          required_credits: 6,
          criteria: 'EN.580.411[C]^OR^EN.580.412[C]',
        },
        {
          description:
            '<b>EN.580.437 and EN.580.438</b> <br /> EN.580.437 Neuro Data Design I <br /> EN.580.438 Neuro Data Design II',
          required_credits: 6,
          criteria: 'EN.580.437[C]^OR^EN.580.438[C]',
        },
        {
          description:
            '<b>EN.580.456 and EN.580.457</b> <br /> EN.580.456 Introduction to Rehabilitation Engineering <br /> EN.580.457 Introduction to Rehabilitation Engineering: Design Lab',
          required_credits: 6,
          criteria: 'EN.580.456[C]^OR^EN.580.457[C]',
        },
        {
          description:
            '<b>EN.580.471 and EN.580.571</b> <br /> EN.580.471 Principles of Design of BME Instrumentation <br /> EN.580.571 Honors Instrumentation',
          required_credits: 6,
          criteria: 'EN.580.471[C]^OR^EN.580.571[C]',
        },
        {
          description:
            '<b>EN.580.480 and EN.580.481</b> <br /> EN.580.480 Precision Care Medicine I <br /> EN.580.481 Precision Care Medicine II',
          required_credits: 6,
          criteria: 'EN.580.480[C]^OR^EN.580.481[C]',
        },
        {
          description:
            '<b>EN.580.580 and EN.580.581</b> <br /> EN.580.580 Senior Design Project I <br /> EN.580.581 Senior Design Project II',
          required_credits: 6,
          criteria: 'EN.580.580[C]^OR^EN.580.581[C]',
        },
        {
          description:
            '<b>EN.601.455 and EN.601.456</b> <br /> EN.601.455 Computer Integrated Surgery I <br /> EN.601.456 Computer Integrated Surgery II',
          required_credits: 6,
          criteria: 'EN.601.455[C]^OR^EN.601.456[C]',
        },
      ],
    },
    {
      name: 'Humanities and Social Sciences',
      required_credits: 18,
      min_credits_per_course: 3,
      description:
        'Select courses to form a coherent program, relevant to the student’s goals. One course in which ethical and social ' +
        'issues related to technology or medicine is recommended.',
      criteria: 'H[A]^OR^S[A]',
      double_count: [
        'Biomedical Core',
        'Focus Area',
        'Design',
        'Writing Intensive',
      ],
      fine_requirements: [
        {
          description: '<b>One Upper Level class</b>',
          required_credits: 3,
          criteria: '(H[A]^OR^S[A])^AND^(Upper Level[L])',
        },
      ],
    },
    {
      name: 'Other Electives',
      required_credits: 9,
      min_credits_per_course: 1,
      description: 'Select 9 credits from any area.',
      criteria: 'H[A]^OR^S[A]^OR^Q[A]^OR^N[A]^OR^E[A]',
      double_count: ['Writing Intensive'],
    },
    {
      name: 'Writing Intensive',
      required_credits: 6,
      min_credits_per_course: 3,
      description:
        'Students are required to fulfill the university’s requirement of two writing intensive courses, ' +
        'each at least 3 credits. Students must receive at least a C- grade or better in these writing courses.',
      criteria: 'Written Intensive[W]',
      double_count: ['All'],
    },
  ],
};

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
const baPH: Major = {
  degree_name: 'B.A. Public Health Studies',
  abbrev: 'B.A. Public Health',
  department: 'AS Public Health Studies',
  total_degree_credit: 120,
  wi_credit: 15,
  url: 'https://e-catalogue.jhu.edu/arts-sciences/full-time-residential-programs/degree-programs/public-health-studies/public-health-studies-bachelor-arts/',
  distributions: [
    {
      name: 'Public Health Studies Core Courses',
      required_credits: 40,
      min_credits_per_course: 1,
      description:
        'For more information please visit the' +
        "<a href='https://e-catalogue.jhu.edu/arts-sciences/full-time-residential-programs/degree-programs/public-health-studies/public-health-studies-bachelor-arts/'>" +
        'major degree requirement</a> section on the department website.',
      criteria: 'AS Public Health Studies[D]',
      fine_requirements: [
        {
          description:
            'Required Courses: \n\t280.101 Introduction to Public Health (Fall & Spring)\n\t280.240 Research Methods in Public Health (Fall & Spring)\n\t' +
            '280.335 The Environment and Your Health (Fall & Spring) \n\t280.340 Fundamentals of Health Policy & Management (Spring)\n\t' +
            '280.345 Public Health Biostatistics (Fall)\n\t280.350	Fundamentals of Epidemiology (Fall & Spring)',
          required_credits: 21,
          criteria:
            'AS.280.101[C]^OR^AS.280.240[C]^OR^AS.280.240[C]^OR^AS.280.335[C]^OR^AS.280.340[C]^OR^AS.280.345[C]^OR^AS.280.350[C]',
        },
      ],
    },
    {
      name: 'Intermediate Public Health Courses at Homewood',
      required_credits: 15,
      min_credits_per_course: 3,
      description:
        'One course at the 200-400 level focusing on social and behavioral aspects of public health from the list below.' +
        'Please see your PHS advisor for a list of current courses that will satisfy the requirement.',
      criteria:
        'AS Intermediate Public Health[D]^AND^(200[L]^OR^300[L]^OR^400[L])',
      exception: '',
      fine_requirements: [
        {
          description:
            'Required Courses:\n\t230.341	Sociology of Health and Illness OR \n\t280.355 Introduction to Social and Behavioral Determinants of Health',
          required_credits: 3,
          criteria: 'AS.230.341[C]^OR^AS.280.355[C]',
        },
      ],
    },
    {
      name: 'Applied Experience',
      required_credits: 1,
      min_credits_per_course: 1,
      description:
        'The Applied Experience (AE) is a required experiential learning component of the Public Health Studies' +
        ' curriculum. The purpose of the AE is to provide students with supervised, hands-on experience in a professional' +
        ' public health setting. The Applied Experience gives students an opportunity to explore an area of interest within' +
        ' the field of public health by actively engaging in and directly contributing to a public health project or program.' +
        ' The AE must be at least 80 hours and 4 weeks long under the supervision of a public health profession.',
      criteria: 'AS.280.500[C]',
    },
    {
      name: 'Courses at Johns Hopkins Bloomberg School of Public Health (JHSPH)',
      required_credits: 10,
      min_credits_per_course: 3,
      description:
        "Courses are taken at the Johns Hopkins Bloomberg School of Public Health in the student's final year." +
        ' Students take 15 JHSPH credits, which is the equivalent of 10 Homewood credits. Blended courses may' +
        ' count for this requirement, Independent Research and Special Studies will not. Online courses will ' +
        'count toward you total number of credits needed to graduate, but will not count toward the 15 credits ' +
        'needed to fulfill this specific requirement. Within the 15 credits, students must create an 8 credits ' +
        'focus in one particular area, topic, or department.',
      criteria: 'AS Bloomberg School of Public Health[D]',
    },
    {
      name: 'Social Science',
      required_credits: 9,
      min_credits_per_course: 3,
      description:
        'Select two introductory social science courses from ' +
        "<a href='https://e-catalogue.jhu.edu/arts-sciences/full-time-residential-programs/degree-programs/public-health-studies/public-health-studies-bachelor-arts/'>" +
        'Table 1</a>. Other courses may apply with advisor approval. ' +
        'These courses must be from two different departments (distinguished by department course number, not name)',
      criteria: 'AS Social Science[D]',
      double_count: ['Writing Intensive', 'Major Requirement'],
    },
    {
      name: 'Natural Science',
      required_credits: 9,
      min_credits_per_course: 1,
      description:
        'Select two Biology Lecture Courses of the following (Or Equivalent):',
      criteria: 'AS Natural Science[N]',
      fine_requirements: [
        {
          description:
            'Select two Biology Lecture Courses of the following (Note: Other biology courses may apply with advisor approval):' +
            '\n\tAS.020.151 General Biology I\n\tAS.020.152 General Biology II\n\tAS.020.303 Genetics\n\tAS.020.305 Biochemistry\n\t' +
            '\n\tAS.020.306 Cell Biology\n\tAS.020.374 Comparative Animal Physiology\n\tAS.280.161 Applications of Biological Concepts in Public Health',
          required_credits: 6,
          criteria:
            'AS.020.151[C]^OR^AS.020.152[C]^OR^AS.020.303[C]^OR^AS.020.305[C]^OR^AS.020.306[C]^OR^AS.020.374[C]' +
            '^OR^AS.280.161[C]',
        },
        {
          description:
            'Select one Biology Lab Course of the following:\n\t' +
            'AS.020.153 General Biology Laboratory I\n\tAS.020.154 General Biology Lab II\n\tAS.020.315 Biochemistry Project labs\n\t' +
            '\n\tAS.020.316 Cell Biology Lab\n\tAS.020.340 Developmental Genetics Lab\n\tAS.020.377 Comparative Physiology Lab\n\t' +
            'AS.250.253 Protein Engineering and Biochemistry Lab\n\tAS.250.254 Protein Biochemistry and Engineering Laboratory',
          required_credits: 1,
          criteria:
            'AS.020.153[C]^OR^AS.020.154[C]^OR^AS.020.315[C]^OR^AS.020.316[C]^OR^AS.020.340[C]^OR^AS.020.377[C]' +
            '^OR^AS.250.253[C]^OR^AS.250.254[C]',
        },
      ],
      double_count: ['Writing Intensive', 'Major Requirement'],
    },
    {
      name: 'Quantitative',
      required_credits: 9,
      min_credits_per_course: 3,
      description: 'Must complete the following courses in Quantitative.',
      criteria: 'AS Quantitative[N]',
      fine_requirements: [
        {
          description:
            'Select one Quantitative Course of the following:\n\t110.106 Calculus I (Biology and Social Sciences)\n\t' +
            '110.108 Calculus I (Physical Sciences & Engineering)',
          required_credits: 4,
          criteria: 'AS.110.106[C]^OR^AS.110.108[C]',
        },
      ],
    },
    {
      name: 'Writing Intensive',
      required_credits: 15,
      min_credits_per_course: 3,
      description:
        'Effective Fall 2022, all students earning a degree from the School of Arts and Sciences must complete Reintroduction to Writing in their first year at Hopkins plus an additional 12 credits in writing-intensive courses through their undergraduate experience for a minimum of 15 writing-intensive credits.',
      criteria: 'Written Intensive[W]',
      double_count: ['All'],
      fine_requirements: [
        {
          description: 'Reintroduction to Writing',
          required_credits: 4,
          criteria: 'AS.004.100[C]',
        },
      ],
    },
  ],
};

// https://engineering.jhu.edu/chembe/undergraduate-studies/undergraduate-degree-program/
const bsCBE: Major = {
  degree_name: 'B.S. Chemical & Biomolecular Engineering',
  abbrev: 'B.S. ChemBE',
  department: 'EN Chemical & Biomolecular Engineering',
  total_degree_credit: 128,
  wi_credit: 6,
  url: 'https://engineering.jhu.edu/chembe/undergraduate-studies/undergraduate-degree-program/',
  distributions: [
    {
      name: 'Core ChemBE',
      required_credits: 37,
      min_credits_per_course: 1,
      description:
        'For more information please visit the ' +
        "<a href='https://engineering.jhu.edu/chembe/undergraduate-studies/undergraduate-degree-program/'>" +
        'major degree requirement</a> section on the department website.',
      criteria:
        'EN.500.113[C]^OR^EN.540.101[C]^OR^EN.540.202[C]^OR^EN.540.203[C]^OR^EN.540.301[C]^OR^EN.540.303[C]^OR^EN.540.304[C]^OR^' +
        'EN.540.306[C]^OR^EN.540.315[C]^OR^EN.540.409[C]^OR^EN.540.490[C]^OR^EN.540.311[C]^OR^EN.540.313[C]',
      double_count: ['Liberal Arts', 'Writing Intensive'],
      fine_requirements: [
        {
          description:
            '<b>Gateway Computing: Python</b> <br /> EN.500.113 Gateway Computing: Python',
          required_credits: 3,
          criteria: 'EN.500.113[C]',
        },
        {
          description:
            '<b>Chemical Engineering Today</b> <br /> EN.540.101 Chemical Engineering Today <br /> *waived for incoming Class of AY 2021',
          required_credits: 1,
          criteria: 'EN.540.101[C]',
        },
        {
          description:
            '<b>Intro to Chemical and Biological Process Analysis</b> <br /> EN.540.202 Intro to Chemical and Biological Process Analysis',
          required_credits: 4,
          criteria: 'EN.540.202[C]',
        },
        {
          description:
            '<b>Engineering Thermodynamics</b> <br /> EN.540.203 Engineering Thermodynamics',
          required_credits: 3,
          criteria: 'EN.540.203[C]',
        },
        {
          description:
            '<b>Kinetic Processes</b> <br /> EN.540.301 Kinetic Processes',
          required_credits: 4,
          criteria: 'EN.540.301[C]',
        },
        {
          description:
            '<b>Transport Phenomena I</b> <br /> EN.540.303 Transport Phenomena I',
          required_credits: 3,
          criteria: 'EN.540.303[C]',
        },
        {
          description:
            '<b>Transport Phenomena II</b> <br /> EN.540.304 Transport Phenomena II',
          required_credits: 4,
          criteria: 'EN.540.304[C]',
        },
        {
          description:
            '<b>Chemical and Biological Separations</b> <br /> EN.540.306 Chemical and Biological Separations',
          required_credits: 4,
          criteria: 'EN.540.306[C]',
        },
        {
          description:
            '<b>Process Design with ASPEN</b> <br /> EN.540.315 Process Design with ASPEN',
          required_credits: 2,
          criteria: 'EN.540.315[C]',
        },
        {
          description:
            '<b>Modeling Dynamics and Control for Chemical and Biological Systems</b> <br /> EN.540.409 Modeling Dynamics and Control for Chemical and Biological Systems',
          required_credits: 4,
          criteria: 'EN.540.409[C]',
        },
        {
          description:
            '<b>Chemical and Biomolecular Lab Safety and Ethics</b> <br /> EN.540.490 Chemical and Biomolecular Lab Safety and Ethics',
          required_credits: 1,
          criteria: 'EN.540.490[C]',
        },
        {
          description:
            '<b>Senior Lab</b> <br /> Select one of the following courses: <br /> EN.540.311 Projects in Chemical Engineering Unit Operations' +
            '<br /> EN.540.313 Projects in Chemical and Biomolecular Engineering Unit Operations <br /> Chemical Engineering Laboratory at DTU (Technical University of Denmark) ',
          required_credits: 4,
          criteria: 'EN.540.311[C]^OR^EN.540.313[C]',
        },
      ],
    },
    {
      name: 'ChemBE Product Design',
      required_credits: 3,
      min_credits_per_course: 3,
      description:
        'Take one of the following course options for Product Design.',
      criteria:
        'EN.540.314[C]^OR^EN.540.309[C]^OR^EN.540.310[C]^OR^EN.500.308[C]^OR^EN.500.309[C]',
      pathing: 1,
      fine_requirements: [
        {
          description:
            '<b>Option 1</b> <br /> EN.540.314 ChemBE Product Design <br /> <i>One semester design (spring)</i>',
          required_credits: 3,
          criteria: 'EN.540.314[C]',
        },
        {
          description:
            '<b>Option 2</b> <br /> EN.540.309 Product Design Part 1 <br /> EN.540.310 Product Design Part 2 <br /> <i>Two semester design (two consecutive semesters)</i>',
          required_credits: 6,
          criteria: 'EN.540.309[C]^OR^EN.540.310[C]',
        },
        {
          description:
            '<b>Option 3</b> <br /> EN.500.308 Multidisciplinary Design <br /> EN.500.309 Advanced Multidisciplinary Design <br /> <i>Two semester design (two consecutive semesters)</i>',
          required_credits: 6,
          criteria: 'EN.500.308[C]^OR^EN.500.309[C]',
        },
      ],
    },
    {
      name: 'Mathematics',
      required_credits: 16,
      min_credits_per_course: 4,
      description:
        'All courses in this category must be from one of the two math departments on ' +
        'campus: Mathematics or Applied Mathematics and Statistics.',
      criteria: 'AS Mathematics[D]^OR^EN Applied Mathematics & Statistics[D]',
      fine_requirements: [
        {
          description: '<b>Calculus I</b> <br /> AS.110.108 Calculus I',
          required_credits: 4,
          criteria: 'AS.110.108[C]',
        },
        {
          description: '<b>Calculus II</b> <br /> AS.110.109 Calculus II',
          required_credits: 4,
          criteria: 'AS.110.109[C]',
        },
        {
          description: '<b>Calculus III</b> <br /> AS.110.202 Calculus III',
          required_credits: 4,
          criteria: 'AS.110.202[C]',
        },
        {
          description:
            '<b>Differential Equations</b> <br /> Select one of the following: <br /> AS.110.302 Differential Equations with Applications <br /> EN.553.291 Linear Algebra and Differential Equations',
          required_credits: 4,
          criteria: 'AS.110.302[C]^OR^EN.553.291[C]',
        },
      ],
    },
    {
      name: 'Sciences',
      required_credits: 25,
      min_credits_per_course: 1,
      description:
        'Students who receive credit for AP Physics I and/or Physics II will receive a waiver for the laboratory course. ' +
        'This will reduce the required number of credits for Basic Sciences by 1 or 2 credits. Students are still required ' +
        'to complete at least 129 total credits for the degree.',
      criteria:
        'AS.171.101[C]^OR^AS.171.107[C]^OR^AS.171.102[C]^OR^AS.171.108[C]^OR^AS.173.111[C]^OR^AS.173.112[C]' +
        '^OR^AS.030.101[C]^OR^AS.030.102[C]^OR^AS.030.105[C]^OR^AS.030.106[C]',
      double_count: ['Writing Intensive'],
      fine_requirements: [
        {
          description:
            '<b>General Physics I</b> <br /> AS.171.101 General Physics: Physical Science Majors I <br /> <i>OR</i> <br /> AS.171.107 General Physics for Physical Sciences Majors I (AL)',
          required_credits: 4,
          criteria: 'AS.171.101[C]^OR^AS.171.107[C]',
        },
        {
          description:
            '<b>General Physics II</b> <br /> AS.171.102 General Physics: Physical Science Majors II <br /> <i>OR</i> <br /> AS.171.108 General Physics for Physical Sciences Majors II (AL)',
          required_credits: 4,
          criteria: 'AS.171.102[C]^OR^AS.171.108[C]',
        },
        {
          description:
            '<b>General Physics Laboratory I</b> <br /> AS.173.111 General Physics Laboratory I',
          required_credits: 1,
          criteria: 'AS.173.111[C]',
        },
        {
          description:
            '<b>Introductory Chemistry I</b> <br /> AS.030.101 Introductory Chemistry I',
          required_credits: 3,
          criteria: 'AS.030.101[C]',
        },
        {
          description:
            '<b>Introductory Chemistry II</b> <br /> AS.030.102 Introductory Chemistry II <br /><i>OR<i><br /> AS.030.103 Applied Chemical Equilibrium and Reactivity',
          required_credits: 3,
          criteria: 'AS.030.102[C]^OR^AS.030.103[C]',
        },
        {
          description:
            '<b>Introductory Chemistry Laboratory I</b> <br /> AS.030.105 Introductory Chemistry Laboratory I',
          required_credits: 1,
          criteria: 'AS.030.105[C]',
        },
        {
          description:
            '<b>Introductory Chemistry Laboratory II</b> <br /> AS.030.106 Introductory Chemistry Laboratory II',
          required_credits: 1,
          criteria: 'AS.030.106[C]',
        },
        {
          description:
            '<b>Organic Chemistry I</b> <br /> AS.030.205 Organic Chemistry I',
          required_credits: 4,
          criteria: 'AS.030.205[C]',
        },
        {
          description: '<b>Biochemistry</b> <br /> AS.020.305 Biochemistry',
          required_credits: 3,
          criteria: 'AS.020.305[C]',
        },
        {
          description:
            '<b>Laboratory Course</b> <br /> Select one of the following: <br /> AS.020.315 Biochemistry Project Laboratory <br />' +
            'AS.030.225 Introduction to Organic Chemistry Laboratory <br /> AS.030.305 Physical Chemistry Instrumentation Laboratory 1 <br />' +
            'AS.250.253 Protein Engineering and Biochemistry Laboratory',
          required_credits: 1,
          criteria:
            'AS.020.315[C]^OR^AS.030.225[C]^OR^AS.030.305[C]^OR^AS.250.253[C]',
        },
      ],
    },
    {
      name: 'Electives to meet Credit Requirements',
      required_credits: 95,
      min_credits_per_course: 1,
      description:
        'The student must take elective courses to meet the remainder of the following requirements: <br /> 48 credits of Engineering (E designation) <br />' +
        '16 credits of Mathematics (must be from 110 or 553) <br /> 13 credits Advanced Chemistry and Biology <br /> 18 H/S credits (must be six courses that are at least 3 credits each)',
      criteria: '',
      double_count: ['Writing Intensive'],
      fine_requirements: [
        {
          description: '<b>Engineering Credits</b>',
          required_credits: 48,
          criteria: 'E[A]',
        },
        {
          description: '<b>Mathematics Credits</b>',
          required_credits: 16,
          criteria:
            'AS Mathematics[D]^OR^EN Applied Mathematics & Statistics[D]',
        },
        {
          description: '<b>Advanced Chemistry and Biology Credits</b>',
          required_credits: 13,
          criteria: 'AS Biology[D]^OR^AS Chemistry[D]',
        },
        {
          description: '<b>H/S Credits</b>',
          required_credits: 18,
          criteria: 'H[A]^OR^S[A]',
        },
      ],
    },
    {
      name: 'Liberal Arts',
      required_credits: 18,
      min_credits_per_course: 3,
      description:
        'Select courses to form a coherent program, relevant to the student’s goals. One course in which ethical and social ' +
        'issues related to technology or medicine is recommended.',
      criteria: 'H[A]^OR^S[A]',
      double_count: ['Core ChemBE', 'Writing Intensive'],
      fine_requirements: [
        {
          description:
            '<b>Culture of the Engineering Profession</b> <br /> EN.661.315 Culture of the Engineering Profession',
          required_credits: 3,
          criteria: 'EN.661.315[C]',
        },
      ],
    },
    {
      name: 'Writing Intensive',
      required_credits: 6,
      min_credits_per_course: 3,
      description:
        'Students are required to fulfill the university’s requirement of two writing intensive courses, ' +
        'each at least 3 credits. Students must receive at least a C- grade or better in these writing courses.',
      criteria: 'Written Intensive[W]',
      double_count: ['All'],
    },
  ],
};

// https://krieger.jhu.edu/internationalstudies/undergraduate/requirements/
const baIS: Major = {
  degree_name: 'B.A. International Studies',
  abbrev: 'B.A. IS',
  department: 'AS International Studies',
  total_degree_credit: 120,
  wi_credit: 12,
  url: 'https://krieger.jhu.edu/internationalstudies/undergraduate/requirements/',
  distributions: [
    {
      name: 'Political Science',
      required_credits: 18,
      min_credits_per_course: 3,
      description:
        'International studies students must complete 18 credits in political science, including: <br />' +
        'One course in international relations (IR) <br /> Two courses in comparative politics (CP) <br /> One ' +
        'course in American politics (AP) <br /> One course in political theory (PT) <br /> One gateway course',
      criteria:
        'INST-IR[T]^OR^INST-CP[T]^OR^INST-AP[T]^OR^INST-PT[T]^OR^AS.070.295[C]^OR^AS.190.108[C]^OR^AS.190.111[C]^OR^(AS.230.150[C]^AND^Fall 2019[Y])',
      double_count: [
        'Economics',
        'Foreign Language',
        'History',
        'Humanities (H) Distribution',
        'Social Science (S) Distribution',
        'Other (N/E/Q) Distribution',
        'Writing Intensive',
      ],
      fine_requirements: [
        {
          required_credits: 3,
          description:
            '<b>One INST-IR course</b> <br /> One course in international relations (IR)',
          criteria: 'INST-IR[T]',
          double_count: ['All'],
        },
        {
          required_credits: 6,
          description:
            '<b>Two INST-CP courses</b> <br /> Two courses in comparative politics (CP)',
          criteria: 'INST-CP[T]',
          double_count: ['All'],
        },
        {
          required_credits: 3,
          description:
            '<b>One INST-AP course</b> <br /> One course in American politics (AP)',
          criteria: 'INST-AP[T]',
          double_count: ['All'],
        },
        {
          required_credits: 3,
          description:
            '<b>One INST-PT course</b> <br /> One course in political theory (PT)',
          criteria: 'INST-PT[T]',
          double_count: ['All'],
        },
        {
          required_credits: 3,
          description:
            '<b>One Gateway Course</b> <br /> One of the following gateway courses: <br /> Conflict and Security in a Global World ' +
            '(070.295) <br /> Contemporary International Politics (190.108) <br /> Introduction to Global ' +
            'Studies (190.111) <br /> Issues in International Development (230.150)* <br /> <br /> *Applies to ' +
            'students who entered fall 2019 and earlier only.',
          criteria:
            'AS.070.295[C]^OR^AS.190.108[C]^OR^AS.190.111[C]^OR^(AS.230.150[C]^AND^Fall 2019[Y])',
          double_count: ['All'],
        },
      ],
    },
    {
      name: 'Economics',
      required_credits: 12,
      min_credits_per_course: 3,
      description:
        'Note: both Elements of Macroeconomics and Elements of Microeconomics must be ' +
        'completed by the end of the sophomore year.',
      criteria: 'INST-ECON[T]^OR^AS Economics[D]',
      double_count: [
        'Political Science',
        'Foreign Language',
        'History',
        'Humanities (H) Distribution',
        'Social Science (S) Distribution',
        'Other (N/E/Q) Distribution',
        'Writing Intensive',
      ],
      fine_requirements: [
        {
          required_credits: 3,
          description:
            '<b>Elements of Macroeconomics</b> <br /> AS.180.101 Elements of Macroeconomics',
          criteria: 'AS.180.101[C]',
        },
        {
          required_credits: 3,
          description:
            '<b>Elements of Microeconomics</b> <br /> AS.180.102 Elements of Microeconomics',
          criteria: 'AS.180.102[C]',
        },
        {
          required_credits: 3,
          description:
            '<b>One INST-ECON course</b> <br /> One approved international economics course designated INST-ECON in ' +
            'the course description; this course may sometimes be fulfilled via study ' +
            'abroad, with permission',
          criteria: 'INST-ECON[T]',
        },
        {
          required_credits: 3,
          description:
            '<b>One other Economics Course</b> <br /> One course (student’s choice) taken in the JHU Department of Economics (e.g., AS.180.xxx).',
          criteria: 'AS Economics[D]^NOT^AS.180.101[C]^NOT^AS.180.102[C]',
        },
      ],
    },
    {
      name: 'Foreign Language',
      required_credits: 6,
      min_credits_per_course: 3,
      description:
        'International studies majors must demonstrate proficiency in at least one ' +
        'foreign language. Proficiency through the second semester of the advanced/third-year ' +
        'level is required. If students have proficiency above the advanced/third-year level, ' +
        'they must take either: Option (A), two semesters of an upper level literature or culture ' +
        'course offered by the language departments and taught in the language of proficiency, or ' +
        'Option (B), take two semesters of another language. <br /> <br /> Waivers indicating advanced ' +
        'level/third-year language proficiency must be documented in the student’s official ' +
        'academic record in order for a student to be eligible to complete Option A or B. ' +
        'To receive these waivers, students must contact the Center for Language Education or ' +
        'the Department of Modern Languages & Literatures to complete a proficiency exam on ' +
        'campus. <br /> <br /> Note: Students cannot count their foreign language courses toward the 5 ' +
        'course advanced coursework requirement.',
      criteria:
        'AS Center for Language Education[D]^OR^AS Modern Languages and Literatures[D]',
      double_count: [
        'Political Science',
        'Economics',
        'History',
        'Humanities (H) Distribution',
        'Social Science (S) Distribution',
        'Other (N/E/Q) Distribution',
        'Writing Intensive',
      ],
    },
    {
      name: 'Focus Area',
      required_credits: 12,
      min_credits_per_course: 3,
      description:
        'Four courses within a coherent field of interest. For more detail please visit ' +
        'https://krieger.jhu.edu/internationalstudies/undergraduate/requirements/',
      criteria: '^NOT^AS.180.101[C]^NOT^AS.180.102[C]',
      user_select: true,
      double_count: [
        'Humanities (H) Distribution',
        'Social Science (S) Distribution',
        'Other (N/E/Q) Distribution',
        'Writing Intensive',
      ],
    },
    {
      name: 'History',
      required_credits: 15,
      min_credits_per_course: 3,
      description:
        'International Studies students must complete 15 credits in history, including:\n\t' +
        'One introductory course at the 100-level in the JHU History Department ' +
        '(e.g., AS.100.1xx).\n\tFour courses designated INST-GLOBAL in the course description.',
      criteria: '(AS History[D]^AND^100[L])^OR^INST-GLOBAL[T]',
      double_count: [
        'Political Science',
        'Economics',
        'Foreign Language',
        'Humanities (H) Distribution',
        'Social Science (S) Distribution',
        'Other (N/E/Q) Distribution',
        'Writing Intensive',
      ],
      fine_requirements: [
        {
          required_credits: 3,
          description:
            '<b>Introductory History Course</b> One introductory course at the 100-level in the JHU History Department (e.g., AS.100.1xx)',
          criteria: 'AS History[D]^AND^100[L]',
          double_count: ['All'],
        },
        {
          required_credits: 12,
          description:
            '<b>Four INST-GLOBAL courses</b> <br /> Four courses designated INST-GLOBAL in the course description',
          criteria: 'INST-GLOBAL[T]',
          double_count: ['All'],
        },
      ],
    },
    {
      name: 'Humanities (H) Distribution',
      required_credits: 9,
      min_credits_per_course: 3,
      description:
        'The distribution requirement stipulates that students must earn a minimum number of credits in academic areas outside of their primary major. ' +
        'The student must complete at least 9 credits in the Humanities (H) area. ' +
        'These credits fulfilling the distribution requirement may overlap with major or minor requirements and the writing-intensive requirement.',
      criteria: 'H[A]',
      double_count: [
        'Political Science',
        'Economics',
        'Foreign Language',
        'Focus Area',
        'History',
        'Writing Intensive',
      ],
    },
    {
      name: 'Social Science (S) Distribution',
      required_credits: 9,
      min_credits_per_course: 3,
      description:
        'The distribution requirement stipulates that students must earn a minimum number of credits in academic areas outside of their primary major. ' +
        'The student must complete at least 9 credits in the Social Science (S) area. ' +
        'These credits fulfilling the distribution requirement may overlap with major or minor requirements and the writing-intensive requirement.',
      criteria: 'S[A]',
      double_count: [
        'Political Science',
        'Economics',
        'Foreign Language',
        'Focus Area',
        'History',
        'Writing Intensive',
      ],
    },
    {
      name: 'Other (N/E/Q) Distribution',
      required_credits: 9,
      min_credits_per_course: 3,
      description:
        'The distribution requirement stipulates that students must earn a minimum number of credits in academic areas outside of their primary major. ' +
        'The student must complete at least 9 credits in any of the other areas: Natural Sciences (N), Engineering (E) and/or Quantitative (Q). ' +
        'These credits fulfilling the distribution requirement may overlap with major or minor requirements and the writing-intensive requirement.',
      criteria: 'N[A]^OR^E[A]^OR^Q[A]',
      double_count: [
        'Political Science',
        'Economics',
        'Foreign Language',
        'Focus Area',
        'History',
        'Writing Intensive',
      ],
    },
    {
      name: 'Writing Intensive',
      required_credits: 12,
      min_credits_per_course: 3,
      description:
        'To encourage excellence in writing, across disciplines, the university requires all undergraduates to take a number of writing-intensive courses. ' +
        'All students earning a degree from the School of Arts and Sciences must complete at least 12 credits in writing-intensive courses. ' +
        'Writing-intensive courses taken to satisfy major, minor, or distribution requirements may also count toward the writing requirement.',
      criteria: 'Written Intensive[W]',
      double_count: ['All'],
    },
  ],
};

// https://e-catalogue.jhu.edu/engineering/full-time-residential-programs/degree-programs/applied-mathematics-statistics/applied-mathematics-statistics-bs/#requirementstext
const bsAMS: Major = {
  degree_name: 'B.S. Applied Mathematics & Statistics',
  abbrev: 'B.S. AMS',
  department: 'EN Applied Mathematics & Statistics',
  total_degree_credit: 120,
  wi_credit: 6,
  url: 'https://e-catalogue.jhu.edu/engineering/full-time-residential-programs/degree-programs/applied-mathematics-statistics/applied-mathematics-statistics-bs/#requirementstext',
  distributions: [
    {
      name: 'Math',
      required_credits: 39,
      min_credits_per_course: 3,
      description:
        'All courses used to meet the following departmental requirements must be taken for a letter grade and passed with a grade of C- or higher.',
      criteria:
        'AS.110.108[C]^OR^AS.110.109[C]^OR^AS.110.113[C]^OR^AS.110.202[C]^OR^AS.110.211[C]^OR^AS.110.201[C]^OR^AS.110.212[C]^OR^EN.553.291[C]^OR^' +
        'AS.110.302[C]^OR^EN.553.391[C]^OR^EN.540.468[C]^OR^EN.553.385[C]^OR^EN.553.171[C]^OR^EN.553.172[C]^OR^EN.553.371[C]^OR^EN.553.471[C]^OR^EN.553.472[C]^OR^' +
        'EN.553.420[C]^OR^EN.553.430[C]^OR^EN.553.431[C]^OR^EN.553.361[C]',
      double_count: ['Quantitative Studies'],
      fine_requirements: [
        {
          description:
            '<b>Calculus I</b> <br /> AS.110.108 Calculus I (Physical Sciences & Engineering) <br /> <i>OR</i> <br /> AS.110.113 Honors Single Variable Calculus <br />',
          required_credits: 4,
          criteria: 'AS.110.108[C]^OR^AS.110.113[C]',
        },
        {
          description:
            '<b>Calculus II</b> <br /> AS.110.109 Calculus II (Physical Sciences & Engineering) <br /> <i>OR</i> <br /> AS.110.113 Honors Single Variable Calculus',
          required_credits: 4,
          criteria: 'AS.110.109[C]^OR^AS.110.113[C]',
        },
        {
          description:
            '<b>Calculus III</b> <br /> AS.110.202 Calculus III <br /> <i>OR</i> <br /> AS.110.211 Honors Multivariable Calculus',
          required_credits: 4,
          criteria: 'AS.110.202[C]^OR^AS.110.211[C]',
        },
        {
          description:
            '<b>Linear Algebra</b> <br /> Select one of the following: <br /> AS.110.201 Linear Algebra <br /> AS.110.212 Honors Linear Algebra <br /> EN.553.291 Linear Algebra and Differential Equations',
          required_credits: 4,
          criteria: 'AS.110.201[C]^OR^AS.110.212[C]^OR^EN.553.291[C]',
        },
        {
          description:
            '<b>Differential Equations</b> <br /> Select one of the following: <br /> AS.110.302 Differential Equations and Applications <br /> EN.553.391 Dynamical Systems <br /> EN.540.468 Introduction to Nonlinear Dynamics and Chaos',
          required_credits: 3,
          criteria: 'AS.110.302[C]^OR^EN.553.391[C]^OR^EN.540.468[C]',
        },
        {
          description:
            '<b>Numerical Linear Algebra</b> <br /> EN.553.385 Numerical Linear Algebra',
          required_credits: 4,
          criteria: 'EN.553.385[C]',
        },
        {
          description:
            '<b>Discrete Mathematics</b> <br /> Select one of the following: <br /> EN.553.171 Discrete Mathematics <br /> EN.553.172 Honors Discrete Mathematics <br /> EN.553.371 ' +
            'Cryptology and Coding <br /> EN.553.471 Combinatorial Analysis <br /> EN.553.472 Graph Theory',
          required_credits: 4,
          criteria:
            'EN.553.171[C]^OR^EN.553.172[C]^OR^EN.553.371[C]^OR^EN.553.471[C]^OR^EN.553.472[C]',
        },
        {
          description:
            '<b>Probability</b> <br /> EN.553.420 Introduction to Probability',
          required_credits: 4,
          criteria: 'EN.553.420[C]',
        },
        {
          description:
            '<b>Statistics</b> <br /> EN.553.430 Introduction to Statistics <br /> <i>OR</i> <br />' +
            'EN.553.431 Honors Introduction to Statistics',
          required_credits: 4,
          criteria: 'EN.553.430[C]^OR^EN.553.431[C]',
        },
        {
          description:
            '<b>Optimization</b> <br /> EN.553.361 Introduction to Optimization',
          required_credits: 4,
          criteria: 'EN.553.361[C]',
        },
      ],
    },
    {
      name: 'Computer Languages and Programming',
      required_credits: 3,
      min_credits_per_course: 1,
      description:
        'Select one of the following: <br />' +
        'EN.500.112 Gateway Computing: JAVA <br /> EN.500.113 Gateway Computing: Python <br /> EN.500.114 Gateway Computing: Matlab <br />' +
        'AS.250.205 Introduction to Computing <br /> EN.553.281 Introduction to Mathematical Computing <br /> EN.580.242 & EN.580.244 ' +
        'Biological Models and Simulations and Nonlinear Dynamics of Biological Systems <br /> EN.601.220 Intermediate Programming' +
        '. <br /> NOTE: Students are strongly encouraged to fulfill this element of the requirement by taking EN.500.113 Gateway Computing: Python, and to do this in their first semester at Johns Hopkins University.',
      criteria:
        'EN.500.112[C]^OR^EN.500.113[C]^OR^EN.500.114[C]^OR^AS.250.205[C]^OR^EN.553.281[C]^OR^EN.580.242[C]^OR^EN.580.244[C]^OR^' +
        'EN.601.220[C]^OR^AS.250.205[C]',
      double_count: ['Quantitative Studies'],
    },
    {
      name: 'Area of Focus',
      required_credits: 6,
      min_credits_per_course: 3,
      pathing: 1,
      description:
        'Two courses must be taken within a coherent field of interest. For more detail please visit ' +
        'https://e-catalogue.jhu.edu/engineering/full-time-residential-programs/degree-programs/applied-mathematics-statistics/applied-mathematics-statistics-bs/#requirementstext',
      criteria:
        'AS.110.405[C]^OR^AS.110.445[C]^OR^EN.553.426[C]^OR^EN.553.427[C]^OR^EN.553.433[C]^OR^EN.553.492[C]^OR^' +
        'EN.553.400[C]^OR^EN.553.413[C]^OR^EN.553.414[C]^OR^EN.553.432[C]^OR^EN.553.436[C]^OR^EN.553.439[C]^OR^EN.553.450[C]^OR^' +
        'EN.553.362[C]^OR^EN.553.453[C]^OR^EN.553.463[C]^OR^EN.553.465[C]^OR^EN.553.467[C]^OR^' +
        'AS.110.401[C]^OR^EN.553.371[C]^OR^EN.553.471[C]^OR^EN.553.472[C]^OR^' +
        'EN.553.428[C]^OR^EN.553.441[C]^OR^EN.553.442[C]^OR^EN.553.444[C]^OR^EN.553.445[C]^OR^EN.553.447[C]^OR^EN.553.448[C]^OR^EN.553.449[C]^OR^EN.553.488[C]^OR^' +
        'EN.553.481[C]^OR^EN.553.493[C]',
      double_count: ['All'],
      fine_requirements: [
        {
          required_credits: 6,
          description: '<b>Probability and Stochastic Processes</b>',
          criteria:
            'AS.110.405[C]^OR^AS.110.445[C]^OR^EN.553.426[C]^OR^EN.553.427[C]^OR^EN.553.433[C]^OR^EN.553.492[C]',
        },
        {
          required_credits: 6,
          description: '<b>Statistics and Statistical Learning</b>',
          criteria:
            'AS.110.445[C]^OR^EN.553.400[C]^OR^EN.553.413[C]^OR^EN.553.414[C]^OR^EN.553.432[C]^OR^EN.553.433[C]' +
            '^OR^EN.553.436[C]^OR^EN.553.439[C]^OR^EN.553.450[C]',
        },
        {
          required_credits: 6,
          description: '<b>Optimization and Operations Research</b>',
          criteria:
            'EN.553.362[C]^OR^EN.553.400[C]^OR^EN.553.453[C]^OR^EN.553.463[C]^OR^EN.553.465[C]^OR^EN.553.467[C]',
        },
        {
          required_credits: 6,
          description: '<b>Discrete Mathematics</b>',
          criteria:
            'AS.110.401[C]^OR^EN.553.371[C]^OR^EN.553.463[C]^OR^EN.553.471[C]^OR^EN.553.472[C]',
        },
        {
          required_credits: 6,
          description: '<b>Financial Mathematics</b>',
          criteria:
            'EN.553.427[C]^OR^EN.553.428[C]^OR^EN.553.441[C]^OR^EN.553.442[C]^OR^EN.553.444[C]^OR^EN.553.445[C]' +
            '^OR^EN.553.447[C]^OR^EN.553.448[C]^OR^EN.553.449[C]^OR^EN.553.488[C]',
        },
        {
          required_credits: 6,
          description: '<b>Computational Mathematics</b>',
          criteria:
            'EN.553.481[C]^OR^AS.110.445[C]^OR^EN.553.433[C]^OR^EN.553.467[C]^OR^EN.553.493[C]',
        },
      ],
    },
    {
      name: 'Scientific Computing',
      required_credits: 3,
      min_credits_per_course: 3,
      description:
        '<b>Select one of the following:</b> <br /> AS.110.445 Mathematical and Computational Foundations of Data Science <br /> EN.553.400 Mathematical Modeling and Consulting' +
        '<br /> EN.553.413 Applied Statistics and Data Analysis <br /> EN.553.432 Bayesian Statistics <br /> EN.553.433 Monte Carlo Methods <br />' +
        'EN.553.436 Introduction to Data Science <br /> EN.553.450 Computational Molecular Medicine <br /> EN.553.463 Network Models in Operations Research <br />' +
        'EN.553.467 Deep Learning in Discrete Optimization <br /> EN.553.481 Numerical Analysis <br /> EN.553.488 Computing for Applied Mathematics <br />' +
        'EN.553.493 Mathematical Image Analysis <br /> EN.553.494 Applied and Computational Multilinear Algebra <br /> EN.601.433 Intro Algorithms <br />' +
        'EN.601.475 Machine Learning <br /> EN.601.482 Machine Learning: Deep Learning',
      criteria:
        'AS.110.445[C]^OR^EN.553.400[C]^OR^EN.553.413[C]^OR^EN.553.432[C]^OR^EN.553.433[C]^OR^EN.553.436[C]' +
        '^OR^EN.553.450[C]^OR^EN.553.463[C]^OR^EN.553.467[C]^OR^EN.553.481[C]^OR^EN.553.488[C]^OR^EN.553.493[C]' +
        '^OR^EN.553.494[C]^OR^EN.601.433[C]^OR^EN.601.475[C]^OR^EN.601.482[C]',
      double_count: ['All'],
    },
    {
      name: 'Natural Sciences',
      required_credits: 12,
      min_credits_per_course: 1,
      description:
        'Courses coded Natural Sciences. Laboratory courses that accompany Natural Science courses may' +
        ' be used in reaching this total. (Courses used to meet the requirements above may be counted toward this total.)',
      criteria: 'N[A]',
      double_count: [
        'Math',
        'Computer Languages and Programming',
        'Area of Focus',
        'Scientific Computing',
        'Writing Intensive',
      ],
    },
    {
      name: 'Quantitative Studies',
      required_credits: 40,
      min_credits_per_course: 1,
      description:
        'Courses coded Quantitative Studies totaling 40 credits of which at least 18 credits must be in courses ' +
        'numbered 300 or higher. (Courses used to meet the requirements above may be counted toward this total.)',
      criteria: 'Q[A]',
      double_count: [
        'Math',
        'Computer Languages and Programming',
        'Area of Focus',
        'Scientific Computing',
        'Writing Intensive',
      ],
      fine_requirements: [
        {
          description:
            '<b>Upper Level Requirement</b> <br /> At least 18 credits must be in courses numbered 300 or higher.',
          required_credits: 18,
          criteria: 'Upper Level[L]',
        },
      ],
    },
    {
      name: 'Liberal Arts',
      required_credits: 18,
      min_credits_per_course: 3,
      description:
        'These courses must have either an ‘H’ or ‘S’ area designator on them, but can be ' +
        'from any department. At most 2 of these courses may be taken S/U (if not counted towards ' +
        'the writing requirement). Foreign language courses can be counted as well, even if ' +
        'they don’t carry an ‘H’ or ‘S’ designator.',
      criteria:
        'AS Center for Language Education[D]^OR^AS Modern Languages and Literatures[D]^OR^H[A]^OR^S[A]',
      double_count: [
        'Math',
        'Computer Languages and Programming',
        'Area of Focus',
        'Scientific Computing',
        'Writing Intensive',
      ],
    },
    {
      name: 'Writing Intensive',
      required_credits: 6,
      min_credits_per_course: 3,
      description:
        'Students are required to fulfill the university’s requirement of two writing intensive courses, ' +
        'each at least 3 credits. Students must receive at least a C- grade or better in these writing courses. ',
      criteria: 'Written Intensive[W]',
      double_count: ['All'],
      fine_requirements: [
        {
          description:
            '<b>Writing Skills in English</b> <br /> At least one course must be explicitly focused on writing skills in English (eg, courses in professional, ' +
            'fiction or expository writing). These courses may overlap with other requirements.',
          required_credits: 3,
          criteria:
            'AS.060.100[C]^OR^AS.060.113[C]^OR^AS.060.114[C]^OR^AS.180.248[C]^OR^AS.220.105[C]^OR^AS.220.106[C]^OR^AS.220.108[C]^OR^AS.290.303[C]^OR^AS.360.133[C]^OR^EN.661.110[C]^OR^EN.661.111[C]^OR^EN.661.250[C]^OR^EN.661.251[C]^OR^EN.661.315[C]',
        },
      ],
    },
  ],
};

// https://www.cs.jhu.edu/2021undergraduate-advising-manual/
const bsCS: Major = {
  degree_name: 'B.S. Computer Science',
  abbrev: 'B.S. CS',
  department: 'EN Computer Science',
  total_degree_credit: 120,
  wi_credit: 6,
  url: 'https://www.cs.jhu.edu/2021undergraduate-advising-manual/',
  distributions: [
    {
      name: 'Computer Science',
      required_credits: 40,
      min_credits_per_course: 1,
      description:
        "For more information please visit the <a href='https://www.cs.jhu.edu/undergraduate-studies/academics/ugrad-advising-manual/'>" +
        'major degree requirement</a> section on the department website.',
      criteria:
        'EN Computer Science[D]^OR^CSCI-OTHER[T]^OR^Gateway Computing[N]^OR^EN.600.104[C]^OR^EN.601.104[C]^OR^EN.660.400[C]',
      double_count: [
        'Computer Science Classifications',
        'Mathematics',
        'Humanities/Social Sciences',
        'Writing Intensive',
      ],
      fine_requirements: [
        {
          description:
            '<b>Computer Ethics</b> <br /> Select one of the following courses: <br /> ' +
            'EN.601.104 Computer Ethics <br /> ' +
            'EN.601.124 The Ethics of Artificial Intelligence and Automation (The Ethics of Artificial Intelligence and Automation) <br /> ' +
            'EN.660.400 Practical Ethics for Future Leaders',
          required_credits: 1,
          criteria: 'EN.600.104[C]^OR^EN.601.124[C]^OR^EN.660.400[C]',
        },
        {
          description:
            '<b>Lower Level Undergraduate:</b><p>500.112/113/114 Gateway Computing or AP Comp Sci A or ' +
            'equivalent<p>601.220 Intermediate Programming</p><p>601.226 Data Structures</p><p>601.229 ' +
            'Computer System Fundamentals</p><p>601.230 Mathematical Foundations for Computer Science, or 601.231 Automata for those grandfathered into the old major</p><p>601.433 Algorithms</p>',
          required_credits: 21,
          criteria:
            'EN.500.112[C]^OR^EN.500.113[C]^OR^EN.500.114[C]^OR^EN.601.220[C]^OR^EN.601.226[C]' +
            '^OR^EN.601.229[C]^OR^EN.601.230[C]^OR^EN.601.433[C]^OR^EN.601.231[C]',
        },
        {
          description:
            '<b>Upper Level CS Credits</b> <br /> ' +
            'At least 12 more upper level CS credits are required. ',
          required_credits: 12,
          criteria: 'EN Computer Science[D]^AND^Upper Level[L]',
          double_count: [
            '<b>Team Requirement</b> <br /> ' +
              'Select one course with Program of Study Tag CSCI-TEAM.',
          ],
        },
        {
          description:
            '<b>CS Electives</b> <br /> ' +
            'Six additional credits of Computer Science are required.' +
            'For an approved list of courses from other departments (maximum of 6 credits allowed), (1) visit https://www.cs.jhu.edu/computer-science-other-courses-for-bs-degree/ ' +
            ', (2) create a custom course to satisfy this requirement, and (3) list it under the "EN Computer Science" department during creation.',
          required_credits: 6,
          criteria: 'EN Computer Science[D]',
          double_count: [
            '<b>Team Requirement</b> <br /> ' +
              'Select one course with Program of Study Tag CSCI-TEAM.',
          ],
        },
        {
          description:
            '<b>Team Requirement</b> <br /> ' +
            'Select one course with Program of Study Tag CSCI-TEAM.',
          required_credits: 3,
          criteria: 'CSCI-TEAM[T]',
          double_count: [
            '<b>Upper Level CS Credits</b> <br /> ' +
              'At least 12 more upper level CS credits are required. ',
            '<b>CS Electives</b> <br /> ' +
              'Six additional credits of Computer Science are required.' +
              'For an approved list of courses from other departments (maximum of 6 credits allowed), (1) visit https://www.cs.jhu.edu/computer-science-other-courses-for-bs-degree/ ' +
              ', (2) create a custom course to satisfy this requirement, and (3) list it under the "EN Computer Science" department during creation.',
          ],
        },
      ],
    },
    {
      name: 'Computer Science Classifications',
      required_credits: 6,
      min_credits_per_course: 3,
      description:
        'At least one course in two different classification areas (Applications, Reasoning, Software, Systems) must be chosen in addition to Theory (Algorithms).',
      criteria: 'CSCI-APPL[T]^OR^CSCI-SOFT[T]^OR^CSCI-SYST[T]^OR^CSCI-RSNG[T]',
      pathing: 2,
      fine_requirements: [
        {
          description: '<b>Application</b>',
          required_credits: 3,
          criteria: 'CSCI-APPL[T]',
        },
        {
          description: '<b>Software</b>',
          required_credits: 3,
          criteria: 'CSCI-SOFT[T]',
        },
        {
          description: '<b>Systems</b>',
          required_credits: 3,
          criteria: 'CSCI-SYST[T]',
        },
        {
          description: '<b>Reasoning</b>',
          required_credits: 3,
          criteria: 'CSCI-RSNG[T]',
        },
      ],
    },
    {
      name: 'Mathematics',
      required_credits: 8,
      min_credits_per_course: 4,
      description:
        'All courses in this category must be from one of the two math departments on ' +
        'campus: Mathematics or Applied Math and Statistics. However, 553.171 Discrete Mathematics ' +
        'may not count towards these math requirements. Other than Calculus I and II, all the ' +
        'remaining courses must be 200-level or above.',
      criteria: 'AS Mathematics[D]^OR^EN Applied Mathematics & Statistics[D]',
      fine_requirements: [
        {
          description:
            '<b>Calculus I</b> <br /> AS.110.108 Calculus I (Physical Sciences & Engineering)',
          required_credits: 4,
          criteria: 'AS.110.108[C]',
        },
        {
          description:
            '<b>Calculus II</b> <br /> AS.110.109 Calculus II (Physical Sciences & Engineering)',
          required_credits: 4,
          criteria: 'AS.110.109[C]',
        },
      ],
    },
    {
      name: 'Mathematics Electives',
      required_credits: 8,
      min_credits_per_course: 3,
      description:
        '<b>Electives</b> <br /> At least 3 more Math courses must be taken at the 200 or above level, ' +
        'and must include coverage of both Probability and Statistics.',
      criteria:
        '(AS Mathematics[D]^OR^EN Applied Mathematics & Statistics[D])^AND^(200[L]^OR^Upper Level[L])',
      double_count: ['All'],
      pathing: 1,
      fine_requirements: [
        {
          description:
            '<b>Option 1: Probability and Statistics Combined </b> <br />' +
            'Select one of the following: <br />' +
            'EN.553.211 Probability and Statistics for the Life Sciences<br />' +
            'EN.553.310 Probability and Statistics for the Physical Sciences and Engineering<br />' +
            'EN.553.311 Probability and Statistics for the Biological Sciences and Engineering',
          required_credits: 4,
          criteria: 'EN.553.211[C]^OR^EN.553.310[C]^OR^EN.553.311[C]',
        },
        {
          description:
            '<b>Option 2: Probability and Statistics Separate </b> <br />' +
            'EN.553.420 Introduction to Probability<br />' +
            'EN.553.430 Introduction to Statistics<br />',
          required_credits: 8,
          criteria: 'EN.553.420[C]^OR^EN.553.430[C]',
        },
      ],
    },
    {
      name: 'Basic Sciences',
      required_credits: 8,
      min_credits_per_course: 1,
      description:
        'At least two semesters of physics or two semesters of chemistry, with the associated laboratories, must be included.',
      criteria: 'N[A]',
      double_count: ['All'],
    },
    {
      name: 'Humanities/Social Sciences',
      required_credits: 18,
      min_credits_per_course: 3,
      description:
        'These courses must have either an ‘H’ or ‘S’ area designator on them, but can be ' +
        'from any department. At most 2 of these courses may be taken S/U (if not counted towards ' +
        'the writing requirement). Foreign language courses can be counted as well, even if ' +
        'they don’t carry an ‘H’ or ‘S’ designator.',
      criteria:
        'AS Center for Language Education[D]^OR^AS Modern Languages and Literatures[D]^OR^H[A]^OR^S[A]',
      double_count: ['All'],
    },
    {
      name: 'Writing Intensive',
      required_credits: 6,
      min_credits_per_course: 3,
      description:
        'Students are required to fulfill the university’s requirement of two writing intensive courses, ' +
        'each at least 3 credits. Students must receive at least a C- grade or better in these writing courses. ',
      criteria: 'Written Intensive[W]',
      double_count: ['All'],
      fine_requirements: [
        {
          description:
            '<b>Writing-focused WI</b><p>At least one course must be explicitly focused on writing skills in English (eg, courses in professional, ' +
            'fiction or expository writing). These courses may overlap with other requirements.</p><p>Any of the courses below would be satisfactory:</p><p>AS.060.100</p><p>AS.060.113</p><p>AS.060.114</p><p>AS.180.248</p><p>AS.220.105</p><p>AS.220.106</p><p>AS.220.108</p><p>AS.290.303</p><p>AS.360.133</p><p>EN.661.110</p><p>EN.661.111</p><p>EN.661.250</p><p>EN.661.251</p><p>EN.661.315</p>',
          required_credits: 3,
          criteria:
            'EN.661.110[C]^OR^EN.661.111[C]^OR^EN.661.250[C]^OR^EN.661.251[C]^OR^EN.661.315[C]^OR^AS.060.100[C]^OR^AS.060.113[C]^OR^AS.220.105[C]^OR^AS.180.248[C]^OR^AS.290.303[C]^OR^AS.360.133[C]',
        },
      ],
    },
    {
      name: 'Electives',
      required_credits: 38,
      min_credits_per_course: 1,
      description: 'These can be any credit bearing courses taken at JHU.',
      criteria: '',
      double_count: ['Writing Intensive'],
    },
  ],
};

// https://www.cs.jhu.edu/undergraduate-studies/academics/ugrad-advising-manual/
const baCS: Major = {
  degree_name: 'B.A. Computer Science',
  abbrev: 'B.A. CS',
  department: 'EN Computer Science',
  total_degree_credit: 120,
  wi_credit: 12,
  url: 'https://www.cs.jhu.edu/2021undergraduate-advising-manual/',
  distributions: [
    {
      name: 'Computer Science',
      required_credits: 33,
      min_credits_per_course: 1,
      description:
        "For more information please visit the <a href='https://www.cs.jhu.edu/2021undergraduate-advising-manual/'>" +
        'major degree requirement</a> section on the department website.',
      criteria:
        'EN Computer Science[D]^OR^CSCI-OTHER[T]^OR^Gateway Computing[N]^OR^EN.600.104[C]^OR^EN.601.104[C]^OR^EN.660.400[C]',
      double_count: ['All'],
      fine_requirements: [
        {
          description:
            '<b>Computer Ethics(601.104).</b><p>Practical Ethics for Future Leaders (660.400/406) may be used as a substitute for the computer ethics requirement for the BS program, but does not count towards the CS total credits at all.</p>',
          required_credits: 1,
          criteria: 'EN.600.104[C]^OR^EN.601.104[C]^OR^EN.660.400[C]',
        },
        {
          description:
            '<b>Lower Level Undergraduate:</b><p>500.112/113/114 Gateway Computing or AP Comp Sci A or ' +
            'equivalent<p>601.220 Intermediate Programming</p><p>601.226 Data Structures</p><p>601.229 ' +
            'Computer System Fundamentals</p><p>601.230 Mathematical Foundations for Computer Science, or 601.231 Automata for those grandfathered into the old major</p><p>601.433 Algorithms</p>',
          required_credits: 21,
          criteria:
            'EN.500.112[C]^OR^EN.500.113[C]^OR^EN.500.114[C]^OR^EN.601.220[C]^OR^EN.601.226[C]' +
            '^OR^EN.601.229[C]^OR^EN.601.230[C]^OR^EN.601.433[C]^OR^EN.601.231',
        },
        {
          description:
            '<b>Upper Level Undergraduate: </b><p>12 upper level CS credits in addition to the required Algorithms course</p>',
          required_credits: 12,
          criteria:
            'EN Computer Science[D]^AND^Upper Level Undergraduate[L]^NOT^EN.601.433[C]^NOT^EN.601.633[C]',
        },
      ],
    },
    {
      name: 'Math',
      required_credits: 16,
      min_credits_per_course: 3,
      description:
        'All courses in this category must be from one of the two math departments on ' +
        'campus: Mathematics or Applied Math and Statistics. However, 553.171 Discrete Mathematics ' +
        'may not count towards these math requirements. At least one course must be 200-level or above',
      criteria: 'AS Mathematics[D]^OR^EN Applied Mathematics & Statistics[D]',
      double_count: ['All'],
      exception: 'EN.553.171[C]',
      fine_requirements: [
        {
          description:
            '<b>Required Courses:</b><p>110.108 Calculus I or AP equivalent</p>110.109 Calculus II or AP equivalent</p>' +
            '<p>550.171/553.171 Discrete Mathematics if grandfathered into old major</p>',
          required_credits: 8,
          criteria: 'AS.110.108[C]^OR^AS.110.109[C]',
        },
      ],
    },
    {
      name: 'Science',
      required_credits: 8,
      min_credits_per_course: 1,
      description:
        'Students must take two semesters of core science courses (any combination of Physics, ' +
        'Chemistry, Biology), with their associated labs. AP credit is an acceptable substitute for these courses and labs.',
      criteria: 'N[A]',
      double_count: ['All'],
    },
    {
      name: 'Liberal Arts',
      required_credits: 18,
      min_credits_per_course: 3,
      description:
        'These courses must have either an ‘H’ or ‘S’ area designator on them, but can be ' +
        'from any department. At least two of these courses must be at the 300-level or above, and all must be taken for a grade.' +
        'Students are required to demonstrate proficiency at the intermediate level or take at least 6 credits in one foreign language,' +
        'in addition to the six H/S required courses. Students must still have at least six (>=3)-credit courses to fulfill the H/S requirement.',
      criteria:
        'AS Center for Language Education[D]^OR^AS Modern Languages and Literatures[D]^OR^H[A]^OR^S[A]',
      double_count: ['All'],
      fine_requirements: [
        {
          description: '<b>300-level</b><p>Two Courses at 300 Level</p>',
          required_credits: 6,
          criteria: '(H[A]^OR^S[A])^AND^(Upper Level Undergraduate[L])',
          double_count: ['All'],
        },
        {
          description:
            '<b>Foreign Language</b><p>At least 6 credit in one foreign language or proficiency at intermediate level</p>',
          required_credits: 6,
          criteria:
            'AS Center for Language Education[D]^OR^AS Modern Languages and Literatures[D]',
          double_count: ['All'],
        },
      ],
    },
    {
      name: 'Writing Intensive',
      required_credits: 12,
      min_credits_per_course: 3,
      description:
        'Students are required to fulfill the university’s requirement of four writing intensive courses, ' +
        'each at least 3 credits. Students must receive at least a C- grade or better in these writing courses. ',
      criteria: 'Written Intensive[W]',
      double_count: ['All'],
      fine_requirements: [
        {
          description:
            '<b>Writing-focused WI</b><p>At least one course must be explicitly focused on writing skills in English (eg, courses in professional, ' +
            'fiction or expository writing). These courses may overlap with other requirements.</p><p>Any of the courses below would be satisfactory:</p><p>AS.060.100</p><p>AS.060.113</p><p>AS.060.114</p><p>AS.180.248</p><p>AS.220.105</p><p>AS.220.106</p><p>AS.220.108</p><p>AS.290.303</p><p>AS.360.133</p><p>EN.661.110</p><p>EN.661.111</p><p>EN.661.250</p><p>EN.661.251</p><p>EN.661.315</p>',
          required_credits: 3,
          criteria:
            'AS.060.100[C]^OR^AS.060.113[C]^OR^AS.060.114[C]^OR^AS.180.248[C]^OR^AS.220.105[C]^OR^AS.220.106[C]^OR^AS.220.108[C]^OR^AS.290.303[C]^OR^AS.360.133[C]^OR^EN.661.110[C]^OR^EN.661.111[C]^OR^EN.661.250[C]^OR^EN.661.251[C]^OR^EN.661.315[C]',
        },
      ],
    },
  ],
};

// https://www.cs.jhu.edu/undergraduate-studies/academics/cs-minor/
const minorCS: Minor = {
  degree_name: 'Minor Computer Science ',
  abbrev: 'Minor CS',
  department: 'EN Computer Science',
  total_degree_credit: 23,
  wi_credit: 0,
  url: 'https://www.cs.jhu.edu/2021undergraduate-advising-manual/',
  distributions: [
    {
      name: 'Core Courses',
      required_credits: 11,
      min_credits_per_course: 1,
      description:
        "For more information please visit the <a href=' https://www.cs.jhu.edu/undergraduate-studies/academics/cs-minor/'>" +
        'minor degree requirement</a> section on the department website.',
      criteria: 'Gateway Computing[N]^OR^EN.601.220[C]^OR^EN.601.226[C]',
      fine_requirements: [
        {
          description:
            '<b>500.112/113/114 Gateway Computing or AP Comp Sci A or ' +
            'equivalent</b>',
          required_credits: 3,
          criteria: 'EN.500.112[C]^OR^EN.500.113[C]^OR^EN.500.114[C]',
        },
        {
          description: '<b>601.220 Intermediate Programming</b>',
          required_credits: 4,
          criteria: 'EN.601.220[C]',
        },
        {
          description: '<b>601.226 Data Structures</b>',
          required_credits: 4,
          criteria: 'EN.601.226[C]',
        },
      ],
    },
    {
      name: 'Upper-Level Courses',
      required_credits: 9,
      min_credits_per_course: 3,
      pathing: 1,
      description:
        '<b>Upper Level Undergraduate: </b><p>9 upper level CS credits that form a cohesive program of study and <b>must be approved by the computer science minor advisor</b>. One way is to choose all three courses within one or two area tag classifications (CSCI-APPL, CSCI-SOFT, CSCI-THRY, CSCI-RSNG, CSCI-SYST)</p>',
      criteria: 'EN Computer Science[D]^AND^Upper Level Undergraduate[L]',
      fine_requirements: [
        {
          required_credits: 6,
          description: '<b>Software</b>',
          criteria: 'CSCI-SOFT[T]',
          double_count: ['All'],
        },
        {
          required_credits: 6,
          description: '<b>Applications</b>',
          criteria: 'CSCI-APPL[T]',
          double_count: ['All'],
        },
        {
          required_credits: 6,
          description: '<b>Systems</b>',
          criteria: 'CSCI-SYST[T]',
          double_count: ['All'],
        },
        {
          required_credits: 6,
          description: '<b>Reasoning</b>',
          criteria: 'CSCI-RSNG[T]',
          double_count: ['All'],
        },
        {
          required_credits: 6,
          description: '<b>Theory</b>',
          criteria: 'CSCI-THRY[T]',
          double_count: ['All'],
        },
      ],
    },
    {
      name: 'Elective Course',
      required_credits: 3,
      min_credits_per_course: 3,
      description:
        '<b>Elective Course. Any CS course >= 601.200 that is at least three credits</b>',
      criteria:
        'EN Computer Science[D]^AND^(200[L]^OR^Upper Level Undergraduate[L])',
    },
  ],
};

/*
  TODO:
  1. Some of the search features don't work properly (i.e. research courses, General Physics II for bio majors)
  3. Potentially formatting updates
*/
const bsMolCell: Major = {
  degree_name: 'B.S. Molecular and Cellular Biology',
  abbrev: 'B.S. Mol Cell',
  department: 'AS Biology',
  total_degree_credit: 120,
  wi_credit: 12,
  url: 'https://e-catalogue.jhu.edu/arts-sciences/full-time-residential-programs/degree-programs/biology/molecular-cellular-biology-bachelor-science/',
  distributions: [
    {
      name: 'Biology Core',
      required_credits: 19,
      min_credits_per_course: 1,
      description:
        'These are the core biology courses required for the major.' +
        '<br>For more information please visit the degree requirements section on the department website.',
      criteria:
        'AS.020.303[C]^OR^AS.020.340[C]^OR^AS.020.304[C]^OR^AS.020.306[C]^OR^AS.020.316[C]^OR^AS.020.305[C]' +
        '^OR^AS.020.315[C]^OR^AS.250.253[C]^OR^AS.250.254[C]^OR^AS.020.363[C]',
      double_count: [
        'Biology Research Requirement',
        'Writing Intensive',
        'Humanities Distribution Requirement',
        'Social Science Distribution Requirement',
      ],
      fine_requirements: [
        {
          description: '<b>Genetics</b> <br /> AS.020.303 Genetics',
          required_credits: 3,
          criteria: 'AS.020.303[C]',
        },
        {
          description:
            '<b>Developmental Genetics Lab</b> <br /> AS.020.340 Developmental Genetics Lab',
          required_credits: 2,
          criteria: 'AS.020.340[C]',
        },
        {
          description:
            '<b>Molecular Biology</b> <br /> AS.020.304 Molecular Biology',
          required_credits: 3,
          criteria: 'AS.020.304[C]',
        },
        {
          description: '<b>Cell Biology</b> <br /> AS.020.306 Cell Biology',
          required_credits: 3,
          criteria: 'AS.020.306[C]',
        },
        {
          description:
            '<b>Cell Biology Lab</b> <br /> AS.020.316 Cell Biology Lab',
          required_credits: 1,
          criteria: 'AS.020.316[C]',
        },
        {
          description: '<b>Biochemistry</b> <br /> AS.020.305 Biochemistry',
          required_credits: 3,
          criteria: 'AS.020.305[C]',
        },
        {
          description:
            '<b>Biochemistry Lab</b> <br />' +
            'Select one of the following: <br />' +
            'AS.020.315 Biochemistry Project Lab <br />' +
            'AS.250.253 Protein Engineering and Biochemistry Lab <br />' +
            'AS.250.254 Protein Biochemistry and Engineering Lab',
          required_credits: 1,
          criteria: 'AS.020.315[C]^OR^AS.250.253[C]^OR^AS.250.254[C]',
        },
        {
          description:
            '<b>Developmental Biology</b> <br /> AS.020.363 Developmental Biology',
          required_credits: 3,
          criteria: 'AS.020.363[C]',
        },
      ],
    },
    {
      name: 'Chemistry',
      required_credits: 19,
      min_credits_per_course: 1,
      description:
        'Must complete General Chemistry (or AP equivalent) and Organic Chemistry in addition to their respective labs.',
      criteria: 'AS Chemistry[D]',
      double_count: [
        'Biology Research Requirement',
        'Writing Intensive',
        'Humanities Distribution Requirement',
        'Social Science Distribution Requirement',
      ],
      fine_requirements: [
        {
          description:
            '<b>Chemistry I</b> <br /> AS.030.101 Introductory Chemistry I <br /> AS.030.105 Introductory Chemistry Laboratory I</b>',
          required_credits: 4,
          criteria: 'AS.030.101[C]^OR^AS.030.105[C]',
        },
        {
          description:
            '<b>Chemistry II</b> <br /> AS.030.102 Introductory Chemistry II <br /> AS.030.106 Introductory Chemistry Laboratory II <br /> <i>OR</i> <br /> AS.030.103 Applied Chemical Equilibrium and Reactivity w/ lab',
          required_credits: 4,
          criteria: 'AS.030.102[C]^OR^AS.030.106[C]^OR^AS.030.103[C]',
        },
        {
          description:
            '<b>Introductory Organic Chemistry I</b> <br /> AS.030.205 Introductory Organic Chemistry I',
          required_credits: 4,
          criteria: 'AS.030.205[C]',
        },
        {
          description:
            '<b>Organic Chemistry II</b> <br /> AS.030.206 Organic Chemistry II <br /> <i>OR</i> <br /> AS.030.212 Honors Organic Chemistry II with Applications in Biochemistry and Medicine',
          required_credits: 4,
          criteria: 'AS.030.206[C]^OR^AS.030.212[C]',
        },
        {
          description:
            '<b>Organic Chemistry Lab</b> <br />' +
            'AS.030.225 Introductory Organic Chemistry Laboratory <br /> <i>OR</i> </br>' +
            'AS.030.227 Chemical Chirality: An Introduction in Organic Chem. Lab, Techniques',
          required_credits: 3,
          criteria: 'AS.030.225[C]^OR^AS.030.227[C]',
        },
      ],
    },
    {
      name: 'Physics',
      required_credits: 10,
      min_credits_per_course: 1,
      description:
        'Must complete Physics I and II (or AP equivalent) in addition to their respective labs.',
      criteria: 'AS Physics & Astronomy[D]',
      double_count: [
        'Biology Research Requirement',
        'Writing Intensive',
        'Humanities Distribution Requirement',
        'Social Science Distribution Requirement',
      ],
      fine_requirements: [
        {
          description:
            '<b>General Physics I</b> <br />' +
            'Select one of the following: <br />' +
            'AS.171.101 General Physics: Physical Science Majors I <br />' +
            'AS.171.103 General Physics: Biological Science Majors I <br />' +
            'AS.171.107 General Physics for Physical Sciences Majors (AL)',
          required_credits: 4,
          criteria: 'AS.171.101[C]^OR^AS.171.103[C]^OR^AS.171.107[C]',
        },
        {
          description:
            '<b>General Physics II</b> <br />' +
            'Select one of the following: <br />' +
            'AS.171.102 General Physics: Physical Science Majors II <br />' +
            'AS.171.104 General Physics/Biology Majors II <br />' +
            'AS.171.108 General Physics for Physical Science Majors (AL)',
          required_credits: 4,
          criteria: 'AS.171.102[C]^OR^AS.171.104[C]^OR^AS.171.108[C]',
        },
        {
          description:
            '<b>General Physics Laboratory I</b> <br /> AS.173.111 General Physics Laboratory I',
          required_credits: 1,
          criteria: 'AS.173.111[C]',
        },
        {
          description:
            '<b>General Physics Laboratory II</b> <br /> AS.173.112 General Physics Laboratory II',
          required_credits: 1,
          criteria: 'AS.173.112[C]',
        },
      ],
    },
    {
      name: 'Mathematics',
      required_credits: 8,
      min_credits_per_course: 4,
      description: 'Must complete Calculus I and II',
      criteria:
        'AS.110.106[C]^OR^AS.110.108[C]^OR^AS.110.107[C]^OR^AS.110.109[C]^OR^AS.171.113[C]',
      double_count: [
        'Biology Research Requirement',
        'Writing Intensive',
        'Humanities Distribution Requirement',
        'Social Science Distribution Requirement',
      ],
      fine_requirements: [
        {
          description:
            '<b>Calculus I</b> <br />' +
            'AS.110.106 Calculus I (Biology and Social Sciences)' +
            '<br /> <i>OR</i> <br />' +
            'AS.110.108 Calculus I (Physical Sciences and Engineering)',
          required_credits: 4,
          criteria: 'AS.110.106[C]^OR^AS.110.108[C]',
        },
        {
          description:
            '<b>Calculus II</b> <br />' +
            'Select one of the following: <br />' +
            'AS.110.107 Calculus II (Biology and Social Sciences) <br />' +
            'AS.110.109 Calculus II (Physical Sciences and Engineering) <br />' +
            'AS.171.113 Subatomic World',
          required_credits: 4,
          criteria: 'AS.110.107[C]^OR^AS.110.109[C]^OR^AS.171.113[C]',
        },
      ],
    },
    {
      name: 'Electives',
      required_credits: 12,
      min_credits_per_course: 2,
      description:
        '4 courses and 12 credits required. One 2 or 3 credit elective must be taken in the Biology Department (AS.020.xxx). ' +
        'See POS-Tag BIOL-UL on SIS for the courses approved by the Director of Undergraduate Studies.',
      criteria: 'BIOL-UL[T]',
      double_count: [
        'Writing Intensive',
        'Humanities Distribution Requirement',
        'Social Science Distribution Requirement',
      ],
      fine_requirements: [
        {
          description: '<b>Biology Department Course</b>',
          required_credits: 2,
          criteria: 'AS Biology[D]',
        },
      ],
    },
    {
      name: 'Biology Research Requirement',
      required_credits: 6,
      min_credits_per_course: 1,
      description:
        'Students may use AS.020.420 and/or AS.020.451 to fulfill 3 credits (each) of the Research Requirement. ' +
        '<br>The major emphasis of the BS degree in molecular and cellular biology is the participation of the students in an original research project.',
      criteria:
        'AS.020.135[C]^OR^AS.020.136[C]^OR^AS.020.420[C]^OR^AS.020.451[C]^OR^AS.020.503[C]^OR^AS.020.504[C]^OR^AS.020.513[C]^OR^AS.020.514[C]^OR^' +
        'AS.020.572[C]^OR^AS.020.597[C]^OR^AS.030.501[C]^OR^AS.030.502[C]^OR^AS.030.503[C]^OR^AS.030.504[C]^OR^AS.030.505[C]^OR^AS.030.506[C]^OR^' +
        'AS.030.507[C]^OR^AS.030.509[C]^OR^AS.030.510[C]^OR^AS.030.521[C]^OR^AS.030.522[C]^OR^AS.030.523[C]^OR^AS.030.524[C]^OR^AS.030.525[C]^OR^' +
        'AS.030.526[C]^OR^AS.030.570[C]^OR^AS.030.597[C]^OR^AS.250.521[C]^OR^AS.250.522[C]^OR^AS.250.574[C]^OR^AS.250.597[C]',
      double_count: [
        'Biology Core',
        'Writing Intensive',
        'Humanities Distribution Requirement',
        'Social Science Distribution Requirement',
      ],
    },
    {
      name: 'Humanities (H) Distribution',
      required_credits: 9,
      min_credits_per_course: 3,
      description:
        'The distribution requirement stipulates that students must earn a minimum number of credits in academic areas outside of their primary major. ' +
        'The student must complete at least 9 credits in the Humanities (H) area. ' +
        'These credits fulfilling the distribution requirement may overlap with major or minor requirements and the writing-intensive requirement.',
      criteria: 'H[A]',
      double_count: [
        'Biology Core',
        'Chemistry',
        'Physics',
        'Mathematics',
        'Upper Level Electives',
        'Biology Research Requirement',
        'Writing Intensive',
      ],
    },
    {
      name: 'Social Science (S) Distribution',
      required_credits: 9,
      min_credits_per_course: 3,
      description:
        'The distribution requirement stipulates that students must earn a minimum number of credits in academic areas outside of their primary major. ' +
        'The student must complete at least 9 credits in the Social Science (S) area. ' +
        'These credits fulfilling the distribution requirement may overlap with major or minor requirements and the writing-intensive requirement.',
      criteria: 'S[A]',
      double_count: [
        'Biology Core',
        'Chemistry',
        'Physics',
        'Mathematics',
        'Upper Level Electives',
        'Biology Research Requirement',
        'Writing Intensive',
      ],
    },
    {
      name: 'Other (N/E/Q) Distribution',
      required_credits: 9,
      min_credits_per_course: 3,
      description:
        'The distribution requirement stipulates that students must earn a minimum number of credits in academic areas outside of their primary major. ' +
        'The student must complete at least 9 credits in any of the other areas: Natural Sciences (N), Engineering (E) and/or Quantitative (Q). ' +
        'These credits fulfilling the distribution requirement may overlap with major or minor requirements and the writing-intensive requirement.',
      criteria: 'N[A]^OR^E[A]^OR^Q[A]',
      double_count: [
        'Biology Core',
        'Chemistry',
        'Physics',
        'Mathematics',
        'Upper Level Electives',
        'Biology Research Requirement',
        'Writing Intensive',
      ],
    },
    {
      name: 'Writing Intensive',
      required_credits: 12,
      min_credits_per_course: 3,
      description:
        'To encourage excellence in writing, across disciplines, the university requires all undergraduates to take a number of writing-intensive courses. ' +
        'All students earning a degree from the School of Arts and Sciences must complete at least 12 credits in writing-intensive courses. ' +
        'Writing-intensive courses taken to satisfy major, minor, or distribution requirements may also count toward the writing requirement.',
      criteria: 'Written Intensive[W]',
      double_count: ['All'],
    },
    {
      name: 'Honors',
      required_credits: 0,
      min_credits_per_course: 0,
      description:
        'Students earning either a BA in biology or BS in cellular and molecular biology are eligible to receive their degree with honors. ' +
        'The following requirements are in addition to the regular requirements for the degrees. ' +
        '<br>- GPA of 3.5 or higher in N and Q courses. ' +
        '<br>- r6 credits of registered independent research (note that this is already a requirement for the BS degree). ' +
        '<br>- A letter of support from your research supervisor (the PI of the lab)' +
        '<br>- Presentation of your independent research as a seminar or poster presentation',
      criteria: '',
    },
  ],
};

// https://e-catalogue.jhu.edu/engineering/full-time-residential-programs/degree-programs/mechanical-engineering/mechanical-engineering-bachelor-science/#requirementstext
/**
 * Problem 1: Same issue with relative exclusivity
 * Solution: Exclusivity should be relative to distributions and individual fine requirements rather than just be a boolean. Also, when a distribution is satisfied, it should no longer be considered in the exclusivity check.
 */
const bsMechE: Major = {
  degree_name: 'B.S. Mechanical Engineering',
  abbrev: 'B.S. MechE',
  department: 'EN Mechanical Engineering',
  total_degree_credit: 126,
  wi_credit: 6,
  url: 'https://e-catalogue.jhu.edu/engineering/full-time-residential-programs/degree-programs/mechanical-engineering/mechanical-engineering-bachelor-science/#requirementstext',
  distributions: [
    {
      name: 'Mathematics',
      required_credits: 16,
      min_credits_per_course: 4,
      description:
        'The student must complete one of the tracks of mathematics courses, offered ' +
        'either by the Mathematics department in the Kreiger School of Arts and Sciences ' +
        'or the Applied Mathematics and Statistics department in the Whiting School of Engineering.',
      criteria:
        'AS.110.108[C]^OR^AS.110.109[C]^OR^AS.110.113[C]^OR^AS.110.202[C]^OR^EN.553.291[C]^OR^AS.110.201[C]^OR^AS.110.212[C]^OR^AS.110.302[C]',
      pathing: 1,
      fine_requirements: [
        {
          description:
            '<b>4 Math Courses</b> <br />' +
            'Complete all of the following: <br />' +
            'AS.110.108 Calculus I (Physical Sciences & Engineering) <br />' +
            'AS.110.109 Calculus II (Physical Sciences & Engineering) <i>OR</i> AS.110.113 Honors Single Variable Calculus <br />' +
            'AS.110.202 Calculus III <br />' +
            'EN.553.291 Linear Algebra and Differential Equations',
          required_credits: 16,
          criteria:
            'AS.110.108[C]^OR^AS.110.109[C]^OR^AS.110.113[C]^OR^AS.110.202[C]^OR^EN.553.291[C]',
          double_count: ['All'],
        },
        {
          description:
            '<b>5 Math Courses</b> <br />' +
            'Complete all of the following: <br />' +
            'AS.110.108 Calculus I (Physical Sciences & Engineering) <br />' +
            'AS.110.109 Calculus II (Physical Sciences & Engineering) <i>OR</i> AS.110.113 Honors Single Variable Calculus <br />' +
            'AS.110.202 Calculus III <br />' +
            'AS.110.201 Linear Algebra <i>OR</i> AS.110.212 Honors Linear Algebra <br />' +
            'AS.110.302 Differential Equations and Applications',
          required_credits: 20,
          criteria:
            'AS.110.108[C]^OR^AS.110.109[C]^OR^AS.110.113[C]^OR^AS.110.202[C]^OR^AS.110.201[C]^OR^AS.110.212[C]^OR^AS.110.302[C]',
          double_count: ['All'],
        },
      ],
    },
    {
      name: 'Statistics Elective',
      required_credits: 3,
      min_credits_per_course: 3,
      description:
        'Select one of the following statistics courses: <br />' +
        'EN.553.310 Probability & Statistics for the Physical Sciences & Engineering <br />' +
        'EN.553.311 Probability and Statistics for the Biological Sciences and Engineering <br />' +
        'EN.560.348 Probability and Statistics for Civil Engineering',
      criteria: 'EN.553.310[C]^OR^EN.553.311[C]^OR^EN.560.348[C]',
    },
    {
      name: 'Science',
      required_credits: 13,
      min_credits_per_course: 1,
      description:
        'The student must complete all the required science courses.',
      criteria:
        'AS.030.101[C]^OR^EN.171.101[C]^OR^AS.173.111[C]^OR^AS.171.102[C]^OR^AS.173.112[C]',
      fine_requirements: [
        {
          description:
            '<b>Introductory Chemistry I</b> <br /> AS.030.101 Introductory Chemistry I',
          required_credits: 3,
          criteria: 'AS.030.101[C]',
        },
        {
          description:
            '<b>General Physics I</b> <br /> AS.171.101 General Physics: Physical Science Majors I',
          required_credits: 4,
          criteria: 'EN.171.101[C]',
        },
        {
          description:
            '<b>General Physics Laboratory I</b> <br /> AS.173.111 General Physics Laboratory I',
          required_credits: 1,
          criteria: 'AS.173.111[C]',
        },
        {
          description:
            '<b>General Physics II</b> <br /> AS.171.102 General Physics: Physical Science Majors II',
          required_credits: 4,
          criteria: 'AS.171.102[C]',
        },
        {
          description:
            '<b>General Physics Laboratory II</b> <br /> AS.173.112 General Physics Laboratory II',
          required_credits: 1,
          criteria: 'AS.173.112[C]',
        },
      ],
    },
    {
      name: 'Core Engineering',
      required_credits: 50,
      min_credits_per_course: 0.5,
      description: 'The following core courses are required for the major.',
      criteria:
        'EN.530.107[C]^OR^EN.530.108[C]^OR^EN.530.111[C]^OR^EN.530.115[C]^OR^' +
        'EN.500.114[C]^OR^EN.530.116[C]^OR^EN.530.202[C]^OR^EN.530.204[C]^OR^' +
        'EN.530.205[C]^OR^EN.530.212[C]^OR^EN.530.215[C]^OR^EN.530.216[C]^OR^' +
        'EN.530.231[C]^OR^EN.530.232[C]^OR^EN.530.241[C]^OR^EN.520.230[C]^OR^' +
        'EN.520.231[C]^OR^EN.530.254[C]^OR^EN.530.327[C]^OR^EN.530.329[C]^OR^' +
        'EN.530.334[C]^OR^EN.530.335[C]^OR^EN.530.343[C]^OR^EN.530.344[C]^OR^' +
        'EN.530.352[C]^OR^EN.560.201[C]^OR^EN.560.211[C]^OR^EN.660.361[C]^OR^' +
        'EN Computer Science[D]',
      double_count: ['Humanities and Social Sciences', 'Writing Intensive'],
      fine_requirements: [
        {
          description:
            '<b>Mechanical Engineering Undergraduate Seminar I</b> <br /> EN.530.107 Mechanical Engineering Undergraduate Seminar I',
          required_credits: 0.5,
          criteria: 'EN.530.107[C]',
        },
        {
          description:
            '<b>Mechanical Engineering Undergraduate Seminar II</b> <br /> EN.530.108 Mechanical Engineering Undergraduate Seminar II',
          required_credits: 0.5,
          criteria: 'EN.530.108[C]',
        },
        {
          description:
            '<b>Introduction to Mechanical Engineering and CAD</b> <br /> EN.530.111 Introduction to Mechanical Engineering and CAD',
          required_credits: 2,
          criteria: 'EN.530.111[C]',
        },
        {
          description:
            '<b>Gateway Computing: MATLAB</b> <br /> EN.500.114 Gateway Computing: MATLAB',
          required_credits: 3,
          criteria: 'EN.500.114[C]',
        },
        {
          description:
            '<b>Mechanical Engineering Freshman Lab I</b> <br /> EN.530.115 Mechanical Engineering Freshman Lab I',
          required_credits: 1,
          criteria: 'EN.530.115[C]',
        },
        {
          description:
            '<b>Mechanical Engineering Freshman Lab II</b> <br /> EN.530.116 Mechanical Engineering Freshman Lab II',
          required_credits: 1,
          criteria: 'EN.530.116[C]',
        },
        {
          description:
            '<b>Additional Computing Course</b> <br /> One more course from the Computer Science department is required.',
          required_credits: 3,
          criteria: 'EN Computer Science[D]',
        },
        {
          description:
            '<b>Mechanical Engineering Dynamics</b> <br /> EN.530.202 Mechanical Engineering Dynamics',
          required_credits: 3,
          criteria: 'EN.530.202[C]',
        },
        {
          description:
            '<b>Mechanical Engineering Dynamics Lab</b> <br /> EN.530.212 Mechanical Engineering Dynamics Lab',
          required_credits: 1,
          criteria: 'EN.530.212[C]',
        },
        {
          description:
            '<b>Mechanics Based Design</b> <br /> EN.530.215 Mechanics Based Design',
          required_credits: 3,
          criteria: 'EN.530.215[C]',
        },
        {
          description:
            '<b>Mechanics Based Design Lab</b> <br /> EN.530.216 Mechanics Based Design Lab',
          required_credits: 1,
          criteria: 'EN.530.216[C]',
        },
        {
          description:
            '<b>Mechanical Engineering Thermodynamics</b> <br /> EN.530.231 Mechanical Engineering Thermodynamics',
          required_credits: 3,
          criteria: 'EN.530.231[C]',
        },
        {
          description:
            '<b>Mechanical Engineering Thermodynamics Lab</b> <br /> EN.530.232 Mechanical Engineering Thermodynamics Lab',
          required_credits: 1,
          criteria: 'EN.530.232[C]',
        },
        {
          description:
            '<b>Introduction to Fluid Mechanics</b> <br /> EN.530.327 Introduction to Fluid Mechanics',
          required_credits: 3,
          criteria: 'EN.530.327[C]',
        },
        {
          description:
            '<b>Introduction to Fluid Mechanics Lab</b> <br /> EN.530.329 Introduction to Fluid Mechanics Lab',
          required_credits: 1,
          criteria: 'EN.530.329[C]',
        },
        {
          description: '<b>Heat Transfer</b> <br /> EN.530.334 Heat Transfer',
          required_credits: 3,
          criteria: 'EN.530.334[C]',
        },
        {
          description:
            '<b>Heat Transfer Lab</b> <br /> EN.530.335 Heat Transfer Lab',
          required_credits: 1,
          criteria: 'EN.530.335[C]',
        },
        {
          description:
            '<b>Design and Analysis of Dynamical Systems</b> <br /> EN.530.343 Design and Analysis of Dynamical Systems',
          required_credits: 3,
          criteria: 'EN.530.343[C]',
        },
        {
          description:
            '<b>Design and Analysis of Dynamical Systems Lab</b> <br /> EN.530.344 Design and Analysis of Dynamical Systems Lab',
          required_credits: 1,
          criteria: 'EN.530.344[C]',
        },
        {
          description:
            '<b>Materials Selection</b> <br /> EN.530.352 Materials Selection',
          required_credits: 4,
          criteria: 'EN.530.352[C]',
        },
        {
          description:
            '<b>Statics and Mechanics of Materials</b> <br /> EN.560.201 Statics and Mechanics of Materials',
          required_credits: 3,
          criteria: 'EN.560.201[C]',
        },
        {
          description:
            '<b>Statics and Mechanics of Materials Lab</b> <br /> EN.560.211 Statics and Mechanics of Materials Lab',
          required_credits: 1,
          criteria: 'EN.560.211[C]',
        },
        {
          description:
            '<b>Manufacturing Engineering</b> <br /> Select one of the following:' +
            'EN.530.254 Manufacturing Engineering <br /> <i>OR</i> <br />' +
            'EN.530.204 Manufacturing Engineering Theory <i>AND</i> EN.530.205 Manufacturing Engineering Lab',
          required_credits: 3,
          criteria: 'EN.530.254[C]^OR^EN.530.204[C]^OR^EN.530.205[C]',
        },
        {
          description:
            '<b>Electronics</b> <br /> Select one of the following: <br />' +
            'EN.530.241 Electonics & Instrumentation <br /> <i> OR </i> <br />' +
            'EN.520.230 Mastering Electronics <i>AND</i> EN.520.231 Mastering Electronics Lab',
          required_credits: 3,
          criteria: 'EN.530.241[C]^OR^EN.520.230[C]^OR^EN.520.231[C]',
        },
        {
          description:
            '<b>Engineering Management and Leadership</b> <br /> EN.660.361 Engineering Management and Leadership',
          required_credits: 3,
          criteria: 'EN.660.361[C]',
        },
      ],
    },
    {
      name: 'Capstone Design',
      required_credits: 8,
      min_credits_per_course: 4,
      description:
        'The student is required to take part in a capstone design project.',
      criteria: 'EN.530.403[C]^OR^EN.530.404[C]',
      double_count: ['Humanities and Social Sciences', 'Writing Intensive'],
      fine_requirements: [
        {
          description:
            '<b>Mechanical Engineering Senior Design Project I</b> <br /> EN.530.403 Mechanical Engineering Senior Design Project I',
          required_credits: 4,
          criteria: 'EN.530.403[C]',
        },
        {
          description:
            '<b>Mechanical Engineering Senior Design Project II</b> <br /> EN.530.404 Mechanical Engineering Senior Design Project II',
          required_credits: 4,
          criteria: 'EN.530.404[C]',
        },
      ],
    },
    {
      name: 'Mechanical Engineering Electives',
      required_credits: 9,
      min_credits_per_course: 3,
      description:
        'Select three courses (300-level or higher) in mechanical engineering',
      criteria: '(EN Mechanical Engineering[D])^AND^(Upper Level[L])',
      double_count: ['Humanities and Social Sciences', 'Writing Intensive'],
    },
    {
      name: 'Technical Electives',
      required_credits: 9,
      min_credits_per_course: 3,
      description:
        'Select three engineering, quantitative studies, or natural sciences courses at or above the 300-level,' +
        "chosen from any combination of courses in engineering, basic sciences, or mathematics selected in consultation with the student's advisor.",
      criteria: '(N[A]^OR^E[A]^OR^Q[A])^AND^(Upper Level[L])',
      double_count: ['Humanities and Social Sciences', 'Writing Intensive'],
    },
    {
      name: 'Humanities and Social Sciences',
      required_credits: 18,
      min_credits_per_course: 3,
      description:
        'Select courses to form a coherent program, relevant to the student’s goals. One course in which ethical and social ' +
        'issues related to technology or medicine is recommended.',
      criteria: 'H[A]^OR^S[A]',
      double_count: [
        'Core Engineering',
        'Capstone Design',
        'Mechanical Engineering Electives',
        'Technical Electives',
        'Writing Intensive',
      ],
      fine_requirements: [
        {
          description:
            '<b>Writing Intensive Class</b> <br /> Select one Humanities and/or Social Science class that is also Writing Intensive.',
          required_credits: 3,
          criteria: '(H[A]^OR^S[A])^AND^(Written Intensive[W])',
        },
      ],
    },
    {
      name: 'Writing Intensive',
      required_credits: 6,
      min_credits_per_course: 3,
      description:
        'Students are required to fulfill the university’s requirement of two writing intensive courses, ' +
        'each at least 3 credits. Students must receive at least a C- grade or better in these writing courses.',
      criteria: 'Written Intensive[W]',
      double_count: ['All'],
    },
  ],
};

// https://e-catalogue.jhu.edu/engineering/full-time-residential-programs/degree-programs/applied-mathematics-statistics/applied-mathematics-statistics-minor/#requirementstext
// https://engineering.jhu.edu/ams/academics/undergraduate-studies/undergraduate-minor/
const minorAMS: Minor = {
  degree_name: 'Minor Applied Mathematics & Statistics',
  abbrev: 'Minor AMS',
  department: 'EN Applied Mathematics & Statistics',
  total_degree_credit: 18,
  wi_credit: 0,
  url: '',
  distributions: [
    {
      name: 'Total Quantitative Studies(Q) Credits',
      required_credits: 18,
      min_credits_per_course: 3,
      description:
        'Completion of an approved program of study containing at least 18 credits in courses coded Quantitative Studies (Q). The first two courses in calculus (AS.110.106 Calculus I (Biology and Social Sciences) and AS.110.107 Calculus II (For Biological and Social Science)), or (AS.110.108 Calculus I (Physical Sciences & Engineering) and AS.110.109 Calculus II (For Physical Sciences and Engineering)), or AS.110.113 Honors Single Variable Calculus, or their equivalents) may not be used to fulfill this requirement.<br />' +
        '<br /> <em>**Note:</em> Within the entire minor, students may count only two of these three courses/course combinations: EN.553.310/EN.553.311; EN.553.420/620; EN.553.430/630.',
      criteria:
        'Q[A]^NOT^AS.110.106[C]^NOT^AS.110.107[C]^NOT^AS.110.108[C]^NOT^AS.110.109[C]^NOT^AS.110.113[C]',
      double_count: ['All'],
      pathing: 1,
      fine_requirements: [
        {
          required_credits: 18,
          description:
            '**Only EN.553.310 Probability & Statistics for the Physical Sciences & Engineering and EN.553.420 Introduction to Probability count towards minor.',
          criteria:
            'Q[A]^NOT^AS.110.106[C]^NOT^AS.110.107[C]^NOT^AS.110.108[C]^NOT^AS.110.109[C]^NOT^AS.110.113[C]^NOT^EN.553.311[C]^NOT^EN.553.620[C]^NOT^EN.553.430[C]^NOT^EN.553.630[C]',
          double_count: ['All'],
        },
        {
          required_credits: 18,
          description:
            '**Only EN.553.310 Probability & Statistics for the Physical Sciences & Engineering and EN.553.620 Introduction to Probability count towards minor.',
          criteria:
            'Q[A]^NOT^AS.110.106[C]^NOT^AS.110.107[C]^NOT^AS.110.108[C]^NOT^AS.110.109[C]^NOT^AS.110.113[C]^NOT^EN.553.311[C]^NOT^EN.553.420[C]^NOT^EN.553.430[C]^NOT^EN.553.630[C]',
          double_count: ['All'],
        },
        {
          required_credits: 18,
          description:
            '**Only EN.553.311 Probability and Statistics for the Biological Sciences and Engineering and EN.553.420 Introduction to Probability count towards minor.',
          criteria:
            'Q[A]^NOT^AS.110.106[C]^NOT^AS.110.107[C]^NOT^AS.110.108[C]^NOT^AS.110.109[C]^NOT^AS.110.113[C]^NOT^EN.553.310[C]^NOT^EN.553.620[C]^NOT^EN.553.430[C]^NOT^EN.553.630[C]',
          double_count: ['All'],
        },
        {
          required_credits: 18,
          description:
            '**Only EN.553.311 Probability and Statistics for the Biological Sciences and Engineering and EN.553.620 Introduction to Probability count towards minor.',
          criteria:
            'Q[A]^NOT^AS.110.106[C]^NOT^AS.110.107[C]^NOT^AS.110.108[C]^NOT^AS.110.109[C]^NOT^AS.110.113[C]^NOT^EN.553.310[C]^NOT^EN.553.420[C]^NOT^EN.553.430[C]^NOT^EN.553.630[C]',
          double_count: ['All'],
        },
        {
          required_credits: 18,
          description:
            '**Only EN.553.310 Probability & Statistics for the Physical Sciences & Engineering and EN.553.430 Introduction to Statistics count towards minor.',
          criteria:
            'Q[A]^NOT^AS.110.106[C]^NOT^AS.110.107[C]^NOT^AS.110.108[C]^NOT^AS.110.109[C]^NOT^AS.110.113[C]^NOT^EN.553.311[C]^NOT^EN.553.420[C]^NOT^EN.553.620[C]^NOT^EN.553.630[C]',
          double_count: ['All'],
        },
        {
          required_credits: 18,
          description:
            '**Only EN.553.310 Probability & Statistics for the Physical Sciences & Engineering and EN.553.630 Introduction to Statistics count towards minor.',
          criteria:
            'Q[A]^NOT^AS.110.106[C]^NOT^AS.110.107[C]^NOT^AS.110.108[C]^NOT^AS.110.109[C]^NOT^AS.110.113[C]^NOT^EN.553.311[C]^NOT^EN.553.420[C]^NOT^EN.553.620[C]^NOT^EN.553.430[C]',
          double_count: ['All'],
        },
        {
          required_credits: 18,
          description:
            '**Only EN.553.311 Probability and Statistics for the Biological Sciences and Engineering and EN.553.430 Introduction to Statistics count towards minor.',
          criteria:
            'Q[A]^NOT^AS.110.106[C]^NOT^AS.110.107[C]^NOT^AS.110.108[C]^NOT^AS.110.109[C]^NOT^AS.110.113[C]^NOT^EN.553.310[C]^NOT^EN.553.420[C]^NOT^EN.553.620[C]^NOT^EN.553.630[C]',
          double_count: ['All'],
        },
        {
          required_credits: 18,
          description:
            '**Only EN.553.311 Probability and Statistics for the Biological Sciences and Engineering and EN.553.630 Introduction to Statistics count towards minor.',
          criteria:
            'Q[A]^NOT^AS.110.106[C]^NOT^AS.110.107[C]^NOT^AS.110.108[C]^NOT^AS.110.109[C]^NOT^AS.110.113[C]^NOT^EN.553.310[C]^NOT^EN.553.420[C]^NOT^EN.553.620[C]^NOT^EN.553.430[C]',
          double_count: ['All'],
        },
        {
          required_credits: 18,
          description:
            '**Only EN.553.420 Introduction to Probability and EN.553.430 Introduction to Statistics count towards minor.',
          criteria:
            'Q[A]^NOT^AS.110.106[C]^NOT^AS.110.107[C]^NOT^AS.110.108[C]^NOT^AS.110.109[C]^NOT^AS.110.113[C]^NOT^EN.553.310[C]^NOT^EN.553.311[C]^NOT^EN.553.620[C]^NOT^EN.553.630[C]',
          double_count: ['All'],
        },
        {
          required_credits: 18,
          description:
            '**Only EN.553.620 Introduction to Probability and EN.553.630 Introduction to Statistics count towards minor.',
          criteria:
            'Q[A]^NOT^AS.110.106[C]^NOT^AS.110.107[C]^NOT^AS.110.108[C]^NOT^AS.110.109[C]^NOT^AS.110.113[C]^NOT^EN.553.310[C]^NOT^EN.553.311[C]^NOT^EN.553.420[C]^NOT^EN.553.430[C]',
          double_count: ['All'],
        },
        {
          required_credits: 18,
          description:
            '**Only EN.553.620 Introduction to Probability and EN.553.430 Introduction to Statistics count towards minor.',
          criteria:
            'Q[A]^NOT^AS.110.106[C]^NOT^AS.110.107[C]^NOT^AS.110.108[C]^NOT^AS.110.109[C]^NOT^AS.110.113[C]^NOT^EN.553.310[C]^NOT^EN.553.311[C]^NOT^EN.553.420[C]^NOT^EN.553.630[C]',
          double_count: ['All'],
        },
        {
          required_credits: 18,
          description:
            '**Only EN.553.420 Introduction to Probability and EN.553.630 Introduction to Statistics count towards minor.',
          criteria:
            'Q[A]^NOT^AS.110.106[C]^NOT^AS.110.107[C]^NOT^AS.110.108[C]^NOT^AS.110.109[C]^NOT^AS.110.113[C]^NOT^EN.553.310[C]^NOT^EN.553.311[C]^NOT^EN.553.620[C]^NOT^EN.553.430[C]',
          double_count: ['All'],
        },
      ],
    },
    {
      name: 'AMS Courses',
      required_credits: 12,
      min_credits_per_course: 3,
      description:
        'Among the courses comprising the 18 Q credits, there must be at least four courses in the Department of Applied Mathematics and Statistics (each of these must be a 3- or 4-credit course).',
      criteria: 'Q[A]^AND^EN Applied Mathematics & Statistics[D]',
      double_count: ['All'],
      pathing: 1,
      fine_requirements: [
        {
          required_credits: 12,
          description:
            '**Only EN.553.310 Probability & Statistics for the Physical Sciences & Engineering and EN.553.420 Introduction to Probability count towards minor.',
          criteria:
            'Q[A]^AND^EN Applied Mathematics & Statistics[D]^NOT^EN.553.311[C]^NOT^EN.553.620[C]^NOT^EN.553.430[C]^NOT^EN.553.630[C]',
          double_count: ['All'],
        },
        {
          required_credits: 12,
          description:
            '**Only EN.553.310 Probability & Statistics for the Physical Sciences & Engineering and EN.553.620 Introduction to Probability count towards minor.',
          criteria:
            'Q[A]^AND^EN Applied Mathematics & Statistics[D]^NOT^EN.553.311[C]^NOT^EN.553.420[C]^NOT^EN.553.430[C]^NOT^EN.553.630[C]',
          double_count: ['All'],
        },
        {
          required_credits: 12,
          description:
            '**Only EN.553.311 Probability and Statistics for the Biological Sciences and Engineering and EN.553.420 Introduction to Probability count towards minor.',
          criteria:
            'Q[A]^AND^EN Applied Mathematics & Statistics[D]^NOT^AS.110.113[C]^NOT^EN.553.310[C]^NOT^EN.553.620[C]^NOT^EN.553.430[C]^NOT^EN.553.630[C]',
          double_count: ['All'],
        },
        {
          required_credits: 12,
          description:
            '**Only EN.553.311 Probability and Statistics for the Biological Sciences and Engineering and EN.553.620 Introduction to Probability count towards minor.',
          criteria:
            'Q[A]^AND^EN Applied Mathematics & Statistics[D]^NOT^EN.553.310[C]^NOT^EN.553.420[C]^NOT^EN.553.430[C]^NOT^EN.553.630[C]',
          double_count: ['All'],
        },
        {
          required_credits: 12,
          description:
            '**Only EN.553.310 Probability & Statistics for the Physical Sciences & Engineering and EN.553.430 Introduction to Statistics count towards minor.',
          criteria:
            'Q[A]^AND^EN Applied Mathematics & Statistics[D]^NOT^EN.553.311[C]^NOT^EN.553.420[C]^NOT^EN.553.620[C]^NOT^EN.553.630[C]',
          double_count: ['All'],
        },
        {
          required_credits: 12,
          description:
            '**Only EN.553.310 Probability & Statistics for the Physical Sciences & Engineering and EN.553.630 Introduction to Statistics count towards minor.',
          criteria:
            'Q[A]^AND^EN Applied Mathematics & Statistics[D]^NOT^EN.553.311[C]^NOT^EN.553.420[C]^NOT^EN.553.620[C]^NOT^EN.553.430[C]',
          double_count: ['All'],
        },
        {
          required_credits: 12,
          description:
            '**Only EN.553.311 Probability and Statistics for the Biological Sciences and Engineering and EN.553.430 Introduction to Statistics count towards minor.',
          criteria:
            'Q[A]^AND^EN Applied Mathematics & Statistics[D]^NOT^EN.553.310[C]^NOT^EN.553.420[C]^NOT^EN.553.620[C]^NOT^EN.553.630[C]',
          double_count: ['All'],
        },
        {
          required_credits: 12,
          description:
            '**Only EN.553.311 Probability and Statistics for the Biological Sciences and Engineering and EN.553.630 Introduction to Statistics count towards minor.',
          criteria:
            'Q[A]^AND^EN Applied Mathematics & Statistics[D]^NOT^EN.553.310[C]^NOT^EN.553.420[C]^NOT^EN.553.620[C]^NOT^EN.553.430[C]',
          double_count: ['All'],
        },
        {
          required_credits: 12,
          description:
            '**Only EN.553.420 Introduction to Probability and EN.553.430 Introduction to Statistics count towards minor.',
          criteria:
            'Q[A]^AND^EN Applied Mathematics & Statistics[D]^NOT^EN.553.310[C]^NOT^EN.553.311[C]^NOT^EN.553.620[C]^NOT^EN.553.630[C]',
          double_count: ['All'],
        },
        {
          required_credits: 12,
          description:
            '**Only EN.553.620 Introduction to Probability and EN.553.630 Introduction to Statistics count towards minor.',
          criteria:
            'Q[A]^AND^EN Applied Mathematics & Statistics[D]^NOT^EN.553.310[C]^NOT^EN.553.311[C]^NOT^EN.553.420[C]^NOT^EN.553.430[C]',
          double_count: ['All'],
        },
        {
          required_credits: 12,
          description:
            '**Only EN.553.620 Introduction to Probability and EN.553.430 Introduction to Statistics count towards minor.',
          criteria:
            'Q[A]^AND^EN Applied Mathematics & Statistics[D]^NOT^EN.553.310[C]^NOT^EN.553.311[C]^NOT^EN.553.420[C]^NOT^EN.553.630[C]',
          double_count: ['All'],
        },
        {
          required_credits: 12,
          description:
            '**Only EN.553.420 Introduction to Probability and EN.553.630 Introduction to Statistics count towards minor.',
          criteria:
            'Q[A]^AND^EN Applied Mathematics & Statistics[D]^NOT^EN.553.310[C]^NOT^EN.553.311[C]^NOT^EN.553.620[C]^NOT^EN.553.430[C]',
          double_count: ['All'],
        },
      ],
    },
    {
      name: 'Upper-Level Courses',
      required_credits: 9,
      min_credits_per_course: 3,
      description:
        'Among the courses comprising the 18 Q credits, there must be at least three (3- or 4-credit) courses at the 300-level or above, ' +
        'of which at least two must be in the Department of Applied Mathematics and Statistics**.<br />' +
        '</br /> **A student may count the combination of (AS.110.201 Linear Algebra or AS.110.212 Honors Linear Algebra) AND AS.110.302 Differential Equations and Applications in place of ONE of the required 300-level courses within the AMS Department',
      criteria: 'Q[A]^AND^(300[L]^OR^400[L])',
      double_count: ['All'],
      pathing: 1,
      fine_requirements: [
        {
          required_credits: 6,
          description:
            '<b>AMS Courses:</b> <br />At least two upper-level courses must be in the Department of Applied Mathematics and Statistics.**',
          criteria:
            '(300[L]^OR^400[L])^AND^EN Applied Mathematics & Statistics[D]',
          double_count: ['All'],
        },
        {
          required_credits: 9,
          description:
            '<b>**Alternate Route:</b> <br />One upper-level course from the Department of Applied Mathematics and Statistics, and (AS.110.201 Linear Algebra AND AS.110.302 Differential Equations and Applications).',
          criteria:
            '((300[L]^OR^400[L])^AND^EN Applied Mathematics & Statistics[D])^OR^AS.110.201[C]^OR^AS.110.302[C]',
          double_count: ['All'],
        },
        {
          required_credits: 9,
          description:
            '<b>**Alternate Route:</b> <br />One upper-level course from the Department of Applied Mathematics and Statistics, and (AS.110.212 Honors Linear Algebra AND AS.110.302 Differential Equations and Applications).',
          criteria:
            '((300[L]^OR^400[L])^AND^EN Applied Mathematics & Statistics[D])^OR^AS.110.212[C]^OR^AS.110.302[C]',
          double_count: ['All'],
        },
      ],
    },
    {
      name: 'Scientific Computer Course',
      required_credits: 3,
      min_credits_per_course: 3,
      description:
        'Among the courses comprising the 18 Q credits, there must be ' +
        'an approved semester course in scientific computing, chosen from 110.445, 553.385, 553.400, 553.413, 553.432, 553.433, 553.436, 553.450, 553.463, 553.467, 553.481, 553.488, 553.493, 553.494, 601.433, 601.475, 601.482 or one of the courses approved to meet the AMS Master’s/PhD Computing Requirement.',
      criteria:
        'AS.110.445[C]^OR^EN.553.385[C]^OR^EN.553.400[C]^OR^EN.553.413[C]^OR^EN.553.432[C]^OR^EN.553.433[C]^OR^EN.553.436[C]^OR^EN.553.450[C]^OR^EN.553.463[C]^OR^EN.553.467[C]^OR^EN.553.481[C]^OR^EN.553.488[C]^OR^EN.553.493[C]^OR^EN.553.494[C]^OR^EN.601.433[C]^OR^EN.601.475[C]^OR^EN.601.482[C]',
      double_count: ['All'],
      fine_requirements: [
        {
          required_credits: 3,
          description:
            '<b>Scientific Computer Course:</b> <br /> The student must take an approved course based on a high-level computer language chosen from the list below or one of the courses approved to meet the AMS Master’s/PhD Computing Requirement.<br />' +
            '<br /> AS.110.445, ' +
            '<br /> EN.553.385, ' +
            '<br /> EN.553.400, ' +
            '<br /> EN.553.413, ' +
            '<br /> EN.553.432, ' +
            '<br /> EN.553.433, ' +
            '<br /> EN.553.436, ' +
            '<br /> EN.553.450, ' +
            '<br /> EN.553.463, ' +
            '<br /> EN.553.467, ' +
            '<br /> EN.553.481, ' +
            '<br /> EN.553.488, ' +
            '<br /> EN.553.493, ' +
            '<br /> EN.553.494, ' +
            '<br /> EN.601.433, ' +
            '<br /> EN.601.475, ' +
            '<br /> EN.601.482 <br />',
          criteria:
            'AS.110.445[C]^OR^EN.553.385[C]^OR^EN.553.400[C]^OR^EN.553.413[C]^OR^EN.553.432[C]^OR^EN.553.433[C]^OR^EN.553.436[C]^OR^EN.553.450[C]^OR^EN.553.463[C]^OR^EN.553.467[C]^OR^EN.553.481[C]^OR^EN.553.488[C]^OR^EN.553.493[C]^OR^EN.553.494[C]^OR^EN.601.433[C]^OR^EN.601.475[C]^OR^EN.601.482[C]',
        },
      ],
    },
  ],
};

const bsNeuro: Major = {
  degree_name: 'B.S. Neuroscience',
  abbrev: 'B.S. Neuro',
  department: 'AS Neuroscience',
  total_degree_credit: 120,
  wi_credit: 12,
  url: 'https://e-catalogue.jhu.edu/arts-sciences/full-time-residential-programs/degree-programs/neuroscience/neuroscience-bachelor-science/',
  distributions: [
    {
      name: 'Neuroscience Sequence',
      required_credits: 12,
      min_credits_per_course: 3,
      description:
        'These are core neuroscience courses required for the major. ' +
        'For more information please visit the ' +
        "<a href='https://krieger.jhu.edu/neuroscience/bs-program/requirements/'>" +
        'major degree requirement</a> section on the department website.',
      criteria:
        'AS.050.203[C]^OR^AS.080.250[C]^OR^AS.080.305[C]^OR^AS.080.306[C]',
      double_count: [
        'Humanities (H) Distribution',
        'Social Sciences (S) Distribution',
        'Other (N/E/Q) Distribution',
        'Writing Intensive',
      ],
      fine_requirements: [
        {
          description:
            '<b>Neuroscience: Cognitive</b> <br /> AS.050.203 Neuroscience: Cognitive',
          required_credits: 3,
          criteria: 'AS.050.203[C]',
        },
        {
          description:
            '<b>Neuroscience Laboratory</b> <br /> AS.080.250 Neuroscience Laboratory',
          required_credits: 3,
          criteria: 'AS.080.250[C]',
        },
        {
          description:
            '<b>Neuroscience: Cellular and Systems I</b> <br /> AS.080.305 Neuroscience: Cellular and Systems I',
          required_credits: 3,
          criteria: 'AS.080.305[C]',
        },
        {
          description:
            '<b>Neuroscience: Cellular and Systems II</b> <br /> AS.080.306 Neuroscience: Cellular and Systems II',
          required_credits: 3,
          criteria: 'AS.080.306[C]',
        },
      ],
    },
    {
      name: 'Mathematics, Statistics, and Science Courses',
      required_credits: 34,
      min_credits_per_course: 1,
      description:
        'Must complete Calculus I, Calculus II, Probability & Statistics, Chemistry I & II, Organic Chemistry I, and General Physics I & II with their respective labs.',
      criteria:
        'EN.553.211[C]^OR^EN.553.310[C]^OR^EN.553.311[C]^OR^EN.553.111[C]^OR^EN.553.112[C]^OR^AS.110.106[C]^OR^AS.110.108[C]^OR^AS.110.107[C]^OR^AS.110.109[C]^OR^AS.171.113[C]^OR^' +
        'AS.030.101[C]^OR^AS.030.102[C]^OR^AS.030.103[C]^OR^AS.030.105[C]^OR^AS.030.106[C]^OR^AS.030.305[C]^OR^' +
        'AS.171.101[C]^OR^AS.171.103[C]^OR^AS.171.107[C]^OR^AS.171.102[C]^OR^AS.171.104[C]^OR^AS.171.108[C]^OR^AS.173.111[C]^OR^AS.173.112[C]',
      double_count: [
        'Humanities (H) Distribution',
        'Social Sciences (S) Distribution',
        'Other (N/E/Q) Distribution',
        'Writing Intensive',
      ],
      fine_requirements: [
        {
          description:
            '<b>Probability and Statistics</b> <br />' +
            'Select one of the following: <br />' +
            'EN.553.211 ProbStat for Life Sciences <br />' +
            'EN.553.310 ProbStat for Physical Sciences <br />' +
            'EN.553.311 ProbStat for Biological Sciences <br />' +
            'EN.553.111 and EN.553.112 Statistical Analysis I and II',
          required_credits: 4,
          criteria:
            'EN.553.211[C]^OR^EN.553.310[C]^OR^EN.553.311[C]^OR^EN.553.111[C]^OR^EN.553.112[C]',
        },
        {
          description:
            '<b>Calculus I</b> <br />' +
            'AS.110.106 Calculus I (Biology and Social Sciences)' +
            '<br /> <i>OR</i> <br />' +
            'AS.110.108 Calculus I (Physical Sciences and Engineering)',
          required_credits: 4,
          criteria: 'AS.110.106[C]^OR^AS.110.108[C]',
        },
        {
          description:
            '<b>Calculus II</b> <br />' +
            'Select one of the following: <br />' +
            'AS.110.107 Calculus II (Biology and Social Sciences) <br />' +
            'AS.110.109 Calculus II (Physical Sciences and Engineering) <br />' +
            'AS.171.113 Subatomic World',
          required_credits: 4,
          criteria: 'AS.110.107[C]^OR^AS.110.109[C]^OR^AS.171.113[C]',
        },
        {
          description:
            '<b>Introductory Chemistry I</b> <br /> AS.030.101 Introductory Chemistry I',
          required_credits: 3,
          criteria: 'AS.030.101[C]',
        },
        {
          description:
            '<b>Introductory Chemistry Lab I</b> <br />AS.030.105 Introductory Chemistry Laboratory I',
          required_credits: 1,
          criteria: 'AS.030.105[C]',
        },
        {
          description:
            '<b>Introductory Chemistry II</b> <br />AS.030.102 Introductory Chemistry II',
          required_credits: 3,
          criteria: 'AS.030.102[C]',
        },
        {
          description:
            '<b>Introductory Chemistry Lab II</b> <br />AS.030.106 Introductory Chemistry Laboratory II <br /> <i>OR</i> <br />AS.030.103 Applied Chemical Equilibrium and Reactivity lab',
          required_credits: 1,
          criteria: 'AS.030.106[C]^OR^AS.030.103[C]',
        },
        {
          description:
            '<b>Organic Chemistry I</b> <br /> AS.030.205 Introductory Organic Chemistry I',
          required_credits: 4,
          criteria: 'AS.030.205[C]',
        },
        {
          description:
            '<b>Physics I</b> <br />' +
            'Select one of the following: <br />' +
            'AS.171.101 General Physics: Physical Science Majors I <br />' +
            'AS.171.103 General Physics: Biological Science Majors I <br />' +
            'AS.171.107 General Physics for Physical Sciences Majors (AL)',
          required_credits: 4,
          criteria: 'AS.171.101[C]^OR^AS.171.103[C]^OR^AS.171.107[C]',
        },
        {
          description:
            '<b>Physics Laboratory I</b> <br /> AS.173.111 General Physics Laboratory I',
          required_credits: 1,
          criteria: 'AS.173.111[C]',
        },
        {
          description:
            '<b>Physics II</b> <br />' +
            'Select one of the following: <br />' +
            'AS.171.102 General Physics: Physical Science Majors II <br />' +
            'AS.171.104 General Physics/Biology Majors II <br />' +
            'AS.171.108 General Physics for Physical Science Majors (AL)',
          required_credits: 4,
          criteria: 'AS.171.102[C]^OR^AS.171.104[C]^OR^AS.171.108[C]',
        },
        {
          description:
            '<b>Physics Laboratory II</b> <br /> AS.173.112 General Physics Laboratory II',
          required_credits: 1,
          criteria: 'AS.173.112[C]',
        },
      ],
    },
    {
      name: 'Biology Sequence',
      required_credits: 4,
      min_credits_per_course: 1,
      pathing: 1,
      description:
        'Select one biology course with lab of the following. Exam credit not applicable. For more detail please visit ' +
        'https://krieger.jhu.edu/neuroscience/bs-program/requirements/',
      criteria:
        'AS.020.151[C]^OR^AS.020.153[C]^OR^AS.020.152[C]^OR^AS.020.154[C]^OR^' +
        'AS.020.305[C]^OR^AS.020.315[C]^OR^AS.250.253[C]^OR^AS.250.254[C]^OR^' +
        'AS.020.303[C]^OR^AS.020.306[C]^OR^AS.020.316[C]^OR^' +
        'AS.020.374[C]^OR^AS.020.377[C]',
      double_count: [
        'Humanities (H) Distribution',
        'Social Sciences (S) Distribution',
        'Other (N/E/Q) Distribution',
        'Writing Intensive',
      ],
      fine_requirements: [
        {
          required_credits: 4,
          description:
            '<b>General Biology I with lab</b> <br /> AS.020.151 General Biology I<br /> AS.020.153 General Biology Laboratory I',
          criteria: 'AS.020.151[C]^OR^AS.020.153[C]',
        },
        {
          required_credits: 4,
          description:
            '<b>General Biology II with lab</b> <br /> AS.020.152 General Biology II<br /> AS.020.154 General Biology Lab II',
          criteria: 'AS.020.152[C]^OR^AS.020.154[C]',
        },
        {
          required_credits: 4,
          description:
            '<b>Genetics with lab</b> <br /> AS.020.303 Genetics<br /><i>AND</i> <br />AS.250.253 Protein Engineering and Biochemistry Lab<br /><i>OR</i> <br />AS.020.315 Biochemistry Project lab',
          criteria: 'AS.020.303[C]^OR^AS.250.253[C]^OR^AS.020.315[C]',
        },
        {
          required_credits: 4,
          description:
            '<b>Biochemistry with lab</b> <br />AS.020.305 Biochemistry<br /> <i>AND</i> <br />Select one of the following:' +
            '<br />AS.020.315 Biochemistry Project lab <br />AS.250.253 Protein Engineering and Biochemistry Lab ' +
            '<br />AS.250.254 Protein Biochemistry and Engineering Laboratory',
          criteria:
            'AS.020.305[C]^OR^AS.020.315[C]^OR^AS.250.253[C]^OR^AS.250.254[C]',
        },
        {
          required_credits: 5,
          description:
            '<b>Cell Biology with lab</b> <br />AS.020.306 Cell Biology <br />AS.020.316 Cell Biology Lab',
          criteria: 'AS.020.306[C]^OR^AS.020.316[C]',
        },
        {
          required_credits: 4,
          description:
            '<b>Comparative Physiology with lab</b> <br />AS.020.374 Comparative Physiology <br />AS.020.377 Comparative Physiology Lab',
          criteria: 'AS.020.374[C]^OR^AS.020.377[C]',
        },
      ],
    },
    {
      name: 'Focus Area',
      required_credits: 9,
      min_credits_per_course: 1,
      pathing: 1,
      description:
        'Nine credits of 300-level or higher approved courses from one of four focus areas: Systems Neuroscience, ' +
        'Cognitive Neuroscience, Computational Neuroscience, or Cellular and Molecular Neuroscience',
      criteria:
        '(NEUR-ST[T]^OR^NEUR-CG[T]^OR^NEUR-CP[T]^OR^NEUR-CM[T])^AND^Upper Level[L]',
      double_count: [
        'Humanities (H) Distribution',
        'Social Sciences (S) Distribution',
        'Other (N/E/Q) Distribution',
        'Writing Intensive',
      ],
      fine_requirements: [
        {
          required_credits: 9,
          description: '<b>Systems Neuroscience (ST)</b> <br /> ',
          criteria: 'NEUR-ST[T]',
          double_count: ['All'],
        },
        {
          required_credits: 9,
          description: '<b>Cognitive Neuroscience (CG)</b> <br /> ',
          criteria: 'NEUR-CG[T]',
          double_count: ['All'],
        },
        {
          required_credits: 9,
          description:
            '<b>Computational Neuroscience (CP)</b> <br /> ' +
            'EN.553.291 (or AS.110.201 and AS.110.302) is required in addition to the credits required of the focus area.',
          criteria: 'NEUR-CP[T]',
          double_count: ['All'],
        },
        {
          required_credits: 9,
          description:
            '<b>Cellular and Molecular Neuroscience (CM)</b> <br /> ' +
            'AS.020.306 and AS.020.316 must be selected as the required biology course with lab.',
          criteria: 'NEUR-CM[T]',
          double_count: ['All'],
        },
      ],
    },
    {
      name: 'Elective Course',
      required_credits: 3,
      min_credits_per_course: 3,
      description:
        'Three credits of 300-level or higher approved course outside of selected focus area',
      criteria:
        '(NEUR-ST[T]^OR^NEUR-CG[T]^OR^NEUR-CP[T]^OR^NEUR-CM[T])^AND^Upper Level[L]',
      double_count: [
        'Humanities (H) Distribution',
        'Social Sciences (S) Distribution',
        'Other (N/E/Q) Distribution',
        'Writing Intensive',
      ],
    },
    {
      name: 'Research',
      required_credits: 7,
      min_credits_per_course: 0.5,
      description:
        'Six credits of neuroscience research, obtained through work in one of the neuroscience laboratories ' +
        'participating in the program. One credit of Scientific Communication across two semesters. Read more about <a href="https://krieger.jhu.edu/neuroscience/research/research-credit-requirements/">' +
        'research credit requirements</a>.',
      criteria: 'AS.080.500[C]^OR^AS.080.541[C]',
      fine_requirements: [
        {
          required_credits: 6,
          description:
            '<b>Neuroscience Research</b> <br /> Six credits of AS.080.541 Research Neuroscience - Neuroscience Majors.',
          criteria: 'AS.080.541[C]',
        },
        {
          required_credits: 1,
          description:
            '<b>Scientific Communication</b> <br /> Two semesters of AS.080.541 Scientific Communication: Neuroscience.',
          criteria: 'AS.080.500[C]',
        },
      ],
    },
    {
      name: 'Humanities (H) Distribution',
      required_credits: 9,
      min_credits_per_course: 3,
      description:
        'The distribution requirement stipulates that students must earn a minimum number of credits in academic areas outside of their primary major. ' +
        'The student must complete at least 9 credits in the Humanities (H) area. ' +
        'These credits fulfilling the distribution requirement may overlap with major or minor requirements and the writing-intensive requirement.',
      criteria: 'H[A]',
      double_count: [
        'Neuroscience Sequence',
        'Mathematics, Statistics, and Science Courses',
        'Biology Sequence',
        'Focus Area',
        'Elective Course',
      ],
    },
    {
      name: 'Social Science (S) Distribution',
      required_credits: 9,
      min_credits_per_course: 3,
      description:
        'The distribution requirement stipulates that students must earn a minimum number of credits in academic areas outside of their primary major. ' +
        'The student must complete at least 9 credits in the Social Science (S) area. ' +
        'These credits fulfilling the distribution requirement may overlap with major or minor requirements and the writing-intensive requirement.',
      criteria: 'S[A]',
      double_count: [
        'Neuroscience Sequence',
        'Mathematics, Statistics, and Science Courses',
        'Biology Sequence',
        'Focus Area',
        'Elective Course',
      ],
    },
    {
      name: 'Other (N/E/Q) Distribution',
      required_credits: 9,
      min_credits_per_course: 3,
      description:
        'The distribution requirement stipulates that students must earn a minimum number of credits in academic areas outside of their primary major. ' +
        'The student must complete at least 9 credits in any of the other areas: Natural Sciences (N), Engineering (E) and/or Quantitative (Q). ' +
        'These credits fulfilling the distribution requirement may overlap with major or minor requirements and the writing-intensive requirement.',
      criteria: 'N[A]^OR^E[A]^OR^Q[A]',
      double_count: [
        'Neuroscience Sequence',
        'Mathematics, Statistics, and Science Courses',
        'Biology Sequence',
        'Focus Area',
        'Elective Course',
      ],
    },
    {
      name: 'Writing Intensive',
      required_credits: 12,
      min_credits_per_course: 3,
      description:
        'To encourage excellence in writing, across disciplines, the university requires all undergraduates to take a number of writing-intensive courses. ' +
        'All students earning a degree from the School of Arts and Sciences must complete at least 12 credits in writing-intensive courses. ' +
        'Writing-intensive courses taken to satisfy major, minor, or distribution requirements may also count toward the writing requirement.',
      criteria: 'Written Intensive[W]',
      double_count: ['All'],
    },
  ],
};

// https://e-catalogue.jhu.edu/arts-sciences/full-time-residential-programs/degree-programs/economics/economics-minor/
// https://econ.jhu.edu/undergraduate/minor-requirements/

const minorEcon: Minor = {
  degree_name: 'Minor Economics',
  abbrev: 'Minor Econ',
  department: 'AS Economics',
  total_degree_credit: 18,
  url: 'https://e-catalogue.jhu.edu/arts-sciences/full-time-residential-programs/degree-programs/economics/economics-minor/',
  wi_credit: 0,
  distributions: [
    {
      name: 'Core Courses',
      required_credits: 6,
      min_credits_per_course: 3,
      description:
        'Students must take 180.101 Elements of Macroeconomics and 180.102 Elements of Microeconomics.**<br />' +
        '<br />**Students who use exam credits to satisfy the AS.180.101 Elements of Macroeconomics and/or AS.180.102 Elements of Microeconomics requirements must take additional courses in the department to reach a total of 6 courses.',
      criteria: 'AS.180.101[C]^OR^AS.180.102[C]',
      fine_requirements: [
        {
          required_credits: 3,
          description: '<b>AS.180.101</b> <br />Elements of Macroeconomics**',
          criteria: 'AS.180.101[C]',
        },
        {
          required_credits: 3,
          description: '<b>AS.180.102</b> <br />Elements of Microeconomics**',
          criteria: 'AS.180.102[C]',
        },
        {
          required_credits: 1,
          description:
            '<b>**PLEASE NOTE:</b> <br />Students who use exam credits to satisfy the AS.180.101 Elements of Macroeconomics and/or AS.180.102 Elements of Microeconomics requirements must take additional courses in the department to reach a total of 6 courses!',
          criteria: 'asdalhsdkjf[N]',
        },
      ],
    },
    {
      name: 'Elective Courses',
      required_credits: 12,
      min_credits_per_course: 3,
      description:
        'Students must take four other economics courses at the 200- or 300-level.',
      criteria: 'AS Economics[D]^AND^(200[L]^OR^300[L])^NOT^AS.180.203[C]',
    },
  ],
};

// https://e-catalogue.jhu.edu/arts-sciences/full-time-residential-programs/degree-programs/physics-astronomy/physics-minor/
// https://physics-astronomy.jhu.edu/undergraduate/minors/
const minorPhysics: Minor = {
  degree_name: 'Minor Physics',
  abbrev: 'Physics Minor',
  department: 'AS Physics & Astronomy',
  total_degree_credit: 13,
  url: 'https://physics-astronomy.jhu.edu/undergraduate/minors/',
  wi_credit: 0,
  distributions: [
    // NOTE: not sure if students need introductory physics sequence? (according to https://physics-astronomy.jhu.edu/undergraduate/minors/)
    // "A student may earn a minor in physics by completing one of the introductory physics sequences (171.101-102, 171.103-104, or 171.105-106 and associated lab)"
    // degree audit doesn't mention it and neither does e-catalogue
    {
      name: 'Contemporary Physics Seminar',
      required_credits: 1,
      min_credits_per_course: 1,
      description:
        'The student must take AS.172.203 Contemporary Physics Seminar.',
      criteria: 'AS.172.203[C]',
    },
    {
      name: '200-Level (or above) Courses',
      required_credits: 12,
      min_credits_per_course: 3,
      description:
        'The student must complete four (4) courses (at least 3 credits each) at the 200-level or above.',
      criteria:
        'AS Physics & Astronomy[D]^AND^(200[L]^OR^300[L]^OR^400[L]^OR^500[L])^NOT^AS.172.203[C]',
    },
  ],
};

// https://mathematics.jhu.edu/undergraduate/minor-in-mathematics/
// https://e-catalogue.jhu.edu/arts-sciences/full-time-residential-programs/degree-programs/mathematics/mathematics-minor/
const minorMath: Minor = {
  degree_name: 'Minor Mathematics',
  abbrev: 'Minor Math',
  department: 'AS Mathematics',
  total_degree_credit: 28,
  url: 'https://e-catalogue.jhu.edu/arts-sciences/full-time-residential-programs/degree-programs/mathematics/mathematics-minor/',
  wi_credit: 0,
  distributions: [
    {
      name: 'Calculus Courses',
      required_credits: 12,
      min_credits_per_course: 4,
      description: 'Students must take Calculus I, II, and III.',
      criteria:
        'AS.110.106[C]^OR^AS.110.108[C]^OR^AS.110.107[C]^OR^AS.110.109[C]^OR^AS.110.113[C]^OR^AS.110.202[C]',
      fine_requirements: [
        {
          required_credits: 4,
          description:
            '<b>Calculus I</b> <br/>(Biology and Social Sciences) or (Physical Sciences & Engineering)',
          criteria: 'AS.110.106[C]^OR^AS.110.108[C]',
        },
        {
          required_credits: 4,
          description:
            '<b>Calculus II</b> <br/>(Biology and Social Sciences) or (Physical Sciences & Engineering) or Honors Single Variable Calculus',
          criteria: 'AS.110.107[C]^OR^AS.110.109[C]^OR^AS.110.113[C]',
        },
        {
          required_credits: 4,
          description: '<b>Calculus III</b>',
          criteria: 'AS.110.202[C]',
        },
      ],
    },
    {
      name: '200- or 300-Level Course',
      required_credits: 4,
      min_credits_per_course: 4,
      description:
        'Students must take one 200-level or above math course (excluding AS.110.202 Calculus III and the 2-credit 225).',
      criteria: 'AS Mathematics[D]^AND^(200[L]^OR^300[L])',
      double_count: [],
    },
    {
      name: '300-Level or Above Courses',
      required_credits: 12,
      min_credits_per_course: 4,
      description:
        'Students must take three mathematics courses at the 300-level or above (excluding the 1-credit seminar 345). <br /> <br /> ** A course in the Department of Applied Mathematics and Statistics (AMS), at the corresponding level, may be substituted for one of the 300-level or above courses. However, only a course from AMS can serve as a substitute.',
      criteria:
        '(AS Mathematics[D]^OR^EN Applied Mathematics & Statistics[D])^AND^(300[L]^OR^400[L]^OR^500[L])^NOT^AS.110.345[C]',
      pathing: 2,
      fine_requirements: [
        {
          required_credits: 12,
          description:
            '<b>DEFAULT PATH:</b> <br /> Students must take three mathematics courses at the 300-level or above (excluding the 1-credit seminar 345).**',
          criteria:
            'AS Mathematics[D]^AND^(300[L]^OR^400[L]^OR^500[L])^NOT^AS.110.345[C]',
          double_count: ['All'],
        },
        {
          required_credits: 4,
          description:
            '** <b>ALTERNATIVE PATH:</b> <br /> A course in the Department of Applied Mathematics and Statistics (AMS), at the corresponding level, may be substituted for one of the 300-level or above courses. ',
          criteria:
            'EN Applied Mathematics & Statistics[D]^AND^(300[L]^OR^400[L]^OR^500[L])',
          double_count: ['All'],
        },
        {
          required_credits: 8,
          description:
            '** <b>ALTERNATIVE PATH (cont.):</b> <br /> With an AMS course substitution, students must take two mathematics courses at the 300-level or above (excluding the 1-credit seminar 345).',
          criteria:
            'AS Mathematics[D]^AND^(300[L]^OR^400[L]^OR^500[L])^NOT^AS.110.345[C]',
          double_count: ['All'],
        },
      ],
    },
  ],
};

// https://e-catalogue.jhu.edu/engineering/full-time-residential-programs/degree-programs/robotics-computational-sensing/computer-integrated-surgery-minor/#requirementstext
const minorCIS: Minor = {
  degree_name: 'Minor Computer Integrated Surgery',
  abbrev: 'Minor CIS',
  department: 'EN Robotics and Computational Sensing',
  total_degree_credit: 43,
  wi_credit: 0,
  url: 'https://lcsr.jhu.edu/computer-integrated-surgery-minor/',
  distributions: [
    {
      name: 'Fundamental Computer Science Courses',
      required_credits: 7,
      min_credits_per_course: 3,
      description:
        'You must have a fundamental bakcground in computer programming and computer science. ' +
        'You must take Gateway Computing JAVA and Data Structures (Or equivalent experience determined by your CIS minor adviser.)',
      criteria: 'EN.500.112[C]^OR^EN.601.226[C]',
      fine_requirements: [
        {
          description: '<b>EN.500.112 Gateway Computing: JAVA</b>',
          required_credits: 3,
          criteria: 'EN.500.112[C]',
        },
        {
          description: '<b>EN.601.226 Data Structures</b>',
          required_credits: 4,
          criteria: 'EN.601.226[C]',
        },
      ],
    },
    {
      name: 'Fundamental Mathematics Courses',
      required_credits: 16,
      min_credits_per_course: 4,
      description:
        'All CIS Minors must take Calculus I, Calculus II, Calculus III or Honors Multivariable Calculus ' +
        'and choose one of the following: Linear Algebra and Differential Equations, Differential Equations, Linear Algebra, or Honors Linear Algebra. ' +
        'Math requirements may also be satisfied by an equivalent course as determined by CIS advisor.',
      criteria:
        'AS.110.106[C]^OR^AS.110.108[C]^OR^AS.110.109[C]^OR^AS.110.107[C]^OR^' +
        'AS.110.202[C]^OR^AS.110.211[C]^OR^AS.110.201[C]^OR^EN.553.291[C]^OR^AS.110.212[C]',
      fine_requirements: [
        {
          description:
            '<b>Calculus I</b> <br />' +
            'AS.110.106 Calculus I (Biology and Social Sciences)' +
            '<br /> <i>OR</i> <br />' +
            'AS.110.108 Calculus I (Physical Sciences and Engineering)',
          required_credits: 4,
          criteria: 'AS.110.106[C]^OR^AS.110.108[C]',
        },
        {
          description:
            '<b>Calculus II</b> <br />' +
            'AS.110.109 Calculus II (For Physical Sciences and Engineering)' +
            '<br /> <i>OR</i> <br />' +
            'AS.110.107 Calculus II (For Biological and Social Science)',
          required_credits: 4,
          criteria: 'AS.110.109[C]^OR^AS.110.107[C]',
        },
        {
          description:
            '<b>Calculus III</b> <br /> AS.110.202 Calculus III' +
            '<br /> <i>OR</i> <br /> AS.110.211 Honors Multivariable Calculus',
          required_credits: 4,
          criteria: 'AS.110.202[C]^OR^AS.110.211[C]',
        },
        {
          description:
            '<b>Linear Algebra</b> <br /> AS.110.201 Linear Algebra<br /> <i>OR</i> ' +
            '<br /> EN.553.291 Linear Algebra and Differential Equations<br /> <i>OR</i> ' +
            '<br /> AS.110.212 Honors Linear Algebra',
          required_credits: 4,
          criteria: 'AS.110.201[C]^OR^EN.553.291[C]^OR^AS.110.212[C]',
        },
      ],
    },
    {
      name: 'Fundamental Computer Integrated Surgery Courses',
      required_credits: 8,
      min_credits_per_course: 4,
      description:
        'You must take Computer Integrated Surgery I and a design course in CIS.',
      criteria:
        'EN.510.433[C]^OR^EN.510.434[C]^OR^EN.520.462[C]^OR^EN.520.463[C]^OR^' +
        'EN.520.498[C]^OR^EN.520.499[C]^OR^EN.540.400[C]^OR^EN.540.421[C]^OR^' +
        'EN.580.311[C]^OR^EN.580.312[C]^OR^EN.580.411[C]^OR^EN.580.412[C]^OR^' +
        'EN.580.456[C]^OR^EN.580.457[C]^OR^EN.580.471[C]^OR^EN.580.571[C]^OR^' +
        'EN.580.480[C]^OR^EN.580.481[C]^OR^EN.580.580[C]^OR^EN.580.581[C]^OR^' +
        'EN.601.455[C]^OR^EN.601.456[C]^OR^EN.580.437[C]^OR^EN.580.438[C]',
      fine_requirements: [
        {
          description: '<b>EN.601.455 Computer Integrated Surgery I</b>',
          required_credits: 4,
          criteria: 'EN.601.455[C]',
        },
        {
          description:
            '<b>EN.601.456 Computer Integrated Surgery II or design course in CIS</b>',
          required_credits: 4,
          criteria:
            'EN.601.456[C]^OR^EN.510.433[C]^OR^EN.510.434[C]^OR^EN.520.462[C]^OR^' +
            'EN.520.463[C]^OR^EN.520.498[C]^OR^EN.520.499[C]^OR^EN.540.400[C]^OR^' +
            'EN.540.421[C]^OR^EN.580.311[C]^OR^EN.580.312[C]^OR^EN.580.411[C]^OR^' +
            'EN.580.412[C]^OR^EN.580.456[C]^OR^EN.580.457[C]^OR^EN.580.471[C]^OR^' +
            'EN.580.571[C]^OR^EN.580.480[C]^OR^EN.580.481[C]^OR^EN.580.580[C]^OR^' +
            'EN.580.581[C]^OR^EN.580.437[C]^OR^EN.580.438[C]',
        },
      ],
    },
    {
      name: 'Other Courses Related to CIS',
      required_credits: 12,
      min_credits_per_course: 3,
      description:
        '<p>Select at least four other courses related to CIS. Of these, at least one must be in either the Imaging Subgroup or the Robotics Subgroup</p>',
      criteria:
        'EN.520.414[C]^OR^EN.520.432[C]^OR^EN.520.433[C]^OR^EN.601.461[C]^OR^EN.530.420[C]^OR^EN.530.421[C]^OR^EN.530.603[C]^OR^EN.530.646[C]^OR^EN.601.463[C]^OR^EN.520.448[C]^OR^EN.530.445[C]^OR^EN.580.471[C]^OR^EN.601.454[C]^OR^EN.601.476[C]^OR^EN.601.482[C]',
      fine_requirements: [
        {
          required_credits: 3,
          description:
            '<b>Imaging</b> <br />' +
            'EN.520.414 Image Processing & Analysis' +
            '<br /> <i>OR</i> <br />' +
            'EN.520.432 Medical Imaging Systems' +
            '<br /> <i>OR</i> <br />' +
            'EN.520.433 Medical Image Analysis' +
            '<br /> <i>OR</i> <br />' +
            'EN.601.461 Computer Vision' +
            '<br /><br /><b>Robotics</b> <br />' +
            'EN.530.420 Robot Sensors/Actuators' +
            '<br /> <i>OR</i> <br />' +
            'EN.530.421 Mechatronics' +
            '<br /> <i>OR</i> <br />' +
            'EN.530.603 Applied Optimal Control' +
            '<br /> <i>OR</i> <br />' +
            'EN.530.646 Robot Devices, Kinematics, Dynamics, and Control' +
            '<br /> <i>OR</i> <br />' +
            'EN.601.463 Algorithms for Sensor-Based Robotics',
          criteria:
            'EN.520.414[C]^OR^EN.520.432[C]^OR^EN.520.433[C]^OR^EN.601.461[C]^OR^EN.530.420[C]^OR^EN.530.421[C]^OR^EN.530.603[C]^OR^EN.530.646[C]^OR^EN.601.463[C]',
        },
        {
          required_credits: 0,
          description:
            '<b>Other</b> <br />' +
            'EN.520.448 Electronics Design Lab' +
            '<br /> <i>OR</i> <br />' +
            'EN.530.445 Introduction to Biomechanics' +
            '<br /> <i>OR</i> <br />' +
            'EN.580.471 Principles of Design of BME Instrumentation' +
            '<br /> <i>OR</i> <br />' +
            'EN.601.454 Augmented Reality' +
            '<br /> <i>OR</i> <br />' +
            'EN.601.476 Machine Learning: Data to Models' +
            '<br /> <i>OR</i> <br />' +
            'EN.601.482 Machine Learning: Deep Learning',
          criteria:
            'EN.520.448[C]^OR^EN.530.445[C]^OR^EN.580.471[C]^OR^EN.601.454[C]^OR^EN.601.476[C]^OR^EN.601.482[C]',
        },
      ],
    },
  ],
};

const no_degree: Major = {
  degree_name: "Undecided Degree/My degree isn't supported yet",
  distributions: [],
  abbrev: 'N/A',
  department: 'n/a',
  total_degree_credit: 0,
  url: '',
  wi_credit: 0,
};

export function getMajorFromCommonName(name: string): Major {
  let out: Major | null = null;
  allMajors.forEach((major) => {
    if (major.degree_name === name) {
      out = major;
    }
  });
  if (out === null) {
    throw Error('Major not found');
  }
  return out;
}

export const allMajors: Major[] = [
  no_degree,
  bsCS,
  baCS,
  bsMolCell,
  bsAMS,
  baIS,
  bsMechE,
  bsBME,
  bsCBE,
  baEcon,
  baCogSci,
  bsNeuro,
  bsECE,
  baMath,
  baPhysics,
  bsPhysics,
  baChem,
  minorCS,
  minorAMS,
  minorEcon,
  minorPhysics,
  minorMath,
  minorCIS,
  // bsEnvEng,
  // baSoc,
  // baWritingSems,
  // baPsych,
  // baMolCell,
  // baMSH,
  baPH,
  // bsBioPhysics,
  // bsME,
  // baHistory,
  // baBiology,
  // bsMatSci,
  // bsBBio,
  // baHistArt,
  // bsCompEng,
  // bsEPS,
  // bsEnvSci,
  // baEnglish,
  // bsCivEng,
];
