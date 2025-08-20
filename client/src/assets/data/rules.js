export const carromRules = [
  {
    category: "Basic Setup",
    rules: [
      "The board is a square with four corner pockets.",
      "9 white coins, 9 black coins, 1 red (queen), and 1 striker.",
      "Whites vs. Blacks → decided at the start (usually by toss).",
      "The queen is placed at the center, surrounded by other coins in a circle."
    ]
  },
  {
    category: "Turns & Striking",
    rules: [
      "Each player uses the striker to hit coins into the pockets.",
      "The striker must be placed on or touching both baselines within the rectangle.",
      "A valid strike: striker must hit forward (not pulled back past the baseline).",
      "Player continues to play until they fail to pocket their coin."
    ]
  },
  {
    category: "Queen Rules",
    rules: [
      "The queen must be covered immediately in the same turn by pocketing one of your own coins.",
      "If the queen is pocketed but not covered → queen is returned to the center.",
      "The queen can only be legally covered after pocketing at least one of your coins first.",
      "Covering the queen means → queen + your coin must be pocketed before your last coin."
    ]
  },
  {
    category: "Fouls",
    rules: [
      "If striker is pocketed → penalty: one of your pocketed coins is returned to the board.",
      "If striker + your coin both pocketed → coin is returned + one additional penalty coin.",
      "If you pocket opponent’s coin → that coin is returned, plus you pay penalty (one of your coins goes back).",
      "If you pocket the last coin without covering queen → last coin is returned, queen is placed back.",
      "If you pocket striker + queen together → queen goes back + penalty applied.",
      "Touching the board with any body part (other than finger for striking) is foul.",
      "Double striking (hitting striker twice in one shot) is not allowed."
    ]
  },
  {
    category: "Winning",
    rules: [
      "The player who pockets all their coins (and legally covers the queen) wins the board.",
      "Without queen covered → game is not won, even if all coins are pocketed.",
      "Scoring (in match play): Winner scores points equal to opponent’s unpocketed coins.",
      "Queen adds extra 3 points if covered.",
      "Matches are usually played to 25 points or 8 boards."
    ]
  }
];
