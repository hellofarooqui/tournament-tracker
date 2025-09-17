const shuffleGamesAvoidConsecutive = (games, maxAttempts = 1000) => {
  if (!games || games.length <= 1) {
    return games;
  }

  let attempts = 0;
  let bestShuffle = [...games];
  let minConflicts = countConsecutiveConflicts(bestShuffle);

  while (attempts < maxAttempts && minConflicts > 0) {
    const shuffled = [...games];
    
    // Fisher-Yates shuffle
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    const conflicts = countConsecutiveConflicts(shuffled);
    
    if (conflicts < minConflicts) {
      minConflicts = conflicts;
      bestShuffle = shuffled;
    }

    if (minConflicts === 0) {
      break;
    }

    attempts++;
  }

  // If we couldn't find a perfect solution, try to fix remaining conflicts
  if (minConflicts > 0) {
    bestShuffle = fixConsecutiveConflicts(bestShuffle);
  }

  return bestShuffle;
}