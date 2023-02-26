
type ChangeFlowTogglePossibilities = {
  currentFlow?: ()=> any;
} & NewFlowTogglePossibilities;

type NewFlowTogglePossibilities = {
  newFlow: ()=> any;
}

const disabledFeature = "dummyFeature";
const disabledFeatures = [disabledFeature]

const baseToggle = (feature: string) => (toggle: ChangeFlowTogglePossibilities) => {
  const isFeatureDisabled = disabledFeatures.find((disabled)=> disabled === feature)
  if (toggle.currentFlow) {  
    return  isFeatureDisabled ? toggle.currentFlow() : toggle.newFlow();
  }

  return isFeatureDisabled? null : toggle.newFlow(); 
}

//testing change flow
//  1st: feature disabled -> current flow being used
const testChangeDisabledToggle = baseToggle(disabledFeature);
const changeFlow = {
  currentFlow: ()=> console.log("running current flow"),
  newFlow: ()=> console.log("running new flow")
}

testChangeDisabledToggle(changeFlow);

// 2nd: enabled feature (not disabled)-> new flow enabled
const testChangeDisabledToggleNewFlow = baseToggle("notDisabledFeature");
testChangeDisabledToggleNewFlow(changeFlow);

//testing new code flow
// 1st: disabled feature
const testNewDisabledToggle = baseToggle(disabledFeature)({newFlow: ()=> console.log("running new flow")})
// 2nd: enabled feature
const testNewEnabledToggle = baseToggle("not disabled feature")({newFlow: ()=>console.log("running new flow (not disabled)")});
