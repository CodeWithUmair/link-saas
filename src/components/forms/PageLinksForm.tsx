'use client';

import { savePageLinks } from "@/actions/pageActions";
import SubmitButton from "@/components/buttons/SubmitButton";
import SectionBox from "@/components/layout/SectionBox";
import { upload } from "@/libs/upload";
import { FormLink } from "@/types";
import { faCloudArrowUp, faGripLines, faLink, faPlus, faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { FC, useState } from "react";
import toast from "react-hot-toast";
import { ReactSortable } from "react-sortablejs";

interface Page {
  links?: FormLink[];
}

interface ItemInterface extends FormLink {
  id: string;
}

const PageLinksForm: FC<{ page: Page }> = ({ page }) => {

  const [links, setLinks] = useState<ItemInterface[]>(page.links?.map(link => ({
    ...link,
    id: link.key,
  })) || []);

  async function save() {
    await savePageLinks(links.map(link => JSON.stringify(link)));
    toast.success('Saved!');
  }

  function addNewLink() {
    setLinks(prev => [
      ...prev,
      {
        id: Date.now().toString(), // Add id for sortable items
        key: Date.now().toString(),
        title: '',
        subtitle: '',
        icon: '',
        url: '',
      },
    ]);
  }

  function handleUpload(ev: React.ChangeEvent<HTMLInputElement>, linkKeyForUpload: string) {
    upload(ev, uploadedImageUrl => {
      setLinks(prevLinks => {
        const newLinks = [...prevLinks];
        newLinks.forEach((link) => {
          if (link.key === linkKeyForUpload) {
            link.icon = uploadedImageUrl;
          }
        });
        return newLinks;
      });
    });
  }

  function handleLinkChange(
    keyOfLinkToChange: string,
    prop: keyof FormLink,
    ev: React.ChangeEvent<HTMLInputElement>
  ) {
    setLinks(prev => {
      const newLinks = [...prev];
      newLinks.forEach((link) => {
        if (link.key === keyOfLinkToChange) {
          link[prop] = ev.target.value;
        }
      });
      return newLinks;
    });
  }

  function removeLink(linkKeyToRemove: string) {
    setLinks(prevLinks =>
      prevLinks.filter(l => l.key !== linkKeyToRemove)
    );
  }

  return (
    <SectionBox>
      <form action={save}>
        <h2 className="text-2xl font-bold mb-4">Links</h2>
        <button
          onClick={addNewLink}
          type="button"
          className="text-blue-500 text-lg flex gap-2 items-center cursor-pointer">
          <FontAwesomeIcon className="bg-blue-500 text-white p-1 rounded-full aspect-square" icon={faPlus} />
          <span>Add new</span>
        </button>
        <div className="">
          <ReactSortable
            handle={'.handle'}
            list={links} setList={setLinks}>
            {links.map(l => (
              <div key={l.key} className="mt-8 md:flex gap-6 items-center">
                <div className="handle">
                  <FontAwesomeIcon
                    className="text-gray-500 mr-2 cursor-ns-resize"
                    icon={faGripLines} />
                </div>
                <div className="text-center">
                  <div className="bg-gray-300 relative aspect-square overflow-hidden w-16 h-16 inline-flex justify-center items-center">
                    {l.icon && (
                      <Image
                        className="w-full h-full object-cover"
                        src={l.icon}
                        alt={'icon'}
                        width={64} height={64} />
                    )}
                    {!l.icon && (
                      <FontAwesomeIcon size="xl" icon={faLink} />
                    )}
                  </div>
                  <div>
                    <input
                      onChange={ev => handleUpload(ev, l.key)}
                      id={'icon' + l.key}
                      type="file"
                      className="hidden" />
                    <label htmlFor={'icon' + l.key} className="border mt-2 p-2 flex items-center gap-1 text-gray-600 cursor-pointer mb-2 justify-center">
                      <FontAwesomeIcon icon={faCloudArrowUp} />
                      <span>Change icon</span>
                    </label>
                    <button
                      onClick={() => removeLink(l.key)}
                      type="button" className="w-full bg-gray-300 py-2 px-3 mb-2 h-full flex gap-2 items-center justify-center">
                      <FontAwesomeIcon icon={faTrash} />
                      <span>Remove this link</span>
                    </button>
                  </div>
                </div>
                <div className="grow">
                  <label className="input-label">Title:</label>
                  <input
                    value={l.title}
                    onChange={ev => handleLinkChange(l.key, 'title', ev)}
                    type="text" placeholder="title" />
                  <label className="input-label">Subtitle:</label>
                  <input
                    value={l.subtitle}
                    onChange={ev => handleLinkChange(l.key, 'subtitle', ev)}
                    type="text" placeholder="subtitle (optional)" />
                  <label className="input-label">URL:</label>
                  <input
                    value={l.url}
                    onChange={ev => handleLinkChange(l.key, 'url', ev)}
                    type="text" placeholder="url" />
                </div>
              </div>
            ))}
          </ReactSortable>
        </div>
        <div className="border-t pt-4 mt-4">
          <SubmitButton className="max-w-xs mx-auto">
            <FontAwesomeIcon icon={faSave} />
            <span>Save</span>
          </SubmitButton>
        </div>
      </form>
    </SectionBox>
  );
}

export default PageLinksForm;