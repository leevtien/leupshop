"use client"
import React from 'react';
import ProductTable from '@/components/admin/ProductTable';

const ProductsPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Products</h1>
      <ProductTable />
    </div>
  );
};

export default ProductsPage;