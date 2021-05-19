//if byCredit == false, that means the required field is counted by course amount(i.e. number of courses)

//cs other courses: https://www.cs.jhu.edu/undergraduate-studies/academics/cs-other-courses/
const bsCS = {
  name: "B.S. Computer Science",
  department: "EN Computer Science",
  distributions: [
    {
      name: "Total",
      required: 120,
      filter: {},
    },
    {
      name: "Computer Science",
      required: 40,
      filter: {
        number: /EN\.600\.[0-9]{3}|EN\.601\.[0-9]{3}|EN\.500\.11[2-4]/g, //"EN.601.***" or "EN.500.11*"
      },
    },
    {
      name: "Math",
      required: 16,
      filter: {
        department: /AS Mathematics|EN Applied Mathematics & Statistics/g,
        exception: {
          number: /EN\.553\.171/g, //discrete math
        },
      },
    },
    {
      name: "Basic Science",
      required: 8,
      filter: {
        title: /General Physics|General Biology|Introductory Chemistry/g, //"General Physics", "General Biology", "Introductory Chemistry"]
      },
      description:
        "Students must take two semesters of core science courses (any combination of Physics, Chemistry, Biology), with their associated labs, totaling at least 8 credits. These courses should be taken for a grade. However, AP credit is an acceptable substitute for these courses and labs.",
    },
    {
      name: "Liberal Arts",
      required: 18,
      filter: {
        area: /H|S/g,
      },
    },
    {
      name: "Electives",
      required: 0,
      filter: {},
    },
  ],
  requirments: [
    {
      name: "Computer Science Upper",
      required: 16,
      byCredit: true,
      filter: {
        number: /EN\.601\.[3-9]{1}[0-9]{2}/g, //"EN.601.3/4/5/6/7/8/9**"
      },
    },
    {
      name: "Computer Science Core",
      required: 6,
      byCredit: false,
      filter: {
        number: /EN\.500\.11[2-4]|EN\.601\.220|EN\.601\.226|EN\.601\.229|EN\.601\.230|EN\.601\.443|/g,
      },
    },
    {
      name: "Math Requirement",
      required: 3,
      byCredit: false,
      filter: {
        number: /AS\.110\.10[8-9]|AS\.553\.3[0-9]{2}/g, //"AS.110.108" or "AS.110.109" or "AS.553.3**"
      },
    },
    {
      name: "Writing Intensive",
      required: 2,
      byCredit: false,
      filter: {
        wi: true,
      },
    },
    {
      name: "Team",
      required: 1,
      byCredit: false,
      filter: {
        tags: "CSCI-TEAM",
      },
    },
    {
      name: "Areas",
      required: 2,
      byCredit: false,
      filter: {
        tags: ["CSCI-SYST", "CSCI-SOFT", "CSCI-APPL", "CSCI-RSNG"], //need refinement
      },
    },
    {
      name: "Ethics",
      required: 1,
      byCredit: false,
      filter: {
        tags: "CSCI-ETHS",
        number: /EN\.601\.104|EN\.660\.400|EN\.660\.406/g, //"601.104" or "660.400" or "660.406"
      },
    },
  ],
};
