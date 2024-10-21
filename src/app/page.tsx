import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import Products from "@/components/Products";
export default function Page() {
  return (
    <div className="flex flex-col justify-between w-full min-h-screen bg-[#f9f9f9]">
      <header className="sticky top-0 flex justify-center items-center w-full h-16 bg-[#f5f1e6] shadow-md z-20">
        <Navbar />
      </header>

      <main className="flex flex-col w-full h-full p-4 bg-white shadow-md">
        <div className="text-2xl font-bold text-center mb-2 uppercase flex flex-col justify-around items-center gap-4">
          <Button className="bg-teal-500 w-4/6">Products</Button>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Button className="bg-green-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 2048 2048"><path fill="currentColor" d="M896 1537V936L256 616v880l544 273l-31 127l-641-320V472L960 57l832 415v270q-70 11-128 45V616l-640 320v473zM754 302l584 334l247-124l-625-313zm206 523l240-120l-584-334l-281 141zm888 71q42 0 78 15t64 41t42 63t16 79q0 39-15 76t-43 65l-717 717l-377 94l94-377l717-716q29-29 65-43t76-14m51 249q21-21 21-51q0-31-20-50t-52-20q-14 0-27 4t-23 15l-692 692l-34 135l135-34z"/></svg>
              <span>Add Product</span>
            </Button>
            <Button className="">
              <span>Login</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 48 48"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M42.22 17.31v-3.85A7.48 7.48 0 0 0 34.74 6h0a7.48 7.48 0 0 0-7.49 7.48v6a3.13 3.13 0 0 0 3.13 3.13h9a2.26 2.26 0 0 1 2.26 2.26v11A6.62 6.62 0 0 1 35 42.5h-4.2a3.53 3.53 0 0 1-3.55-3.5v-6.8c0-4.75-6.18-5.7-6.18-11.88V9.3h-8.48a6.81 6.81 0 0 0-6.81 6.82h0a3.48 3.48 0 0 0 3.48 3.48H12v15.69a7.21 7.21 0 0 0 7.21 7.21h11.56M12.04 25.54H6.89M19.25 42.5H8.55M21.07 9.3V5.5m-6.26 3.8V5.5"/><circle cx="13.3" cy="13.82" r=".75" fill="currentColor"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m37.24 35.68l-1.78-3.88a2.07 2.07 0 1 0-1.65 0l-1.58 3.84Z"/></svg>
            </Button>
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
