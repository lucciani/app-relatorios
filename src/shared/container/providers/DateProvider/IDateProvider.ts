interface IDateProvider {
  compareInHours(start_date: Date, end_date: Date): number;
  convertToUTC(date: Date): string;
  dateNow(): Date;
  compareInDays(start_date: Date, end_date: Date): number;
  addDays(days: number): Date;
  subtractDays(days: number): Date;
  addHours(hours: number): Date;
  compareIfBefore(start_date: Date, end_date: Date): boolean;
  dateFormat(date: string): string;
  filtroDate(date: string): string[];
  setDateOnly(date: string, time: string): string | undefined;
  getDateOnly(stringDate: string): Date | undefined;
  formatDateOnly(date?: Date): string | undefined;
  formatTimestampOnly(date?: Date): string | undefined;
  formatDateOnlyBr(date?: Date): string | undefined;
}

export { IDateProvider };
