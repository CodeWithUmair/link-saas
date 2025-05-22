import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { cn } from "@/libs/utils";

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
      className={cn(`mx-auto w-40`, className)}
    >
      {pending ? <span>Saving...</span> : children}
    </Button>
  );
}
