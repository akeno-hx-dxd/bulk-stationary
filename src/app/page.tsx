import FlashBar from "@/components/FlashBar";
import DesktopHeader from "@/components/desktop/DesktopHeader";
import BannerCarousel from "@/components/BannerCarousel";
import { SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/mobile/AppSideBar";
import { Heart, Search, SearchIcon, ShoppingCartIcon } from "lucide-react";
import Catalogs from "@/components/Catalogs";
export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
        <div className="w-screen flex justify-center items-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-black">
          <FlashBar />
        </div>
        {/* desktop header  */}
        <div className="hidden lg:grid lg:p-1">
          <DesktopHeader />
        </div>
        <div className="grid lg:hidden p-1">
          <div>
          <AppSidebar />
          <div className="flex justify-between items-center pr-2">
          <div className="flex justify-start items-center gap-4">
            <SidebarTrigger />
            <SearchIcon className="w-4 h-4"/>
          </div>
          <div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Bulk stationary
            </span>
          </div>
          <div className="flex justify-end items-center gap-4">
            <Heart className="w-4 h-4"/>
            <ShoppingCartIcon className="w-4 h-4"/>
          </div>
          </div>
          </div>
        </div>
      <div className="mt-2">
        <BannerCarousel images={['cld-sample', 'cld-sample-2', 'cld-sample-3']}/>
      </div>
      <div className="mt-2 flex justify-center items-center p-4">
        <Catalogs />
      </div>
      <div>
        {/* Dummy cards 2 */}
      </div>
      <div>
        {/* trending products carousel */}
      </div>
      <div>
        {/* Dummy card */ }
      </div>
      <div>
        {/* footer */}
      </div>
    </div> 
  );
}
