"use client";

import Link from 'next/link';
import { ShoppingCart, Heart, User, Search, Wine } from 'lucide-react';
import { useAuth } from '@/store/authContext';
import { useCart } from '@/store/cartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

export function Navbar() {
  const { user, logout, isAuthenticated, isAdmin, isVendor } = useAuth();
  const { getCartCount } = useCart();

  return (
    <nav className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Wine className="h-8 w-8 text-amber-600" />
            <span className="text-xl font-bold text-gray-900">LiquorDash</span>
          </Link>

          <div className="hidden md:flex items-center flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search for liquor, wine, beer..."
                className="pl-10 w-full"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/wishlist">
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="h-5 w-5" />
              </Button>
            </Link>

            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {getCartCount() > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {getCartCount()}
                  </Badge>
                )}
              </Button>
            </Link>

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/orders" className="cursor-pointer">My Orders</Link>
                  </DropdownMenuItem>
                  {isVendor && (
                    <DropdownMenuItem asChild>
                      <Link href="/vendor/dashboard" className="cursor-pointer">Vendor Dashboard</Link>
                    </DropdownMenuItem>
                  )}
                  {isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin" className="cursor-pointer">Admin Dashboard</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-600">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link href="/signup">
                  <Button>Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="flex md:hidden pb-3">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-10 w-full"
            />
          </div>
        </div>
      </div>

      <div className="border-t bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-8 h-12 overflow-x-auto">
            <Link href="/category/beer" className="text-sm font-medium text-gray-700 hover:text-amber-600 whitespace-nowrap">
              Beer
            </Link>
            <Link href="/category/wine" className="text-sm font-medium text-gray-700 hover:text-amber-600 whitespace-nowrap">
              Wine
            </Link>
            <Link href="/category/whiskey" className="text-sm font-medium text-gray-700 hover:text-amber-600 whitespace-nowrap">
              Whiskey
            </Link>
            <Link href="/category/vodka" className="text-sm font-medium text-gray-700 hover:text-amber-600 whitespace-nowrap">
              Vodka
            </Link>
            <Link href="/category/gin" className="text-sm font-medium text-gray-700 hover:text-amber-600 whitespace-nowrap">
              Gin
            </Link>
            <Link href="/category/rum" className="text-sm font-medium text-gray-700 hover:text-amber-600 whitespace-nowrap">
              Rum
            </Link>
            <Link href="/category/cocktails" className="text-sm font-medium text-gray-700 hover:text-amber-600 whitespace-nowrap">
              Cocktails
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
