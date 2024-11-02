import FlashBar from "@/components/FlashBar";
import DesktopHeader from "@/components/desktop/DesktopHeader";
import BannerCarousel from "@/components/BannerCarousel";
import { SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/mobile/AppSideBar";
import { SearchIcon, ShoppingCartIcon } from "lucide-react";
import Catalogs from "@/components/Catalogs";
import CsImage from "@/components/CsImage";
import TrendingProductsCarousel from "@/components/TrendingProductsCarousel";
import { AddProductIcon } from "@/components/admin/loggedIn";
export default function Page() {
  return (
    <div className="flex flex-col min-h-screen w-screen">
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
            <AddProductIcon />
          </div>
          <div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Bulk stationary
            </span>
          </div>
          <div className="flex justify-end items-center gap-4">
            <ShoppingCartIcon className="w-4 h-4"/>
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M18.403 5.633A8.92 8.92 0 0 0 12.053 3c-4.948 0-8.976 4.027-8.978 8.977c0 1.582.413 3.126 1.198 4.488L3 21.116l4.759-1.249a9 9 0 0 0 4.29 1.093h.004c4.947 0 8.975-4.027 8.977-8.977a8.93 8.93 0 0 0-2.627-6.35m-6.35 13.812h-.003a7.45 7.45 0 0 1-3.798-1.041l-.272-.162l-2.824.741l.753-2.753l-.177-.282a7.45 7.45 0 0 1-1.141-3.971c.002-4.114 3.349-7.461 7.465-7.461a7.4 7.4 0 0 1 5.275 2.188a7.42 7.42 0 0 1 2.183 5.279c-.002 4.114-3.349 7.462-7.461 7.462m4.093-5.589c-.225-.113-1.327-.655-1.533-.73s-.354-.112-.504.112s-.58.729-.711.879s-.262.168-.486.056s-.947-.349-1.804-1.113c-.667-.595-1.117-1.329-1.248-1.554s-.014-.346.099-.458c.101-.1.224-.262.336-.393s.149-.224.224-.374s.038-.281-.019-.393c-.056-.113-.505-1.217-.692-1.666c-.181-.435-.366-.377-.504-.383a10 10 0 0 0-.429-.008a.83.83 0 0 0-.599.28c-.206.225-.785.767-.785 1.871s.804 2.171.916 2.321s1.582 2.415 3.832 3.387c.536.231.954.369 1.279.473c.537.171 1.026.146 1.413.089c.431-.064 1.327-.542 1.514-1.066s.187-.973.131-1.067s-.207-.151-.43-.263" clipRule="evenodd"/></svg>
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
      <div className="m-4 p-4 flex flex-col lg:flex-row justify-around items-center gap-4">
        <div>
          <CsImage src="cld-sample-2" alt="cld-sample" width={700} height={200} className="lg:h-96 lg:w-[660px] rounded-md shadow-lg"/>
        </div>
        <div>
          <CsImage src="cld-sample-4" alt="cld-sample" width={700} height={200} className="lg:h-96 lg:w-[660px] rounded-md shadow-lg"/>
        </div>
      </div>
      <div className="w-screen flex flex-col justify-center items-center">
        <h1 className="text-xl font-semibold">Trending Products</h1>
        <div className="m-4 rounded-md">
          <TrendingProductsCarousel />
        </div>
      </div>
      <div className="w-screen flex justify-center items-center">
        <CsImage src="cld-sample-3" alt="cld-sample" width={1200} height={400} className="h-44 lg:h-96 w-full px-[1px] lg:px-0 rounded-md"/>
      </div>
      <div className="w-screen flex justify-center items-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-black mt-2 text-xs h-8 opacity-90">
        © 2024 Bulk Stationery, All Rights Reserved.
      </div>
    </div> 
  );
}
