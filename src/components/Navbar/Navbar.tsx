"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, ShoppingCart, Heart, Menu, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Image from "next/image"
import wmcTopNav from "@/public/images/wmc-topnav.svg"
import accoutn from "@/public/images/account.svg"
import middleNavLogo from "@/public/images/middleNavLogo.svg"
import { LiaFacebookSquare } from "react-icons/lia"
import { CiInstagram, CiLinkedin } from "react-icons/ci"
import { RiTwitterXFill } from "react-icons/ri"
import { getCartItems } from "@/lib/cart-utils"
import { useSession, signOut } from "next-auth/react"
import SearchModal from "../searchModal"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

export function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [cartItemCount, setCartItemCount] = useState(0)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [wishlistItem, setWishlistItemCount] = useState(0)

  const { data: session, status } = useSession()

  useEffect(() => {
    const updateCartCount = () => {
      const items = getCartItems()
      const count = items.length
      setCartItemCount(count)
    }

    const updateWishlistCount = () => {
      const storedWishlist = localStorage.getItem("wishlist")
      const wishlist = storedWishlist ? JSON.parse(storedWishlist) : []
      setWishlistItemCount(wishlist.length)
    }

    setIsMounted(true)
    updateCartCount()
    updateWishlistCount()

    window.addEventListener("storage", () => {
      updateCartCount()
      updateWishlistCount()
    })
    window.addEventListener("cartUpdated", updateCartCount)
    window.addEventListener("wishlistUpdated", updateWishlistCount)

    return () => {
      window.removeEventListener("storage", updateCartCount)
      window.removeEventListener("cartUpdated", updateCartCount)
      window.removeEventListener("wishlistUpdated", updateWishlistCount)
    }
  }, [])

  const handleLogout = async () => {
    setIsDropdownOpen(false)
    await signOut({ callbackUrl: "/login" })
  }

  return (
    <header className="sticky top-0 z-40 w-full bg-white">
      <div className="bg-white border-gray-200 py-4 px-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="block w-[72px] h-[72px]">
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
                e.preventDefault()
                setIsModalOpen(true)
              }}
            >
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  if (e.target.value.trim()) {
                    setIsModalOpen(true)
                  } else {
                    setIsModalOpen(false)
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
          <button className="md:hidden text-gray-600 mr-3" onClick={() => setIsSearchOpen(!isSearchOpen)}>
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

            {/* Account Dropdown */}
            <div className="text-white px-6 py-2 rounded-md hidden sm:flex relative">
              <div className="flex flex-col text-sm">
                <button
                  className="w-full text-left bg-white text-gray-700 border-gray-300 focus:outline-none flex items-center"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <Avatar>
                    <AvatarImage src={session?.user.image || accoutn || "/placeholder.svg"}></AvatarImage>
                    <AvatarFallback>{session?.user.name?.charAt(2)}</AvatarFallback>
                  </Avatar>
                  {/* <Image
                    src={session?.user.image || accoutn || "/placeholder.svg"}
                    alt="Account Icon"
                    width={36}
                    height={36}
                    className="mr-2 rounded-full"
                  /> */}
                  <ChevronDown />
                </button>

                {isDropdownOpen && (
                  <ul className="absolute top-10 right-0 w-40 bg-white border border-gray-300 rounded shadow-md mt-2 z-50">
                    {status === "loading" ? (
                      <li className="px-4 py-2 text-gray-500">Loading...</li>
                    ) : session ? (
                      <>
                        <p className="text-black font-bold px-4 py-2">{session?.user?.name}</p>
                        <li>
                          <Link href="/account" className="block px-4 py-2 hover:bg-gray-500/10 text-black" onClick={() => setIsDropdownOpen(false)}>My Account</Link>
                        </li>
                        <li>
                          <Link href="/order" className="block px-4 py-2 hover:bg-gray-500/10 text-black" onClick={() => setIsDropdownOpen(false)}>Orders</Link>
                        </li>
                        <li>
                          <Link href="/booking" className="block px-4 py-2 hover:bg-gray-500/10 text-black" onClick={() => setIsDropdownOpen(false)}>Bookings</Link>
                        </li>
                        <li>
                          <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-500/10 text-red-600">Logout</button>
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          <Link href="/login" className="block px-4 py-2 hover:bg-gray-500/10 text-black" onClick={() => setIsDropdownOpen(false)}>Login</Link>
                        </li>
                        <li>
                          <Link href="/sign-up" className="block px-4 py-2 hover:bg-gray-500/10 text-black" onClick={() => setIsDropdownOpen(false)}>Sign Up</Link>
                        </li>
                      </>
                    )}
                  </ul>
                )}
              </div>
            </div>

            {/* Mobile Menu */}
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <button className="md:hidden">
                  <Menu className="text-2xl ml-4" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4 mt-8">
                  <Link href="/" onClick={() => setIsSheetOpen(false)}>Home</Link>
                  <Link href="/products" onClick={() => setIsSheetOpen(false)}>Shop</Link>
                  <Link href="/blogs" onClick={() => setIsSheetOpen(false)}>Blog</Link>
                  <Link href="/blog" onClick={() => setIsSheetOpen(false)}>Community</Link>
                  <Link href="/all-coach" onClick={() => setIsSheetOpen(false)}>Find A Coach</Link>

                  <div className="border-t pt-4 mt-4">
                    {status === "loading" ? (
                      <div className="text-gray-500">Loading...</div>
                    ) : session ? (
                      <>
                        <Link href="/account" onClick={() => setIsSheetOpen(false)} className="block py-2">My Account</Link>
                        <Link href="/order" onClick={() => setIsSheetOpen(false)} className="block py-2">Orders</Link>
                        <Link href="/booking" onClick={() => setIsSheetOpen(false)} className="block py-2">Bookings</Link>
                        <button onClick={() => { setIsSheetOpen(false); handleLogout() }} className="block w-full text-left py-2 text-red-600">Logout</button>
                      </>
                    ) : (
                      <>
                        <Link href="/login" onClick={() => setIsSheetOpen(false)} className="block py-2">Login</Link>
                        <Link href="/sign-up" onClick={() => setIsSheetOpen(false)} className="block py-2">Sign Up</Link>
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
          <form className="flex" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(true) }}>
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 text-sm rounded-r-none border border-gray-300 h-10"
              autoFocus
            />
            <Button type="submit" size="sm" className="rounded-l-none bg-[#23547b] hover:bg-[#153a58] h-10 px-3">
              <Search className="h-4 w-4 text-white" />
            </Button>
          </form>
        </div>
      )}

      {/* Bottom Nav */}
      <div className="bg-white pb-4 hidden md:block border-[#23547B]">
        <div className="container mx-auto">
          <nav className="flex items-center justify-center gap-2 divide-x divide-gray-300">
            <Link href="/" className="text-lg font-medium hover:text-[#616161] leading-[120%] pr-4">HOME</Link>
            <Link href="/product" className="text-lg font-medium hover:text-[#23547B] px-4">SHOP</Link>
            <Link href="/blogs" className="text-lg font-medium hover:text-[#23547B] px-4">BLOG</Link>
            <Link href="/blog" className="text-lg font-medium hover:text-[#23547B] px-4">COMMUNITY</Link>
            <Link href="/all-coach" className="text-lg font-medium hover:text-[#23547B] px-4">FIND A COACH</Link>
          </nav>
        </div>
      </div>

      {/* 🔍 Search Modal */}
      <SearchModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        searchQuery={searchQuery}
      />
    </header>
  )
}
