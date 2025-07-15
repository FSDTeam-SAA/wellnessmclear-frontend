"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
import { useSession, signOut } from "next-auth/react";
import SearchModal from "../searchModal";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { LogoutModal } from "../LogoutModal";
import noImage from "@/public/images/no-image.jpg";

export function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [wishlistItem, setWishlistItemCount] = useState(0);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const { data: session, status } = useSession();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "authenticated") {
      console.log("Session Data:", session?.user?.name);
    } else {
      console.log("Not authenticated or loading:", status);
    }
  }, [session, status]);

  const user = session?.user;

  useEffect(() => {
    const updateCartCount = () => {
      const items = getCartItems();
      const count = items.length;
      setCartItemCount(count);
    };

    const updateWishlistCount = () => {
      const storedWishlist = localStorage.getItem("wishlist");
      const wishlist = storedWishlist ? JSON.parse(storedWishlist) : [];
      setWishlistItemCount(wishlist.length);
    };

    setIsMounted(true);
    updateCartCount();
    updateWishlistCount();

    setIsMounted(true);
    updateCartCount();
    updateWishlistCount();

    window.addEventListener("storage", () => {
      updateCartCount();
      updateWishlistCount();
    });
    window.addEventListener("cartUpdated", updateCartCount);
    window.addEventListener("wishlistUpdated", updateWishlistCount);

    return () => {
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("cartUpdated", updateCartCount);
      window.removeEventListener("wishlistUpdated", updateWishlistCount);
    };
  }, []);

  const handleLogoutClick = () => {
    setIsDropdownOpen(false);
    setIsLogoutModalOpen(true);
  };

  const handleLogoutConfirm = async () => {
    setIsLoggingOut(true);
    try {
      await signOut({ callbackUrl: "/login" });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoggingOut(false);
      setIsLogoutModalOpen(false);
    }
  };

  const handleLogoutCancel = () => {
    setIsLogoutModalOpen(false);
  };

  const isActiveRoute = (href:string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white">
      <div className="bg-[#7B8C95] text-white font-medium leading-[120%] px-2 text-sm">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center md:pl-0">
            <Image
              src={wmcTopNav}
              alt="WellnessMclear Logo"
              width={40}
              height={40}
              className="h-[72px] w-[72px] object-contain"
              priority
            />
          </div>
          <div className="flex-1 text-center hidden lg:block">
            {/* <span className="text-sm">
              Special Offers: Saved up to 30% by Purchase wellness things
            </span> */}
          </div>
          <div className="flex items-center space-x-[18px] md:pr-0">
            <LiaFacebookSquare className="text-3xl" />
            <CiInstagram className="text-3xl" />
            <RiTwitterXFill className="text-3xl" />
            <CiLinkedin className="text-3xl" />
          </div>
        </div>
      </div>

      <div className="bg-white border-gray-200 py-4 px-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Link
              href="/"
              className="block lg:w-[72px] lg:h-[72px] w-[60px] h-[60px]"
            >
              <Image
                src={middleNavLogo || "/placeholder.svg"}
                alt="Logo"
                width={72}
                height={72}
                className="w-full h-full object-contain"
                priority
              />
            </Link>
          </div>

          {/* Desktop Search */}
          <div className="flex-1 max-w-md mx-8 hidden md:block">
            <form
              className="relative w-[558px]"
              onSubmit={(e) => {
                e.preventDefault();
                setIsModalOpen(true);
              }}
            >
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (e.target.value.trim()) {
                    setIsModalOpen(true);
                  } else {
                    setIsModalOpen(false);
                  }
                }}
                className="w-full h-[52px] pl-4 pr-12 border-[1.5px] border-[#6A93B6] rounded-full"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#A8C2A3] hover:bg-[#9ec097] text-white p-2 rounded-full"
              >
                <Search className="w-5 h-5" />
              </button>
            </form>
          </div>

          {/* Mobile Search Icon */}
          <button
            className="md:hidden text-gray-600 mr-3"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search className="text-2xl" />
          </button>

          {/* Icons */}
          <div className="flex items-center">
            <Link href="/wishlist" className="relative p-2 flex">
              <Heart className="text-2xl text-gray-600" />
              {isMounted && (
                <Badge className="absolute -top-1 -right-1 bg-[#6A93B6] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center p-0">
                  {wishlistItem}
                </Badge>
              )}
            </Link>

            <Link href="/cart" className="relative p-2 flex">
              <ShoppingCart className="text-2xl text-gray-600" />
              {isMounted && (
                <Badge className="absolute -top-1 -right-1 bg-[#6A93B6] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center p-0">
                  {cartItemCount}
                </Badge>
              )}
            </Link>

            {user ? (
              <div className="text-white px-4 py-2 hidden sm:flex relative items-center">
                <div className="flex flex-col text-sm">
                  <div
                    className="w-full text-left bg-white text-gray-700 border-gray-300 focus:outline-none flex items-center cursor-pointer"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <Avatar>
                      <AvatarImage
                        src={session?.user.image || accoutn || noImage}
                      />
                      <AvatarFallback className="font-bold text-xl">
                        {session?.user.name?.charAt(2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <ChevronDown />
                  </div>
                  {isDropdownOpen && (
                    <ul className="absolute top-10 right-0 w-40 bg-white border border-gray-300 rounded shadow-md mt-2 z-50">
                      {status === "loading" ? (
                  <li className="px-4 py-2 text-gray-500">Loading...</li>
                ) : (
                  <>
                    <p className="text-black font-bold px-4 py-2">
                      {user.name}
                    </p>
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
                      <button
                        onClick={handleLogoutClick}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-500/10 text-red-600"
                      >
                        Logout
                      </button>
                    </li>
                  </>
                )}
                    </ul>
                  )}
                </div>
              </div>
            ) : (
              <div className="hidden sm:flex items-center px-4">
                <Link
                  href="/login"
                  className="text-sm px-4 py-2 bg-[#A8C2A3] text-white rounded-md hover:bg-[#82ac79] transition-colors"
                >
                  Login
                </Link>
              </div>
            )}

            {/* Mobile Menu */}
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <button className="md:hidden">
                  <Menu className="text-2xl ml-4" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4 mt-8">
                  <Link 
                    href="/" 
                    onClick={() => setIsSheetOpen(false)}
                    className={isActiveRoute("/") ? "text-[#131313]" : "text-[#616161]"}
                  >
                    Home
                  </Link>
                  <Link 
                    href="/product" 
                    onClick={() => setIsSheetOpen(false)}
                    className={isActiveRoute("/product") ? "text-[#131313]" : "text-[#616161]"}
                  >
                    SHOP
                  </Link>
                  <Link 
                    href="/blogs" 
                    onClick={() => setIsSheetOpen(false)}
                    className={isActiveRoute("/blogs") ? "text-[#131313]" : "text-[#616161]"}
                  >
                    BLOG
                  </Link>
                  <Link 
                    href="/community" 
                    onClick={() => setIsSheetOpen(false)}
                    className={isActiveRoute("/community") ? "text-[#131313]" : "text-[#616161]"}
                  >
                    COMMUNITY
                  </Link>
                  <Link 
                    href="/all-coach" 
                    onClick={() => setIsSheetOpen(false)}
                    className={isActiveRoute("/all-coach") ? "text-[#131313]" : "text-[#616161]"}
                  >
                    FIND A COACH
                  </Link>

                  <div className="border-t pt-4 mt-4">
                    {status === "loading" ? (
                      <div className="text-gray-500">Loading...</div>
                    ) : session ? (
                      <>
                        <Link
                          href="/account"
                          onClick={() => setIsSheetOpen(false)}
                          className={`block py-2 ${isActiveRoute("/account") ? "text-[#131313]" : "text-[#616161]"}`}
                        >
                          My Account
                        </Link>
                        <Link
                          href="/order"
                          onClick={() => setIsSheetOpen(false)}
                          className={`block py-2 ${isActiveRoute("/order") ? "text-[#131313]" : "text-[#616161]"}`}
                        >
                          Orders
                        </Link>
                        <Link
                          href="/booking"
                          onClick={() => setIsSheetOpen(false)}
                          className={`block py-2 ${isActiveRoute("/booking") ? "text-[#131313]" : "text-[#616161]"}`}
                        >
                          Bookings
                        </Link>
                        <button
                          onClick={() => {
                            setIsSheetOpen(false);
                            handleLogoutClick();
                          }}
                          className="block w-full text-left py-2 text-red-600"
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          href="/login"
                          onClick={() => setIsSheetOpen(false)}
                          className={`block py-2 ${isActiveRoute("/login") ? "text-[#131313]" : "text-[#616161]"}`}
                        >
                          Login
                        </Link>
                        <Link
                          href="/sign-up"
                          onClick={() => setIsSheetOpen(false)}
                          className={`block py-2 ${isActiveRoute("/sign-up") ? "text-[#131313]" : "text-[#616161]"}`}
                        >
                          Sign Up
                        </Link>
                      </>
                    )}
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Mobile Search Form */}
      {isSearchOpen && (
        <div className="bg-white py-2 px-4 md:hidden">
          <form
            className="flex"
            onSubmit={(e) => {
              e.preventDefault();
              setIsModalOpen(true);
            }}
          >
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
      <div className="bg-white pb-4 hidden md:block border-[#23547B]">
        <div className="container mx-auto">
          <nav className="flex items-center justify-center gap-2 divide-x divide-gray-300">
            <Link
              href="/"
              className={`text-lg font-medium leading-[120%] pr-4 ${
                isActiveRoute("/") ? "text-[#131313]" : "text-[#616161]"
              }`}
            >
              HOME
            </Link>
            <Link
              href="/product"
              className={`text-lg font-medium px-4 ${
                isActiveRoute("/product") ? "text-[#131313]" : "hover:text-[#23547B] text-[#616161]"
              }`}
            >
              SHOP
            </Link>
            <Link
              href="/blogs"
              className={`text-lg font-medium px-4 ${
                isActiveRoute("/blogs") ? "text-[#131313]" : "hover:text-[#23547B] text-[#616161]"
              }`}
            >
              BLOG
            </Link>
            <Link
              href="/community"
              className={`text-lg font-medium px-4 ${
                isActiveRoute("/community") ? "text-[#131313]" : "hover:text-[#23547B] text-[#616161]"
              }`}
            >
              COMMUNITY
            </Link>
            <Link
              href="/all-coach"
              className={`text-lg font-medium px-4 ${
                isActiveRoute("/all-coach") ? "text-[#131313]" : "hover:text-[#23547B] text-[#616161]"
              }`}
            >
              FIND A COACH
            </Link>
          </nav>
        </div>
      </div>

      {/* Search Modal */}
      <SearchModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        searchQuery={searchQuery}
      />

      {/* Logout Confirmation Modal */}
      <LogoutModal
        open={isLogoutModalOpen}
        onClose={handleLogoutCancel}
        onConfirm={handleLogoutConfirm}
        isLoading={isLoggingOut}
      />
    </header>
  );
}