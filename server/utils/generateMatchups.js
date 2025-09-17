export const generateMatchups = (teams) => {
  const matchups = [];
  
  for (let i = 0; i < teams.length; i++) {
    for (let j = i + 1; j < teams.length; j++) {
      matchups.push([teams[i], teams[j]]);
    }
  }
  
  return matchups;
}