const currentlyInfectedImpact = (reported) => {
  return reported * 10;
};

const infectionsByRequestedTimeImpact = (period, time) => {
  if (period === 'days') {
    const days = Math.floor(time / 3);
    return currentlyInfectedImpact(reported) * 2 ** days;
  } else if (period === 'weeks') {
    const days = Math.floor((time * 7) / 3);
    return currentlyInfectedImpact(reported) * 2 ** days;
  }
  const days = Math.floor((time * 30) / 3);
  return currentlyInfectedImpact(reported) * 2 ** days;
};

const severeCasesByRequestedTimeImpact = (period, time) => {
  return infectionsByRequestedTimeImpact(period, time) * 0.15;
};

const currentlyInfectedSevere = (reported) => {
  return reported * 50;
};
const infectionsByRequestedTimeSevere = (period, time) => {
  if (period === 'days') {
    const days = Math.floor(time / 3);
    return currentlyInfectedSevere(reported) * 2 ** days;
  } else if (period === 'weeks') {
    const days = Math.floor((time * 7) / 3);
    return currentlyInfectedSevere(reported) * 2 ** days;
  }
  const days = Math.floor((time * 30) / 3);
  return currentlyInfectedSevere(reported) * 2 ** days;
};
const severeCasesByRequestedTimeSever = (period, time) => {
  return infectionsByRequestedTimeSevere(period, time) * 0.15;
};

const covid19ImpactEstimator = (data) => {
  reported = data.reportedCases;
  period = data.periodType;
  time = data.timeToElapse;
  const impactEstimation = {
    data: data,
    impact: {
      currentlyInfected: currentlyInfectedImpact(reported),
      infectionsByRequestedTime: infectionsByRequestedTimeImpact(period, time),
      severeCasesByRequestedTime: severeCasesByRequestedTimeImpact(period, time)
    },
    severeImpact: {
      currentlyInfected: currentlyInfectedSevere(reported),
      infectionsByRequestedTime: infectionsByRequestedTimeSevere(period, time),
      severeCasesByRequestedTime: severeCasesByRequestedTimeSever(period, time)
    }
  };

  return impactEstimation;
};
export default covid19ImpactEstimator;
