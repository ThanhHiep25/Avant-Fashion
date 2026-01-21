
export interface Product {
  id: string;
  title: string;
  category: string;
  image: string;
  price: string;
  size: 'small' | 'medium' | 'large' | 'tall';
}

export interface NavItem {
  label: string;
  href: string;
}
