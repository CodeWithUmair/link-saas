import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

export default function SubmitButton({
  children,
  className = "",
  disabled = false, // <-- add this
}: {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean; // <-- add this
}) {
  const { pending } = useFormStatus();
  const isDisabled = pending || disabled; // combine both states

  return (
    <Button
      type="submit"
      disabled={isDisabled}
      className={
        "bg-primary disabled:bg-primary/70 text-background disabled:text-gray-200 py-2 px-4 mx-auto w-full flex gap-2 items-center justify-center " +
        className
      }
    >
      {pending && <span>Saving...</span>}
      {!pending && children}
    </Button>
  );
}
