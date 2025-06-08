import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Home, ShoppingCart, Package, Users, BarChart3, Settings } from 'lucide-react'; // Example icons

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
  disabled?: boolean;
}

const navItems: NavItem[] = [
  { href: '/', label: 'Overview', icon: Home },
  { href: '/orders', label: 'Orders', icon: ShoppingCart },
  { href: '/products', label: 'Products', icon: Package },
  { href: '/customers', label: 'Customers', icon: Users },
  { href: '/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/settings', label: 'Settings', icon: Settings, disabled: true }, // Example disabled item
];

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const location = useLocation();
  console.log("Rendering Sidebar component, current path:", location.pathname);

  return (
    <aside className={cn("hidden md:block border-r bg-muted/40 w-64", className)}>
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-16 items-center border-b px-6">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            {/* Replace with your logo component or SVG */}
            <Package className="h-6 w-6 text-primary" />
            <span className="">Admin Panel</span>
          </Link>
        </div>
        <ScrollArea className="flex-1 py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                  location.pathname === item.href && "bg-muted text-primary",
                  item.disabled && "opacity-50 cursor-not-allowed"
                )}
                onClick={(e) => item.disabled && e.preventDefault()}
                aria-disabled={item.disabled}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        </ScrollArea>
        {/* Optional: Footer section in sidebar */}
        {/* <div className="mt-auto p-4">
          <Button size="sm" className="w-full">
            Upgrade Plan
          </Button>
        </div> */}
      </div>
    </aside>
  );
};

export default Sidebar;