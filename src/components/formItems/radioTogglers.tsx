import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface RadioOption {
  value: string;
  label: string;
  icon: import("@fortawesome/fontawesome-svg-core").IconProp;
}

interface RadioTogglersProps {
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
}

export default function RadioTogglers({ options, value, onChange }: RadioTogglersProps) {
  return (
    <div className="radio-togglers shadow">
      {options.map(option => (
        <label key={option.value}>
          <input
            type="radio"
            name="bgType"
            onClick={ev => onChange((ev.target as HTMLInputElement).value)}
            checked={value === option.value}
            value={option.value}
          />
          <div>
            <FontAwesomeIcon icon={option.icon} />
            <span>{option.label}</span>
          </div>
        </label>
      ))}
    </div>
  );
}
