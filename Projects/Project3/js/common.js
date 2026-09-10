/**
 * UNAKKU AVLOTHA LIMIT (UAL)
 * "Know Your Limit • Book Responsibly • Stay Safe"
 * Student / Demo Project – Not an Official TASMAC Website
 * Shared State Engine, Mock Database & UI Renderers
 */

const UAL_DB = {
  districts: [
    {
      id: "chennai",
      name: "Chennai",
      nameTamil: "சென்னை",
      cities: ["Anna Nagar", "T. Nagar", "Velachery", "Adyar", "Nungambakkam", "Ambattur", "Mylapore", "Royapettah"]
    },
    {
      id: "coimbatore",
      name: "Coimbatore",
      nameTamil: "கோயம்புத்தூர்",
      cities: ["Gandhipuram", "RS Puram", "Peelamedu", "Saibaba Colony", "Singanallur", "Saravanampatti"]
    },
    {
      id: "madurai",
      name: "Madurai",
      nameTamil: "மதுரை",
      cities: ["KK Nagar", "Anna Nagar", "Simmakkal", "Mattuthavani", "Periyar", "Goripalayam"]
    },
    {
      id: "trichy",
      name: "Tiruchirappalli",
      nameTamil: "திருச்சிராப்பள்ளி",
      cities: ["Thillai Nagar", "Cantonment", "Srirangam", "KK Nagar", "Central Bus Stand"]
    },
    {
      id: "salem",
      name: "Salem",
      nameTamil: "சேலம்",
      cities: ["Fairlands", "Salem Junction", "Hasthampatti", "Suramangalam", "Alagapuram"]
    },
    {
      id: "tirunelveli",
      name: "Tirunelveli",
      nameTamil: "திருநெல்வேலி",
      cities: ["Palayamkottai", "Tirunelveli Junction", "Vannarpettai", "Town"]
    },
    {
      id: "vellore",
      name: "Vellore",
      nameTamil: "வேலூர்",
      cities: ["Katpadi", "Gandhi Nagar", "Bagayam", "Sathuvachari"]
    }
  ],

  shops: [
    {
      id: "UAL-CHE-101",
      name: "TASMAC Elite Outlet #101 – Anna Nagar",
      district: "Chennai",
      city: "Anna Nagar",
      address: "Shop No. 42, 2nd Avenue, AB Block, Anna Nagar West, Chennai - 600040",
      landmark: "Opposite Tower Park Gate 2",
      pincode: "600040",
      phone: "044-26210101",
      openingTime: "12:00 PM",
      closingTime: "10:00 PM",
      isOpen: true,
      distanceKm: 0.8,
      stockStatus: "High Stock",
      timeSlots: [
        { id: "slot-1", label: "10:00 AM – 11:00 AM", capacity: 25, booked: 12 },
        { id: "slot-2", label: "11:00 AM – 12:00 PM", capacity: 25, booked: 20 },
        { id: "slot-3", label: "12:00 PM – 1:00 PM", capacity: 30, booked: 30 }, // full slot test
        { id: "slot-4", label: "1:00 PM – 2:00 PM", capacity: 30, booked: 14 },
        { id: "slot-5", label: "2:00 PM – 3:00 PM", capacity: 25, booked: 9 },
        { id: "slot-6", label: "3:00 PM – 4:00 PM", capacity: 25, booked: 15 },
        { id: "slot-7", label: "4:00 PM – 5:00 PM", capacity: 30, booked: 22 },
        { id: "slot-8", label: "5:00 PM – 6:00 PM", capacity: 30, booked: 28 },
        { id: "slot-9", label: "6:00 PM – 7:00 PM", capacity: 35, booked: 31 },
        { id: "slot-10", label: "7:00 PM – 8:00 PM", capacity: 35, booked: 26 },
        { id: "slot-11", label: "8:00 PM – 9:00 PM", capacity: 30, booked: 18 }
      ],
      inventory: {
        "HOT-01": 35, "HOT-02": 24, "HOT-03": 40, "HOT-04": 18, "HOT-05": 25, "HOT-06": 15,
        "NON-01": 70, "NON-02": 55, "NON-03": 40, "NON-04": 50, "NON-05": 30, "NON-06": 28
      }
    },
    {
      id: "UAL-CHE-205",
      name: "TASMAC Retail Outlet #205 – T. Nagar",
      district: "Chennai",
      city: "T. Nagar",
      address: "Door No. 18, South Usman Road, T. Nagar, Chennai - 600017",
      landmark: "Near Panagal Park Flyover",
      pincode: "600017",
      phone: "044-24342050",
      openingTime: "12:00 PM",
      closingTime: "10:00 PM",
      isOpen: true,
      distanceKm: 1.6,
      stockStatus: "Moderate Stock",
      timeSlots: [
        { id: "slot-1", label: "10:00 AM – 11:00 AM", capacity: 20, booked: 8 },
        { id: "slot-2", label: "11:00 AM – 12:00 PM", capacity: 20, booked: 15 },
        { id: "slot-3", label: "12:00 PM – 1:00 PM", capacity: 25, booked: 25 },
        { id: "slot-4", label: "1:00 PM – 2:00 PM", capacity: 25, booked: 12 },
        { id: "slot-5", label: "2:00 PM – 3:00 PM", capacity: 20, booked: 7 },
        { id: "slot-6", label: "3:00 PM – 4:00 PM", capacity: 20, booked: 11 },
        { id: "slot-7", label: "4:00 PM – 5:00 PM", capacity: 25, booked: 19 },
        { id: "slot-8", label: "5:00 PM – 6:00 PM", capacity: 25, booked: 24 },
        { id: "slot-9", label: "6:00 PM – 7:00 PM", capacity: 30, booked: 27 },
        { id: "slot-10", label: "7:00 PM – 8:00 PM", capacity: 30, booked: 21 },
        { id: "slot-11", label: "8:00 PM – 9:00 PM", capacity: 25, booked: 16 }
      ],
      inventory: {
        "HOT-01": 20, "HOT-02": 15, "HOT-03": 30, "HOT-07": 25, "HOT-08": 30,
        "NON-01": 50, "NON-02": 65, "NON-04": 35, "NON-06": 20
      }
    },
    {
      id: "UAL-CHE-309",
      name: "TASMAC Elite Store #309 – Velachery",
      district: "Chennai",
      city: "Velachery",
      address: "Basement L1, Phoenix Marketcity, Velachery Main Road, Chennai - 600042",
      landmark: "Phoenix Marketcity L1",
      pincode: "600042",
      phone: "044-43593090",
      openingTime: "12:00 PM",
      closingTime: "10:00 PM",
      isOpen: true,
      distanceKm: 2.7,
      stockStatus: "High Stock",
      timeSlots: [
        { id: "slot-1", label: "10:00 AM – 11:00 AM", capacity: 30, booked: 10 },
        { id: "slot-2", label: "11:00 AM – 12:00 PM", capacity: 30, booked: 18 },
        { id: "slot-3", label: "12:00 PM – 1:00 PM", capacity: 35, booked: 26 },
        { id: "slot-4", label: "1:00 PM – 2:00 PM", capacity: 35, booked: 16 },
        { id: "slot-5", label: "2:00 PM – 3:00 PM", capacity: 30, booked: 12 },
        { id: "slot-6", label: "3:00 PM – 4:00 PM", capacity: 30, booked: 15 },
        { id: "slot-7", label: "4:00 PM – 5:00 PM", capacity: 35, booked: 28 },
        { id: "slot-8", label: "5:00 PM – 6:00 PM", capacity: 35, booked: 32 },
        { id: "slot-9", label: "6:00 PM – 7:00 PM", capacity: 40, booked: 35 },
        { id: "slot-10", label: "7:00 PM – 8:00 PM", capacity: 40, booked: 30 },
        { id: "slot-11", label: "8:00 PM – 9:00 PM", capacity: 35, booked: 20 }
      ],
      inventory: {
        "HOT-01": 45, "HOT-02": 30, "HOT-03": 35, "HOT-04": 30, "HOT-05": 32, "HOT-06": 28,
        "NON-01": 90, "NON-02": 85, "NON-03": 50, "NON-04": 65, "NON-05": 40, "NON-06": 45
      }
    },
    {
      id: "UAL-CBE-412",
      name: "TASMAC Elite Store #412 – Gandhipuram",
      district: "Coimbatore",
      city: "Gandhipuram",
      address: "Cross Cut Road, 7th Street Corner, Gandhipuram, Coimbatore - 641012",
      landmark: "Behind GP Signal",
      pincode: "641012",
      phone: "0422-2494120",
      openingTime: "12:00 PM",
      closingTime: "10:00 PM",
      isOpen: true,
      distanceKm: 1.2,
      stockStatus: "High Stock",
      timeSlots: [
        { id: "slot-1", label: "10:00 AM – 11:00 AM", capacity: 25, booked: 6 },
        { id: "slot-2", label: "11:00 AM – 12:00 PM", capacity: 25, booked: 14 },
        { id: "slot-3", label: "12:00 PM – 1:00 PM", capacity: 30, booked: 22 },
        { id: "slot-4", label: "1:00 PM – 2:00 PM", capacity: 30, booked: 11 },
        { id: "slot-5", label: "2:00 PM – 3:00 PM", capacity: 25, booked: 8 },
        { id: "slot-6", label: "3:00 PM – 4:00 PM", capacity: 25, booked: 12 },
        { id: "slot-7", label: "4:00 PM – 5:00 PM", capacity: 30, booked: 18 },
        { id: "slot-8", label: "5:00 PM – 6:00 PM", capacity: 30, booked: 24 },
        { id: "slot-9", label: "6:00 PM – 7:00 PM", capacity: 35, booked: 28 },
        { id: "slot-10", label: "7:00 PM – 8:00 PM", capacity: 35, booked: 21 },
        { id: "slot-11", label: "8:00 PM – 9:00 PM", capacity: 30, booked: 14 }
      ],
      inventory: {
        "HOT-01": 32, "HOT-02": 22, "HOT-03": 38, "HOT-04": 19, "HOT-05": 26,
        "NON-01": 60, "NON-02": 65, "NON-03": 35, "NON-04": 48, "NON-05": 32
      }
    },
    {
      id: "UAL-MDU-505",
      name: "TASMAC Elite Store #505 – KK Nagar",
      district: "Madurai",
      city: "KK Nagar",
      address: "80 Feet Road, Near Arch, KK Nagar, Madurai - 625020",
      landmark: "Next to Apollo Hospital Link Rd",
      pincode: "625020",
      phone: "0452-2585050",
      openingTime: "12:00 PM",
      closingTime: "10:00 PM",
      isOpen: true,
      distanceKm: 1.5,
      stockStatus: "High Stock",
      timeSlots: [
        { id: "slot-1", label: "10:00 AM – 11:00 AM", capacity: 25, booked: 8 },
        { id: "slot-2", label: "11:00 AM – 12:00 PM", capacity: 25, booked: 13 },
        { id: "slot-3", label: "12:00 PM – 1:00 PM", capacity: 30, booked: 20 },
        { id: "slot-4", label: "1:00 PM – 2:00 PM", capacity: 30, booked: 10 },
        { id: "slot-5", label: "2:00 PM – 3:00 PM", capacity: 25, booked: 7 },
        { id: "slot-6", label: "3:00 PM – 4:00 PM", capacity: 25, booked: 11 },
        { id: "slot-7", label: "4:00 PM – 5:00 PM", capacity: 30, booked: 19 },
        { id: "slot-8", label: "5:00 PM – 6:00 PM", capacity: 30, booked: 25 },
        { id: "slot-9", label: "6:00 PM – 7:00 PM", capacity: 35, booked: 29 },
        { id: "slot-10", label: "7:00 PM – 8:00 PM", capacity: 35, booked: 23 },
        { id: "slot-11", label: "8:00 PM – 9:00 PM", capacity: 30, booked: 15 }
      ],
      inventory: {
        "HOT-01": 25, "HOT-02": 18, "HOT-03": 42, "HOT-04": 20, "HOT-07": 36,
        "NON-01": 55, "NON-02": 70, "NON-03": 25, "NON-04": 42, "NON-05": 28
      }
    }
  ],

  products: [
    // 🔥 HOT PRODUCTS (Whisky, Brandy, Rum, Vodka, Gin)
    {
      id: "HOT-01",
      name: "Antiquity Blue Ultra Premium Whisky",
      brand: "Antiquity",
      type: "HOT",
      category: "Whisky",
      size: "750ml (Bottle)",
      price: 1180,
      description: "Blend of imported Scotch malts and mature Indian grain spirits.",
      image: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=600&auto=format&fit=crop&q=80",
      abv: "42.8%"
    },
    {
      id: "HOT-02",
      name: "Signature Premier Grain Whisky",
      brand: "Signature",
      type: "HOT",
      category: "Whisky",
      size: "750ml (Bottle)",
      price: 960,
      description: "Crafted with 8-year aged Scotch malts, charcoal filtered.",
      image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&auto=format&fit=crop&q=80",
      abv: "42.8%"
    },
    {
      id: "HOT-03",
      name: "Old Monk The Legend Dark Rum",
      brand: "Old Monk",
      type: "HOT",
      category: "Rum",
      size: "750ml (Bottle)",
      price: 840,
      description: "Iconic vatted dark rum aged in oak casks with vanilla notes.",
      image: "https://images.unsplash.com/photo-1567696911980-2eed69a46042?w=600&auto=format&fit=crop&q=80",
      abv: "42.8%"
    },
    {
      id: "HOT-04",
      name: "Morpheus XO Blended Premium Brandy",
      brand: "Morpheus",
      type: "HOT",
      category: "Brandy",
      size: "750ml (Bottle)",
      price: 1020,
      description: "Distilled from grapes and matured in French Limousin oak.",
      image: "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?w=600&auto=format&fit=crop&q=80",
      abv: "42.8%"
    },
    {
      id: "HOT-05",
      name: "Smirnoff Triple Distilled Vodka",
      brand: "Smirnoff",
      type: "HOT",
      category: "Vodka",
      size: "750ml (Bottle)",
      price: 890,
      description: "Ten times charcoal filtered for exceptional smoothness.",
      image: "https://images.unsplash.com/photo-1550985543-f47f38aeee65?w=600&auto=format&fit=crop&q=80",
      abv: "40.0%"
    },
    {
      id: "HOT-06",
      name: "Greater Than London Dry Gin",
      brand: "Greater Than",
      type: "HOT",
      category: "Gin",
      size: "750ml (Bottle)",
      price: 1050,
      description: "Infused with Macedonian juniper, fennel, and citrus peel.",
      image: "https://images.unsplash.com/photo-1607622750671-6cd9a99eabd1?w=600&auto=format&fit=crop&q=80",
      abv: "42.8%"
    },
    {
      id: "HOT-07",
      name: "Royal Challenge Select Whisky",
      brand: "Royal Challenge",
      type: "HOT",
      category: "Whisky",
      size: "750ml (Bottle)",
      price: 790,
      description: "Distinct grain whisky blended with rich Scotch spirits.",
      image: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=600&auto=format&fit=crop&q=80",
      abv: "42.8%"
    },
    {
      id: "HOT-08",
      name: "McDowell's No.1 Celebration Rum",
      brand: "McDowell's",
      type: "HOT",
      category: "Rum",
      size: "750ml (Bottle)",
      price: 680,
      description: "Warm caramel taste with smooth toasted molasses notes.",
      image: "https://images.unsplash.com/photo-1567696911980-2eed69a46042?w=600&auto=format&fit=crop&q=80",
      abv: "42.8%"
    },

    // 🍺 NON-HOT PRODUCTS (Beer & Wine)
    {
      id: "NON-01",
      name: "Kingfisher Ultra Premium Lager",
      brand: "Kingfisher",
      type: "NON-HOT",
      category: "Beer",
      size: "650ml (Bottle)",
      price: 210,
      description: "Crisp, ultra-smooth premium lager brewed from imported malt.",
      image: "https://images.unsplash.com/photo-1608270114022-7711d9f8c634?w=600&auto=format&fit=crop&q=80",
      abv: "4.8%"
    },
    {
      id: "NON-02",
      name: "British Empire Super Strong Beer",
      brand: "British Empire",
      type: "NON-HOT",
      category: "Beer",
      size: "650ml (Bottle)",
      price: 230,
      description: "Full-bodied robust strong beer popular in Tamil Nadu.",
      image: "https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=600&auto=format&fit=crop&q=80",
      abv: "7.8%"
    },
    {
      id: "NON-03",
      name: "Corona Extra Premium Imported Beer",
      brand: "Corona",
      type: "NON-HOT",
      category: "Beer",
      size: "355ml (Pint)",
      price: 260,
      description: "Refreshing imported Mexican lager, best served with lime.",
      image: "https://images.unsplash.com/photo-1618886614638-80e3c103d31a?w=600&auto=format&fit=crop&q=80",
      abv: "4.5%"
    },
    {
      id: "NON-04",
      name: "Heineken Silver Crisp Lager",
      brand: "Heineken",
      type: "NON-HOT",
      category: "Beer",
      size: "650ml (Bottle)",
      price: 240,
      description: "Cold-filtered at -1°C for smooth drinkability and crisp finish.",
      image: "https://images.unsplash.com/photo-1584225064785-c62a8b43d148?w=600&auto=format&fit=crop&q=80",
      abv: "4.5%"
    },
    {
      id: "NON-05",
      name: "Sula Rasa Shiraz Reserve Red Wine",
      brand: "Sula",
      type: "NON-HOT",
      category: "Wine",
      size: "750ml (Bottle)",
      price: 1250,
      description: "Full-bodied red wine matured in French oak with peppery finish.",
      image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&auto=format&fit=crop&q=80",
      abv: "13.5%"
    },
    {
      id: "NON-06",
      name: "Jacob's Creek Classic Cabernet Sauvignon",
      brand: "Jacob's Creek",
      type: "NON-HOT",
      category: "Wine",
      size: "750ml (Bottle)",
      price: 1380,
      description: "Vibrant Australian red wine brimming with blackcurrant aromas.",
      image: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=600&auto=format&fit=crop&q=80",
      abv: "13.9%"
    }
  ],

  // Mock Customers with Daily Limit tracking
  demoCustomers: [
    {
      aadhaarNumber: "456789012345", // Masked: XXXX-XXXX-2345
      customerId: "TN-DEMO-2345",
      name: "Rajesh Kannan",
      phone: "+91 98401 23456",
      phoneMasked: "******2345",
      district: "Chennai",
      city: "Anna Nagar",
      isRestricted: false,
      restrictionStatus: "Cleared",
      dailyLimits: {
        hotUsed: 0,
        hotMax: 1,
        nonHotUsed: 0,
        nonHotMax: 2,
        date: "2026-09-10"
      },
      personaNote: "Clean Customer: HOT 0/1, NON-HOT 0/2. All bookings available."
    },
    {
      aadhaarNumber: "345678901234",
      customerId: "TN-DEMO-1234",
      name: "S. Murugan",
      phone: "+91 94440 98765",
      phoneMasked: "******1234",
      district: "Chennai",
      city: "T. Nagar",
      isRestricted: false,
      restrictionStatus: "Cleared",
      dailyLimits: {
        hotUsed: 0,
        hotMax: 1,
        nonHotUsed: 1,
        nonHotMax: 2,
        date: "2026-09-10"
      },
      personaNote: "Active Customer: NON-HOT 1/2 used. Can only book 1 additional NON-HOT unit."
    },
    {
      aadhaarNumber: "901234567890",
      customerId: "TN-DEMO-7890",
      name: "M. Vijay",
      phone: "+91 97910 44321",
      phoneMasked: "******7890",
      district: "Chennai",
      city: "Velachery",
      isRestricted: false,
      restrictionStatus: "Cleared",
      dailyLimits: {
        hotUsed: 1,
        hotMax: 1,
        nonHotUsed: 2,
        nonHotMax: 2,
        date: "2026-09-10"
      },
      personaNote: "Limit Reached: HOT 1/1, NON-HOT 2/2. All bookings locked for today."
    },
    {
      aadhaarNumber: "789012345678",
      customerId: "TN-DEMO-5678",
      name: "V. Anbarasan",
      phone: "+91 99402 11987",
      phoneMasked: "******5678",
      district: "Chennai",
      city: "Anna Nagar",
      isRestricted: true,
      restrictionStatus: "Temporarily Restricted",
      restrictionCase: {
        category: "Drink-and-drive related restriction",
        caseRef: "UAL-CASE-DUI-882",
        authority: "Traffic Investigation Wing & RTO",
        imposedDate: "2026-08-15",
        status: "Temporarily Restricted",
        notice: "Account Temporarily Restricted — Booking is currently unavailable."
      },
      dailyLimits: {
        hotUsed: 0,
        hotMax: 0,
        nonHotUsed: 0,
        nonHotMax: 0,
        date: "2026-09-10"
      },
      personaNote: "Restricted Account: Drink-and-drive case. Booking completely disabled."
    }
  ],

  initialBookings: [
    {
      id: "UAL-2026-8942",
      customerId: "TN-DEMO-2345",
      customerName: "Rajesh Kannan",
      shopId: "UAL-CHE-101",
      shopName: "TASMAC Elite Outlet #101 – Anna Nagar",
      productId: "HOT-01",
      productName: "Antiquity Blue Ultra Premium Whisky",
      category: "HOT",
      quantity: 1,
      price: 1180,
      totalAmount: 1180,
      date: "10/09/2026",
      collectionTime: "4:00 PM – 5:00 PM",
      status: "Confirmed",
      qrData: "UAL-TOKEN|ID:UAL-2026-8942|CUST:TN-DEMO-2345|SHOP:UAL-CHE-101|HOT:1|TIME:16:00",
      createdAt: "2026-09-10T11:30:00+05:30"
    },
    {
      id: "UAL-2026-7714",
      customerId: "TN-DEMO-1234",
      customerName: "S. Murugan",
      shopId: "UAL-CHE-205",
      shopName: "TASMAC Retail Outlet #205 – T. Nagar",
      productId: "NON-01",
      productName: "Kingfisher Ultra Premium Lager",
      category: "NON-HOT",
      quantity: 1,
      price: 210,
      totalAmount: 210,
      date: "10/09/2026",
      collectionTime: "6:00 PM – 7:00 PM",
      status: "Confirmed",
      qrData: "UAL-TOKEN|ID:UAL-2026-7714|CUST:TN-DEMO-1234|SHOP:UAL-CHE-205|NONHOT:1|TIME:18:00",
      createdAt: "2026-09-10T12:15:00+05:30"
    },
    {
      id: "UAL-2026-6621",
      customerId: "TN-DEMO-7890",
      customerName: "M. Vijay",
      shopId: "UAL-CHE-309",
      shopName: "TASMAC Elite Store #309 – Velachery",
      productId: "HOT-02",
      productName: "Signature Premier Grain Whisky",
      category: "HOT",
      quantity: 1,
      price: 960,
      totalAmount: 960,
      date: "09/09/2026",
      collectionTime: "7:00 PM – 8:00 PM",
      status: "Completed",
      qrData: "UAL-TOKEN|ID:UAL-2026-6621|CUST:TN-DEMO-7890|SHOP:UAL-CHE-309|HOT:1|COLLECTED",
      createdAt: "2026-09-09T14:10:00+05:30"
    }
  ],

  // Admin Officer Auth
  adminOfficer: {
    username: "admin",
    pin: "8899",
    name: "Dr. K. Rathinavel, Enforcement Officer",
    role: "System Administrator"
  }
};

/**
 * Shared Reactive Storage & Central Controller
 */
class UalStore {
  constructor() {
    this.STORAGE_KEY = "UNAKKU_AVLOTHA_LIMIT_STATE_V2";
    this.listeners = [];
    this.loadState();
  }

  loadState() {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    let initial = null;
    if (saved) {
      try { initial = JSON.parse(saved); } catch (e) { console.warn("UAL reset:", e); }
    }

    this.state = {
      currentUser: initial?.currentUser || null,
      isAdmin: initial?.isAdmin || false,
      selectedDistrict: initial?.selectedDistrict || "Chennai",
      selectedCity: initial?.selectedCity || "Anna Nagar",
      selectedShopId: initial?.selectedShopId || "UAL-CHE-101",
      selectedCategory: initial?.selectedCategory || null, // "HOT" | "NON-HOT"
      selectedProductId: initial?.selectedProductId || null,
      
      shops: initial?.shops || JSON.parse(JSON.stringify(UAL_DB.shops)),
      products: initial?.products || JSON.parse(JSON.stringify(UAL_DB.products)),
      customers: initial?.customers || JSON.parse(JSON.stringify(UAL_DB.demoCustomers)),
      bookings: initial?.bookings || JSON.parse(JSON.stringify(UAL_DB.initialBookings))
    };

    // Default to first demo customer if not logged in
    if (!this.state.currentUser && !this.state.isAdmin) {
      this.state.currentUser = this.state.customers[0];
    }
  }

  save() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify({
        currentUser: this.state.currentUser,
        isAdmin: this.state.isAdmin,
        selectedDistrict: this.state.selectedDistrict,
        selectedCity: this.state.selectedCity,
        selectedShopId: this.state.selectedShopId,
        selectedCategory: this.state.selectedCategory,
        selectedProductId: this.state.selectedProductId,
        shops: this.state.shops,
        products: this.state.products,
        customers: this.state.customers,
        bookings: this.state.bookings
      }));
    } catch (e) {
      console.warn("Storage write failed:", e);
    }
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.save();
    this.listeners.forEach(cb => {
      try { cb(this.state); } catch (e) { console.error("Listener error:", e); }
    });
  }

  // --- Daily Limits Engine ---
  getDailyLimits(user = this.state.currentUser) {
    if (!user) {
      return {
        isRestricted: false,
        hot: { used: 0, max: 1, remaining: 1, isReached: false, percent: 0 },
        nonHot: { used: 0, max: 2, remaining: 2, isReached: false, percent: 0 }
      };
    }

    const limits = user.dailyLimits || { hotUsed: 0, hotMax: 1, nonHotUsed: 0, nonHotMax: 2 };
    const isRestricted = !!user.isRestricted;

    const hotMax = isRestricted ? 0 : (limits.hotMax || 1);
    const hotUsed = isRestricted ? 0 : (limits.hotUsed || 0);
    const hotRemaining = Math.max(0, hotMax - hotUsed);
    const hotReached = isRestricted || hotRemaining <= 0;
    const hotPercent = hotMax > 0 ? Math.min(100, Math.round((hotUsed / hotMax) * 100)) : 100;

    const nonHotMax = isRestricted ? 0 : (limits.nonHotMax || 2);
    const nonHotUsed = isRestricted ? 0 : (limits.nonHotUsed || 0);
    const nonHotRemaining = Math.max(0, nonHotMax - nonHotUsed);
    const nonHotReached = isRestricted || nonHotRemaining <= 0;
    const nonHotPercent = nonHotMax > 0 ? Math.min(100, Math.round((nonHotUsed / nonHotMax) * 100)) : 100;

    return {
      isRestricted,
      restrictionStatus: user.restrictionStatus,
      restrictionCase: user.restrictionCase,
      hot: {
        used: hotUsed,
        max: hotMax,
        remaining: hotRemaining,
        isReached: hotReached,
        percent: hotPercent
      },
      nonHot: {
        used: nonHotUsed,
        max: nonHotMax,
        remaining: nonHotRemaining,
        isReached: nonHotReached,
        percent: nonHotPercent
      }
    };
  }

  // Validation before booking
  canBook(productType, quantity = 1, user = this.state.currentUser) {
    if (!user) return { allowed: false, reason: "Please log in to book a collection token." };
    if (user.isRestricted) {
      return { allowed: false, reason: "Account Temporarily Restricted — Booking is currently unavailable." };
    }

    const limits = this.getDailyLimits(user);

    if (productType === "HOT") {
      if (limits.hot.isReached) {
        return { allowed: false, reason: "Your HOT daily limit has been reached. You can book again tomorrow." };
      }
      if (quantity > limits.hot.remaining) {
        return { allowed: false, reason: `Requested quantity exceeds your remaining HOT limit (${limits.hot.remaining} unit remaining today).` };
      }
    } else if (productType === "NON-HOT") {
      if (limits.nonHot.isReached) {
        return { allowed: false, reason: "Your NON-HOT daily limit has been reached. You can book again tomorrow." };
      }
      if (quantity > limits.nonHot.remaining) {
        return { allowed: false, reason: `Requested quantity exceeds your remaining NON-HOT limit (${limits.nonHot.remaining} unit remaining today).` };
      }
    }

    return { allowed: true, reason: "" };
  }

  // Create Booking
  createBooking({ shopId, productId, quantity, date, collectionTime }) {
    if (!this.state.currentUser) throw new Error("Customer authentication required.");
    
    const product = this.state.products.find(p => p.id === productId);
    if (!product) throw new Error("Selected product not found.");

    const validation = this.canBook(product.type, quantity);
    if (!validation.allowed) throw new Error(validation.reason);

    const shop = this.state.shops.find(s => s.id === shopId);
    if (!shop) throw new Error("Selected shop not found.");

    // Check inventory
    const currentStock = shop.inventory?.[productId] ?? 0;
    if (currentStock < quantity) {
      throw new Error(`Insufficient stock at this shop. Only ${currentStock} item(s) available.`);
    }

    // Check slot capacity
    const slot = shop.timeSlots?.find(s => s.label === collectionTime);
    if (slot && slot.booked >= slot.capacity) {
      throw new Error("This collection slot is unavailable. Please select another slot.");
    }

    // Deduct stock & book slot
    shop.inventory[productId] = currentStock - quantity;
    if (slot) slot.booked += 1;

    // Deduct Customer Daily Limit
    const user = this.state.customers.find(c => c.aadhaarNumber === this.state.currentUser.aadhaarNumber);
    if (user) {
      if (product.type === "HOT") {
        user.dailyLimits.hotUsed = (user.dailyLimits.hotUsed || 0) + quantity;
      } else {
        user.dailyLimits.nonHotUsed = (user.dailyLimits.nonHotUsed || 0) + quantity;
      }
      this.state.currentUser = user;
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const bookingId = `UAL-2026-${randomSuffix}`;

    const newBooking = {
      id: bookingId,
      customerId: user.customerId || `TN-DEMO-${user.aadhaarNumber.slice(-4)}`,
      customerName: user.name,
      customerPhone: user.phoneMasked,
      shopId: shop.id,
      shopName: shop.name,
      shopAddress: shop.address,
      productId: product.id,
      productName: product.name,
      brand: product.brand,
      category: product.type,
      size: product.size,
      quantity: quantity,
      unitPrice: product.price,
      totalAmount: product.price * quantity,
      date: date || new Date().toLocaleDateString("en-GB"),
      collectionTime: collectionTime,
      status: "Confirmed",
      qrData: `UAL-TOKEN|ID:${bookingId}|CUST:${user.customerId}|TYPE:${product.type}|QTY:${quantity}|TIME:${collectionTime}`,
      createdAt: new Date().toISOString()
    };

    this.state.bookings.unshift(newBooking);
    this.notify();
    return newBooking;
  }

  // Persona switch helper
  switchCustomer(aadhaar) {
    const cust = this.state.customers.find(c => c.aadhaarNumber === aadhaar);
    if (cust) {
      this.state.currentUser = cust;
      this.state.isAdmin = false;
      this.notify();
    }
  }

  // Admin login
  loginAdmin(pin) {
    if (pin === "8899" || pin === "ADMIN") {
      this.state.isAdmin = true;
      this.state.currentUser = null;
      this.notify();
      return true;
    }
    return false;
  }

  logout() {
    this.state.currentUser = null;
    this.state.isAdmin = false;
    this.notify();
  }

  // Toggle user restriction
  toggleRestriction(aadhaar, isRestricted, category = "Drink-and-drive related restriction") {
    const cust = this.state.customers.find(c => c.aadhaarNumber === aadhaar);
    if (!cust) return;
    cust.isRestricted = isRestricted;
    cust.restrictionStatus = isRestricted ? "Temporarily Restricted" : "Cleared";
    if (isRestricted) {
      cust.restrictionCase = {
        category: category,
        caseRef: "UAL-CASE-" + Math.floor(100 + Math.random() * 900),
        imposedDate: new Date().toISOString().split("T")[0],
        status: "Temporarily Restricted",
        notice: "Account Temporarily Restricted — Booking is currently unavailable."
      };
    } else {
      cust.restrictionCase = null;
    }
    if (this.state.currentUser?.aadhaarNumber === aadhaar) {
      this.state.currentUser = cust;
    }
    this.notify();
  }
}

// Global Store Instance
window.ualStore = new UalStore();

/**
 * Common UI Components (Navbar, Student Banner, Footer, Toasts)
 */
const UalUI = {
  renderHeader(activePage = "") {
    const user = window.ualStore.state.currentUser;
    const isAdmin = window.ualStore.state.isAdmin;

    let authPillHtml = '';
    if (isAdmin) {
      authPillHtml = `
        <div class="user-pill admin-pill">
          <span class="user-pill-avatar">🛡️</span>
          <div class="user-pill-meta">
            <span class="user-pill-name">Admin Console</span>
            <span class="user-pill-sub">Enforcement Officer</span>
          </div>
          <button class="btn-logout" onclick="ualStore.logout(); window.location.href='index.html';">Logout</button>
        </div>
      `;
    } else if (user) {
      authPillHtml = `
        <div class="user-pill" onclick="window.location.href='dashboard.html'">
          <span class="user-pill-avatar">${user.name.charAt(0)}</span>
          <div class="user-pill-meta">
            <span class="user-pill-name">${user.name}</span>
            <span class="user-pill-sub">${user.customerId}</span>
          </div>
          <button class="btn-logout" onclick="event.stopPropagation(); ualStore.logout(); window.location.href='login.html';">Logout</button>
        </div>
      `;
    } else {
      authPillHtml = `
        <a href="login.html" class="btn-nav-login">
          <span>Login (Aadhaar OTP)</span>
        </a>
      `;
    }

    return `
      <!-- Student / Demo Project Disclaimer Strip -->
      <div class="student-disclaimer-strip">
        <div class="container flex justify-between items-center">
          <div class="disclaimer-text">
            <span class="disclaimer-badge">STUDENT DEMO</span>
            <span>Unakku Avlotha Limit – Educational Prototype • Not an Official TASMAC Website</span>
          </div>
          <div class="disclaimer-links">
            <button class="btn-persona-quick" onclick="UalUI.openPersonaModal()">🎭 Switch Test Persona</button>
            <a href="admin.html" class="admin-quick-link">Admin Portal</a>
          </div>
        </div>
      </div>

      <!-- Main Navigation Bar -->
      <header class="ual-header">
        <div class="container nav-row">
          <a href="index.html" class="ual-brand">
            <!-- Custom Booking & Awareness Logo -->
            <div class="ual-logo-mark">
              <svg viewBox="0 0 48 48" width="40" height="40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <!-- Outer Token Silhouette -->
                <rect x="4" y="6" width="40" height="36" rx="8" fill="#0f5a34" stroke="#d97706" stroke-width="2"/>
                <circle cx="4" cy="24" r="4" fill="#ffffff"/>
                <circle cx="44" cy="24" r="4" fill="#ffffff"/>
                <!-- Bottle / Glass Outline inside -->
                <path d="M21 15 H27 V19 L29 23 V33 H19 V23 L21 19 Z" fill="#ffffff" opacity="0.9"/>
                <!-- Green Verification Checkmark -->
                <path d="M20 27 L23 30 L28 23" stroke="#16a34a" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                <!-- Tamil Nadu Inspired Arch Peak Accent -->
                <path d="M20 11 L24 8 L28 11" stroke="#d97706" stroke-width="1.8" stroke-linecap="round"/>
              </svg>
            </div>
            <div class="ual-brand-text">
              <span class="ual-title">Unakku Avlotha Limit</span>
              <span class="ual-tagline">Know Your Limit • Book Responsibly • Stay Safe</span>
            </div>
          </a>

          <!-- Nav Links -->
          <nav class="ual-nav-menu">
            <a href="index.html" class="ual-nav-link ${activePage === 'home' ? 'active' : ''}">Home</a>
            <a href="index.html#about" class="ual-nav-link">About</a>
            <a href="shops.html" class="ual-nav-link ${activePage === 'shops' ? 'active' : ''}">Shops</a>
            <a href="products.html" class="ual-nav-link ${activePage === 'products' ? 'active' : ''}">Products</a>
            <a href="booking.html" class="ual-nav-link ${activePage === 'booking' ? 'active' : ''}">Booking</a>
            <a href="history.html" class="ual-nav-link ${activePage === 'history' ? 'active' : ''}">My Bookings</a>
            <a href="awareness.html" class="ual-nav-link ${activePage === 'awareness' ? 'active' : ''}">Know the Effects</a>
            <a href="awareness.html#resources" class="ual-nav-link">Help</a>
          </nav>

          <!-- Auth & Location Controls -->
          <div class="nav-actions">
            ${authPillHtml}
          </div>
        </div>
      </header>
    `;
  },

  renderFooter() {
    return `
      <footer class="ual-footer">
        <div class="container">
          <div class="footer-grid">
            <div>
              <div class="flex items-center gap-2" style="margin-bottom:0.75rem;">
                <div class="ual-logo-mark" style="width:34px; height:34px;">
                  <svg viewBox="0 0 48 48" width="28" height="28" fill="none">
                    <rect x="4" y="6" width="40" height="36" rx="8" fill="#0f5a34" stroke="#d97706" stroke-width="2"/>
                    <circle cx="4" cy="24" r="4" fill="#ffffff"/>
                    <circle cx="44" cy="24" r="4" fill="#ffffff"/>
                    <path d="M21 15 H27 V19 L29 23 V33 H19 V23 L21 19 Z" fill="#ffffff" opacity="0.9"/>
                    <path d="M20 27 L23 30 L28 23" stroke="#16a34a" stroke-width="2.5"/>
                  </svg>
                </div>
                <h3 style="font-size:1.15rem; font-weight:800; color:var(--primary-dark);">Unakku Avlotha Limit</h3>
              </div>
              <p class="footer-tagline-text">“Know Your Limit • Book Responsibly • Stay Safe”</p>
              <p class="footer-desc">
                A modern student and portfolio demo project exploring disciplined advance token booking, strict HOT/NON-HOT daily limit enforcement, and public health awareness.
              </p>
              <div class="footer-disclaimer-box">
                ⚠️ <strong>Student / Demo Project – Not an Official TASMAC Website.</strong><br>
                Created strictly for educational, design, and portfolio demonstration purposes.
              </div>
            </div>

            <div>
              <h4 class="footer-heading">Platform Links</h4>
              <ul class="footer-list">
                <li><a href="index.html">Home</a></li>
                <li><a href="shops.html">Nearby Shops</a></li>
                <li><a href="products.html">Shop Products</a></li>
                <li><a href="booking.html">Book Token</a></li>
                <li><a href="awareness.html">Alcohol Awareness</a></li>
                <li><a href="history.html">My Bookings</a></li>
                <li><a href="admin.html">Admin Dashboard</a></li>
              </ul>
            </div>

            <div>
              <h4 class="footer-heading">Health & Support</h4>
              <ul class="footer-list">
                <li><a href="awareness.html#know-effects">Know the Effects</a></li>
                <li><a href="awareness.html#bodymind">Body & Mind Visual</a></li>
                <li><a href="awareness.html#resources">Tele-MANAS (14416)</a></li>
                <li><a href="awareness.html#resources">National De-addiction Helpline</a></li>
                <li><a href="awareness.html#resources">IMH Kilpauk Chennai</a></li>
                <li><a href="awareness.html#resources">TTK Hospital Support</a></li>
              </ul>
            </div>

            <div>
              <h4 class="footer-heading">Statutory Notice</h4>
              <div class="statutory-card">
                <p style="font-weight:700; color:var(--danger); margin-bottom:0.35rem;">⚠️ Health Warning:</p>
                <p style="font-size:0.8rem; color:var(--text-secondary); line-height:1.5;">
                  Liquor consumption is injurious to health. Be safe — do not drink and drive.
                </p>
                <p style="font-size:0.75rem; color:var(--text-muted); margin-top:0.4rem;">
                  மது அருந்துதல் உடல் நலத்திற்கு கேடு. பாதுகாப்பாய் இருங்கள் - மது அருந்திவிட்டு வாகனம் ஓட்டாதீர்கள்.
                </p>
              </div>
            </div>
          </div>

          <div class="footer-bottom-row">
            <div>
              © 2026 <strong>Unakku Avlotha Limit</strong>. All rights reserved. Built with HTML5, CSS3 & Modern JavaScript.
            </div>
            <div class="flex gap-3">
              <span>Privacy Safe Mock Prototype</span>
              <span>•</span>
              <span>Zero Build Dependency</span>
            </div>
          </div>
        </div>
      </footer>
    `;
  },

  // Toast notifications
  toast(message, type = "info") {
    let container = document.getElementById("toastContainer");
    if (!container) {
      container = document.createElement("div");
      container.id = "toastContainer";
      container.className = "toast-container";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    const icons = { success: "✅", error: "❌", warning: "⚠️", info: "ℹ️" };
    toast.innerHTML = `<span>${icons[type] || "ℹ️"}</span><span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(20px)";
      toast.style.transition = "all 0.3s ease";
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  },

  // 1-Click Persona Switcher Modal
  openPersonaModal() {
    const customers = window.ualStore.state.customers;
    const currentAadhaar = window.ualStore.state.currentUser?.aadhaarNumber;

    let modal = document.getElementById("personaModal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "personaModal";
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="modal-overlay" onclick="if(event.target === this) this.remove()">
        <div class="modal-dialog wide">
          <div class="modal-header">
            <h3 class="modal-title">🎭 Select Demo Persona</h3>
            <button class="modal-close-btn" onclick="this.closest('.modal-overlay').remove()">✕</button>
          </div>
          <div class="modal-body">
            <p style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:1.25rem;">
              Quickly test different daily limit and restriction scenarios for your presentation:
            </p>

            <div class="flex flex-col gap-2">
              ${customers.map(c => {
                const limits = window.ualStore.getDailyLimits(c);
                const isSelected = c.aadhaarNumber === currentAadhaar;
                return `
                  <div class="persona-row ${c.isRestricted ? 'restricted' : ''} ${isSelected ? 'active-persona' : ''}" onclick="UalUI.selectPersona('${c.aadhaarNumber}')">
                    <div style="flex:1;">
                      <div class="flex items-center gap-2">
                        <strong>${c.name}</strong>
                        <span class="badge ${c.isRestricted ? 'badge-danger' : limits.hot.isReached ? 'badge-warning' : 'badge-success'}">
                          ${c.isRestricted ? 'Restricted' : limits.hot.isReached ? 'Limit Reached' : 'Clean'}
                        </span>
                        <span class="mono-text">${c.customerId}</span>
                      </div>
                      <div style="font-size:0.8rem; color:var(--text-secondary); margin-top:0.25rem;">${c.personaNote}</div>
                      <div style="font-size:0.75rem; color:var(--text-muted); margin-top:0.25rem;">
                        🔥 HOT: <strong>${limits.hot.used}/${limits.hot.max}</strong> | 🍺 NON-HOT: <strong>${limits.nonHot.used}/${limits.nonHot.max}</strong>
                      </div>
                    </div>
                    <button class="btn-primary" style="padding:0.4rem 0.8rem; font-size:0.8rem;">Select</button>
                  </div>
                `;
              }).join('')}

              <div class="persona-row admin-persona-row" onclick="UalUI.selectAdmin()">
                <div style="flex:1;">
                  <div class="flex items-center gap-2">
                    <strong style="color:#ffffff;">Dr. K. Rathinavel</strong>
                    <span class="badge" style="background:#38bdf8; color:#0f172a;">Administrator</span>
                  </div>
                  <div style="font-size:0.8rem; color:#cbd5e1; margin-top:0.25rem;">
                    Full access to Shop Management, Inventory Adjustments, Canvas Charts, and Customer Restriction Module.
                  </div>
                </div>
                <button class="btn-primary" style="background:#38bdf8; color:#0f172a; padding:0.4rem 0.8rem; font-size:0.8rem;">Open Admin</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  selectPersona(aadhaar) {
    window.ualStore.switchCustomer(aadhaar);
    const modal = document.getElementById("personaModal");
    if (modal) modal.innerHTML = "";
    UalUI.toast(`Switched to customer: ${window.ualStore.state.currentUser.name}`, "success");
    setTimeout(() => window.location.reload(), 400);
  },

  selectAdmin() {
    window.ualStore.loginAdmin("8899");
    const modal = document.getElementById("personaModal");
    if (modal) modal.innerHTML = "";
    UalUI.toast("Logged in as Administrator", "success");
    window.location.href = "admin.html";
  }
};

// Global QR Pass Modal accessible on any page
window.openQrPassModal = function(bookingId) {
  const booking = window.ualStore.state.bookings.find(b => b.id === bookingId);
  if (!booking) return;

  let modal = document.getElementById("qrModal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "qrModal";
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="modal-overlay" onclick="if(event.target === this) this.remove()">
      <div class="modal-dialog">
        <div class="token-pass-header">
          <div class="flex items-center gap-2">
            <span style="font-size:1.2rem;">🎫</span>
            <strong style="font-size:1.05rem;">Official Digital Token</strong>
          </div>
          <button class="modal-close-btn" style="color:#ffffff;" onclick="this.closest('.modal-overlay').remove()">✕</button>
        </div>
        <div class="token-pass-body">
          <span class="badge ${booking.status === 'Confirmed' ? 'badge-success' : 'badge-info'}" style="font-size:0.8rem;">
            ${booking.status.toUpperCase()} RESERVATION
          </span>
          <h2 style="font-size:1.6rem; font-weight:900; color:#0f5a34; margin:0.35rem 0;">${booking.id}</h2>
          <p style="font-size:0.82rem; color:var(--text-secondary);">
            Present this scannable QR pass at the physical TASMAC retail counter.
          </p>

          <div class="qr-code-frame" id="globalQrContainer"></div>

          <div class="token-pass-meta-grid">
            <div>
              <span style="font-size:0.72rem; color:var(--text-muted); display:block;">Customer</span>
              <strong>${booking.customerName}</strong>
            </div>
            <div>
              <span style="font-size:0.72rem; color:var(--text-muted); display:block;">Customer ID</span>
              <strong class="mono-text">${booking.customerId}</strong>
            </div>
            <div>
              <span style="font-size:0.72rem; color:var(--text-muted); display:block;">Outlet</span>
              <strong>${booking.shopName}</strong>
            </div>
            <div>
              <span style="font-size:0.72rem; color:var(--text-muted); display:block;">Time Slot</span>
              <strong style="color:#b45309;">${booking.collectionTime}</strong>
            </div>
            <div>
              <span style="font-size:0.72rem; color:var(--text-muted); display:block;">Item</span>
              <strong>${booking.productName} (${booking.quantity} Unit)</strong>
            </div>
            <div>
              <span style="font-size:0.72rem; color:var(--text-muted); display:block;">Pay at Outlet</span>
              <strong style="color:#0f5a34;">₹${booking.totalAmount}</strong>
            </div>
          </div>

          <div style="margin-top:1.25rem; display:flex; gap:0.5rem; justify-content:center;">
            <button class="btn-primary" onclick="window.print()" style="font-size:0.85rem; padding:0.5rem 1.25rem;">
              🖨️ Print Pass
            </button>
            <button class="btn-outline" onclick="this.closest('.modal-overlay').remove()" style="font-size:0.85rem; padding:0.5rem 1.25rem;">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  setTimeout(() => {
    const qrTarget = document.getElementById("globalQrContainer");
    if (qrTarget && window.QRCode) {
      qrTarget.innerHTML = "";
      new QRCode(qrTarget, {
        text: booking.qrData || `UAL-PASS|${booking.id}`,
        width: 170,
        height: 170,
        colorDark: "#0f5a34",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
      });
    }
  }, 50);
};

window.UalUI = UalUI;

