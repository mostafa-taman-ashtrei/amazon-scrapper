"use client";

import Image from "next/image";
import Link from "next/link";
import ThemeToggler from "./ThemeToggler";

const Navbar = () => {
    return (
        <header className="w-full">
            <nav className="nav">
                <Link href="/" className="flex items-center gap-1">
                    <Image
                        src="/assets/icons/logo.svg"
                        width={27}
                        height={27}
                        alt="logo"
                    />

                    <p className="nav-logo">
                        Amazon<span className="text-primary">Scrapper</span>
                    </p>
                </Link>

                <div className="flex items-center ">
                    <ThemeToggler />
                </div>
            </nav>
        </header>
    );
};

export default Navbar;