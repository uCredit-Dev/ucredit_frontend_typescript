// All Major Requirements can be found at the links below
// https://e-catalogue.jhu.edu/arts-sciences/full-time-residential-programs/degree-programs/
// https://e-catalogue.jhu.edu/engineering/full-time-residential-programs/degree-programs/

// could (should?) just GET from backend
export const majorNames = [
  "Undecided Degree/My degree isn't supported yet",
  'B.S. Computer Science',
  'B.A. Computer Science',
  'B.S. Applied Mathematics & Statistics',
  'B.S. Biomedical Engineering',
  'B.S. Chemical & Biomolecular Engineering',
  'B.S. Electrical Engineering',
  'B.S. Mechanical Engineering',
  'B.S. Molecular and Cellular Biology',
  'B.A. Economics',
  'B.A. International Studies',
  'B.S. Neuroscience',
  'B.A. Cognitive Science',
  'B.A Chemistry',
  'B.A. Mathematics',
  'B.A. Physics',
  'B.S. Physics',
  'Minor Computer Science',
  'Minor Applied Mathematics & Statistics',
  'Minor Mathematics',
  'Minor Economics',
  'Minor Computer Integrated Surgery',
  'Minor Physics',
];

export const majorInfos = {
  "Undecided Degree/My degree isn't supported yet": {
    abbrev: 'N/A',
    total_degree_credit: 0,
    url: '',
  },
  'B.S. Computer Science': {
    abbrev: 'B.S. CS',
    total_degree_credit: 120,
    url: 'https://www.cs.jhu.edu/2021undergraduate-advising-manual/',
  },
  'B.A. Computer Science': {
    abbrev: 'B.A. CS',
    total_degree_credit: 120,
    url: 'https://www.cs.jhu.edu/2021undergraduate-advising-manual/',
  },
  'B.S. Applied Mathematics & Statistics': {
    abbrev: 'B.S. AMS',
    total_degree_credit: 120,
    url:
      'https://e-catalogue.jhu.edu/engineering/full-time-residential-programs/degree-programs/applied-mathematics-statistics/applied-mathematics-statistics-bs/#requirementstext',
  },
  'B.A. International Studies': {
    abbrev: 'B.A. IS',
    total_degree_credit: 120,
    url:
      'https://krieger.jhu.edu/internationalstudies/undergraduate/requirements/',
  },
  'B.S. Chemical & Biomolecular Engineering': {
    abbrev: 'B.S. ChemBE',
    total_degree_credit: 128,
    url:
      'https://engineering.jhu.edu/chembe/undergraduate-studies/undergraduate-degree-program/',
  },
  'B.S. Biomedical Engineering': {
    abbrev: 'B.S. BME',
    total_degree_credit: 129,
    url:
      'https://www.bme.jhu.edu/academics/undergraduate/undergraduate-degree-requirements/',
  },
  'B.S. Mechanical Engineering': {
    abbrev: 'B.S. MechE',
    total_degree_credit: 126,
    url:
      'https://e-catalogue.jhu.edu/engineering/full-time-residential-programs/degree-programs/mechanical-engineering/mechanical-engineering-bachelor-science/#requirementstext',
  },
  'B.S. Molecular and Cellular Biology': {
    abbrev: 'B.S. Mol Cell',
    total_degree_credit: 120,
    url:
      'https://e-catalogue.jhu.edu/arts-sciences/full-time-residential-programs/degree-programs/biology/molecular-cellular-biology-bachelor-science/',
  },
  'B.A. Economics': {
    abbrev: 'B.A. Econ',
    total_degree_credit: 120,
    url:
      'https://e-catalogue.jhu.edu/arts-sciences/full-time-residential-programs/degree-programs/economics/economics-bachelor-arts/',
  },
  'B.A. Mathematics': {
    abbrev: 'B.A. Math',
    total_degree_credit: 120,
    url:
      'https://e-catalogue.jhu.edu/arts-sciences/full-time-residential-programs/degree-programs/mathematics/mathematics-bachelor-arts/#requirementstext',
  },
  'B.A. Physics': {
    abbrev: 'B.A. Phys',
    total_degree_credit: 120,
    url:
      'https://e-catalogue.jhu.edu/arts-sciences/full-time-residential-programs/degree-programs/physics-astronomy/physics-astronomy-bachelor-arts/',
  },
  'B.S. Physics': {
    abbrev: 'B.S. Phys',
    url:
      'https://e-catalogue.jhu.edu/arts-sciences/full-time-residential-programs/degree-programs/physics-astronomy/physics-bachelor-science/',
    total_degree_credit: 126,
  },
  'B.S. Neuroscience': {
    abbrev: 'B.S. Neuro',
    total_degree_credit: 120,
    url:
      'https://e-catalogue.jhu.edu/arts-sciences/full-time-residential-programs/degree-programs/neuroscience/neuroscience-bachelor-science/',
  },
  'B.A. Cognitive Science': {
    abbrev: 'B.A. Cog Sci',
    total_degree_credit: 81,
    url: 'https://cogsci.jhu.edu/undergraduate/cognitive-science-major/',
  },
  'B.S. Electrical Engineering': {
    total_degree_credit: 126,
    abbrev: 'ECE',
    url:
      'https://e-catalogue.jhu.edu/engineering/full-time-residential-programs/degree-programs/electrical-computer-engineering/electrical-engineering-bachelor-science/#requirementstext',
  },
  'B.A Chemistry': {
    abbrev: 'B.A. Chem',
    total_degree_credit: 120,
    url:
      'https://e-catalogue.jhu.edu/arts-sciences/full-time-residential-programs/degree-programs/chemistry/chemistry-bachelor-arts/',
  },
  'Minor Mathematics': {
    abbrev: 'Minor Math',
    total_degree_credit: 28,
  },
  'Minor Physics': {
    abbrev: 'Physics Minor',
    total_degree_credit: 13,
  },
  'Minor Economics': {
    abbrev: 'Minor Econ',
    total_degree_credit: 18,
    url:
      'https://e-catalogue.jhu.edu/arts-sciences/full-time-residential-programs/degree-programs/economics/economics-minor/',
  },
  'Minor Applied Mathematics & Statistics': {
    abbrev: 'Minor AMS',
    total_degree_credit: 18,
    url:
      'https://engineering.jhu.edu/ams/academics/undergraduate-studies/undergraduate-minor/',
  },
  'Minor Computer Integrated Surgery': {
    abbrev: 'Minor CIS',
    total_degree_credit: 43,
    url: 'https://lcsr.jhu.edu/computer-integrated-surgery-minor/',
  },
  'Minor Computer Science': {
    abbrev: 'Minor CS',
    total_degree_credit: 23,
    url: 'https://www.cs.jhu.edu/2021undergraduate-advising-manual/',
  },
};
