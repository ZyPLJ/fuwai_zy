// 资产数据定义
export interface Asset {
  id: number;
  name: string;
  image: string;
  price: number;
  date: string;
  lifespan: number;
}

// 资产数据列表
export const assetsData: Asset[] = [
  {
    id: 1,
    name: "MacBook Pro M2 14寸",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca4?q=80&w=800&auto=format&fit=crop",
    price: 14999,
    date: "2023-03-15",
    lifespan: 5
  },
  {
    id: 2,
    name: "iPhone 15 Pro",
    image: "https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=800&auto=format&fit=crop",
    price: 8999,
    date: "2023-10-01",
    lifespan: 3
  },
  {
    id: 3,
    name: "Sony A7M4 相机",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop",
    price: 16999,
    date: "2022-06-20",
    lifespan: 6
  },
  {
    id: 4,
    name: "PlayStation 5",
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=800&auto=format&fit=crop",
    price: 3899,
    date: "2021-11-11",
    lifespan: 4
  },
  {
    id: 5,
    name: "Herman Miller 椅子",
    image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?q=80&w=800&auto=format&fit=crop",
    price: 8000,
    date: "2020-01-01",
    lifespan: 10
  }
];