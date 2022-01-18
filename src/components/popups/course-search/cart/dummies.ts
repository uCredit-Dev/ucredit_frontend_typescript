/*
1/18:
Result Filtering Logic:
could make it similar to the substring search. TODO?
Adding placeholder courses more accessible: maybe ad d ageneric element at the etop of the list?
Feature implemented. some concerns
 - Perhaps it should be debounced? Currently could cause a lot of state updates if spammed with typing
 - no filter system. only search
 - no smart substring search, only based on title
 

1/12:
VISUAL DESIGN ELEMENST
 - FILTER LIST:
    * How to handle text that overflows? Expand box? Wrap text?
    * How should filters be displayed?

Whatever, doing right now:
Pathing:
 - seperate pathing component similar to FineRequirementItem with a dropdown menu to select the focus araea

1/8/2022:
added things 

1/5/2022
RIGHT NOW:
1. Fetch all courses for filtering
    - should try to undrestand how versioning works. .. eventually
2.

idea: convert expression in search extras to make api call


So, todo:

currently,, retrieves all through a single fetch when the cart is opened. see useEfefct.
There should be a mroe efficient way to do this

The selectedRequirement and Bar 

Things to remove:
all courses props pass throguh index tsx, cart, to cart course list to set raw courses

Features TBI:
the degree bars should be clickable (changes cursor)
names for the requirements

Ideas:
maybe have course requirements for majors be pre computed? or computer server side after migration?

Known bugs:
delete year popupdoesn't work for some reason?
feedback popup isn't overlayed correctly
clicking total credit bar breaks the app
versioning is still tricky: how to determine what year to search for
close cart after adding course
clear inspecting cart after adding course


random ideas:
wireframe while dashboard loads?

k
0. Features that still need to be implemented
    - need a way better way to name distribution reuqirements
    - split up distifbution requirements more specifically? i.e. classes?
1. Cleaning up/Squashing out bugs with the course popup
    - decoupling the Redux store from the search slice/heandling interactions iwith other popups
    - determining how to handle versioning for cart courses, since they're supposed to represent generically the ability for future courses
    - exploring solution to translate distribution requirements to search filter objects to work with existing search API
2. Planning out credit validation logic to the backend
    - possibly precompute buckets?

Fixing search jank
    - Pagination is a little wonky, shifting the search box around overlps
    - only numbers are clickable
    - Jittering wen new courses are populated, consider wireframe while results load?

*/


import { Course, SISRetrievedCourse } from "../../../../resources/commonTypes";
import { checkRequirementSatisfied, requirements } from "../../../dashboard/degree-info/distributionFunctions";

export const emptyRequirements: requirements = {
  name: "",
  expr: "",
  required_credits: 0,
  fulfilled_credits: 0,
  description: "",
};

// filter function....?
export const filterBasedOnReq = (req: requirements) => {
  // factory function, takes a requirement, returns a callback to filter acceptable courses.
  return (sisCourse: SISRetrievedCourse) => {
    let versions = sisCourse.versions;
    for (let i = 0; i < versions.length; i++) { // logic of this: goes through EVERY version of the coruse to find out ifit should displayitor not
        // actual course
      const newCourse: Course = { // does this conversion work?? (SISCourse to Course)
        title: sisCourse.title,
        number: sisCourse.number,
        ...sisCourse.versions[i], // WHERE IS THE VERSION READ FROM AGAIN??? ARUHGHGHGHHHHHHHHHHHHHHHHHHHH
      }
      if (checkRequirementSatisfied(req, newCourse)) return true;
    }
    return false;
  }
}

// export const testRequirements: requirement[] = [
//   {
//     title: "All",
//     progress: 5,
//     total: 6,
//     fulfilled: true,
//     description: "Should show all",
//     text: ""
//   },
//   {
//     title: "My Requirement 1",
//     progress: 5,
//     total: 6,
//     fulfilled: true,
//     description: "This is a demo requirement",
//     text: "f"
//   },
//   {
//     title: "My Requirement 2",
//     progress: 2,
//     total: 6,
//     fulfilled: true,
//     description: "This is a demo requirement",
//     text: "t"
//   },
//   {
//     title: "My Requirement 3",
//     progress: 1,
//     total: 4,
//     fulfilled: true,
//     description: "This is a demo requirement",
//     text: "l"
//   },
// ]

export const distrs:[string, requirements[]][] = [
  [
      "Computer Science",
      [
          {
              "name": "Computer Science",
              "expr": "EN Computer Science[D]^OR^CSCI-OTHER[T]",
              "required_credits": 42,
              "fulfilled_credits": 0,
              "description": "For more information please visit the <a href='https://www.cs.jhu.edu/undergraduate-studies/academics/ugrad-advising-manual/'>major degree requirement</a> section on the department website."
          },
          {
              "name": "<b>Computer Ethics(601.104).</b><p>Practical Ethics for Future Leaders (660.400/406) may be used as a substitute for the computer ethics requirement for the BS program, but does not count towards the CS total credits at all.</p>",
              "expr": "EN.600.104[C]^OR^EN.601.104[C]^OR^EN.660.400[C]",
              "required_credits": 1,
              "fulfilled_credits": 0,
              "description": ""
          },
          {
              "name": "<b>Lower Level Undergraduate:</b><p>500.112/113/114 Gateway Computing or AP Comp Sci A or equivalent<p>601.220 Intermediate Programming</p><p>601.226 Data Structures</p><p>601.229 Computer System Fundamentals</p><p>601.231/271 Automata and Computation Theory</p><p>601.433 Algorithms</p>",
              "expr": "EN.500.112[C]^OR^EN.500.113[C]^OR^EN.500.114[C]^OR^EN.601.220[C]^OR^EN.601.226[C]^OR^EN.601.229[C]^OR^EN.601.231[C]^OR^EN.601.271[C]^OR^EN.601.443[C]",
              "required_credits": 20,
              "fulfilled_credits": 0,
              "description": ""
          },
          {
              "name": "<b>Upper Level Undergraduate: </b><p>12 upper level CS credits in addition to the required Algorithms course</p>",
              "expr": "EN Computer Science[D]^AND^Upper Level Undergraduate[L]",
              "required_credits": 13,
              "fulfilled_credits": 0,
              "description": ""
          },
          {
              "name": "<b>2 Upper Level Classifications:</b><p>At least one upper level course in two of these four different classification</p> areas: Applications(CSCI-APPL), Systems(CSCI-SYST), Software(CSCI-SOFT) and Reasoning(CSCI-RSNG)",
              "expr": "CSCI-APPL[T]^OR^CSCI-SYST[T]^OR^CSCI-SOFT[T]^OR^CSCI-RSNG[T]",
              "required_credits": 6,
              "fulfilled_credits": 0,
              "description": "",
              "exclusive": true
          },
          {
              "name": "<b>One Team(CSCI-TEAM) designated course.</b><p> This Team course may overlap other course requirements, for example to count as both Team and Software.</p>",
              "expr": "CSCI-TEAM[T]",
              "required_credits": 3,
              "fulfilled_credits": 0,
              "description": ""
          }
      ]
  ],
  [
      "Math",
      [
          {
              "name": "Math",
              "expr": "AS Mathematics[D]^OR^EN Applied Math and Statistics[D]",
              "required_credits": 24,
              "fulfilled_credits": 0,
              "description": "All courses in this category must be from one of the two math departments on campus: Mathematics or Applied Math and Statistics. However, 553.171 Discrete Mathematics may not count towards these math requirements. Other than Calculus I and II, all the remaining courses must be 200-level or above. The BS math courses must include coverage of both probability and statistics, which can be satisfied in many ways, including taking any of the 553.3xx combined Probability & Statistics courses."
          },
          {
              "name": "<b>Required Courses:</b><p>110.108 Calculus I or AP equivalent</p>110.109 Calculus II or AP equivalent</p><p>550.171/553.171 Discrete Mathematics</p>",
              "expr": "AS.110.108[C]^OR^AS.110.109[C]^OR^EN.550.171[C]^OR^EN.553.171[C]",
              "required_credits": 12,
              "fulfilled_credits": 0,
              "description": ""
          },
          {
              "name": "<b>Probability and Statistics:</b><p>Two paths:</p><p>1. Any of the three courses below:</p><p>EN.553.211</p><p>EN.553.310</p><p>EN.553.311</p><p>2. Both Intro to Probability and Intro to Statistics</p><p>En.553.420</p><p>EN.553.430</p> ",
              "expr": "(EN.553.211[C]^OR^EN.553.310[C]^OR^EN.553.311[C])^OR^(EN.553.420[C]^AND^EN.553.430[C])",
              "required_credits": 4,
              "fulfilled_credits": 0,
              "description": ""
          }
      ]
  ],
  [
      "Science",
      [
          {
              "name": "Science",
              "expr": "N[A]",
              "required_credits": 16,
              "fulfilled_credits": 0,
              "description": "At least two semesters of physics or two semesters of chemistry, with the associated laboratories, must be included."
          },
          {
              "name": "<b>Required Courses:</b><p>Two paths:</p><p>1. Two semesters of chemistry with associated lab:</p><p>030.101 Chemistry I and 030.105 Chemistry Lab I or AP equivalent</p>030.102 Chemistry II and 030.106 Chemistry Lab II or AP equivalent</p><p>2. Two semesters of physics with associated lab:</p><p>171.101/103 Physics I and 173.111 Physics Lab I or AP equivalent</p>171.102/104 Physics II and 173.112 Phyusics Lab II or AP equivalent</p>",
              "expr": "(AS.030.101[C]^AND^AS.030.105[C]^AND^AS.030.102[C]^AND^AS.030.106[C])^OR^((AS.171.101[C]^AND^AS.171.103[C])^AND^AS.173.11[C]^AND^(AS.171.102[C]^AND^AS.171.104[C])^AND^AS.173.112[C])",
              "required_credits": 10,
              "fulfilled_credits": 0,
              "description": ""
          }
      ]
  ],
  [
      "Liberal Arts",
      [
          {
              "name": "Liberal Arts",
              "expr": "AS Center for Language Education[D]^OR^AS Modern Languages and Literatures[D]^OR^H[A]^OR^S[A]",
              "required_credits": 18,
              "fulfilled_credits": 0,
              "description": "These courses must have either an ‘H’ or ‘S’ area designator on them, but can be from any department. At most 2 of these courses may be taken S/U (if not counted towards the writing requirement). Foreign language courses can be counted as well, even if they don’t carry an ‘H’ or ‘S’ designator."
          }
      ]
  ],
  [
      "Writing Intensive",
      [
          {
              "name": "Writing Intensive",
              "expr": "Written Intensive[W]",
              "required_credits": 6,
              "fulfilled_credits": 0,
              "description": "Students are required to fulfill the university’s requirement of two writing intensive courses, each at least 3 credits. Students must receive at least a C- grade or better in these writing courses. "
          },
          {
              "name": "<b>Writing-focused WI</b><p>At least one course must be explicitly focused on writing skills in English (eg, courses in professional, fiction or expository writing). These courses may overlap with other requirements.</p><p>Any of the courses below would be satisfactory:</p><p>AS.060.100</p><p>AS.060.113</p><p>AS.060.114</p><p>AS.180.248</p><p>AS.220.105</p><p>AS.220.106</p><p>AS.220.108</p><p>AS.290.303</p><p>AS.360.133</p><p>EN.661.110</p><p>EN.661.111</p><p>EN.661.250</p><p>EN.661.251</p><p>EN.661.315</p>",
              "expr": "AS.060.100[C]^OR^AS.060.113[C]^OR^AS.060.114[C]^OR^AS.180.248[C]^OR^AS.220.105[C]^OR^AS.220.106[C]^OR^AS.220.108[C]^OR^AS.290.303[C]^OR^AS.360.133[C]^OR^EN.661.110[C]^OR^EN.661.111[C]^OR^EN.661.250[C]^OR^EN.661.251[C]^OR^EN.661.315[C]",
              "required_credits": 3,
              "fulfilled_credits": 0,
              "description": ""
          }
      ]
  ]
]