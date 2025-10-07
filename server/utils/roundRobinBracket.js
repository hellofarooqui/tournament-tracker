export const roundRobinBracket = (teams) => {
    const numberOfTeams = teams.length;
  
    for(let x = 0; x < numberOfTeams; x++) {
        for(let y = x + 1; y < numberOfTeams; y++) {
            console.log(`${teams[x]} vs ${teams[y]}`);
        }
    }
}