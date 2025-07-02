"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ShoppingCart, Heart, Menu, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import wmcTopNav from "@/public/images/wmc-topnav.svg";
import accoutn from "@/public/images/account.svg";
import middleNavLogo from "@/public/images/middleNavLogo.svg";
import { LiaFacebookSquare } from "react-icons/lia";
import { CiInstagram, CiLinkedin } from "react-icons/ci";
import { RiTwitterXFill } from "react-icons/ri";
import { getCartItems } from "@/lib/cart-utils";

export function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const updateCartCount = () => {
      const items = getCartItems();
      const count = items.reduce((sum, item) => sum + item.quantity, 0);
      setCartItemCount(count);
    };
    setIsMounted(true);
    updateCartCount();

    window.addEventListener("storage", updateCartCount);
    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full bg-white">
      {/* Top Header */}
      <div className="bg-[#7B8C95] text-white font-medium leading-[120%] px-2 text-sm">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center md:pl-0">
            <Image
              src={wmcTopNav}
              alt="WellnessMclear Logo"
              width={40}
              height={40}
              className="h-[48px] w-[72px] object-contain"
              priority
            />
          </div>
          <div className="flex-1 text-center hidden lg:block">
            <span className="text-sm">
              Special Offers: Saved up to 30% by Purchase wellness things
            </span>
          </div>
          <div className="flex items-center space-x-[18px] md:pr-0">
            <LiaFacebookSquare className="text-3xl" />
            <CiInstagram className="text-3xl" />
            <RiTwitterXFill className="text-3xl" />
            <CiLinkedin className="text-3xl" />
          </div>
        </div>
      </div>

      {/* Middle Navbar */}
      <div className="bg-white border-gray-200 py-4 px-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="block w-[72px] h-[72px]">
              <Image
                src={middleNavLogo}
                alt="Lawbie Logo"
                width={72}
                height={72}
                className="w-full h-full object-contain"
                priority
              />
            </Link>
          </div>

          <div className="flex-1 max-w-md mx-8 hidden md:block">
            <form className="relative w-[558px]">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-[52px] pl-4 pr-12 border-[1.5px] border-[#6A93B6] rounded-full"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#A8C2A3] hover:bg-[#9ec097] text-white p-2 rounded-full flex items-center justify-center"
              >
                <Search className="w-5 h-5" />
              </button>
            </form>
          </div>

          <button
            className="md:hidden text-gray-600 mr-3"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search className="text-2xl" />
          </button>

          <div className="flex items-center">
            <Link href="/wishlist" className="relative p-2">
              <Heart className="text-2xl text-gray-600" />
            </Link>
            <Link href="/cart" className="relative p-2">
              <ShoppingCart className="text-2xl text-gray-600" />
              {isMounted && (
                <Badge className="absolute -top-1 -right-1 bg-[#6A93B6] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center p-0">
                  {cartItemCount}
                </Badge>
              )}
            </Link>

            {/* Account Dropdown */}
            <div className="text-white px-6 py-2 rounded-md hidden sm:flex relative">
              <div className="flex flex-col text-sm">
                <button 
                  className="w-full text-left bg-white text-gray-700 border-gray-300 focus:outline-none flex items-center"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <Image
                    src={accoutn}
                    alt="Account Icon"
                    width={36}
                    height={36}
                    className="mr-2"
                  />
                  <ChevronDown />
                </button>
                {isDropdownOpen && (
                  <ul className="absolute top-10 right-0 w-40 bg-white border border-gray-300 rounded shadow-md mt-2 z-50">
                    <li>
                      <Link
                        href="/account"
                        className="block px-4 py-2 hover:bg-gray-500/10 text-black"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        My Account
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/order"
                        className="block px-4 py-2 hover:bg-gray-500/10 text-black"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Orders
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/booking"
                        className="block px-4 py-2 hover:bg-gray-500/10 text-black"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Bookings
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/login"
                        className="block px-4 py-2 hover:bg-gray-500/10 text-black"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/signup"
                        className="block px-4 py-2 hover:bg-gray-500/10 text-black"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Sign Up
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/signup"
                        className="block px-4 py-2 hover:bg-gray-500/10 text-red-600"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Logout
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            </div>

            {/* Mobile Sheet Menu */}
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <button className="md:hidden">
                  <Menu className="text-2xl ml-4 lg:ml-0" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4 mt-8">
                  <Link href="/" onClick={() => setIsSheetOpen(false)}>
                    Home
                  </Link>
                  <Link href="/products" onClick={() => setIsSheetOpen(false)}>
                    SHOP
                  </Link>
                  <Link href="/blog" onClick={() => setIsSheetOpen(false)}>
                    BLOG
                  </Link>
                  <Link href="/blogs" onClick={() => setIsSheetOpen(false)}>
                    COMMUNITY
                  </Link>
                  <Link href="/blog" onClick={() => setIsSheetOpen(false)}>
                    FIND A COACH
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      {isSearchOpen && (
        <div className="bg-white py-2 px-4 md:hidden">
          <form className="flex">
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 text-sm rounded-r-none border border-gray-300 h-10"
              autoFocus
            />
            <Button
              type="submit"
              size="sm"
              className="rounded-l-none bg-[#23547b] hover:bg-[#153a58] h-10 px-3"
            >
              <Search className="h-4 w-4 text-white" />
            </Button>
          </form>
        </div>
      )}

      {/* Bottom Nav */}
      <div className="bg-white pb-4 hidden md:block border-b-[1.5px] border-[#23547B]">
        <div className="container mx-auto">
          <nav className="flex items-center justify-center gap-2 divide-x divide-gray-300">
            <Link href="/" className="text-lg font-medium hover:text-[#616161] leading-[120%] pr-4">
              HOME
            </Link>
            <Link href="/products" className="text-lg font-medium hover:text-[#23547B] px-4">
              SHOP
            </Link>
            <Link href="/blogs" className="text-lg font-medium hover:text-[#23547B] px-4">
              BLOG
            </Link>
            <Link href="/blog" className="text-lg font-medium hover:text-[#23547B] px-4">
              COMMUNITY
            </Link>
            <Link href="/blog" className="text-lg font-medium hover:text-[#23547B] px-4">
              FIND A COACH
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}