const hasBus = (
  busForth,
  secondRoundBus,
  thirdRoundBus,
  firstRound,
  secondRound,
  thirdRound,
) =>
  (firstRound === 'Y' && busForth === 'Y') ||
  (secondRound === 'Y' && secondRoundBus === 'Y') ||
  (thirdRound === 'Y' && thirdRoundBus === 'Y')

export { hasBus }
