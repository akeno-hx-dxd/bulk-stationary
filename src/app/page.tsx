import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import Products from "@/components/Products";
import { LoginButton, AddProductButton } from "@/components/loggedIn";
export default function Page() {
  return (
    <div className="flex flex-col justify-between w-full min-h-screen bg-[#f9f9f9]">
      <header className="sticky top-0 flex justify-center items-center w-full h-16 bg-[#f5f1e6] shadow-md z-20">
        <Navbar />
      </header>

      <main className="flex flex-col w-full h-full p-4 bg-white shadow-md">
        <div className="text-2xl font-bold text-center mb-2 uppercase flex flex-col justify-around items-center gap-4">
          <Button className="bg-teal-500 w-4/6">Products</Button>
          <div className="w-full">
            <AddProductButton />
            <LoginButton />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Products />
        </div>
      </main>

      <footer className="flex justify-center items-center w-full h-16 text-gray-600 bg-[#f5f1e6] mt-8">
        <p className="text-sm">© 2023 Ramesh Paper Agency. All rights reserved.</p>
      </footer>
    </div>
  );
}
