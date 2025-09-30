import Link from 'next/link';
import { Wine, Facebook, Twitter, Instagram, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Wine className="h-8 w-8 text-amber-500" />
              <span className="text-xl font-bold text-white">LiquorDash</span>
            </div>
            <p className="text-sm text-gray-400">
              Your trusted source for premium liquor delivery. Fast, reliable, and always fresh.
            </p>
            <div className="flex space-x-4 mt-4">
              <Link href="#" className="hover:text-amber-500 transition">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-amber-500 transition">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-amber-500 transition">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-amber-500 transition">
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/category/beer" className="hover:text-amber-500 transition">Beer</Link></li>
              <li><Link href="/category/wine" className="hover:text-amber-500 transition">Wine</Link></li>
              <li><Link href="/category/whiskey" className="hover:text-amber-500 transition">Whiskey</Link></li>
              <li><Link href="/category/vodka" className="hover:text-amber-500 transition">Vodka</Link></li>
              <li><Link href="/category/gin" className="hover:text-amber-500 transition">Gin</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-amber-500 transition">About Us</Link></li>
              <li><Link href="/vendor/register" className="hover:text-amber-500 transition">Become a Vendor</Link></li>
              <li><Link href="#" className="hover:text-amber-500 transition">Careers</Link></li>
              <li><Link href="#" className="hover:text-amber-500 transition">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-amber-500 transition">Help Center</Link></li>
              <li><Link href="#" className="hover:text-amber-500 transition">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-amber-500 transition">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-amber-500 transition">Shipping Info</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} LiquorDash. All rights reserved.</p>
          <p className="mt-2">Drink responsibly. Must be 21+ to purchase.</p>
        </div>
      </div>
    </footer>
  );
}
