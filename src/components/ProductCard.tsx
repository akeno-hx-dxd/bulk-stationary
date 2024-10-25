import { CarouselDemo } from "./Carousel";
import { Button } from "./ui/button";
import { EditDeleteButton } from "./loggedIn";
export type Product = {
  id: string;
  name: string;
  descriptions: string[]; // Update type to string array
  quantities: number[];
  prices: number[];
  uri: string[];
  unit: string;
  exTag: string;
};

export const ProductCard = ({ product, index }: { product: Product; index: number }) => {
  return (
    <div className="flex flex-col justify-center items-center w-full px-4 py-4 bg-white rounded-lg shadow-md h-auto border border-gray-200"> 
      <div className="mb-4 flex flex-row justify-center items-center gap-4">
        <p className="break-all text-lg">{index}. {product.name}</p>
        <span className="text-green-500">
          <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
            <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
              <path d="M2 12V8c0-2.828 0-4.243.879-5.121C3.757 2 5.172 2 8 2h8c2.828 0 4.243 0 5.121.879C22 3.757 22 5.172 22 8v4c0 2.828 0 4.243-.879 5.121c-.646.647-1.582.818-3.158.863a3.2 3.2 0 0 0-.767-2.066a.2.2 0 0 1-.05-.12a3.21 3.21 0 0 0-2.944-2.945a.2.2 0 0 1-.12-.05a3.21 3.21 0 0 0-4.164 0a.2.2 0 0 1-.12.05a3.21 3.21 0 0 0-2.945 2.945a.2.2 0 0 1-.05.12a3.2 3.2 0 0 0-.766 2.066c-1.576-.045-2.512-.216-3.158-.863C2 16.243 2 14.828 2 12m6.25-6A.75.75 0 0 1 9 5.25h6a.75.75 0 0 1 0 1.5H9A.75.75 0 0 1 8.25 6M7 8.75a.75.75 0 0 0 0 1.5h10a.75.75 0 0 0 0-1.5z"/>
              <path d="M13.11 13.945a1.71 1.71 0 0 0-2.22 0a1.7 1.7 0 0 1-.973.403a1.71 1.71 0 0 0-1.569 1.57c-.028.358-.17.698-.403.973a1.71 1.71 0 0 0 0 2.218c.234.274.375.615.403.973a1.71 1.71 0 0 0 1.57 1.57c.358.028.699.169.973.402a1.71 1.71 0 0 0 2.218 0a1.7 1.7 0 0 1 .973-.403a1.71 1.71 0 0 0 1.57-1.569a1.7 1.7 0 0 1 .402-.973a1.71 1.71 0 0 0 0-2.219a1.7 1.7 0 0 1-.403-.973a1.71 1.71 0 0 0-1.569-1.569a1.7 1.7 0 0 1-.973-.403m.902 3.603a.75.75 0 1 0-1.024-1.096l-1.63 1.522l-.346-.322a.75.75 0 0 0-1.024 1.096l.857.8a.75.75 0 0 0 1.024 0z"/>
            </g>
          </svg>
        </span>
      </div>
      
      <CarouselDemo uris={product.uri}/>

      {/* Render description as bullet points */}
      <ul className="text-gray-600 text-md lg:text-base break-words my-4 mx-2">
        {product.descriptions.map((point, idx) => (
          <li key={idx} className="list-disc list-inside">{point}</li>
        ))}
      </ul>

      <div className="flex flex-col justify-center items-center w-full space-y-2">
        <Button className="w-full">Quantity - Price</Button>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {
            Array.from({ length: product.quantities.length }).map((_, index) => (
              <Button key={index} className="bg-blue-500 hover:bg-blue-700 text-white">
                {product.quantities[index]} {product.unit} - &#x20B9; {new Intl.NumberFormat('en-IN').format(product.prices[index])}
              </Button>
            ))
          }
        </div>
      </div>

      <EditDeleteButton id={product.id}/>
    </div>
  );
};
