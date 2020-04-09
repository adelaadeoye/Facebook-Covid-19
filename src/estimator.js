const currentlyInfectedImpact = (data) => data.reportedCases * 10;

const infectionsByRequestedTimeImpact = (data) => {
  let result = 0;
  if (data.periodType === 'days') {
    const days = Math.floor(data.timeToElapse / 3);
    result = currentlyInfectedImpact(data) * 2 ** days;
  } else if (data.periodType === 'weeks') {
    const days = Math.floor((data.timeToElapse * 7) / 3);
    result = currentlyInfectedImpact(data) * 2 ** days;
  } else {
    const days = Math.floor((data.timeToElapse * 30) / 3);
    result = currentlyInfectedImpact(data) * 2 ** days;
  }
  return result;
};

const severeCasesByRequestedTimeImpact = (data) => infectionsByRequestedTimeImpact(data) * 0.15;

const hospitalBedsByRequestedTimeImpact = (data) => {
  const severCases = severeCasesByRequestedTimeImpact(data);
  const availableBeds = Math.round(0.35 * data.totalHospitalBeds - severCases);
  return availableBeds;
};

const currentlyInfectedSevere = (data) => data.reportedCases * 50;

const infectionsByRequestedTimeSevere = (data) => {
  let result = 0;
  if (data.periodType === 'days') {
    const days = Math.floor(data.timeToElapse / 3);
    result = currentlyInfectedSevere(data) * 2 ** days;
  } else if (data.periodType === 'weeks') {
    const days = Math.floor((data.timeToElapse * 7) / 3);
    result = currentlyInfectedSevere(data) * 2 ** days;
  } else {
    const days = Math.floor((data.timeToElapse * 30) / 3);
    result = currentlyInfectedSevere(data) * 2 ** days;
  }
  return result;
};

const severeCasesByRequestedTimeSevere = (data) => infectionsByRequestedTimeSevere(data) * 0.15;

const hospitalBedsByRequestedTimeSevere = (data) => {
  const severCases = severeCasesByRequestedTimeSevere(data);
  const availableBeds = Math.round(0.35 * data.totalHospitalBeds - severCases);
  return availableBeds;
};
const covid19ImpactEstimator = (data) => {
  const impactEstimation = {};
  impactEstimation.data = data;
  impactEstimation.impact = {
    currentlyInfected: currentlyInfectedImpact(data),
    infectionsByRequestedTime: infectionsByRequestedTimeImpact(data),
    severeCasesByRequestedTime: severeCasesByRequestedTimeImpact(data),
    hospitalBedsByRequestedTime: hospitalBedsByRequestedTimeImpact(data)
  };
  impactEstimation.severeImpact = {
    currentlyInfected: currentlyInfectedSevere(data),
    infectionsByRequestedTime: infectionsByRequestedTimeSevere(data),
    severeCasesByRequestedTime: severeCasesByRequestedTimeSevere(data),
    hospitalBedsByRequestedTime: hospitalBedsByRequestedTimeSevere(data)
  };
  return impactEstimation;
};
// data = {
//   region: {
//     name: 'Africa',
//     avgAge: 19.7,
//     avgDailyIncomeInUSD: 5,
//     avgDailyIncomePopulation: 0.71
//   },
//   periodType: 'months',
//   timeToElapse: 2,
//   reportedCases: 674,
//   population: 66622705,
//   totalHospitalBeds: 1380614
// };
// console.log(covid19ImpactEstimator(data));
export default covid19ImpactEstimator;
