import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, PackagePlus, ListPlus, Trash, Search } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { supabase } from "../lib/supabase";

interface Product {
  id: number;
  name: string;
  category: string;
  stock: number;
  status: "Tersedia" | "Habis" | "Pre-order";
  image: string;
}

interface Category {
  id: number;
  name: string;
}

export default function ProductManagement() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState("product");
  const [newProduct, setNewProduct] = useState({ name: "", category: "", stock: 0, image: "" });
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const { data: productData, error: productError } = await supabase.from("products").select("*");
      const { data: categoryData, error: categoryError } = await supabase.from("category").select("*");

      if (productError) {
        console.error("Error fetching products:", productError);
      } else if (productData) {
        setProducts(productData);
      }

      if (categoryError) {
        console.error("Error fetching categories:", categoryError);
      } else if (categoryData) {
        setCategories(categoryData);
      }
    };
    fetchData();
  }, []);

  const handleDeleteProduct = async (id: number) => {
    await supabase.from("products").delete().eq("id", id);
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleAddProduct = async () => {
    const status = newProduct.stock === 0 ? "Habis" : "Tersedia";
    const { data, error } = await supabase.from("products").insert([{ ...newProduct, status }]);

    if (!error && data && data.length > 0) {
      setProducts([...products, { ...newProduct, id: data[0].id, status }]);
      setNewProduct({ name: "", category: "", stock: 0, image: "" });
    } else {
      console.error("Error adding product:", error || "No data returned");
    }
  };

  const handleAddCategory = async () => {
    const { data, error } = await supabase.from("category").insert([{ name: newCategory }]);

    if (!error && data && data.length > 0) {
      setCategories([...categories, { id: data[0].id, name: newCategory }]);
      setNewCategory("");
    } else {
      console.error("Error adding category:", error || "No data returned");
    }
  };

  const handleDeleteCategory = async (id: number) => {
    await supabase.from("category").delete().eq("id", id);
    setCategories(categories.filter((category) => category.id !== id));
  };

  return (
    <div className="pt-16 flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`transition-all ${sidebarOpen ? "w-64" : "w-20"} bg-white shadow-lg p-4 flex flex-col`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-2xl font-bold transition-all ${sidebarOpen ? "block" : "hidden"}`}>Manajemen Produk</h2>
          <Menu className="cursor-pointer" onClick={() => setSidebarOpen(!sidebarOpen)} />
        </div>
        <nav className="flex flex-col space-y-4">
          <button
            onClick={() => setActiveMenu("product")}
            className={`flex items-center space-x-2 px-4 py-2 rounded ${
              activeMenu === "product" ? "bg-teal-500 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            <PackagePlus />
            {sidebarOpen && <span>Produk</span>}
          </button>
          <button
            onClick={() => {
              setActiveMenu("category");
              console.log("activeMenu sekarang:", "category");
            }}
            className={`flex items-center space-x-2 px-4 py-2 rounded ${
              activeMenu === "category" ? "bg-teal-500 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            <ListPlus />
            {sidebarOpen && <span>Kategori</span>}
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {activeMenu === "product" && (
          <>
            <div className="flex mb-4">
              <input
                type="text"
                placeholder="Cari produk..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="p-2 border border-gray-300 rounded w-full"
              />
              <Search className="ml-2 text-gray-500" />
            </div>
            <div className="flex mb-4 space-x-2">
              <input
                type="text"
                placeholder="Nama Produk"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                className="p-2 border border-gray-300 rounded"
              />
              <select
                value={newProduct.category}
                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                className="p-2 border border-gray-300 rounded"
              >
                <option value="">Pilih Kategori</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Stok"
                value={newProduct.stock}
                onChange={(e) => setNewProduct({ ...newProduct, stock: Number(e.target.value) })}
                className="p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                placeholder="URL Gambar"
                value={newProduct.image}
                onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                className="p-2 border border-gray-300 rounded"
              />
              <button onClick={handleAddProduct} className="bg-green-500 text-white px-4 py-2 rounded">
                Tambah Produk
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products
                .filter((product) => product.name.toLowerCase().includes(search.toLowerCase()))
                .map((product) => (
                  <Card key={product.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="relative w-full h-40">
                      <Image
                        src={product.image}
                        alt={product.name}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="text-lg font-bold">{product.name}</h3>
                      <p className="text-gray-500">{product.category}</p>
                      <p className="text-gray-800 font-semibold">Stok: {product.stock}</p>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="bg-red-500 text-white px-3 py-1 mt-2 rounded flex items-center"
                      >
                        <Trash className="mr-2" /> Hapus
                      </button>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </>
        )}

        {activeMenu === "category" && (
          <>
            <div className="flex mb-4 space-x-2">
              <input
                type="text"
                placeholder="Nama Kategori"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="p-2 border border-gray-300 rounded"
              />
              <button onClick={handleAddCategory} className="bg-green-500 text-white px-4 py-2 rounded">
                Tambah Kategori
              </button>
            </div>
            <div className="space-y-2">
              {categories.length > 0 ? (
                categories.map((category) => (
                  <div key={category.id} className="flex justify-between items-center p-2 bg-white shadow rounded">
                    <span>{category.name}</span>
                    <button
                      onClick={() => handleDeleteCategory(category.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded flex items-center"
                    >
                      <Trash className="mr-2" /> Hapus
                    </button>
                  </div>
                ))
              ) : (
                <p>Tidak ada kategori tersedia.</p>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}