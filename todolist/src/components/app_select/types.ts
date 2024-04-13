export type Option = {
  value: string | number;
  label: string | number;
};

export type OptionProps = {
  data: Option;
  isSelected: boolean;
  onSelectOption: () => void;
}

export type AppSelectProps = {
  data: Array<Option>;
  onSelectOption: (option: Option | null) => void;
};