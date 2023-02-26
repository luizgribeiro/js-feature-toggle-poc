
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

// Using decorators
//
const FeatureToggle = (feature: string)=> {
  return (target: any, propertyKey: any, descriptor: PropertyDescriptor) => {
    const realMethod = descriptor.value;
    if (feature === "teste") {
     descriptor.value =  ()=> { throw new Error("It's an error")};
    }
    console.log(`target: ${JSON.stringify(target)}`);
    console.log(`propertyKey: ${JSON.stringify(propertyKey)}`);
    console.log(`descriptor: ${JSON.stringify(descriptor)}`);
  }
}

class Target {
  
  @FeatureToggle("tes")
  superMethod() {
    console.log("Super Method being executed");
  }
}

const featureToggleTest = new Target();

featureToggleTest.superMethod();
