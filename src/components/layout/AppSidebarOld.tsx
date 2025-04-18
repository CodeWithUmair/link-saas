"use client";

import LogoutButton from "@/components/buttons/LogoutButton";
import { faFileLines } from "@fortawesome/free-regular-svg-icons";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ArrowLeft } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function AppSidebar() {
  const path = usePathname();

  return (
    <nav className="inline-flex mx-auto flex-col text-center mt-8 gap-2 text-gray-500">
      <Link
        href={"/dashboard/account"}
        className={
          "flex gap-4 p-2 " + (path === "/dashboard/account" ? "text-primary" : "")
        }
      >
        <FontAwesomeIcon
          fixedWidth={true}
          icon={faFileLines}
          className={"w-6 h-6"}
        />
        <span className="">My Page</span>
      </Link>
      <Link
        href={"/analytics"}
        className={
          "flex gap-4 p-2 " + (path === "/analytics" ? "text-primary" : "")
        }
      >
        <FontAwesomeIcon
          fixedWidth={true}
          icon={faChartLine}
          className={"w-6 h-6"}
        />
        <span className="">Analytics</span>
      </Link>
      <LogoutButton
        iconLeft={true}
        className={"flex gap-4 items-center text-gray-500 p-2"}
        iconClasses={"w-6 h-6"}
      />
      <Link
        href={"/"}
        className="flex items-center gap-2 text-xs text-gray-500 border-t pt-4"
      >
        <ArrowLeft size={12} />
        <span>Back to website</span>
      </Link>
    </nav>
  );
}
