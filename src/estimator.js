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

const currentlyInfectedImpact = (reported) => {
  return reported * 10;
};

const infectionsByRequestedTimeImpact = (period, time) => {
  switch (period) {
    case 'days':
      days = Math.floor(time / 3);
      return currentlyInfectedImpact(reported) * Math.pow(2, days);
      break;
    case 'weeks':
      days = Math.floor((time * 7) / 3);
      return currentlyInfectedImpact(reported) * Math.pow(2, days);
      break;
    case 'months':
      days = Math.floor((time * 30) / 3);
      return currentlyInfectedImpact(reported) * Math.pow(2, days);
      break;
    default:
      return;
  }
};

const severeCasesByRequestedTimeImpact = (period, time) => {
  return infectionsByRequestedTimeImpact(period, time) * 0.15;
};

const currentlyInfectedSevere = (reported) => {
  return reported * 50;
};
const infectionsByRequestedTimeSevere = (period, time) => {
  switch (period) {
    case 'days':
      days = Math.floor(time / 3);
      return currentlyInfectedSevere(reported) * Math.pow(2, days);
      break;
    case 'weeks':
      days = Math.floor((time * 7) / 3);
      return currentlyInfectedSevere(reported) * Math.pow(2, days);
      break;
    case 'months':
      days = Math.floor((time * 30) / 3);
      return currentlyInfectedSevere(reported) * Math.pow(2, days);
      break;
    default:
      return;
  }
};
const severeCasesByRequestedTimeSever = (period, time) => {
  return infectionsByRequestedTimeSevere(period, time) * 0.15;
};

export default covid19ImpactEstimator;
