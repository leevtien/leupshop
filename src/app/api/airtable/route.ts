import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableName = process.env.AIRTABLE_TABLE_NAME;

  console.log("API Key:", apiKey ? "Đã có" : "Không có");
  console.log("Base ID:", baseId);
  console.log("Table Name:", tableName);

  if (!apiKey || !baseId || !tableName) {
    return NextResponse.json({ error: "Thiếu biến môi trường" }, { status: 500 });
  }

  const url = `https://api.airtable.com/v0/${baseId}/${tableName}`;

  try {
    console.log("Fetching data from Airtable:", url);
    
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${apiKey}` },
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Lỗi Airtable:", errorData);
      return NextResponse.json({ error: "Không thể lấy dữ liệu từ Airtable" }, { status: res.status });
    }

    const data = await res.json();
    let products = data.records.map((record: any) => ({
      id: record.id,
      name: record.fields.name || "Không có tên",
      price: record.fields.price || 0,
      description: record.fields.description || "Không có mô tả",
      image: record.fields.image ? record.fields.image[0].url : "/default-image.jpg",
      category: record.fields.Category || "other"
    }));

    // Apply category filter if specified
    if (category) {
      products = products.filter((product: any) => 
        product.category?.toLowerCase() === category.toLowerCase()
      );
    }

    return NextResponse.json(products);
  } catch (error) {
    console.error("Lỗi khi kết nối Airtable:", error);
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}