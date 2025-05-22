"use client";

import { savePageButtons } from "@/actions/pageActions";
import SubmitButton from "@/components/buttons/SubmitButton";
import SectionBox from "@/components/layout/SectionBox";
import { ReactSortable } from "react-sortablejs";
import {
  faGripLines,
  faPlus,
  faSave,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import toast from "react-hot-toast";
import { allButtons } from "@/constants/data";
import { ButtonItem } from "@/types";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Save } from "lucide-react";

function upperFirst(str: string): string {
  return str.slice(0, 1).toUpperCase() + str.slice(1);
}

interface Page {
  buttons?: Record<string, string>;
}

interface SortableButtonItem extends ButtonItem {
  id: string;
}

export default function PageButtonsForm({ page }: { page: Page }) {

  const pageSavedButtonsKeys = Object.keys(page.buttons || {});

  const pageSavedButtonsInfo: SortableButtonItem[] = pageSavedButtonsKeys
    .map((k) => {
      const b = allButtons.find((b) => b.key === k);
      return b ? { ...b, id: b.key } : undefined; // <-- Use key as id
    })
    .filter((b): b is SortableButtonItem => b !== undefined);

  const [activeButtons, setActiveButtons] = useState<SortableButtonItem[]>(pageSavedButtonsInfo);

  function addButtonToProfile(button: ButtonItem) {
    setActiveButtons((prevButtons) => [
      ...prevButtons,
      { ...button, id: button.key },
    ]);
  }

  function removeButton({ key: keyToRemove }: { key: string }) {
    setActiveButtons((prevButtons) =>
      prevButtons.filter((button) => button.key !== keyToRemove)
    );
  }

  async function saveButtons(formData: FormData) {
    await savePageButtons(formData);
    toast.success("Settings saved!");
  }

  const availableButtons: ButtonItem[] = allButtons
    .map((b) => ({ ...b, id: b.key })) // Ensure each button has an id
    .filter((b1) => !activeButtons.some((b2) => b2.key === b1.key));

  return (
    <SectionBox>
      <form action={saveButtons}>
        <h2 className="text-2xl font-bold mb-4">Buttons</h2>
        <ReactSortable<SortableButtonItem>
          handle=".handle"
          list={activeButtons}
          setList={setActiveButtons}
        >
          {activeButtons.map((b) => (
            <div key={b.key} className="mb-4 md:flex items-center">
              <div className="w-56 flex h-full text-gray-700 p-2 gap-2 items-center">
                <FontAwesomeIcon
                  icon={faGripLines}
                  className="cursor-pointer text-gray-400 handle p-2"
                />
                <FontAwesomeIcon icon={b.icon} />
                <span>{upperFirst(b.label)}:</span>
              </div>
              <div className="grow flex gap-2">
                <Input
                  placeholder={b.placeholder}
                  name={b.key}
                  defaultValue={page.buttons?.[b.key] || ""}
                  type="text"
                  className="mb-0"
                />
                <Button
                  onClick={() => removeButton(b)}
                  type="button"
                  variant="destructive"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </div>
            </div>
          ))}

        </ReactSortable>
        <div className="flex flex-wrap gap-2 mt-4 border-y py-4">
          {availableButtons.map((b) => (
            <Button
              key={b.key}
              type="button"
              onClick={() => addButtonToProfile(b)}
            >
              <span>{upperFirst(b.label)}</span>
              <FontAwesomeIcon icon={faPlus} />
            </Button>
          ))}
        </div>
        <div className="max-w-40 mx-auto mt-8">
          <SubmitButton>
            <span>Save</span>
            <Save strokeWidth={2.5} size={28} />
          </SubmitButton>
        </div>
      </form>
    </SectionBox>
  );
}
