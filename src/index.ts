// Helpers.
const s = 1000;
const m = s * 60;
const h = m * 60;
const d = h * 24;
const w = d * 7;
const mnth = d * 30;
const y = d * 365.25;

type Unit =
  | 'Год'
  | 'Года'
  | 'Лет'
  | 'Го'
  | 'Г'
  | 'Ле'
  | 'Л'
  | 'Месяц'
  | 'Месяца'
  | 'Месяцев'
  | 'Месяце'
  | 'Меся'
  | 'Мес'
  | 'Ме'
  | 'Неделя'
  | 'Недели'
  | 'Недель'
  | 'Недел'
  | 'Неде'
  | 'Нед'
  | 'Не'
  | 'Н'
  | 'День'
  | 'Дня'
  | 'Дней'
  | 'Ден'
  | 'Де'
  | 'Д'
  | 'Дн'
  | 'Дне'
  | 'Час'
  | 'Часа'
  | 'Часов'
  | 'Ча'
  | 'Часо'
  | 'Ч'
  | 'Минута'
  | 'Минуты'
  | 'Минут'
  | 'Мину'
  | 'Мин'
  | 'Ми'
  | 'М'
  | 'Секунда'
  | 'Секунды'
  | 'Секунд'
  | 'Секун'
  | 'Секу'
  | 'Сек'
  | 'Се'
  | 'С'
  | 'Миллисекунда'
  | 'Миллисекунды'
  | 'Миллисекунд'
  | 'Миллисеку'
  | 'Миллисек'
  | 'Миллисе'
  | 'Миллис'
  | 'Милли'
  | 'Милл'
  | 'Мил'
  | 'Мс';

type UnitCasePart = Unit | Uppercase<Unit> | Lowercase<Unit>;
type UnitAnyCase = UnitCasePart | `${UnitCasePart}.`;

export type StringValue =
  | `${number}`
  | `${number}${UnitAnyCase}`
  | `${number} ${UnitAnyCase}`;

export type LongReturnStringYearValue =
  | `${number} год`
  | `${number} года`
  | `${number} лет`;
export type LongReturnStringMonthValue =
  | `${number} месяц`
  | `${number} месяца`
  | `${number} месяцев`;
export type LongReturnStringWeekValue =
  | `${number} неделя`
  | `${number} недели`
  | `${number} недель`;
export type LongReturnStringDayValue =
  | `${number} день`
  | `${number} дня`
  | `${number} дней`;
export type LongReturnStringHourValue =
  | `${number} час`
  | `${number} часа`
  | `${number} часов`;
export type LongReturnStringMinuteValue =
  | `${number} минута`
  | `${number} минуты`
  | `${number} минут`;
export type LongReturnStringSecondValue =
  | `${number} секунда`
  | `${number} секунды`
  | `${number} секунд`;
export type LongReturnStringMillisecondValue =
  | `${number} миллисекунда`
  | `${number} миллисекунды`
  | `${number} миллисекунд`;
export type ShortReturnStringYearValue = `${number} г.` | `${number} л.`;
export type ShortReturnStringMonthValue = `${number} мес.`;
export type ShortReturnStringWeekValue = `${number} нед.`;
export type ShortReturnStringDayValue = `${number} д.`;
export type ShortReturnStringHourValue = `${number} ч.`;
export type ShortReturnStringMinuteValue = `${number} м.`;
export type ShortReturnStringSecondValue = `${number} с.`;
export type ShortReturnStringMillisecondValue = `${number} мс.`;
export type ReturnStringYearValue =
  | LongReturnStringYearValue
  | ShortReturnStringYearValue;
export type ReturnStringMonthValue =
  | LongReturnStringMonthValue
  | ShortReturnStringMonthValue;
export type ReturnStringWeekValue =
  | LongReturnStringWeekValue
  | ShortReturnStringWeekValue;
export type ReturnStringDayValue =
  | LongReturnStringDayValue
  | ShortReturnStringDayValue;
export type ReturnStringHourValue =
  | LongReturnStringHourValue
  | ShortReturnStringHourValue;
export type ReturnStringMinuteValue =
  | LongReturnStringMinuteValue
  | ShortReturnStringMinuteValue;
export type ReturnStringSecondValue =
  | LongReturnStringSecondValue
  | ShortReturnStringSecondValue;
export type ReturnStringMillisecondValue =
  | LongReturnStringMillisecondValue
  | ShortReturnStringMillisecondValue;
export type ReturnStringValue =
  | ReturnStringYearValue
  | ReturnStringMonthValue
  | ReturnStringWeekValue
  | ReturnStringDayValue
  | ReturnStringHourValue
  | ReturnStringMinuteValue
  | ReturnStringSecondValue
  | ReturnStringMillisecondValue;

interface Options {
  /**
   * Set to `true` to use verbose formatting. Defaults to `false`.
   */
  long?: boolean;
}

/**
 * Parse or format the given `val`.
 *
 * @param value - The string or number to convert
 * @param options - Options for the conversion
 * @throws Error if `value` is not a non-empty string or a number
 */
function ms(value: StringValue, options?: Options): number;
function ms(value: number, options?: Options): ReturnStringValue;
function ms(
  value: StringValue | number,
  options?: Options,
): ReturnStringValue | number {
  try {
    if (typeof value === 'string' && value.length > 0) {
      return parse(value);
    } else if (typeof value === 'number' && isFinite(value)) {
      return options?.long ? fmtLong(value) : fmtShort(value);
    }
    throw new Error('Value is not a string or number.');
  } catch (error) {
    const message = isError(error)
      ? `${error.message}. value=${JSON.stringify(value)}`
      : 'An unknown error has occured.';
    throw new Error(message);
  }
}

/**
 * Parse the given `str` and return milliseconds.
 */
function parse(str: string): number {
  str = String(str);
  if (str.length > 100) {
    throw new Error('Value exceeds the maximum length of 100 characters.');
  }
  const match =
    /^(-?(?:\d+){0,1}(\.|,)?\d+) *(миллисекунда?|миллисекунды?|мс|секунда?|секунды?|сек?|с|минута?|минуты?|мин?|м|часа?|часов?|ч|день?|дня?|дней?|д|неделя?|нед?|н|месяца?|месяцев?|мес|года?|лет?|л?|г)?(.)?$/i.exec(
      str,
    );
  if (!match) {
    return NaN;
  }
  const n = parseFloat(match[1]);
  const type = (match[3] || 'мс').toLowerCase() as Lowercase<Unit>;
  switch (type) {
    case 'год':
    case 'года':
    case 'лет':
    case 'го':
    case 'г':
    case 'ле':
    case 'л':
      return n * y;
    case 'месяц':
    case 'месяца':
    case 'месяцев':
    case 'меся':
    case 'мес':
    case 'ме':
      return n * mnth;
    case 'неделя':
    case 'недели':
    case 'недель':
    case 'недел':
    case 'неде':
    case 'нед':
    case 'не':
    case 'н':
      return n * w;
    case 'день':
    case 'дня':
    case 'дней':
    case 'ден':
    case 'де':
    case 'д':
    case 'дн':
    case 'дне':
      return n * d;
    case 'час':
    case 'часа':
    case 'часов':
    case 'ча':
    case 'часо':
    case 'ч':
      return n * h;
    case 'минута':
    case 'минуты':
    case 'минут':
    case 'мину':
    case 'мин':
    case 'ми':
    case 'м':
      return n * m;
    case 'секунда':
    case 'секунды':
    case 'секунд':
    case 'секун':
    case 'секу':
    case 'сек':
    case 'се':
    case 'с':
      return n * s;
    case 'миллисекунда':
    case 'миллисекунды':
    case 'миллисекунд':
    case 'миллисеку':
    case 'миллисек':
    case 'миллисе':
    case 'миллис':
    case 'милли':
    case 'милл':
    case 'мил':
    case 'мс':
      return n;
    default:
      // This should never occur.
      throw new Error(
        `The unit ${type as string} was matched, but no matching case exists.`,
      );
  }
}

export default ms;

/**
 * Short format for `ms`.
 */
function fmtShort(ms: number): ReturnStringValue {
  const msAbs = Math.abs(ms);
  if (msAbs >= y) return plural(ms, 'short', y, 'year');
  else if (msAbs >= mnth) return plural(ms, 'short', mnth, 'month');
  else if (msAbs >= w) return plural(ms, 'short', w, 'week');
  else if (msAbs >= d) return plural(ms, 'short', d, 'day');
  else if (msAbs >= h) return plural(ms, 'short', h, 'hour');
  else if (msAbs >= m) return plural(ms, 'short', m, 'minute');
  else if (msAbs >= s) return plural(ms, 'short', s, 'second');
  else return plural(ms, 'short', 1, 'millisecond');
}

/**
 * Long format for `ms`.
 */
function fmtLong(ms: number): ReturnStringValue {
  const msAbs = Math.abs(ms);
  if (msAbs >= y) return plural(ms, 'long', y, 'year');
  else if (msAbs >= mnth) return plural(ms, 'long', mnth, 'month');
  else if (msAbs >= w) return plural(ms, 'long', w, 'week');
  else if (msAbs >= d) return plural(ms, 'long', d, 'day');
  else if (msAbs >= h) return plural(ms, 'long', h, 'hour');
  else if (msAbs >= m) return plural(ms, 'long', m, 'minute');
  else if (msAbs >= s) return plural(ms, 'long', s, 'second');
  else return plural(ms, 'long', 1, 'millisecond');
}

const plurals = {
  long: {
    year: {
      one: '# год',
      few: '# года',
      other: '# лет',
    },
    month: {
      one: '# месяц',
      few: '# месяца',
      other: '# месяцев',
    },
    week: {
      one: '# неделя',
      few: '# недели',
      other: '# недель',
    },
    day: {
      one: '# день',
      few: '# дня',
      other: '# дней',
    },
    hour: {
      one: '# час',
      few: '# часа',
      other: '# часов',
    },
    minute: {
      one: '# минута',
      few: '# минуты',
      other: '# минут',
    },
    second: {
      one: '# секунда',
      few: '# секунды',
      other: '# секунд',
    },
    millisecond: {
      one: '# миллисекунда',
      few: '# миллисекунды',
      other: '# миллисекунд',
    },
  },
  short: {
    year: {
      one: '# г.',
      few: '# г.',
      other: '# л.',
    },
    month: {
      other: '# мес.',
    },
    week: {
      other: '# нед.',
    },
    day: {
      other: '# д.',
    },
    hour: {
      other: '# ч.',
    },
    minute: {
      other: '# м.',
    },
    second: {
      other: '# с.',
    },
    millisecond: {
      other: '# мс.',
    },
  },
};

/**
 * Pluralization helper.
 */
function plural(
  ms: number,
  type: 'long' | 'short',
  n: number,
  name:
    | 'year'
    | 'month'
    | 'week'
    | 'day'
    | 'hour'
    | 'minute'
    | 'second'
    | 'millisecond',
): ReturnStringValue {
  const result = Math.round(ms / n);
  const pluralType = new Intl.PluralRules('ru').select(result) as
    | 'one'
    | 'few'
    | 'many';
  const strings = plurals[type][name];
  if (isObjKey(pluralType, strings)) {
    return (strings[pluralType] as string).replace(
      '#',
      `${result}`,
    ) as ReturnStringValue;
  } else {
    return strings.other.replace('#', `${result}`) as ReturnStringValue;
  }
}

function isObjKey<T>(key: PropertyKey, obj: T): key is keyof T {
  return key in obj;
}

/**
 * A type guard for errors.
 */
function isError(error: unknown): error is Error {
  return typeof error === 'object' && error !== null && 'message' in error;
}
