<header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold">🚀 My E-Commerce</Link>
          

          {/* Navbar */}
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="hover:underline">Home</Link>
            <Link href="/products/premium" className="hover:underline">Products</Link>
            <Link href="/about" className="hover:underline">About</Link>
          
            {/* Giỏ hàng có số lượng sản phẩm */}
            <Link href="/cart" className="relative">
              <ShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </header>