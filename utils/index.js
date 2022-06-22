import dayjs from "dayjs";
// Utilisation du plugin IsoWeek de la librairie Day.js
const isoWeek = require("dayjs/plugin/isoWeek");
dayjs.extend(isoWeek);
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

// Fonction permettant de créer dynamiquement la partie semaine et jours du tableau
export const weeksAndDays = (start, end) => {
  // Variables des boucles
  let currentTimeStampDate;
  let currentDay;
  let currentNbWeek;
  let nbDay;
  let nbMonth;

  // Stockage des semaines
  const weeksList = {};

  // Stockage des jours
  const daysList = {};

  // Premier jour du tableau
  const startDay = dayjs(start);

  // Numero du jour de semaine du premier jour du tableau
  const nbStartDay = startDay.isoWeekday();

  // Dernier jour du tableau
  const endDay = dayjs(end);

  // Numero du jour de semaine du dernier jour du tableau
  const nbEndDay = endDay.isoWeekday();

  // Calcul du nombre de jours du tableau
  const nbArrayDays = endDay.diff(startDay, "day");

  // Calcul du nombre de semaine
  const nbArrayWeeks = () => {
    let result;
    if (nbStartDay === 7 && nbEndDay !== 7) {
      result = endDay.day(1).diff(startDay.day(-6), "week");
    } else if (nbStartDay === 7 && nbEndDay === 7) {
      result = endDay.day(-6).diff(startDay.day(-6), "week");
    } else if (nbStartDay !== 7 && nbEndDay === 7) {
      result = endDay.day(-6).diff(startDay.day(1), "week");
    } else {
      result = endDay.day(1).diff(startDay.day(1), "week");
    }
    return result;
  };

  // Calcul des colspan
  const colspanCalc = (i) => {
    let colspan;
    if (i === 0) {
      colspan = nbStartDay === 0 ? 1 : 8 - nbStartDay;
    } else if (i === nbArrayWeeks()) {
      colspan = nbEndDay === 0 ? 7 : nbEndDay;
    } else {
      colspan = 7;
    }
    return colspan;
  };

  // Boucle permettant de créer toutes les semaines du tableau
  for (let i = 0; i <= nbArrayWeeks(); i++) {
    currentTimeStampDate =
               nbStartDay === 7
                 ? startDay.day(-6).unix() + i * 3600 * 24 * 7 + 4 * 3600
                 : startDay.day(1).unix() + i * 3600 * 24 * 7 + 4 * 3600;
    currentDay = dayjs.unix(currentTimeStampDate);
    currentNbWeek = currentDay.isoWeek();
    weeksList[`week${i}`] = {
      name:
                    currentNbWeek < 10
                      ? `S0${currentNbWeek}`
                      : `S${currentNbWeek}`,
      key: dayjs.unix(currentTimeStampDate).format("YYYY-MM-DD"),
      colspan: colspanCalc(i),
    };
  }

  // Boucle permettant de créer tous les jours du tableau avec Day.js
  for (let i = 0; i <= nbArrayDays; i++) {
    currentTimeStampDate = startDay.unix() + i * 3600 * 24 + 4 * 3600;
    nbDay = dayjs.unix(currentTimeStampDate).$D;
    nbMonth = dayjs.unix(currentTimeStampDate).$M + 1;
    daysList[`day${i + 1}`] = {
      name: `${nbDay}/${nbMonth}`,
      key: dayjs.unix(currentTimeStampDate).format("YYYY-MM-DD"),
      date: dayjs.unix(currentTimeStampDate).format("YYYY-MM-DD"),
      // i === 0 ||
      borderLeft:
        // Fonctionnement de l'opérateur !! :
        //   1 - le premier ! en partant de la droite donne l'inverse de la valeur ciblée en booléan
        //   2 - le deuxième ! permet de donner l'inverse de cette valeur
        // au final on se retrouve avec la conversion de la valeur ciblée en booléan
        !!(
          i === weeksList.week0.colspan ||
              (i - weeksList.week0.colspan) % 7 === 0
        ),
      borderRight: !!(
        i === weeksList.week0.colspan - 1 ||
        (i - weeksList.week0.colspan + 8) % 7 === 0 ||
        i === nbArrayDays
      ),
    };
  }

  return { weeksList, daysList };
};

// Calcul des rowspan des couloirs et des plateformes
const rowSpanCalc = (arrayBase) => {
  const array = [];
  let varTemp;
  for (let i = 0; i < arrayBase.length; i++) {
    if (arrayBase.length === 1) {
      array.push(1);
    }
    if (i > 0 && i !== arrayBase.length - 1) {
      if (arrayBase[i] && arrayBase[i - 1]) {
        array.push(1);
      } else if (!arrayBase[i] && arrayBase[i - 1]) {
        varTemp = i - 1;
      } else if (arrayBase[i] && !arrayBase[i - 1]) {
        array.push(i - varTemp);
      }
    } else if (i === arrayBase.length - 1) {
      if (arrayBase[i] && arrayBase[i - 1]) {
        array.push(1);
        array.push(1);
      } else if (!arrayBase[i] && arrayBase[i - 1]) {
        array.push(2);
      } else if (!arrayBase[i] && !arrayBase[i - 1]) {
        array.push(i - varTemp + 1);
      } else if (arrayBase[i] && !arrayBase[i - 1]) {
        array.push(i - varTemp);
        array.push(1);
      }
    }
  }

  return array;
};

export const couloirAndRowspan = (payload) => {
  // Identification des index où commence un nouveau couloir
  const arrayBase = [];
  for (let index = 0; index < payload.length; index++) {
    if (
      index === 0 ||
               payload[index].id_couloir !== payload[index - 1].id_couloir
    ) {
      arrayBase.push(true);
    } else {
      arrayBase.push(false);
    }
  }

  // Ajout des propriétés nécessaires à l'affichage dynamique, au tableau de la sélection
  // courante de l'utilisateur.
  // Pour l'affichage des couloirs, leur rowspan et les darker border des cellules du tableau
  let i = 0;
  for (let indice = 0; indice < arrayBase.length; indice++) {
    if (arrayBase[indice]) {
      payload[indice] = {
        ...payload[indice],
        borderCellTop: true,
        displayCouloir: true,
        couloirRowspan: `${rowSpanCalc(arrayBase)[i]}`,
      };
      payload[indice - 1] = {
        ...payload[indice - 1],
        borderCellBottom: true,
      };
      i++;
    } else {
      payload[indice] = { ...payload[indice] };
    }
  }
  // console.log('two');
  return payload;
};

export const coPlAndRowspan = (payload) => {
  // Identification des index où commence une nouvelle plateforme
  const newArray = couloirAndRowspan(payload);
  // console.log('three');
  const arrayBase = [];
  for (let index = 0; index < newArray.length; index++) {
    if (
      index === 0 ||
               newArray[index].id_plateforme !==
                    newArray[index - 1].id_plateforme ||
               newArray[index].id_couloir !== newArray[index - 1].id_couloir
    ) {
      arrayBase.push(true);
    } else {
      arrayBase.push(false);
    }
  }

  // Ajout des propriétés nécessaires à l'affichage dynamique, au tableau de la sélection
  // courante de l'utilisateur.
  // Pour l'affichage des plateformes, leur rowspan et les darker border des applications du tableau
  let i = 0;
  for (let indice = 0; indice < arrayBase.length; indice++) {
    if (arrayBase[indice]) {
      payload[indice] = {
        ...payload[indice],
        borderAppTop: true,
        displayPlatform: true,
        platformRowspan: `${rowSpanCalc(arrayBase)[i]}`,
      };
      payload[indice - 1] = {
        ...payload[indice - 1],
        borderAppBottom: true,
      };
      i++;
    } else {
      payload[indice] = { ...payload[indice] };
    }
  }
  // console.log('four');
  return newArray;
};
