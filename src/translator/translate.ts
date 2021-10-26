import { Interpretation } from "../interfaces/interfaces";

import chalk from "chalk";

const TRANSITION_WORDS = [
  "Besides",
  "Furthermore",
  "Moreover",
  "In addition",
  "Also",
];

const UNCERTAINTY_WORDS = ["it is probable that", "it seems that"];

function shuffleWords(words: string[]) {
  const shuffledWords = words;

  for (let i = shuffledWords.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledWords[i], shuffledWords[j]] = [shuffledWords[j], shuffledWords[i]];
  }

  return shuffledWords;
}

function translate(interpretation: Interpretation): string {
  const itemsCount = interpretation.interpretedItemsCount;
  // const itemsData = int.itemsData;
  const interpretationStatus = interpretation.interpretation;

  let sentence = "";
  const plural = itemsCount! > 1 || false;

  switch (interpretationStatus) {
    case "dust":
      sentence += `there ${plural ? "are " : "is "}`;
      sentence += `${itemsCount!.toLocaleString()} dust operation${
        plural ? "s" : ""
      }`;
      break;

    case "nonspecific missing operation":
      sentence += `${itemsCount!.toLocaleString()} nonspecific operation`;
      sentence += `${plural ? "s are" : " is"} missing`;
      break;

    case "duplicated operation":
      sentence += `${itemsCount!.toLocaleString()} operation${
        plural ? "s are" : " is"
      } duplicated`;

      // interpretation += "(" + itemsData!.join('", "') + ")";

      break;

    case "nonduplicated extra operation":
      sentence += `there ${plural ? "are " : "is "}`;
      sentence += `${itemsCount!.toLocaleString()} operation${
        plural ? "s which are" : " which is an"
      } `;
      sentence += `extra operation${plural ? "s" : ""} but `;
      sentence += `not${plural ? "" : " a"} duplication of${
        plural ? "" : " an"
      } existing operation${plural ? "s" : ""}`;
      break;

    case "Mismatch: addresses":
      sentence += `${itemsCount!.toLocaleString()} operation${
        plural ? "s have" : "has"
      } an erroneous derived address`;
      break;

    case "Mismatch: amounts":
      sentence += `${itemsCount!.toLocaleString()} operation${
        plural ? "s have" : "has"
      } an erroneous amount`;
      break;

    case "Mismatch: token amounts":
      sentence += `${itemsCount!.toLocaleString()} token-related operation${
        plural ? "s have" : "has"
      } an erroneous amount`;
      break;

    case "Mismatch: token tickers":
      sentence += `${itemsCount!.toLocaleString()} token-related operation${
        plural ? "s have" : "has"
      } an erroneous ticker`;
      break;

    case interpretationStatus.match(/^unknown.*/)?.input:
      sentence += `there ${plural ? "are " : "is "}`;
      sentence += `${itemsCount!.toLocaleString()} comparison${
        plural ? "s that are" : " that is"
      } ${interpretationStatus}`;
      break;

    default:
      sentence = interpretationStatus;
      break;
  }

  return sentence;
}

function translateIntoHumanLanguage(interpretations: Interpretation[]) {
  const transitionWords = shuffleWords(TRANSITION_WORDS);
  const uncertaintyWords = shuffleWords(UNCERTAINTY_WORDS);
  let renderedSentence = "";

  interpretations.forEach(function (interpretation, i) {
    const certain = interpretation.certainty;

    renderedSentence =
      interpretations.length > 1 && renderedSentence
        ? renderedSentence
            .concat(transitionWords[i % transitionWords.length])
            .concat(", ")
        : "";

    if (!certain) {
      renderedSentence += `${uncertaintyWords[i % uncertaintyWords.length]} `;
    }

    renderedSentence += `${translate(interpretation)}. `;
  });

  return chalk.whiteBright(renderedSentence);
}

export { translateIntoHumanLanguage };
