import Image from "next/image";
import Link from "next/link";
import React from "react";
import NavItems from "./NavItems";
import UserDropDown from "./UserDropDown";
import { searchStocks } from "@/lib/actions/finnhub.action";

const Header = async ({ user }: { user: User }) => {
  const initialStocks = await searchStocks();
  console.log(
    `[HEADER] Fetched initialStocks. Count: ${initialStocks?.length}`
  );
  return (
    <header className="sticky top-0 header">
      <div className="container header-wrapper">
        <Link href="/">
          <Image
            src="/assets/icons/logo.svg"
            alt="Logo"
            width={140}
            height={32}
            className="h-8 w-auto cursor-pointer"
          />
        </Link>
        <nav className="hidden sm:block">
          <NavItems initialStocks={initialStocks} />
        </nav>
        <UserDropDown user={user} initialStocks={initialStocks} />
      </div>
    </header>
  );
};

export default Header;
