declare function SimpleAnalyze(str: string): string[];
declare type IUserOption = {
  style?: string;
  role?: string;
  className?: string;
};
declare function Mikan(text?: string, userOption?: IUserOption): string;
declare namespace Mikan {
  var split: typeof SimpleAnalyze;
}
export default Mikan;
