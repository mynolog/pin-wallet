import { Link } from 'react-router'
import { House, CirclePlus, TicketsPlane, MapPin, User } from 'lucide-react'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu'
import { ROUTES } from '@/routes'

interface MobileNavigatorItem {
  navId: string
  route: string
  icon: React.ReactNode
}

const mobileNavigatorList: MobileNavigatorItem[] = [
  {
    navId: 'nav-00',
    route: ROUTES.HOME,
    icon: <House />,
  },
  {
    navId: 'nav-01',
    route: ROUTES.MAP,
    icon: <MapPin />,
  },
  {
    navId: 'nav-02',
    route: ROUTES.TRIPS.EXPENSE_NEW(':tripId'),
    icon: <CirclePlus />,
  },
  {
    navId: 'nav-03',
    route: ROUTES.TRIPS.DETAIL(':tripId'),
    icon: <TicketsPlane />,
  },
  {
    navId: 'nav-04',
    route: ROUTES.SETTINGS,
    icon: <User />,
  },
]

export default function MobileNavigator() {
  return (
    <div className="bg-background fixed bottom-0 z-50 flex max-w-md items-center justify-around p-4 sm:max-w-sm">
      <NavigationMenu>
        <NavigationMenuList className="flex w-full justify-between">
          {mobileNavigatorList.map((navItem) => (
            <NavigationMenuItem key={navItem.navId} className="w-18">
              <NavigationMenuLink asChild>
                <Link
                  to={navItem.route}
                  className="text-muted-foreground hover:text-primary flex flex-col items-center justify-center text-sm transition-colors"
                >
                  <div className="mb-1 h-6 w-6">{navItem.icon}</div>
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}
