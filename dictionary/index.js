import { locationPhrases } from "./location.js";
import { naturePhrases } from "./nature.js";
import { skyWeatherPhrases } from "./skyWeather.js";
import { childActionPhrases } from "./childAction.js";
import { educationActionPhrases } from "./educationAction.js";
import { objectEducationPhrases } from "./objectEducation.js";
import { expressionMoodPhrases } from "./expressionMood.js";
import { compositionCameraPhrases } from "./compositionCamera.js";

export const phraseDictionary = {
  ...locationPhrases,
  ...naturePhrases,
  ...skyWeatherPhrases,
  ...childActionPhrases,
  ...educationActionPhrases,
  ...objectEducationPhrases,
  ...expressionMoodPhrases,
  ...compositionCameraPhrases
};
