import 'package:flutter/material.dart';
import 'Cliente/screens/home_screen_clientes.dart'; // Asegúrate de que este archivo exista

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Tu App de Ofertas',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: const Color.fromARGB(255, 255, 255, 255)),
        useMaterial3: true,
        fontFamily: 'Roboto', // Solo si declaras fuentes personalizadas
      ),
      home: const HomeScreen(), // Tu pantalla principal
    );
  }
}