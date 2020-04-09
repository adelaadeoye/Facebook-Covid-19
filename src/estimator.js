//impact
const currentlyInfectedImpact = (data) => {
  return data.reportedCases * 10;
};

const infectionsByRequestedTimeImpact = (data) => {
  if (data.periodType === 'days') {
    const days = Math.floor(data.timeToElapse / 3);
    return currentlyInfectedImpact(data) * 2 ** days;
  } else if (data.periodTyp === 'weeks') {
    const days = Math.floor((data.timeToElapse * 7) / 3);
    return currentlyInfectedImpact(data) * 2 ** days;
  } else {
    const days = Math.floor((data.timeToElapse * 30) / 3);
    return currentlyInfectedImpact(data) * 2 ** days;
  }
};

const severeCasesByRequestedTimeImpact = (data) => {
  return infectionsByRequestedTimeImpact(data) * 0.15;
};

//severeImpact
const currentlyInfectedSevere = (data) => {
  return data.reportedCases * 50;
};

const infectionsByRequestedTimeSevere = (data) => {
  if (data.periodType === 'days') {
    const days = Math.floor(data.timeToElapse / 3);
    return currentlyInfectedSevere(data) * 2 ** days;
  } else if (data.periodTyp === 'weeks') {
    const days = Math.floor((data.timeToElapse * 7) / 3);
    return currentlyInfectedSevere(data) * 2 ** days;
  }
  const days = Math.floor((data.timeToElapse * 30) / 3);
  return currentlyInfectedSevere(data) * 2 ** days;
};

const severeCasesByRequestedTimeSevere = (data) => {
  return infectionsByRequestedTimeSevere(data) * 0.15;
};
const covid19ImpactEstimator = (data) => {
  const impactEstimation = {
    data: data,
    impact: {
      currentlyInfected: currentlyInfectedImpact(data),
      infectionsByRequestedTime: infectionsByRequestedTimeImpact(data),
      severeCasesByRequestedTime: severeCasesByRequestedTimeImpact(data)
    },
    severeImpact: {
      currentlyInfected: currentlyInfectedSevere(data),
      infectionsByRequestedTime: infectionsByRequestedTimeSevere(data),
      severeCasesByRequestedTime: severeCasesByRequestedTimeSevere(data)
    }
  };
  return impactEstimation;
};

export default covid19ImpactEstimator;
