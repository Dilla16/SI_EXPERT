// Menu.js
import { Button } from "./ui/button";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import { NavigationMenu, NavigationMenuTrigger, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuContent } from "@/components/ui/navigation-menu";

// import categoryData from "./../pages/beranda/dummyCategory.json";

const Menu = () => {
  // const categories = categoryData.heroCategory || [];

  return (
    <div>
      <NavigationMenu className="w-full">
        <NavigationMenuList className="space-x-2">
          <NavigationMenuItem className="">
            <Link to="/">
              <NavigationMenuLink className={`${navigationMenuTriggerStyle()} bg-primary text-white p-6`}>Beranda</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className="flex justify-between ">
            <NavigationMenuTrigger className="bg-primary text-white ">Kelas</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid gap-7 p-4 md:w-[600px] lg:w-[600px] lg:grid-cols-[.75fr_1fr]">
                <div className="row-span-3">
                  <Link to="/courses">
                    <NavigationMenuLink asChild>
                      <div className="flex h-full w-full select-none flex-col justify-center bg-primary text-white from-muted/50 to-muted p-3 no-underline outline-none focus:shadow-md ">
                        <span className="text-xs text-center text-success">Trusted by 900K+ Students</span>
                        <div className="mb-2 mt-4 text-lg font-medium text-active text-center">Build Your Future Career</div>
                        <p className="text-xs leading-tight mb-4 text-center text-muted">Explore kelas bersama mentor Expert</p>
                        <Button className="bg-secondary text-primary h-8 w-28 hover:text-primary hover:bg-muted-foreground mx-auto font-semibold mt-3">All Course</Button>
                      </div>
                    </NavigationMenuLink>
                  </Link>
                </div>
                <div className="flex space-x-2 items-center justify-start my-auto">
                  <div className="space-y-3 flex flex-col my-auto">
                    {/* {categories.map((item) => ( */}
                    <div>
                      <NavigationMenuLink asChild>
                        <Link
                          to=""
                          className={`hover:text-active cursor-pointer`}
                        >
                          menu
                        </Link>
                      </NavigationMenuLink>
                    </div>
                    {/* ))} */}
                  </div>
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem className="">
            <Link to="#">
              <NavigationMenuLink className={`${navigationMenuTriggerStyle()} bg-primary text-white p-6`}>About Us</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default Menu;
