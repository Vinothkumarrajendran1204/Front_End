/**
 * Tamil Nadu TASMAC Smart Booking & Limit Management System
 * Mock Data Database
 */

const TASMAC_DATA = {
  districts: [
    {
      id: "chennai",
      name: "Chennai",
      nameTamil: "சென்னை",
      cities: ["Anna Nagar", "T. Nagar", "Adyar", "Velachery", "Nungambakkam", "Ambattur", "Mylapore", "Royapettah"]
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
      id: "TN-CHE-1042",
      name: "TASMAC Elite Boutique #1042 - Anna Nagar",
      district: "Chennai",
      city: "Anna Nagar",
      address: "Shop No. 42, 2nd Avenue, Block AB, Anna Nagar West, Chennai - 600040",
      landmark: "Opposite Tower Park",
      pincode: "600040",
      phone: "044-26210421",
      openingTime: "12:00 PM",
      closingTime: "10:00 PM",
      isOpen: true,
      distanceKm: 0.8,
      rating: 4.6,
      stockStatus: "High Stock",
      timeSlots: [
        { id: "slot-1", label: "12:00 PM - 02:00 PM", capacity: 25, booked: 8 },
        { id: "slot-2", label: "02:00 PM - 04:00 PM", capacity: 25, booked: 12 },
        { id: "slot-3", label: "04:00 PM - 06:00 PM", capacity: 30, booked: 19 },
        { id: "slot-4", label: "06:00 PM - 08:00 PM", capacity: 30, booked: 24 },
        { id: "slot-5", label: "08:00 PM - 10:00 PM", capacity: 30, booked: 16 }
      ],
      inventory: {
        "HL-01": 24, "HL-02": 18, "HL-03": 35, "HL-04": 15, "HL-05": 20, "HL-06": 12,
        "BR-01": 60, "BR-02": 45, "BR-03": 30, "BR-04": 40, "BR-05": 35,
        "WN-01": 16, "WN-02": 14, "WN-03": 22, "WN-04": 18,
        "CG-01": 80, "CG-02": 95, "CG-03": 50, "CG-04": 110, "CG-05": 90, "CG-06": 65
      }
    },
    {
      id: "TN-CHE-2105",
      name: "TASMAC Retail Outlet #2105 - T. Nagar",
      district: "Chennai",
      city: "T. Nagar",
      address: "Door No. 18, South Usman Road, T. Nagar, Chennai - 600017",
      landmark: "Near Panagal Park Flyover",
      pincode: "600017",
      phone: "044-24342105",
      openingTime: "12:00 PM",
      closingTime: "10:00 PM",
      isOpen: true,
      distanceKm: 1.4,
      rating: 4.2,
      stockStatus: "Moderate Stock",
      timeSlots: [
        { id: "slot-1", label: "12:00 PM - 02:00 PM", capacity: 25, booked: 14 },
        { id: "slot-2", label: "02:00 PM - 04:00 PM", capacity: 25, booked: 18 },
        { id: "slot-3", label: "04:00 PM - 06:00 PM", capacity: 30, booked: 27 },
        { id: "slot-4", label: "06:00 PM - 08:00 PM", capacity: 30, booked: 29 },
        { id: "slot-5", label: "08:00 PM - 10:00 PM", capacity: 30, booked: 20 }
      ],
      inventory: {
        "HL-01": 15, "HL-02": 10, "HL-03": 28, "HL-04": 8, "HL-07": 32, "HL-08": 40,
        "BR-01": 50, "BR-02": 65, "BR-04": 30, "BR-06": 25,
        "WN-03": 12, "WN-04": 15,
        "CG-01": 90, "CG-02": 120, "CG-04": 100, "CG-05": 85
      }
    },
    {
      id: "TN-CHE-3045",
      name: "TASMAC Elite Mall Store #3045 - Velachery",
      district: "Chennai",
      city: "Velachery",
      address: "Basement Level 1, Phoenix Marketcity, Velachery Main Road, Chennai - 600042",
      landmark: "Phoenix Marketcity L1",
      pincode: "600042",
      phone: "044-43593045",
      openingTime: "12:00 PM",
      closingTime: "10:00 PM",
      isOpen: true,
      distanceKm: 2.8,
      rating: 4.8,
      stockStatus: "High Stock",
      timeSlots: [
        { id: "slot-1", label: "12:00 PM - 02:00 PM", capacity: 30, booked: 9 },
        { id: "slot-2", label: "02:00 PM - 04:00 PM", capacity: 30, booked: 15 },
        { id: "slot-3", label: "04:00 PM - 06:00 PM", capacity: 35, booked: 22 },
        { id: "slot-4", label: "06:00 PM - 08:00 PM", capacity: 35, booked: 28 },
        { id: "slot-5", label: "08:00 PM - 10:00 PM", capacity: 35, booked: 19 }
      ],
      inventory: {
        "HL-01": 40, "HL-02": 25, "HL-03": 30, "HL-04": 28, "HL-05": 30, "HL-06": 25,
        "BR-01": 80, "BR-02": 70, "BR-03": 45, "BR-04": 60, "BR-05": 40, "BR-06": 50,
        "WN-01": 35, "WN-02": 30, "WN-03": 40, "WN-04": 30, "WN-05": 25,
        "CG-01": 120, "CG-02": 150, "CG-03": 80, "CG-04": 140, "CG-05": 110, "CG-06": 90
      }
    },
    {
      id: "TN-CHE-4190",
      name: "TASMAC Retail Outlet #4190 - Adyar",
      district: "Chennai",
      city: "Adyar",
      address: "No. 12, Sardar Patel Road, Kasturibai Nagar, Adyar, Chennai - 600020",
      landmark: "Near Adyar Signal",
      pincode: "600020",
      phone: "044-24414190",
      openingTime: "12:00 PM",
      closingTime: "10:00 PM",
      isOpen: true,
      distanceKm: 3.5,
      rating: 4.3,
      stockStatus: "Moderate Stock",
      timeSlots: [
        { id: "slot-1", label: "12:00 PM - 02:00 PM", capacity: 20, booked: 6 },
        { id: "slot-2", label: "02:00 PM - 04:00 PM", capacity: 20, booked: 11 },
        { id: "slot-3", label: "04:00 PM - 06:00 PM", capacity: 25, booked: 18 },
        { id: "slot-4", label: "06:00 PM - 08:00 PM", capacity: 25, booked: 21 },
        { id: "slot-5", label: "08:00 PM - 10:00 PM", capacity: 25, booked: 14 }
      ],
      inventory: {
        "HL-01": 18, "HL-02": 12, "HL-03": 25, "HL-04": 10, "HL-07": 20,
        "BR-01": 45, "BR-02": 50, "BR-04": 35, "BR-05": 20,
        "WN-02": 10, "WN-03": 15,
        "CG-01": 60, "CG-02": 80, "CG-04": 75, "CG-05": 60
      }
    },
    {
      id: "TN-CBE-5012",
      name: "TASMAC Elite Store #5012 - Gandhipuram",
      district: "Coimbatore",
      city: "Gandhipuram",
      address: "Cross Cut Road, 7th Street Corner, Gandhipuram, Coimbatore - 641012",
      landmark: "Behind GP Signal",
      pincode: "641012",
      phone: "0422-2495012",
      openingTime: "12:00 PM",
      closingTime: "10:00 PM",
      isOpen: true,
      distanceKm: 1.1,
      rating: 4.7,
      stockStatus: "High Stock",
      timeSlots: [
        { id: "slot-1", label: "12:00 PM - 02:00 PM", capacity: 25, booked: 7 },
        { id: "slot-2", label: "02:00 PM - 04:00 PM", capacity: 25, booked: 13 },
        { id: "slot-3", label: "04:00 PM - 06:00 PM", capacity: 30, booked: 19 },
        { id: "slot-4", label: "06:00 PM - 08:00 PM", capacity: 30, booked: 25 },
        { id: "slot-5", label: "08:00 PM - 10:00 PM", capacity: 30, booked: 17 }
      ],
      inventory: {
        "HL-01": 30, "HL-02": 20, "HL-03": 35, "HL-04": 18, "HL-05": 25,
        "BR-01": 55, "BR-02": 60, "BR-03": 35, "BR-04": 45, "BR-05": 30,
        "WN-01": 20, "WN-02": 15, "WN-03": 25,
        "CG-01": 90, "CG-02": 100, "CG-03": 45, "CG-04": 95, "CG-05": 80
      }
    },
    {
      id: "TN-CBE-5188",
      name: "TASMAC Retail Outlet #5188 - RS Puram",
      district: "Coimbatore",
      city: "RS Puram",
      address: "D.B. Road, Near Post Office, R.S. Puram, Coimbatore - 641002",
      landmark: "Opposite Corporation Park",
      pincode: "641002",
      phone: "0422-2545188",
      openingTime: "12:00 PM",
      closingTime: "10:00 PM",
      isOpen: true,
      distanceKm: 2.2,
      rating: 4.4,
      stockStatus: "Moderate Stock",
      timeSlots: [
        { id: "slot-1", label: "12:00 PM - 02:00 PM", capacity: 20, booked: 5 },
        { id: "slot-2", label: "02:00 PM - 04:00 PM", capacity: 20, booked: 9 },
        { id: "slot-3", label: "04:00 PM - 06:00 PM", capacity: 25, booked: 16 },
        { id: "slot-4", label: "06:00 PM - 08:00 PM", capacity: 25, booked: 22 },
        { id: "slot-5", label: "08:00 PM - 10:00 PM", capacity: 25, booked: 12 }
      ],
      inventory: {
        "HL-01": 22, "HL-03": 30, "HL-04": 12, "HL-07": 25, "HL-08": 30,
        "BR-01": 40, "BR-02": 55, "BR-04": 30, "BR-06": 20,
        "WN-03": 15, "WN-04": 12,
        "CG-01": 70, "CG-02": 85, "CG-04": 90, "CG-05": 70
      }
    },
    {
      id: "TN-MDU-6021",
      name: "TASMAC Elite Store #6021 - KK Nagar",
      district: "Madurai",
      city: "KK Nagar",
      address: "80 Feet Road, Near Arch, KK Nagar, Madurai - 625020",
      landmark: "Next to Apollo Hospital Link Rd",
      pincode: "625020",
      phone: "0452-2586021",
      openingTime: "12:00 PM",
      closingTime: "10:00 PM",
      isOpen: true,
      distanceKm: 1.5,
      rating: 4.5,
      stockStatus: "High Stock",
      timeSlots: [
        { id: "slot-1", label: "12:00 PM - 02:00 PM", capacity: 25, booked: 8 },
        { id: "slot-2", label: "02:00 PM - 04:00 PM", capacity: 25, booked: 14 },
        { id: "slot-3", label: "04:00 PM - 06:00 PM", capacity: 30, booked: 21 },
        { id: "slot-4", label: "06:00 PM - 08:00 PM", capacity: 30, booked: 26 },
        { id: "slot-5", label: "08:00 PM - 10:00 PM", capacity: 30, booked: 15 }
      ],
      inventory: {
        "HL-01": 25, "HL-02": 15, "HL-03": 40, "HL-04": 20, "HL-07": 35,
        "BR-01": 50, "BR-02": 65, "BR-03": 25, "BR-04": 40, "BR-05": 25,
        "WN-01": 14, "WN-03": 20,
        "CG-01": 85, "CG-02": 110, "CG-04": 95, "CG-05": 80
      }
    },
    {
      id: "TN-TRY-7015",
      name: "TASMAC Boutique Outlet #7015 - Thillai Nagar",
      district: "Tiruchirappalli",
      city: "Thillai Nagar",
      address: "Main Road, 10th Cross East, Thillai Nagar, Trichy - 620018",
      landmark: "Near Srinivasa Theatre",
      pincode: "620018",
      phone: "0431-2747015",
      openingTime: "12:00 PM",
      closingTime: "10:00 PM",
      isOpen: true,
      distanceKm: 1.8,
      rating: 4.4,
      stockStatus: "High Stock",
      timeSlots: [
        { id: "slot-1", label: "12:00 PM - 02:00 PM", capacity: 20, booked: 6 },
        { id: "slot-2", label: "02:00 PM - 04:00 PM", capacity: 20, booked: 10 },
        { id: "slot-3", label: "04:00 PM - 06:00 PM", capacity: 25, booked: 18 },
        { id: "slot-4", label: "06:00 PM - 08:00 PM", capacity: 25, booked: 23 },
        { id: "slot-5", label: "08:00 PM - 10:00 PM", capacity: 25, booked: 13 }
      ],
      inventory: {
        "HL-01": 20, "HL-02": 14, "HL-03": 30, "HL-04": 15, "HL-08": 25,
        "BR-01": 45, "BR-02": 50, "BR-04": 35, "BR-05": 20,
        "WN-02": 12, "WN-03": 18,
        "CG-01": 75, "CG-02": 90, "CG-04": 85, "CG-05": 70
      }
    },
    {
      id: "TN-SLM-8032",
      name: "TASMAC Retail Outlet #8032 - Fairlands",
      district: "Salem",
      city: "Fairlands",
      address: "Brindavan Road, 5th Cross, Fairlands, Salem - 636016",
      landmark: "Opposite New Bus Stand Bypass",
      pincode: "636016",
      phone: "0427-2448032",
      openingTime: "12:00 PM",
      closingTime: "10:00 PM",
      isOpen: true,
      distanceKm: 2.1,
      rating: 4.3,
      stockStatus: "Moderate Stock",
      timeSlots: [
        { id: "slot-1", label: "12:00 PM - 02:00 PM", capacity: 20, booked: 5 },
        { id: "slot-2", label: "02:00 PM - 04:00 PM", capacity: 20, booked: 9 },
        { id: "slot-3", label: "04:00 PM - 06:00 PM", capacity: 25, booked: 17 },
        { id: "slot-4", label: "06:00 PM - 08:00 PM", capacity: 25, booked: 21 },
        { id: "slot-5", label: "08:00 PM - 10:00 PM", capacity: 25, booked: 11 }
      ],
      inventory: {
        "HL-01": 18, "HL-03": 28, "HL-04": 12, "HL-07": 30,
        "BR-01": 40, "BR-02": 48, "BR-04": 30,
        "WN-03": 14,
        "CG-01": 65, "CG-02": 75, "CG-04": 80, "CG-05": 65
      }
    }
  ],

  products: [
    // --- HARD LIQUOR ---
    {
      id: "HL-01",
      name: "Antiquity Blue Ultra Premium Whisky",
      category: "Hard Liquor",
      subCategory: "Whisky",
      brand: "Antiquity",
      size: "750ml (Full Bottle)",
      volumeMl: 750,
      abv: "42.8%",
      price: 1180,
      description: "Finest blend of imported Scotch malts and mature Indian grain spirits.",
      image: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=600&auto=format&fit=crop&q=80",
      quotaCost: 1.0 // 1.0 unit = 1 full bottle (exhausts weekly hard liquor quota)
    },
    {
      id: "HL-02",
      name: "Signature Premier Grain Whisky",
      category: "Hard Liquor",
      subCategory: "Whisky",
      brand: "Signature",
      size: "750ml (Full Bottle)",
      volumeMl: 750,
      abv: "42.8%",
      price: 960,
      description: "Crafted with imported 8-year aged Scotch malts and charcoal filtered.",
      image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&auto=format&fit=crop&q=80",
      quotaCost: 1.0
    },
    {
      id: "HL-03",
      name: "Old Monk The Legend Premium Rum",
      category: "Hard Liquor",
      subCategory: "Rum",
      brand: "Old Monk",
      size: "750ml (Full Bottle)",
      volumeMl: 750,
      abv: "42.8%",
      price: 840,
      description: "Iconic vatted dark rum aged in oak vats with rich notes of vanilla and spice.",
      image: "https://images.unsplash.com/photo-1567696911980-2eed69a46042?w=600&auto=format&fit=crop&q=80",
      quotaCost: 1.0
    },
    {
      id: "HL-04",
      name: "Morpheus XO Blended Premium Brandy",
      category: "Hard Liquor",
      subCategory: "Brandy",
      brand: "Morpheus",
      size: "750ml (Full Bottle)",
      volumeMl: 750,
      abv: "42.8%",
      price: 1020,
      description: "Distilled from fine grapes and aged in French Limousin oak casks.",
      image: "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?w=600&auto=format&fit=crop&q=80",
      quotaCost: 1.0
    },
    {
      id: "HL-05",
      name: "Smirnoff Triple Distilled Vodka",
      category: "Hard Liquor",
      subCategory: "Vodka",
      brand: "Smirnoff",
      size: "750ml (Full Bottle)",
      volumeMl: 750,
      abv: "40.0%",
      price: 890,
      description: "Ten times charcoal filtered for exceptional smoothness and purity.",
      image: "https://images.unsplash.com/photo-1550985543-f47f38aeee65?w=600&auto=format&fit=crop&q=80",
      quotaCost: 1.0
    },
    {
      id: "HL-06",
      name: "Greater Than London Dry Gin",
      category: "Hard Liquor",
      subCategory: "Gin",
      brand: "Greater Than",
      size: "750ml (Full Bottle)",
      volumeMl: 750,
      abv: "42.8%",
      price: 1050,
      description: "Infused with Macedonian juniper, fennel, ginger, coriander seeds, and citrus peel.",
      image: "https://images.unsplash.com/photo-1607622750671-6cd9a99eabd1?w=600&auto=format&fit=crop&q=80",
      quotaCost: 1.0
    },
    {
      id: "HL-07",
      name: "Royal Challenge Select Premium Whisky",
      category: "Hard Liquor",
      subCategory: "Whisky",
      brand: "Royal Challenge",
      size: "750ml (Full Bottle)",
      volumeMl: 750,
      abv: "42.8%",
      price: 790,
      description: "Smooth blend of Scotch and Indian grain spirits.",
      image: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=600&auto=format&fit=crop&q=80",
      quotaCost: 1.0
    },
    {
      id: "HL-08",
      name: "McDowell's No.1 Celebration Rum",
      category: "Hard Liquor",
      subCategory: "Rum",
      brand: "McDowell's",
      size: "750ml (Full Bottle)",
      volumeMl: 750,
      abv: "42.8%",
      price: 680,
      description: "Rich distinct taste of molasses and toasted caramel.",
      image: "https://images.unsplash.com/photo-1567696911980-2eed69a46042?w=600&auto=format&fit=crop&q=80",
      quotaCost: 1.0
    },

    // --- BEER ---
    {
      id: "BR-01",
      name: "Kingfisher Ultra Premium Lager Beer",
      category: "Beer",
      subCategory: "Lager",
      brand: "Kingfisher",
      size: "650ml (Bottle)",
      volumeMl: 650,
      abv: "4.8%",
      price: 210,
      description: "Crisp, ultra-smooth premium lager brewed from the finest imported malt.",
      image: "https://images.unsplash.com/photo-1608270114022-7711d9f8c634?w=600&auto=format&fit=crop&q=80",
      quotaCost: 0.5 // 2 beers = 1.0 unit (max weekly beer limit)
    },
    {
      id: "BR-02",
      name: "British Empire Super Strong Beer",
      category: "Beer",
      subCategory: "Strong Beer",
      brand: "British Empire",
      size: "650ml (Bottle)",
      volumeMl: 650,
      abv: "7.8%",
      price: 230,
      description: "Full-bodied robust strong beer famous for intense malt flavour in Tamil Nadu.",
      image: "https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=600&auto=format&fit=crop&q=80",
      quotaCost: 0.5
    },
    {
      id: "BR-03",
      name: "Corona Extra Premium Beer",
      category: "Beer",
      subCategory: "Lager",
      brand: "Corona",
      size: "355ml (Pint Bottle)",
      volumeMl: 355,
      abv: "4.5%",
      price: 260,
      description: "Refreshing imported Mexican lager, best served with a wedge of lime.",
      image: "https://images.unsplash.com/photo-1618886614638-80e3c103d31a?w=600&auto=format&fit=crop&q=80",
      quotaCost: 0.5
    },
    {
      id: "BR-04",
      name: "Heineken Silver Smooth Beer",
      category: "Beer",
      subCategory: "Lager",
      brand: "Heineken",
      size: "650ml (Bottle)",
      volumeMl: 650,
      abv: "4.5%",
      price: 240,
      description: "Brewed at -1°C for crisp refreshment and a subtle finish.",
      image: "https://images.unsplash.com/photo-1584225064785-c62a8b43d148?w=600&auto=format&fit=crop&q=80",
      quotaCost: 0.5
    },
    {
      id: "BR-05",
      name: "Carlsberg Elephant Strong Beer",
      category: "Beer",
      subCategory: "Strong Beer",
      brand: "Carlsberg",
      size: "650ml (Bottle)",
      volumeMl: 650,
      abv: "7.2%",
      price: 230,
      description: "Legendary strong lager with rich malt character and dry bitterness.",
      image: "https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?w=600&auto=format&fit=crop&q=80",
      quotaCost: 0.5
    },
    {
      id: "BR-06",
      name: "Bira 91 White Ale Craft Beer",
      category: "Beer",
      subCategory: "Wheat Beer",
      brand: "Bira 91",
      size: "330ml (Can)",
      volumeMl: 330,
      abv: "4.7%",
      price: 180,
      description: "Deliciously aromatic wheat beer with hints of coriander and orange peel.",
      image: "https://images.unsplash.com/photo-1608270114022-7711d9f8c634?w=600&auto=format&fit=crop&q=80",
      quotaCost: 0.5
    },

    // --- WINE ---
    {
      id: "WN-01",
      name: "Sula Rasa Shiraz Reserve",
      category: "Wine",
      subCategory: "Red Wine",
      brand: "Sula",
      size: "750ml (Bottle)",
      volumeMl: 750,
      abv: "13.5%",
      price: 1250,
      description: "Complex, full-bodied red wine aged in French oak barrels with peppery finish.",
      image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&auto=format&fit=crop&q=80",
      quotaCost: 0.5 // 2 wines = 1.0 unit (max weekly wine limit)
    },
    {
      id: "WN-02",
      name: "Jacob's Creek Classic Cabernet Sauvignon",
      category: "Wine",
      subCategory: "Red Wine",
      brand: "Jacob's Creek",
      size: "750ml (Bottle)",
      volumeMl: 750,
      abv: "13.9%",
      price: 1380,
      description: "Australian classic brimming with dark cherry and blackcurrant fruits.",
      image: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=600&auto=format&fit=crop&q=80",
      quotaCost: 0.5
    },
    {
      id: "WN-03",
      name: "Big Banyan Merlot Red Wine",
      category: "Wine",
      subCategory: "Red Wine",
      brand: "Big Banyan",
      size: "750ml (Bottle)",
      volumeMl: 750,
      abv: "13.0%",
      price: 950,
      description: "Supple, velvety red wine with aromatic hints of plums and dark berries.",
      image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=600&auto=format&fit=crop&q=80",
      quotaCost: 0.5
    },
    {
      id: "WN-04",
      name: "Fratelli Classic Chenin Blanc",
      category: "Wine",
      subCategory: "White Wine",
      brand: "Fratelli",
      size: "750ml (Bottle)",
      volumeMl: 750,
      abv: "12.5%",
      price: 880,
      description: "Crisp and lively white wine with refreshing citrus and green apple aromas.",
      image: "https://images.unsplash.com/photo-1569919659476-f0852f6834b7?w=600&auto=format&fit=crop&q=80",
      quotaCost: 0.5
    },
    {
      id: "WN-05",
      name: "Grover Zampa La Reserve",
      category: "Wine",
      subCategory: "Red Wine",
      brand: "Grover Zampa",
      size: "750ml (Bottle)",
      volumeMl: 750,
      abv: "13.5%",
      price: 1150,
      description: "Award-winning Cabernet-Shiraz blend matured in French oak.",
      image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&auto=format&fit=crop&q=80",
      quotaCost: 0.5
    },

    // --- CIGARETTES ---
    {
      id: "CG-01",
      name: "Classic Regular King Size",
      category: "Cigarettes",
      subCategory: "High Nicotine",
      brand: "Classic",
      size: "Pack of 20 Sticks",
      volumeMl: 0,
      abv: "Nicotine: 1.1mg | Tar: 12mg",
      price: 380,
      description: "Full-flavoured premium blend with toasted Virginia tobaccos.",
      image: "https://images.unsplash.com/photo-1527061011665-3652c757a4d4?w=600&auto=format&fit=crop&q=80",
      nicotineType: "high"
    },
    {
      id: "CG-02",
      name: "Gold Flake Kings Blue",
      category: "Cigarettes",
      subCategory: "High Nicotine",
      brand: "Gold Flake",
      size: "Pack of 20 Sticks",
      volumeMl: 0,
      abv: "Nicotine: 1.0mg | Tar: 11mg",
      price: 380,
      description: "Iconic golden Virginia leaf blend with smooth rich draw.",
      image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&auto=format&fit=crop&q=80",
      nicotineType: "high"
    },
    {
      id: "CG-03",
      name: "Marlboro Red Premium Kings",
      category: "Cigarettes",
      subCategory: "High Nicotine",
      brand: "Marlboro",
      size: "Pack of 20 Sticks",
      volumeMl: 0,
      abv: "Nicotine: 1.2mg | Tar: 13mg",
      price: 410,
      description: "Bold American tobacco blend with distinctive red chevron pack.",
      image: "https://images.unsplash.com/photo-1527061011665-3652c757a4d4?w=600&auto=format&fit=crop&q=80",
      nicotineType: "high"
    },
    {
      id: "CG-04",
      name: "Classic Milds Smooth Filter",
      category: "Cigarettes",
      subCategory: "Low Nicotine",
      brand: "Classic",
      size: "Pack of 20 Sticks",
      volumeMl: 0,
      abv: "Nicotine: 0.6mg | Tar: 6mg",
      price: 380,
      description: "Charcoal active-filtered blend crafted for mellow smoothness.",
      image: "https://images.unsplash.com/photo-1527061011665-3652c757a4d4?w=600&auto=format&fit=crop&q=80",
      nicotineType: "low"
    },
    {
      id: "CG-05",
      name: "Gold Flake Lights Fine Virginia",
      category: "Cigarettes",
      subCategory: "Low Nicotine",
      brand: "Gold Flake",
      size: "Pack of 20 Sticks",
      volumeMl: 0,
      abv: "Nicotine: 0.5mg | Tar: 5mg",
      price: 380,
      description: "Light balanced cigarette with micro-perforated ventilation tips.",
      image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&auto=format&fit=crop&q=80",
      nicotineType: "low"
    },
    {
      id: "CG-06",
      name: "Marlboro Lights Gold",
      category: "Cigarettes",
      subCategory: "Low Nicotine",
      brand: "Marlboro",
      size: "Pack of 20 Sticks",
      volumeMl: 0,
      abv: "Nicotine: 0.6mg | Tar: 6mg",
      price: 410,
      description: "Crisp refined taste featuring lower tar and reduced nicotine content.",
      image: "https://images.unsplash.com/photo-1527061011665-3652c757a4d4?w=600&auto=format&fit=crop&q=80",
      nicotineType: "low"
    }
  ],

  // Realistic mock users for testing different limit & restriction states
  demoUsers: [
    {
      aadhaarNumber: "456789012345", // Masked: XXXX-XXXX-2345
      name: "Rajesh Kannan",
      phone: "+91 98401 23456",
      phoneMasked: "+91 98*** **456",
      district: "Chennai",
      city: "Anna Nagar",
      isRestricted: false,
      restrictionDetails: null,
      weeklyQuota: {
        // 1.0 = 1 full bottle Hard Liquor OR 2 Beers (0.5 each) OR 2 Wines (0.5 each)
        alcoholUsedUnits: 0,
        maxAlcoholUnits: 1.0,
        alcoholResetDate: "2026-09-14T00:00:00+05:30", // Next Monday
        // Cigarettes: Alcohol used == 0 => High 5, Low 10
        highNicotineUsed: 0,
        lowNicotineUsed: 0
      },
      personaBadge: "Clean Citizen (Full Limit Available)",
      personaDescription: "New cycle. Zero quota used. Can book 1 full bottle OR 2 beers OR 2 wines. Full cigarette limit (5 High / 10 Low)."
    },
    {
      aadhaarNumber: "345678901234", // Masked: XXXX-XXXX-1234
      name: "S. Murugan",
      phone: "+91 94440 98765",
      phoneMasked: "+91 94*** **765",
      district: "Chennai",
      city: "T. Nagar",
      isRestricted: false,
      restrictionDetails: null,
      weeklyQuota: {
        alcoholUsedUnits: 0.5, // Used 1 Beer (0.5 units) -> 0.5 units remaining (can buy 1 more beer or 1 wine)
        maxAlcoholUnits: 1.0,
        alcoholResetDate: "2026-09-14T00:00:00+05:30",
        // Since alcoholUsedUnits > 0: Cigarette limits reduced to max 3 High / 6 Low!
        highNicotineUsed: 1,
        lowNicotineUsed: 2
      },
      personaBadge: "Active Citizen (Partial Limit Used)",
      personaDescription: "Consumed 1 Beer (0.5 unit). Cigarette limits dynamically reduced from 5/10 to 3/6."
    },
    {
      aadhaarNumber: "901234567890", // Masked: XXXX-XXXX-7890
      name: "M. Vijay",
      phone: "+91 97910 44321",
      phoneMasked: "+91 97*** **321",
      district: "Chennai",
      city: "Velachery",
      isRestricted: false,
      restrictionDetails: null,
      weeklyQuota: {
        alcoholUsedUnits: 1.0, // Limit exhausted!
        maxAlcoholUnits: 1.0,
        alcoholResetDate: "2026-09-14T00:00:00+05:30",
        highNicotineUsed: 2,
        lowNicotineUsed: 4
      },
      personaBadge: "Limit Reached Citizen (Booking Blocked)",
      personaDescription: "Weekly alcohol quota completely exhausted (1.0 unit used). Alcohol booking is disabled."
    },
    {
      aadhaarNumber: "789012345678", // Masked: XXXX-XXXX-5678
      name: "V. Anbarasan",
      phone: "+91 99402 11987",
      phoneMasked: "+91 99*** **987",
      district: "Chennai",
      city: "Anna Nagar",
      isRestricted: true,
      restrictionDetails: {
        caseNumber: "TN-POL-2026-DUI-8821",
        policeStation: "Anna Nagar Traffic Police (TIW-West)",
        offenceType: "Drunk Driving (Sec 185 Motor Vehicles Act)",
        bloodAlcoholLevel: "88 mg / 100 ml (Legal limit: 30 mg)",
        imposedDate: "2026-08-15",
        reviewDate: "2026-11-15",
        sanctionAuthority: "Regional Transport Authority & Commissioner of Police",
        statusNote: "License suspended for 90 days. Mandatory de-addiction counseling pending. All TASMAC liquor bookings barred.",
        canAppeal: true
      },
      weeklyQuota: {
        alcoholUsedUnits: 0,
        maxAlcoholUnits: 0, // Blocked
        alcoholResetDate: "2026-11-15T00:00:00+05:30",
        highNicotineUsed: 0,
        lowNicotineUsed: 0
      },
      personaBadge: "Legally Restricted Account (DUI Recorded)",
      personaDescription: "Legally recorded Drunk Driving case under MVA Sec 185. Alcohol booking barred by government order."
    }
  ],

  // Admin Officer Account
  adminAccount: {
    id: "ADMIN-TN-TASMAC-09",
    name: "T. Selvamani, IAS",
    role: "District Prohibition Officer & TASMAC Enforcement",
    email: "enforcement.officer@tasmac.tn.gov.in",
    pin: "8899"
  },

  // Initial Bookings
  initialBookings: [
    {
      id: "TASMAC-2026-CHE-98421",
      userId: "456789012345",
      userName: "Rajesh Kannan",
      userAadhaarMasked: "XXXX-XXXX-2345",
      shopId: "TN-CHE-1042",
      shopName: "TASMAC Elite Boutique #1042 - Anna Nagar",
      shopAddress: "Shop No. 42, 2nd Avenue, Block AB, Anna Nagar West, Chennai - 600040",
      productId: "HL-01",
      productName: "Antiquity Blue Ultra Premium Whisky",
      productCategory: "Hard Liquor",
      quantity: 1,
      size: "750ml (Full Bottle)",
      unitPrice: 1180,
      totalAmount: 1180,
      date: "2026-09-10",
      timeSlot: "04:00 PM - 06:00 PM",
      status: "Confirmed",
      qrData: "TASMAC-PASS|ID:TASMAC-2026-CHE-98421|SHOP:TN-CHE-1042|CITIZEN:XXXX-XXXX-2345|DATE:2026-09-10|SLOT:16-18|STATUS:CONFIRMED",
      createdAt: "2026-09-09T18:30:00+05:30",
      notes: "Please carry original government photo ID for age verification at counter."
    },
    {
      id: "TASMAC-2026-CHE-77102",
      userId: "345678901234",
      userName: "S. Murugan",
      userAadhaarMasked: "XXXX-XXXX-1234",
      shopId: "TN-CHE-2105",
      shopName: "TASMAC Retail Outlet #2105 - T. Nagar",
      shopAddress: "Door No. 18, South Usman Road, T. Nagar, Chennai - 600017",
      productId: "BR-01",
      productName: "Kingfisher Ultra Premium Lager Beer",
      productCategory: "Beer",
      quantity: 1,
      size: "650ml (Bottle)",
      unitPrice: 210,
      totalAmount: 210,
      date: "2026-09-08",
      timeSlot: "06:00 PM - 08:00 PM",
      status: "Collected",
      qrData: "TASMAC-PASS|ID:TASMAC-2026-CHE-77102|SHOP:TN-CHE-2105|CITIZEN:XXXX-XXXX-1234|DATE:2026-09-08|SLOT:18-20|STATUS:COLLECTED",
      createdAt: "2026-09-08T15:20:00+05:30",
      collectedAt: "2026-09-08T18:45:00+05:30",
      notes: "Collected at Counter 2."
    },
    {
      id: "TASMAC-2026-CHE-66514",
      userId: "901234567890",
      userName: "M. Vijay",
      userAadhaarMasked: "XXXX-XXXX-7890",
      shopId: "TN-CHE-3045",
      shopName: "TASMAC Elite Mall Store #3045 - Velachery",
      shopAddress: "Basement Level 1, Phoenix Marketcity, Velachery, Chennai - 600042",
      productId: "HL-02",
      productName: "Signature Premier Grain Whisky",
      productCategory: "Hard Liquor",
      quantity: 1,
      size: "750ml (Full Bottle)",
      unitPrice: 960,
      totalAmount: 960,
      date: "2026-09-07",
      timeSlot: "08:00 PM - 10:00 PM",
      status: "Collected",
      qrData: "TASMAC-PASS|ID:TASMAC-2026-CHE-66514|SHOP:TN-CHE-3045|CITIZEN:XXXX-XXXX-7890|DATE:2026-09-07|SLOT:20-22|STATUS:COLLECTED",
      createdAt: "2026-09-07T14:10:00+05:30",
      collectedAt: "2026-09-07T20:50:00+05:30",
      notes: "Quota unit 1.0 recorded."
    }
  ],

  // Purchase History
  initialPurchases: [
    {
      id: "PUR-2026-8801",
      bookingId: "TASMAC-2026-CHE-77102",
      userId: "345678901234",
      shopId: "TN-CHE-2105",
      shopName: "TASMAC Retail Outlet #2105 - T. Nagar",
      productName: "Kingfisher Ultra Premium Lager Beer",
      category: "Beer",
      quantity: 1,
      amount: 210,
      date: "2026-09-08 18:45",
      status: "Completed",
      paymentMethod: "UPI / Counter POS"
    },
    {
      id: "PUR-2026-8802",
      bookingId: "TASMAC-2026-CHE-66514",
      userId: "901234567890",
      shopId: "TN-CHE-3045",
      shopName: "TASMAC Elite Mall Store #3045 - Velachery",
      productName: "Signature Premier Grain Whisky",
      category: "Hard Liquor",
      quantity: 1,
      amount: 960,
      date: "2026-09-07 20:50",
      status: "Completed",
      paymentMethod: "Credit Card"
    },
    {
      id: "PUR-2026-7911",
      bookingId: "TASMAC-2026-CHE-54219",
      userId: "456789012345",
      shopId: "TN-CHE-1042",
      shopName: "TASMAC Elite Boutique #1042 - Anna Nagar",
      productName: "Classic Milds Smooth Filter",
      category: "Cigarettes",
      quantity: 2,
      amount: 760,
      date: "2026-09-02 14:10",
      status: "Completed",
      paymentMethod: "Cash"
    }
  ],

  // Legal restrictions repository (Admin only)
  legalRestrictions: [
    {
      caseId: "LEG-2026-01",
      userAadhaarMasked: "XXXX-XXXX-5678",
      aadhaarNumber: "789012345678",
      citizenName: "V. Anbarasan",
      offence: "Drunk Driving (Sec 185 MVA)",
      caseNumber: "TN-POL-2026-DUI-8821",
      authority: "Anna Nagar TIW-West / RTO Chennai Central",
      imposedDate: "2026-08-15",
      expiryDate: "2026-11-15",
      status: "Active",
      severity: "High",
      remarks: "Breathalyzer BAC 88mg/100ml. First offence conviction."
    },
    {
      caseId: "LEG-2026-02",
      userAadhaarMasked: "XXXX-XXXX-9901",
      aadhaarNumber: "112233445566",
      citizenName: "P. Karthikeyan",
      offence: "Alcohol-Related Public Violence (IPC 323/324)",
      caseNumber: "TN-POL-2026-CR-4512",
      authority: "T. Nagar Police Station (Law & Order)",
      imposedDate: "2026-07-10",
      expiryDate: "2027-01-10",
      status: "Active",
      severity: "Critical",
      remarks: "Public affray under intoxication. Court mandated prohibition."
    }
  ]
};

// Export to window
if (typeof window !== "undefined") {
  window.TASMAC_DATA = TASMAC_DATA;
}
