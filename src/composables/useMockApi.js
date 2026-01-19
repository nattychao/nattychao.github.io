/**
 * Mock API composable for simulating backend API requests
 * This provides mock data for all components on the homepage
 */

export const useMockApi = () => {
  /**
   * Simulate API delay
   */
  const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

  /**
   * Fetch daily deals products
   */
  const fetchDailyDeals = async () => {
    await delay();
    console.log('[Mock API] Fetching daily deals...');
    
    return [
      {
        id: 1,
        title: 'DenimLacedTubeTopDenimLactIII...',
        image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&q=80',
        colors: ['#4A90E2', '#2C3E50', '#ECF0F1'],
        colorsCount: 3
      },
      {
        id: 2,
        title: 'SatinZipUpJacketBrown...',
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80',
        colors: ['#8B4513', '#000000', '#D4AF37'],
        colorsCount: 3
      },
      {
        id: 3,
        title: 'LongSleeveRibbedTopGreen...',
        image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&q=80',
        colors: ['#2ECC71', '#27AE60', '#FFFFFF'],
        colorsCount: 3
      },
      {
        id: 4,
        title: 'StripedCardiganRed...',
        image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&q=80',
        colors: ['#E74C3C', '#C0392B', '#ECF0F1'],
        colorsCount: 3
      },
      {
        id: 5,
        title: 'SquareNeckBodysuitBlack...',
        image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&q=80',
        colors: ['#000000', '#2C3E50', '#95A5A6'],
        colorsCount: 3
      }
    ];
  };

  /**
   * Fetch new arrivals products
   */
  const fetchNewArrivals = async () => {
    await delay();
    console.log('[Mock API] Fetching new arrivals...');
    
    return [
      {
        id: 1,
        title: 'DenimLacedTubeTopDenimLactIII...',
        image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&q=80',
        colors: ['#4A90E2', '#2C3E50', '#ECF0F1'],
        colorsCount: 3,
        badge: 'EU Express',
        badgeType: 'eu'
      },
      {
        id: 2,
        title: 'SatinZipUpJacketBrown...',
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80',
        colors: ['#8B4513', '#000000', '#D4AF37'],
        colorsCount: 3,
        badge: 'Global',
        badgeType: 'global'
      },
      {
        id: 3,
        title: 'LongSleeveRibbedTopGreen...',
        image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&q=80',
        colors: ['#2ECC71', '#27AE60', '#FFFFFF'],
        colorsCount: 3,
        badge: 'EU Express',
        badgeType: 'eu'
      },
      {
        id: 4,
        title: 'StripedCardiganRed...',
        image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&q=80',
        colors: ['#E74C3C', '#C0392B', '#ECF0F1'],
        colorsCount: 3,
        badge: 'EU Express',
        badgeType: 'eu'
      },
      {
        id: 5,
        title: 'SquareNeckBodysuitBlack...',
        image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&q=80',
        colors: ['#000000', '#2C3E50', '#95A5A6'],
        colorsCount: 3,
        badge: 'EU Express',
        badgeType: 'eu'
      },
      {
        id: 6,
        title: 'DenimLacedTubeTopDenimLactIII...',
        image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&q=80',
        colors: ['#4A90E2', '#2C3E50', '#ECF0F1'],
        colorsCount: 3,
        badge: 'EU Express',
        badgeType: 'eu'
      },
      {
        id: 7,
        title: 'DenimLacedTubeTopDenimLactIII...',
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80',
        colors: ['#8B4513', '#000000', '#D4AF37'],
        colorsCount: 3,
        badge: 'Global',
        badgeType: 'global'
      },
      {
        id: 8,
        title: 'DenimLacedTubeTopDenimLactIII...',
        image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&q=80',
        colors: ['#2ECC71', '#27AE60', '#FFFFFF'],
        colorsCount: 3,
        badge: ''
      },
      {
        id: 9,
        title: 'DenimLacedTubeTopDenimLactIII...',
        image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&q=80',
        colors: ['#E74C3C', '#C0392B', '#ECF0F1'],
        colorsCount: 3,
        badge: 'EU Express',
        badgeType: 'eu'
      },
      {
        id: 10,
        title: 'DenimLacedTubeTopDenimLactIII...',
        image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&q=80',
        colors: ['#000000', '#2C3E50', '#95A5A6'],
        colorsCount: 3,
        badge: 'EU Express',
        badgeType: 'eu'
      }
    ];
  };

  /**
   * Fetch best sellers products
   */
  const fetchBestSellers = async () => {
    await delay();
    console.log('[Mock API] Fetching best sellers...');
    
    return [
      {
        id: 1,
        title: 'DenimLacedTubeTopDenimLactIII...',
        image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&q=80',
        colors: ['#4A90E2', '#2C3E50', '#ECF0F1'],
        colorsCount: 3,
        badge: 'EU Express',
        badgeType: 'eu'
      },
      {
        id: 2,
        title: 'SatinZipUpJacketBrown...',
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80',
        colors: ['#8B4513', '#000000', '#D4AF37'],
        colorsCount: 3,
        badge: 'onszelf',
        badgeType: 'global'
      },
      {
        id: 3,
        title: 'LongSleeveRibbedTopGreen...',
        image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&q=80',
        colors: ['#2ECC71', '#27AE60', '#FFFFFF'],
        colorsCount: 3,
        badge: 'EU Express',
        badgeType: 'eu'
      },
      {
        id: 4,
        title: 'StripedCardiganRed...',
        image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&q=80',
        colors: ['#E74C3C', '#C0392B', '#ECF0F1'],
        colorsCount: 3,
        badge: 'EU Express',
        badgeType: 'eu'
      },
      {
        id: 5,
        title: 'SquareNeckBodysuitBlack...',
        image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&q=80',
        colors: ['#000000', '#2C3E50', '#95A5A6'],
        colorsCount: 3,
        badge: 'EU Express',
        badgeType: 'eu'
      },
      {
        id: 6,
        title: 'DenimLacedTubeTopDenimLactIII...',
        image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&q=80',
        colors: ['#4A90E2', '#2C3E50', '#ECF0F1'],
        colorsCount: 3,
        badge: 'EU Express',
        badgeType: 'eu'
      },
      {
        id: 7,
        title: 'DenimLacedTubeTopDenimLactIII...',
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80',
        colors: ['#8B4513', '#000000', '#D4AF37'],
        colorsCount: 3,
        badge: 'onszelf',
        badgeType: 'global'
      },
      {
        id: 8,
        title: 'DenimLacedTubeTopDenimLactIII...',
        image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&q=80',
        colors: ['#2ECC71', '#27AE60', '#FFFFFF'],
        colorsCount: 3,
        badge: ''
      },
      {
        id: 9,
        title: 'DenimLacedTubeTopDenimLactIII...',
        image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&q=80',
        colors: ['#E74C3C', '#C0392B', '#ECF0F1'],
        colorsCount: 3,
        badge: 'EU Express',
        badgeType: 'eu'
      },
      {
        id: 10,
        title: 'DenimLacedTubeTopDenimLactIII...',
        image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&q=80',
        colors: ['#000000', '#2C3E50', '#95A5A6', '#2C3E50'],
        colorsCount: 4,
        badge: 'EU Express',
        badgeType: 'eu'
      }
    ];
  };

  /**
   * Fetch trends data (top and bottom carousels)
   */
  const fetchTrends = async () => {
    await delay();
    console.log('[Mock API] Fetching trends...');
    
    return {
      topTrends: [
        { image: '/yehwang/trend_summer.png', title: 'Leather Jacket', type: 'campaign' },
        { image: '/yehwang/trend_office.png', title: 'Furry Bag', type: 'campaign' },
        { image: '/yehwang/trend_party.png', title: 'Silver Jacket', type: 'campaign' },
        { image: '/yehwang/trend_boho.png', title: 'Gold Bracelets', type: 'campaign' },
        { image: '/yehwang/trend_summer.png', title: 'White Top', type: 'campaign' },
        { image: '/yehwang/trend_summer.png', title: 'Leather Jacket', type: 'campaign' },
        { image: '/yehwang/trend_office.png', title: 'Furry Bag', type: 'campaign' },
        { image: '/yehwang/trend_party.png', title: 'Silver Jacket', type: 'campaign' },
        { image: '/yehwang/trend_boho.png', title: 'Gold Bracelets', type: 'campaign' },
        { image: '/yehwang/trend_summer.png', title: 'White Top', type: 'campaign' },
      ],
      bottomTrends: [
        { image: '/yehwang/trend_office.png', title: 'BASICS', subtitle: 'Back to Basics', type: 'collection' },
        { image: '/yehwang/trend_party.png', title: 'le Paris edit', subtitle: 'FW25/26 COLLECTION', type: 'collection' },
        { image: '/yehwang/trend_boho.png', title: 'Inspiration & Looks', subtitle: 'CHECK NOW', type: 'collection' },
        { image: '/yehwang/trend_summer.png', title: 'New Season', subtitle: 'Discover', type: 'collection' },
        { image: '/yehwang/trend_office.png', title: 'BASICS', subtitle: 'Back to Basics', type: 'collection' },
        { image: '/yehwang/trend_party.png', title: 'le Paris edit', subtitle: 'FW25/26 COLLECTION', type: 'collection' },
        { image: '/yehwang/trend_boho.png', title: 'Inspiration & Looks', subtitle: 'CHECK NOW', type: 'collection' },
        { image: '/yehwang/trend_summer.png', title: 'New Season', subtitle: 'Discover', type: 'collection' },
      ]
    };
  };

  /**
   * Fetch categories data
   */
  const fetchCategories = async () => {
    await delay();
    console.log('[Mock API] Fetching categories...');
    
    return [
      { name: 'Necklaces', image: '/yehwang/cat_necklaces.png' },
      { name: 'Hats & Caps', image: '/yehwang/cat_hats.png' },
      { name: 'Earrings', image: '/yehwang/cat_earrings.png' },
      { name: 'Bags', image: '/yehwang/cat_bags.png' },
      { name: 'Bracelets', image: '/yehwang/cat_bracelets.png' },
      { name: 'Rings', image: '/yehwang/prod_ring.png' },
      { name: 'Hair Accessories', image: '/yehwang/prod_necklace.png' },
      { name: 'Anklets', image: '/yehwang/prod_bracelet.png' },
      { name: 'Brooches', image: '/yehwang/prod_earrings.png' },
      { name: 'Scarves', image: '/yehwang/cat_necklaces.png' },
    ];
  };

  /**
   * Fetch hero carousel slides (for logged in users)
   */
  const fetchHeroSlides = async () => {
    await delay();
    console.log('[Mock API] Fetching hero slides...');
    
    return [
      { id: 1, image: 'https://img.yw-cdn.com/cdn-cgi/image/w=1536,f=jpeg/image/admin/20251001/20251001100917_986.W40_dropshiptwee_website_ALL.jpg', alt: 'Fashion Model 1' },
      { id: 2, image: 'https://img.yw-cdn.com/cdn-cgi/image/w=1536,f=jpeg/image/admin/20251113/20251113080531_118.preblack_PC_ALL.jpg', alt: 'Fashion Model 2' },
      { id: 3, image: 'https://img.yw-cdn.com/cdn-cgi/image/w=1536,f=jpeg/image/admin/20251119/20251119103145_677.preblack2_PC_ALL.jpg', alt: 'Fashion Model 3' },
      { id: 4, image: 'https://img.yw-cdn.com/cdn-cgi/image/w=1536,f=jpeg/image/admin/20251117/20251117090453_64.W46_1xmasbag_website_ALL.jpg', alt: 'Fashion Model 4' },
      { id: 5, image: 'https://img.yw-cdn.com/cdn-cgi/image/w=1536,f=jpeg/image/admin/20251111/20251111110714_105.CLOTHES399_PC_ALL.jpg', alt: 'Fashion Model 5' },
      { id: 6, image: 'https://img.yw-cdn.com/cdn-cgi/image/w=1536,f=jpeg/image/admin/20251111/20251111110619_394.jewelryacc_PC_ALL.jpg', alt: 'Fashion Model 6' },
      { id: 7, image: 'https://img.yw-cdn.com/cdn-cgi/image/w=1536,f=jpeg/image/admin/20251111/20251111101659_81.W47_1XMAS_website_ALL.jpg', alt: 'Fashion Model 7' },
      { id: 8, image: 'https://img.yw-cdn.com/cdn-cgi/image/w=1536,f=jpeg/image/admin/20251006/20251006082708_327.W41_adventcal2_website_ALL.jpg', alt: 'Fashion Model 8' }
    ];
  };

  /**
   * Fetch user info (for logged in users)
   */
  const fetchUserInfo = async () => {
    await delay();
    console.log('[Mock API] Fetching user info...');
    
    return {
      name: 'Jane',
      membership: 'GOLD',
      points: 7238,
      pointsValue: 72.38,
      credit: 1.00,
      coupons: 0
    };
  };

  /**
   * Fetch customer reviews
   */
  const fetchReviews = async () => {
    await delay();
    console.log('[Mock API] Fetching reviews...');
    
    return [
      { 
        name: 'Viktoryia Haivaronskaya', 
        date: '7 days ago',
        text: 'Een heel fijn de web site en de app, snel levering, mooie modellen. Min punten: dat iedereen kan de prijzen zien. Ik bedoel gewoon mensen. Kunnen ze dan ook kopen? Dan heb ik zin toch iets ander... See more', 
        rating: 5, 
        image: 'https://placehold.co/50x50/F9F0F0/1A1A1A?text=V',
        initials: 'VH',
        bgColor: 'bg-gray-200'
      },
      { 
        name: 'customer', 
        date: '5 days ago',
        text: 'Commande reçue en temps et en heure. Qualité des vêtements juste incroyable, rien redire. Je vais recommander rapidement.', 
        rating: 5, 
        image: null,
        initials: 'CU',
        bgColor: 'bg-[#E8E6D9]',
        reply: true
      },
      { 
        name: 'Ursula Eichler', 
        date: 'Oct 8, 2025',
        text: 'Der Service ist gut. Die Bestellung wurde schnell verschickt. Die Schals sind optisch ansprechend. Was mich jedoch sehr gestört hat, war die Tatsache, dass das Material nur aus Polyacryl und Polyester... See more', 
        rating: 3.8, 
        image: null,
        initials: 'UE',
        bgColor: 'bg-[#EADEF0]'
      },
      { 
        name: 'Great supplier', 
        date: 'Jun 27, 2025',
        text: 'I have been buying from Yehwang since 2022, I couldn\'t be more happy. I have a little stall in Palma de Mallorca, Spain. The jewellery is amazing, very good quality. I will definitely continue to work... See more', 
        rating: 2.5, 
        image: null,
        initials: 'G',
        bgColor: 'bg-white border border-gray-100'
      },
      { 
        name: 'Alice M.', 
        date: '3 days ago',
        text: 'Great quality and fast shipping. My customers love the new collection!', 
        rating: 5, 
        image: 'https://placehold.co/50x50/F9F0F0/1A1A1A?text=A',
        initials: 'AM',
        bgColor: 'bg-blue-100'
      }
    ];
  };

  /**
   * Fetch resources data
   */
  const fetchResources = async () => {
    await delay();
    console.log('[Mock API] Fetching resources...');
    
    return [
      { 
        title: '24H DISPATCH FROM NL', 
        subtitle: 'Clear rates and reliable carriers you already use.',
        image: '/yehwang/res_jewelry.png',
        label: 'EU EXPRESS',
        hasIcon: false
      },
      { 
        title: 'GLOBAL SHIPPING FROM FACTORIES', 
        subtitle: 'One-click sync to your shopify websites',
        image: '/yehwang/res_fashion.png',
        label: 'FACTORY DIRECT',
        hasIcon: true
      },
      { 
        title: 'ZERO INVENTORY STRESS', 
        subtitle: 'One-click sync to your shopify websites',
        image: '/yehwang/res_quality.png',
        label: 'DROPSHIPPING',
        hasIcon: true
      }
    ];
  };

  /**
   * Fetch brands data
   */
  const fetchBrands = async () => {
    await delay();
    console.log('[Mock API] Fetching brands...');
    
    return [
      {
        id: 1,
        name: 'gimme',
        image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&q=80',
        description: 'Lifestyle clothing with playful energy.Think varsity knitwear, layering, and trenched silhouettes.',
        shopLink: '#',
        connectLink: '#'
      },
      {
        id: 2,
        name: 'lilli june',
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80',
        description: 'Lifestyle clothing with playful energy.Think varsity knitwear, layering, and trenched silhouettes.',
        shopLink: '#',
        connectLink: '#'
      },
      {
        id: 3,
        name: 'liime',
        image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80',
        description: 'Lifestyle clothing with playful energy.Think varsity knitwear, layering, and trenched silhouettes.',
        shopLink: '#',
        connectLink: '#'
      },
      {
        id: 4,
        name: 'club spyce',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80',
        description: 'Lifestyle clothing with playful energy.Think varsity knitwear, layering, and trenched silhouettes.',
        shopLink: '#',
        connectLink: '#'
      }
    ];
  };

  /**
   * Fetch menu items with featured images for navigation
   */
  const fetchMenuItems = async () => {
    await delay(0);
    console.log('[Mock API] Fetching menu items...');
    
    return [
      {
        name: 'Jewelry',
        featuredImage: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80'
      },
      {
        name: 'Hair Accessories',
        featuredImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80'
      },
      {
        name: 'Fashion',
        featuredImage: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80'
      },
      {
        name: 'Bags',
        featuredImage: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80'
      },
      {
        name: 'Collections',
        featuredImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80'
      }
    ];
  };

  /**
   * Fetch product list for products page (with pagination support)
   */
  const fetchProductList = async (category = '') => {
    await delay(800); // Longer delay to simulate real API
    console.log('[Mock API] Fetching product list for category:', category || 'All');
    
    // Generate 50 products for testing pagination
    const products = [];
    const images = [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&q=80',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&q=80',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&q=80',
      'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&q=80',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80'
    ];
    
    const titles = [
      'Denim Laced Tube Top',
      'Satin Zip Up Jacket',
      'Long Sleeve Ribbed Top',
      'Striped Cardigan',
      'Square Neck Bodysuit',
      'Leather Crossbody Bag',
      'Pearl Hair Clip Set',
      'Gold Chain Necklace'
    ];
    
    const badges = ['EU Express', 'Global', 'onszelf', ''];
    const badgeTypes = ['eu', 'global', 'global', ''];
    
    for (let i = 1; i <= 500; i++) {
      const badgeIndex = Math.floor(Math.random() * badges.length);
      products.push({
        id: i,
        title: `${titles[i % titles.length]} ${i}...`,
        image: images[i % images.length],
        colors: ['#4A90E2', '#2C3E50', '#ECF0F1'],
        colorsCount: 3,
        badge: badges[badgeIndex],
        badgeType: badgeTypes[badgeIndex]
      });
    }
    
    return products;
  };

  return {
    fetchDailyDeals,
    fetchNewArrivals,
    fetchBestSellers,
    fetchTrends,
    fetchCategories,
    fetchHeroSlides,
    fetchUserInfo,
    fetchReviews,
    fetchResources,
    fetchBrands,
    fetchMenuItems,
    fetchProductList
  };
};
