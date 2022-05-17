import { Field, Int, ObjectType } from '@nestjs/graphql';
const dayjs = require('dayjs');

export default (dateArr: string[]): Months => {
  let months = {
    jan: 0,
    feb: 0,
    mar: 0,
    apr: 0,
    may: 0,
    jun: 0,
    jul: 0,
    aug: 0,
    sep: 0,
    oct: 0,
    nov: 0,
    dec: 0,
  };

  dateArr.forEach((date) => {
    let year = dayjs(date).year();
    let now = dayjs(new Date()).year();

    if (year === now) {
      let month = dayjs(date).month();

      switch (month) {
        case 0:
          Object.assign(months, { jan: (months.jan += 1) });
          break;
        case 1:
          Object.assign(months, { feb: (months.feb += 1) });
          break;
        case 2:
          Object.assign(months, { mar: (months.mar += 1) });
          break;
        case 3:
          Object.assign(months, { apr: (months.apr += 1) });
          break;
        case 4:
          Object.assign(months, { may: (months.may += 1) });
          break;
        case 5:
          Object.assign(months, { jun: (months.jun += 1) });
          break;
        case 6:
          Object.assign(months, { jul: (months.jul += 1) });
          break;
        case 7:
          Object.assign(months, { aug: (months.aug += 1) });
          break;
        case 8:
          Object.assign(months, { sep: (months.sep += 1) });
          break;
        case 9:
          Object.assign(months, { oct: (months.oct += 1) });
          break;
        case 10:
          Object.assign(months, { nov: (months.nov += 1) });
          break;
        case 11:
          Object.assign(months, { dec: (months.dec += 1) });
          break;
      }

      return months;
    }
  });

  return months;
};

@ObjectType()
export class Months {
  @Field((type) => Int)
  jan: number;
  @Field((type) => Int)
  feb: number;
  @Field((type) => Int)
  mar: number;
  @Field((type) => Int)
  apr: number;
  @Field((type) => Int)
  may: number;
  @Field((type) => Int)
  jun: number;
  @Field((type) => Int)
  jul: number;
  @Field((type) => Int)
  aug: number;
  @Field((type) => Int)
  sep: number;
  @Field((type) => Int)
  oct: number;
  @Field((type) => Int)
  nov: number;
  @Field((type) => Int)
  dec: number;
}
