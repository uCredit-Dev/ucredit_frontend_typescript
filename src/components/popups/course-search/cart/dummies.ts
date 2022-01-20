/*
1/18:
Result Filtering Logic:
could make it similar to the substring search. TODO?
Adding placeholder courses more accessible: maybe ad d ageneric element at the etop of the list?
Feature implemented. some concerns
 - Perhaps it should be debounced? Currently could cause a lot of state updates if spammed with typing
 - no filter system. only search
 - no smart substring search, only based on title

Making sure the versions for courses are correct:
 - default to latest course versions (is there afield for this?)
 - added a default year for CartCourseListItem component. issue: this doesnt show courses that aren't available in the year
 - current implementation : no default year, but takes all years and only adds the first one.
    - issue: will display old years first. lots of old classes that aren't valid anymore. confusing for studnets
    - potential fix: make default year more recent,or cull courses that only appear once.
 - ISSUE : bug with multiple left hand column versions being shown as selected (ones wth identical course codes)
    - double check highlihghting logic/versioning for displaying multiple courses with the same name??
    - example: statistics couress with multiple options

Make bars more clearly clickable, with info
Make switching filters clear ssearched course and inspected course
Make cart popup header give information
Make sure you can't open a cart popup and another popup at the same time
Make it soa popup searches for the most recent term (not manual)
Fix total credits crashing the popup

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