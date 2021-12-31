import ms from './index';

describe('ms(string)', function () {
  it('should not throw an error', function () {
    expect(function () {
      ms('1м');
    }).not.toThrowError();
  });

  it('should preserve ms', function () {
    expect(ms('100')).toBe(100);
  });

  it('should convert from m to ms', function () {
    expect(ms('1м')).toBe(60000);
  });

  it('should convert from h to ms', function () {
    expect(ms('1ч')).toBe(3600000);
  });

  it('should convert d to ms', function () {
    expect(ms('2д')).toBe(172800000);
  });

  it('should convert w to ms', function () {
    expect(ms('3н')).toBe(1814400000);
  });

  it('should convert s to ms', function () {
    expect(ms('1с')).toBe(1000);
  });

  it('should convert ms to ms', function () {
    expect(ms('100мс')).toBe(100);
  });

  it('should convert y to ms', function () {
    expect(ms('1г')).toBe(31557600000);
  });

  it('should work with decimals', function () {
    expect(ms('1.5ч')).toBe(5400000);
  });

  it('should work with multiple spaces', function () {
    expect(ms('1   с')).toBe(1000);
  });

  it('should return NaN if invalid', function () {
    // @ts-expect-error - We expect this to fail.
    expect(isNaN(ms('☃'))).toBe(true);
    // @ts-expect-error - We expect this to fail.
    expect(isNaN(ms('10-.5'))).toBe(true);
  });

  it('should be case-insensitive', function () {
    expect(ms('1.5Ч')).toBe(5400000);
  });

  it('should work with numbers starting with .', function () {
    expect(ms('.5мс')).toBe(0.5);
  });

  it('should work with negative integers', function () {
    expect(ms('-100мс')).toBe(-100);
  });

  it('should work with negative decimals', function () {
    expect(ms('-1.5ч')).toBe(-5400000);
    expect(ms('-10.5ч')).toBe(-37800000);
  });

  it('should work with negative decimals starting with "."', function () {
    expect(ms('-.5ч')).toBe(-1800000);
  });
});

// long strings

describe('ms(long string)', function () {
  it('should not throw an error', function () {
    expect(function () {
      ms('53 миллисекунды');
    }).not.toThrowError();
  });

  it('should convert milliseconds to ms', function () {
    expect(ms('53 миллисекунды')).toBe(53);
  });

  it('should convert msecs to ms', function () {
    expect(ms('17 миллисекунд')).toBe(17);
  });

  it('should convert sec to ms', function () {
    expect(ms('1 сек')).toBe(1000);
  });

  it('should convert from min to ms', function () {
    expect(ms('1 мин')).toBe(60000);
  });

  it('should convert from hr to ms', function () {
    expect(ms('1 ча')).toBe(3600000);
  });

  it('should convert days to ms', function () {
    expect(ms('2 дн')).toBe(172800000);
  });

  it('should convert weeks to ms', function () {
    expect(ms('1 н')).toBe(604800000);
  });

  it('should convert years to ms', function () {
    expect(ms('1 г')).toBe(31557600000);
  });

  it('should work with decimals', function () {
    expect(ms('1.5 часа')).toBe(5400000);
  });

  it('should work with negative integers', function () {
    expect(ms('-100 миллисекунд')).toBe(-100);
  });

  it('should work with negative decimals', function () {
    expect(ms('-1.5 часа')).toBe(-5400000);
  });

  it('should work with negative decimals starting with "."', function () {
    expect(ms('-.5 ч')).toBe(-1800000);
  });
});

// numbers

describe('ms(number, { long: true })', function () {
  it('should not throw an error', function () {
    expect(function () {
      ms(500, { long: true });
    }).not.toThrowError();
  });

  it('should support milliseconds', function () {
    expect(ms(500, { long: true })).toBe('500 миллисекунд');

    expect(ms(-500, { long: true })).toBe('-500 миллисекунд');
  });

  it('should support seconds', function () {
    expect(ms(1000, { long: true })).toBe('1 секунда');
    expect(ms(1200, { long: true })).toBe('1 секунда');
    expect(ms(10000, { long: true })).toBe('10 секунд');

    expect(ms(-1000, { long: true })).toBe('-1 секунда');
    expect(ms(-1200, { long: true })).toBe('-1 секунда');
    expect(ms(-10000, { long: true })).toBe('-10 секунд');
  });

  it('should support minutes', function () {
    expect(ms(60 * 1000, { long: true })).toBe('1 минута');
    expect(ms(60 * 1200, { long: true })).toBe('1 минута');
    expect(ms(60 * 10000, { long: true })).toBe('10 минут');

    expect(ms(-1 * 60 * 1000, { long: true })).toBe('-1 минута');
    expect(ms(-1 * 60 * 1200, { long: true })).toBe('-1 минута');
    expect(ms(-1 * 60 * 10000, { long: true })).toBe('-10 минут');
  });

  it('should support hours', function () {
    expect(ms(60 * 60 * 1000, { long: true })).toBe('1 час');
    expect(ms(60 * 60 * 1200, { long: true })).toBe('1 час');
    expect(ms(60 * 60 * 10000, { long: true })).toBe('10 часов');

    expect(ms(-1 * 60 * 60 * 1000, { long: true })).toBe('-1 час');
    expect(ms(-1 * 60 * 60 * 1200, { long: true })).toBe('-1 час');
    expect(ms(-1 * 60 * 60 * 10000, { long: true })).toBe('-10 часов');
  });

  it('should support days', function () {
    expect(ms(24 * 60 * 60 * 1000, { long: true })).toBe('1 день');
    expect(ms(24 * 60 * 60 * 1200, { long: true })).toBe('1 день');
    expect(ms(24 * 60 * 60 * 10000, { long: true })).toBe('10 дней');

    expect(ms(-1 * 24 * 60 * 60 * 1000, { long: true })).toBe('-1 день');
    expect(ms(-1 * 24 * 60 * 60 * 1200, { long: true })).toBe('-1 день');
    expect(ms(-1 * 24 * 60 * 60 * 10000, { long: true })).toBe('-10 дней');
  });

  it('should round', function () {
    expect(ms(234234234, { long: true })).toBe('3 дня');

    expect(ms(-234234234, { long: true })).toBe('-3 дня');
  });
});

// numbers

describe('ms(number)', function () {
  it('should not throw an error', function () {
    expect(function () {
      ms(500);
    }).not.toThrowError();
  });

  it('should support milliseconds', function () {
    expect(ms(500)).toBe('500 мс.');

    expect(ms(-500)).toBe('-500 мс.');
  });

  it('should support seconds', function () {
    expect(ms(1000)).toBe('1 с.');
    expect(ms(10000)).toBe('10 с.');

    expect(ms(-1000)).toBe('-1 с.');
    expect(ms(-10000)).toBe('-10 с.');
  });

  it('should support minutes', function () {
    expect(ms(60 * 1000)).toBe('1 м.');
    expect(ms(60 * 10000)).toBe('10 м.');

    expect(ms(-1 * 60 * 1000)).toBe('-1 м.');
    expect(ms(-1 * 60 * 10000)).toBe('-10 м.');
  });

  it('should support hours', function () {
    expect(ms(60 * 60 * 1000)).toBe('1 ч.');
    expect(ms(60 * 60 * 10000)).toBe('10 ч.');

    expect(ms(-1 * 60 * 60 * 1000)).toBe('-1 ч.');
    expect(ms(-1 * 60 * 60 * 10000)).toBe('-10 ч.');
  });

  it('should support days', function () {
    expect(ms(24 * 60 * 60 * 1000)).toBe('1 д.');
    expect(ms(24 * 60 * 60 * 10000)).toBe('10 д.');

    expect(ms(-1 * 24 * 60 * 60 * 1000)).toBe('-1 д.');
    expect(ms(-1 * 24 * 60 * 60 * 10000)).toBe('-10 д.');
  });

  it('should round', function () {
    expect(ms(234234234)).toBe('3 д.');

    expect(ms(-234234234)).toBe('-3 д.');
  });
});

// invalid inputs

describe('ms(invalid inputs)', function () {
  it('should throw an error, when ms("")', function () {
    expect(function () {
      // @ts-expect-error - We expect this to throw.
      ms('');
    }).toThrowError();
  });

  it('should throw an error, when ms(undefined)', function () {
    expect(function () {
      // @ts-expect-error - We expect this to throw.
      ms(undefined);
    }).toThrowError();
  });

  it('should throw an error, when ms(null)', function () {
    expect(function () {
      // @ts-expect-error - We expect this to throw.
      ms(null);
    }).toThrowError();
  });

  it('should throw an error, when ms([])', function () {
    expect(function () {
      // @ts-expect-error - We expect this to throw.
      ms([]);
    }).toThrowError();
  });

  it('should throw an error, when ms({})', function () {
    expect(function () {
      // @ts-expect-error - We expect this to throw.
      ms({});
    }).toThrowError();
  });

  it('should throw an error, when ms(NaN)', function () {
    expect(function () {
      ms(NaN);
    }).toThrowError();
  });

  it('should throw an error, when ms(Infinity)', function () {
    expect(function () {
      ms(Infinity);
    }).toThrowError();
  });

  it('should throw an error, when ms(-Infinity)', function () {
    expect(function () {
      ms(-Infinity);
    }).toThrowError();
  });
});
