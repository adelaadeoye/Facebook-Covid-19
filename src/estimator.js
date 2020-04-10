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
  const availableBeds = 0.35 * data.totalHospitalBeds - severCases;
  if (Number.isInteger(availableBeds)) return availableBeds;
  return Math.floor(availableBeds) + 1;
};

const casesForICUByRequestedTimeImpact = (data) => {
  const infected = infectionsByRequestedTimeImpact(data);
  return Math.round(infected * 0.05);
};
const casesForVentilatorsByRequestedTimeImpact = (data) => {
  const infected = infectionsByRequestedTimeImpact(data);
  return Math.trunc(infected * 0.02);
};
const dollarsInFlightImpact = (data) => {
  let result = 0;
  const pop = data.region.avgDailyIncomePopulation;
  const income = data.region.avgDailyIncomeInUSD;
  const infected = infectionsByRequestedTimeImpact(data);
  if (data.periodType === 'days') {
    const days = Math.floor(data.timeToElapse / 3);
    result = (infected * pop * income) / days;
  } else if (data.periodType === 'weeks') {
    const days = Math.floor((data.timeToElapse * 7) / 3);
    result = (infected * pop * income) / days;
  } else {
    const days = Math.floor((data.timeToElapse * 30) / 3);
    result = (infected * pop * income) / days;
  }
  return result;
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
  const availableBeds = 0.35 * data.totalHospitalBeds - severCases;
  if (Number.isInteger(availableBeds)) return availableBeds;
  return Math.floor(availableBeds) + 1;
};

const casesForICUByRequestedTimeSevere = (data) => {
  const infected = infectionsByRequestedTimeSevere(data);
  return Math.round(infected * 0.05);
};
const casesForVentilatorsByRequestedTimeSevere = (data) => {
  const infected = infectionsByRequestedTimeSevere(data);
  return Math.trunc(infected * 0.02);
};
const dollarsInFlightSevere = (data) => {
  let result = 0;
  const pop = data.region.avgDailyIncomePopulation;
  const income = data.region.avgDailyIncomeInUSD;
  const infected = infectionsByRequestedTimeSevere(data);
  if (data.periodType === 'days') {
    const days = Math.floor(data.timeToElapse / 3);
    result = (infected * pop * income) / days;
  } else if (data.periodType === 'weeks') {
    const days = Math.floor((data.timeToElapse * 7) / 3);
    result = (infected * pop * income) / days;
  } else {
    const days = Math.floor((data.timeToElapse * 30) / 3);
    result = (infected * pop * income) / days;
  }
  return result;
};

const covid19ImpactEstimator = (data) => {
  const impactEstimation = {};
  impactEstimation.data = data;
  impactEstimation.impact = {
    currentlyInfected: currentlyInfectedImpact(data),
    infectionsByRequestedTime: infectionsByRequestedTimeImpact(data),
    severeCasesByRequestedTime: severeCasesByRequestedTimeImpact(data),
    hospitalBedsByRequestedTime: hospitalBedsByRequestedTimeImpact(data),
    casesForICUByRequestedTime: casesForICUByRequestedTimeImpact(data),
    casesForVentilatorsByRequestedTime: casesForVentilatorsByRequestedTimeImpact(
      data
    ),
    dollarsInFlight: dollarsInFlightImpact(data)
  };
  impactEstimation.severeImpact = {
    currentlyInfected: currentlyInfectedSevere(data),
    infectionsByRequestedTime: infectionsByRequestedTimeSevere(data),
    severeCasesByRequestedTime: severeCasesByRequestedTimeSevere(data),
    hospitalBedsByRequestedTime: hospitalBedsByRequestedTimeSevere(data),
    casesForICUByRequestedTime: casesForICUByRequestedTimeSevere(data),
    casesForVentilatorsByRequestedTime: casesForVentilatorsByRequestedTimeSevere(
      data
    ),
    dollarsInFlight: dollarsInFlightSevere(data)
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
