import 'package:flutter/material.dart';
import '../../widgets/custom_button.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: 0,
        selectedItemColor: Colors.black,
        unselectedItemColor: Colors.grey,
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.home), label: ''),
          BottomNavigationBarItem(icon: Icon(Icons.search), label: ''),
          BottomNavigationBarItem(icon: Icon(Icons.shopping_cart), label: ''),
          BottomNavigationBarItem(icon: Icon(Icons.notifications), label: ''),
          BottomNavigationBarItem(icon: Icon(Icons.person), label: ''),
        ],
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(12),
          child: SingleChildScrollView(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // 🔍 Search bar
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 12),
                  decoration: BoxDecoration(
                    color: Colors.grey[200],
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: const TextField(
                    decoration: InputDecoration(
                      border: InputBorder.none,
                      hintText: 'Search',
                      icon: Icon(Icons.search),
                    ),
                  ),
                ),

                const SizedBox(height: 16),

                // 🔘 Favourites, History, Orders
                const Row(
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  children: [
                    CustomButton(icon: Icons.favorite_border, label: 'Favorites'),
                    CustomButton(icon: Icons.history, label: 'History'),
                    CustomButton(icon: Icons.list_alt, label: 'Orders'),
                  ],
                ),

                const SizedBox(height: 16),

                // 🖼️ Banner
                ClipRRect(
                  borderRadius: BorderRadius.circular(12),
                  child: Image.asset('assets/images/banner.png'), // Pon tu imagen aquí
                ),

                const SizedBox(height: 16),

                // 🏢 Company section
                const Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text("Company", style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),
                    Icon(Icons.arrow_forward_ios, size: 16),
                  ],
                ),
                const SizedBox(height: 8),

                SizedBox(
                  height: 80,
                  child: ListView(
                    scrollDirection: Axis.horizontal,




                    
                    children: const [
                      CategoryIcon(label: 'Fitness', icon: Icons.fitness_center),
                      CategoryIcon(label: 'Restaurant', icon: Icons.restaurant),
                      CategoryIcon(label: 'Makeup', icon: Icons.brush),
                      CategoryIcon(label: 'Entertainment', icon: Icons.movie),
                    ],
                  ),
                ),

                const SizedBox(height: 16),

                // 🎯 Promo section
                const Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text("Promo", style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),
                    Icon(Icons.arrow_forward_ios, size: 16),
                  ],
                ),
                const SizedBox(height: 8),

                SizedBox(
                  height: 180,
                  child: ListView(
                    scrollDirection: Axis.horizontal,
                    children: const [
                      PromoCard(image: 'assets/images/makeup.png', text: '¡PROMOCIÓN! MAKEUP AGOSTO\n50% DE DESCUENTO EN TODO'),
                      PromoCard(image: 'assets/images/fitness.png', text: '¡PROMOCIÓN! FITNESS AGOSTO\nENTRENAS A MITAD DE PRECIO'),
                      PromoCard(image: 'assets/images/restaurant.png', text: '¡PROMOCIÓN! RESTAURANTE\n50% EN TU PRIMERA ORDEN'),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

// Widget para las categorías
class CategoryIcon extends StatelessWidget {
  final String label;
  final IconData icon;

  const CategoryIcon({super.key, required this.label, required this.icon});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 10),
      child: Column(
        children: [
          CircleAvatar(
            radius: 28,
            backgroundColor: Colors.grey.shade200,
            child: Icon(icon, color: Colors.black),
          ),
          const SizedBox(height: 4),
          Text(label, style: const TextStyle(fontSize: 12)),
        ],
      ),
    );
  }
}

// Widget para las promociones
class PromoCard extends StatelessWidget {
  final String image;
  final String text;

  const PromoCard({super.key, required this.image, required this.text});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 160,
      margin: const EdgeInsets.only(right: 12),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Expanded(
            child: ClipRRect(
              borderRadius: BorderRadius.circular(12),
              child: Image.asset(image, fit: BoxFit.cover, width: double.infinity),
            ),
          ),
          const SizedBox(height: 4),
          Text(text, maxLines: 2, overflow: TextOverflow.ellipsis, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
          const Text("Brand", style: TextStyle(color: Colors.grey)),
          const Text("You’re Saving", style: TextStyle(color: Colors.grey)),
          const Text("\$10.99", style: TextStyle(fontWeight: FontWeight.bold)),
        ],
      ),
    );
  }
}