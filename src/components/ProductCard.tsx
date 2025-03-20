import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/context/CartContext';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

export default function ProductCard({ product, featured = false }: ProductCardProps) {
  const { addToCart } = useCart();
  
  return (
    <div className={`product-card group ${featured ? 'magic-card' : ''}`}>
      <div className={`${featured ? 'h-64' : 'product-image'} bg-magic-dark relative overflow-hidden`}>
        <Link href={`/product/${product.id}`}>
          <div className="absolute inset-0 bg-gradient-to-t from-magic-dark to-transparent z-10"></div>
          <div className="w-full h-full relative flex items-center justify-center bg-magic-secondary/20">
            {product.image ? (
              <Image 
                src={product.image} 
                alt={product.name}
                fill
                sizes={featured ? "100vw" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
                className="object-cover opacity-80 hover:opacity-100 transition-opacity"
              />
            ) : (
              <div className="text-4xl opacity-40">⚝</div>
            )}
          </div>
        </Link>
        
        {product.category === 'artifacts' && (
          <div className="product-badge">Rare</div>
        )}
      </div>
      
      <div className={`${featured ? '' : 'product-details'} p-4`}>
        <Link 
          href={`/product/${product.id}`} 
          className={`${featured ? 'font-pirata text-2xl' : 'product-title'} hover:text-magic-accent transition-colors block mb-2`}
        >
          {product.name}
        </Link>
        
        <p className="text-sm mb-4 font-cinzel line-clamp-2">
          {product.description.split('\n')[0]}
        </p>
        
        <div className="flex justify-between items-center">
          <span className={`${featured ? 'text-magic-accent font-pirata' : 'product-price'}`}>
            {product.price}
          </span>
          
          <div className="flex gap-2">
            <Link 
              href={`/product/${product.id}`}
              className="px-3 py-2 text-xs font-cinzel uppercase border border-magic-border hover:bg-magic-dark/50 transition-all"
            >
              Details
            </Link>
            <button 
              className="px-3 py-2 text-xs font-cinzel uppercase border border-magic-border hover:bg-magic-dark/50 transition-all"
              onClick={() => addToCart(product)}
            >
              Acquire
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
